import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';
import type { ResumeData } from '../types/resume';

// Explicitly set worker source
GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

interface TextItem {
    str: string;
    x: number;
    y: number;
    h: number;
}

export async function parseResumeFromPdf(file: File): Promise<Partial<ResumeData>> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            // 1. Convert to simple TextItems with coords
            const items: TextItem[] = textContent.items.map((item: any) => ({
                str: item.str,
                x: item.transform[4], // x translation
                y: item.transform[5], // y translation
                h: item.height || 0
            }));

            // 2. Sort by Y (descending - top to bottom) then X (ascending - left to right)
            // PDF Y coordinates usually start from bottom-left (0,0), so higher Y is higher on page.
            items.sort((a, b) => {
                const yDiff = b.y - a.y;
                if (Math.abs(yDiff) > 5) return yDiff; // disparate lines, top first
                return a.x - b.x; // same line (approx), left first
            });

            // 3. Reconstruct lines
            let pageLines: string[] = [];
            let currentLine = '';
            let lastY = -999;

            items.forEach((item) => {
                if (lastY === -999) {
                    currentLine = item.str;
                    lastY = item.y;
                } else if (Math.abs(item.y - lastY) > 5) {
                    // New visual line
                    pageLines.push(currentLine.trim());
                    currentLine = item.str;
                    lastY = item.y;
                } else {
                    // Same visual line, append with space if needed
                    if (!currentLine.endsWith(' ') && !item.str.startsWith(' ')) {
                        currentLine += ' ';
                    }
                    currentLine += item.str;
                }
            });
            if (currentLine) pageLines.push(currentLine.trim());

            fullText += pageLines.join('\n') + '\n';
        }

        console.log("Parsed PDF Text Structure:\n", fullText); // For debug

        return parseResumeText(fullText);
    } catch (error) {
        console.error("PDF Parsing Error Details:", error);
        throw error;
    }
}

