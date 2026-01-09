import type { ResumeData } from '../../types/resume'
import { Diamond, Award, CheckCircle2, Percent, Zap, Trophy, Lightbulb } from 'lucide-react'

interface StrategicImpactTemplateProps {
    data: ResumeData
}

export function StrategicImpactTemplate({ data }: StrategicImpactTemplateProps) {
    const { personalInfo, education, experience, projects, skills, achievements } = data

    // Helper to get an icon based on index or content (simulated)
    const getIcon = (index: number) => {
        const icons = [Diamond, Award, CheckCircle2, Percent, Zap, Trophy, Lightbulb];
        const Icon = icons[index % icons.length];
        return <Icon className="w-4 h-4 text-gray-600 mt-0.5" />;
    }

    return (
        <div className="resume-container px-8 py-8 max-w-[210mm] mx-auto min-h-[297mm] bg-white text-slate-900 font-sans box-border selection:bg-gray-200" style={{ lineHeight: '1.4' }}>

            {/* Header - Simple Centered */}
            <header className="text-center mb-6">
                <h1 className="text-2xl font-bold uppercase tracking-wide text-black mb-1">
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <div className="flex flex-wrap justify-center items-center gap-x-2 text-sm text-gray-600">
                    {/* Simple dot separated list */}
                    {[
                        personalInfo.location,
                        personalInfo.phone,
                        personalInfo.email,
                        personalInfo.linkedin?.replace(/^https?:\/\//, '').replace(/^www\./, ''),
                        personalInfo.github?.replace(/^https?:\/\//, '').replace(/^www\./, '')
                    ].filter(Boolean).map((item, i, arr) => (
                        <span key={i} className="flex items-center">
                            {item}
                            {i < arr.length - 1 && <span className="mx-2">•</span>}
                        </span>
                    ))}
                </div>
            </header>

            <div className="flex flex-col gap-2">
                {/* Experience Section */}
                {experience.length > 0 && (
                    <section className="mb-2 break-inside-auto">
                        <h2 className="text-center font-serif text-lg font-bold border-b border-black mb-1 pb-0.5" style={{ pageBreakAfter: 'avoid' }}>
                            Experience
                        </h2>
                        <div className="flex flex-col gap-2">
                            {experience.map((exp) => (
                                <div key={exp.id} className="break-inside-avoid">
                                    {/* Row 1: Company & Location */}
                                    <div className="flex justify-between items-baseline text-[11pt] text-gray-600">
                                        <span className="font-normal">{exp.company}</span>
                                        <span>{exp.location}</span>
                                    </div>
                                    {/* Row 2: Position & Dates */}
                                    <div className="flex justify-between items-baseline mb-0.5 text-[11pt]">
                                        <span className="font-bold text-black">{exp.position}</span>
                                        <span className="text-gray-900">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                                    </div>
                                    {/* Bullets */}
                                    {exp.description.length > 0 && (
                                        <ul className="list-outside ml-3.5 space-y-0.5">
                                            {exp.description.map((desc, idx) => (
                                                desc.trim() && (
                                                    <li key={idx} className="text-[10pt] leading-tight pl-1 relative -left-0.5">
                                                        <span className="absolute -left-3 top-1.5 w-1 h-1 bg-black rounded-full text-transparent overflow-hidden leading-none select-none">.</span>
                                                        <span className="text-slate-800">{desc}</span>
                                                    </li>
                                                )
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education Section */}
                {education.length > 0 && (
                    <section className="mb-2 break-inside-auto">
                        <h2 className="text-center font-serif text-lg font-bold border-b border-black mb-1 pb-0.5" style={{ pageBreakAfter: 'avoid' }}>
                            Education
                        </h2>
                        <div className="flex flex-col gap-1.5">
                            {education.map((edu) => (
                                <div key={edu.id} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline text-[11pt] text-gray-600">
                                        <span>{edu.school}</span>
                                        <span className="text-black">{edu.startDate} - {edu.endDate}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline text-[11pt]">
                                        <span className="text-black font-medium">{edu.degree} in {edu.field}</span>
                                        {edu.gpa && <span className="text-gray-600">GPA: {edu.gpa}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Key Achievements Grid Section */}
                {achievements.length > 0 && (
                    <section className="mb-2 break-inside-auto">
                        <h2 className="text-center font-serif text-lg font-bold border-b border-black mb-1 pb-0.5" style={{ pageBreakAfter: 'avoid' }}>
                            Key Achievements
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
                            {achievements.map((achievement, index) => (
                                <div key={achievement.id} className="col-span-1 break-inside-avoid">
                                    <div className="flex items-start gap-2 mb-0.5">
                                        {getIcon(index)}
                                        <h3 className="font-bold text-[10.5pt] leading-tight text-slate-900 pt-0.5">
                                            {achievement.title}
                                        </h3>
                                    </div>
                                    <p className="text-[9.5pt] leading-[1.3] text-slate-700">
                                        {achievement.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects Section */}
                {projects.length > 0 && (
                    <section className="mb-2 break-inside-auto">
                        <h2 className="text-center font-serif text-lg font-bold border-b border-black mb-1 pb-0.5" style={{ pageBreakAfter: 'avoid' }}>
                            Projects
                        </h2>
                        <div className="flex flex-col gap-2">
                            {projects.map((project) => (
                                <div key={project.id} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-[11pt] text-slate-900">{project.name}</h3>
                                            <div className="text-[9px] space-x-1.5 text-gray-600 uppercase font-medium tracking-wider">
                                                {project.link && <span>[Link]</span>}
                                                {project.github && <span>[Code]</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[10pt] text-slate-800 leading-snug">
                                        {project.description}
                                    </p>
                                    {project.technologies.length > 0 && (
                                        <p className="text-[9pt] text-gray-600 mt-0.5 font-medium italic">
                                            Stack: {project.technologies.join(', ')}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills Section */}
                {skills.length > 0 && (
                    <section className="mb-2 break-inside-auto">
                        <h2 className="text-center font-serif text-lg font-bold border-b border-black mb-1 pb-0.5" style={{ pageBreakAfter: 'avoid' }}>
                            Skills
                        </h2>
                        <div className="space-y-1.5 text-[10.5pt]">
                            {/* Group skills by category manually or just render them as list items if structure doesn't match perfectly */}
                            {/* Since data structure matches category, we can group them for display or just list them as provided in screenshot 'Category: items' */}
                            {Array.from(new Set(skills.map(s => s.category))).map(category => {
                                const categorySkills = skills.filter(s => s.category === category);
                                return (
                                    <div key={category} className="flex items-baseline">
                                        <span className="font-normal text-gray-600 min-w-[140px] shrink-0">
                                            {category}:
                                        </span>
                                        <span className="text-slate-800 leading-normal">
                                            {categorySkills.map((s, i) => (
                                                <span key={s.id}>
                                                    {s.name}
                                                    {i < categorySkills.length - 1 && <span className="mx-1 text-gray-400">•</span>}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
