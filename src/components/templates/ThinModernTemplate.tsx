import type { ResumeData } from '../../types/resume'

interface ThinModernTemplateProps {
    data: ResumeData
}

export function ThinModernTemplate({ data }: ThinModernTemplateProps) {
    const { personalInfo, education, experience, skills, achievements } = data

    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <div style={{ marginBottom: '8pt', textAlign: 'center' }}>
            <h2 style={{
                fontSize: '16pt',
                fontWeight: 400,
                borderBottom: '1pt solid #000',
                paddingBottom: '4pt',
                marginBottom: '4pt',
                letterSpacing: '1px'
            }}>
                {children}
            </h2>
        </div>
    )

    return (
        <div className="resume-container" style={{ fontFamily: '"Inter", "Roboto", sans-serif', fontWeight: 300, color: '#000', lineHeight: 1.5 }}>
            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '20pt' }}>
                <h1 style={{ fontSize: '28pt', fontWeight: 500, margin: '0 0 8pt 0', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    {personalInfo.fullName || 'Your Name'}
                </h1>

                {/* Contact Info */}
                <div style={{ fontSize: '10pt', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12pt', color: '#555' }}>
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.linkedin && (
                        <span>
                            <a href={personalInfo.linkedin} style={{ color: 'inherit', textDecoration: 'none' }}>linkedin.com</a>
                        </span>
                    )}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
            </header>

            {/* Summary */}
            {personalInfo.summary && (
                <section style={{ marginBottom: '16pt' }}>
                    <SectionTitle>Summary</SectionTitle>
                    <p style={{ fontSize: '10pt', textAlign: 'justify' }}>{personalInfo.summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: '16pt' }}>
                    <SectionTitle>Experience</SectionTitle>
                    {experience.map((exp) => (
                        <div key={exp.id} style={{ marginBottom: '12pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2pt' }}>
                                <div style={{ fontSize: '12pt', fontWeight: 400, color: '#000' }}>
                                    {exp.company}
                                </div>
                                <div style={{ fontSize: '10pt', color: '#000' }}>
                                    {exp.location}
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4pt' }}>
                                <div style={{ fontWeight: 600, fontSize: '11pt', fontStyle: 'italic' }}>{exp.position}</div>
                                <div style={{ fontSize: '10pt', fontStyle: 'italic' }}>
                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                </div>
                            </div>

                            <ul style={{ margin: '0 0 0 16pt', padding: 0, listStyleType: 'disc', listStylePosition: 'outside' }}>
                                {exp.description.map((desc, i) => (
                                    <li key={i} style={{ fontSize: '10pt', marginBottom: '2pt', fontWeight: 300 }}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section style={{ marginBottom: '16pt' }}>
                    <SectionTitle>Education</SectionTitle>
                    {education.map((edu) => (
                        <div key={edu.id} style={{ marginBottom: '8pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ fontWeight: 500, fontSize: '11pt' }}>
                                    {edu.school}, {edu.degree}
                                </div>
                                <div style={{ fontSize: '10pt', fontStyle: 'italic' }}>
                                    {edu.startDate} - {edu.endDate}
                                </div>
                            </div>
                            {edu.field && <div style={{ fontSize: '10pt' }}>{edu.field}</div>}
                            {edu.gpa && <div style={{ fontSize: '10pt' }}>GPA: {edu.gpa}</div>}
                        </div>
                    ))}
                </section>
            )}

            {/* Key Achievements (If any) */}
            {achievements.length > 0 && (
                <section style={{ marginBottom: '16pt' }}>
                    <SectionTitle>Key Achievements</SectionTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8pt' }}>
                        {achievements.map((ach) => (
                            <div key={ach.id}>
                                <div style={{ fontWeight: 600, fontSize: '10pt', marginBottom: '2pt' }}>{ach.title}</div>
                                <div style={{ fontSize: '10pt' }}>{ach.description}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section>
                    <SectionTitle>Skills</SectionTitle>
                    <div style={{ fontSize: '10pt' }}>
                        {/* Group by category if needed, or just list. Let's list by category for 'well placed' look */}
                        {Array.from(new Set(skills.map(s => s.category))).map(cat => {
                            const catSkills = skills.filter(s => s.category === cat);
                            return (
                                <div key={cat} style={{ marginBottom: '4pt' }}>
                                    <span style={{ fontWeight: 500 }}>{cat}: </span>
                                    <span>{catSkills.map(s => s.name).join(', ')}</span>
                                </div>
                            )
                        })}
                    </div>
                </section>
            )}

        </div>
    )
}