function parseResumeText(text: string): Partial<ResumeData> {
    const lines = text.split(/\n/).map(l => l.trim()).filter(l => l.length > 0);

    const data: any = {
        personalInfo: { fullName: '', email: '', phone: '', location: '', linkedin: '', github: '', portfolio: '' },
        education: [],
        experience: [],
        projects: [],
        skills: [],
        achievements: []
    };

    // --- regex patterns ---
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i;
    // Relaxed phone regex to catch simple numbers
    const phoneRegex = /(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/;

    // Relaxed section headers
    const sections = {
        experience: /experience|employment|work history/i,
        education: /education|academic/i,
        skills: /skills|technologies/i,
        projects: /projects/i,
        achievements: /achievements|awards|honors|certifications/i
    };

    let currentSection = 'contact'; // Start assuming contact info
    let buffer: string[] = [];

    const flushBuffer = () => {
        if (buffer.length === 0) return;

        if (currentSection === 'contact') {
            // Name usually in first line
            if (buffer.length > 0 && !data.personalInfo.fullName) {
                const line = buffer[0];
                // heuristic: name is short, no email, no phone
                if (line.length < 50 && !line.includes('@') && !/\d{5}/.test(line)) {
                    data.personalInfo.fullName = line;
                }
            }
            // Scan for contact info in this block
            const block = buffer.join(' ');
            if (!data.personalInfo.email && emailRegex.test(block)) data.personalInfo.email = block.match(emailRegex)![0];
            if (!data.personalInfo.phone && phoneRegex.test(block)) data.personalInfo.phone = block.match(phoneRegex)![0];

            buffer.forEach(line => {
                if (line.toLowerCase().includes('linkedin.com')) data.personalInfo.linkedin = line;
                if (line.toLowerCase().includes('github.com')) data.personalInfo.github = line;
                // Location heuristic: City, Country code pattern? 
                if (/[A-Z][a-z]+, [A-Z]{2}/.test(line) && line.length < 30) data.personalInfo.location = line;
            });

        } else if (currentSection === 'experience') {
            // Block parsing attempt 2.0 (Generalized)
            // We look for "Header-like" lines that might be Company or Role
            let entry: any = { id: Math.random().toString(36), description: [] };
            let isNew = true;

            buffer.forEach(line => {
                // Is this a metadata line? (Date, Location)
                const hasDate = /\b(20\d{2}|Present|Current)\b/i.test(line);

                if (hasDate || (line.length < 60 && !line.startsWith('-') && !line.startsWith('•'))) {
                    // Potentially a header line (Company/Role)
                    if (!isNew && entry.company && entry.description.length > 0) {
                        // Flush previous entry because we found a new header
                        data.experience.push(entry);
                        entry = { id: Math.random().toString(36), description: [] };
                        isNew = true;
                    }

                    // Parse the header line
                    if (hasDate) {
                        const extractedDate = line.match(/\b((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{1,2}\/\d{4}|\d{4}|Present|Current)/gi);
                        if (extractedDate) {
                            entry.startDate = extractedDate[0];
                            if (extractedDate[1]) entry.endDate = extractedDate[1];
                            else if (/present|current/i.test(line)) entry.current = true;
                        }
                    }

                    // If it's a new entry and we don't have company name, use this line
                    if (!entry.company) {
                        // split by comma if existing to separate company from location?
                        // e.g. "Amazon, Bangalore"
                        const parts = line.split(',');
                        entry.company = parts[0].trim();
                        if (parts.length > 1) entry.location = parts.slice(1).join(',').trim();
                        isNew = false;
                    } else if (!entry.position) {
                        entry.position = line.replace(/\d{4}.*/, '').trim(); // Remove date if present
                    } else {
                        // Already have company and position, maybe it's location or extra info?
                        // treat as description if long, else ignore
                        if (line.length > 50) entry.description.push(line);
                    }

                } else {
                    // Description line
                    entry.description.push(line.replace(/^[•-]\s*/, ''));
                }
            });
            if (entry.company) data.experience.push(entry);

        } else if (currentSection === 'education') {
            // Simple Education Parser
            let entry: any = { id: Math.random().toString(36) };
            buffer.forEach(line => {
                if (/university|college|school|institute/i.test(line)) {
                    if (entry.school) { data.education.push(entry); entry = { id: Math.random().toString(36) }; }
                    entry.school = line;
                }
                else if (/\b(degree|bachelor|master|phd|bs|ms|ba|ma|b\.s|m\.s)\b/i.test(line)) entry.degree = line;
                else if (/\b(20\d{2})\b/.test(line)) entry.endDate = line;
            });
            if (entry.school) data.education.push(entry);

        } else if (currentSection === 'skills') {
            const allSkills = buffer.join(', ').split(/[,•|]|\s{2,}/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 30);
            allSkills.forEach(s => data.skills.push({ id: Math.random().toString(36), name: s, category: 'General' }));

        } else if (currentSection === 'projects') {
            let entry: any = { id: Math.random().toString(36), description: '', technologies: [] };
            buffer.forEach(line => {
                // Heuristic: Project title is usually short
                if (line.length < 50 && !line.startsWith('•') && !line.startsWith('-')) {
                    if (entry.name) { data.projects.push(entry); entry = { id: Math.random().toString(36), description: '', technologies: [] }; }
                    entry.name = line;
                } else {
                    entry.description += line + " ";
                }
            });
            if (entry.name) data.projects.push(entry);
        } else if (currentSection === 'achievements') {
            buffer.forEach(line => {
                if (line.length > 3) data.achievements.push({ id: Math.random().toString(36), title: line });
            });
        }

        buffer = [];
    }

    // Iterate lines to segment sections
    lines.forEach(line => {
        // Check for contacts globally if missing
        if (!data.personalInfo.email && emailRegex.test(line)) data.personalInfo.email = line.match(emailRegex)![0];
        if (!data.personalInfo.location && /[A-Z][a-z]+, [A-Z]{2}/.test(line)) data.personalInfo.location = line;

        // Check section header
        const lower = line.toLowerCase();
        // Heuristic: Section headers are short and contain keywords
        if (line.length < 40) {
            if (sections.experience.test(lower)) { flushBuffer(); currentSection = 'experience'; return; }
            if (sections.education.test(lower)) { flushBuffer(); currentSection = 'education'; return; }
            if (sections.skills.test(lower)) { flushBuffer(); currentSection = 'skills'; return; }
            if (sections.projects.test(lower)) { flushBuffer(); currentSection = 'projects'; return; }
            if (sections.achievements.test(lower)) { flushBuffer(); currentSection = 'achievements'; return; }
        }

        buffer.push(line);
    });
    flushBuffer();

    return data;
}
