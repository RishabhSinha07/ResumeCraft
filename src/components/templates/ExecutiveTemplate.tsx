import type { ResumeData } from '../../types/resume'

interface ExecutiveTemplateProps {
    data: ResumeData
}

export function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
    const { personalInfo, education, experience, projects, skills, achievements } = data

    return (
        <div className="resume-container" style={{ padding: '20mm' }}>
            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '25pt', borderBottom: '2pt solid #1a237e', paddingBottom: '15pt' }}>
                <h1 style={{ fontSize: '28pt', fontWeight: 800, color: '#1a237e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8pt' }}>
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <div style={{ fontSize: '10pt', color: '#455a64', display: 'flex', justifyContent: 'center', gap: '12pt', fontWeight: 500 }}>
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.phone && <span>| {personalInfo.phone}</span>}
                    {personalInfo.email && <span>| {personalInfo.email}</span>}
                </div>
                <div style={{ fontSize: '9pt', color: '#1a237e', marginTop: '6pt', display: 'flex', justifyContent: 'center', gap: '10pt' }}>
                    {personalInfo.linkedin && (
                        <a href={personalInfo.linkedin} style={{ color: 'inherit', textDecoration: 'none' }}>
                            LinkedIn: {personalInfo.linkedin.replace(/^https?:\/\//, '').replace(/^www\./, '')}
                        </a>
                    )}
                    {personalInfo.portfolio && (
                        <a href={personalInfo.portfolio} style={{ color: 'inherit', textDecoration: 'none' }}>
                            | Portfolio: {personalInfo.portfolio.replace(/^https?:\/\//, '').replace(/^www\./, '')}
                        </a>
                    )}
                </div>
            </header>

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: '20pt' }}>
                    <h2 style={{ fontSize: '13pt', fontWeight: 700, color: '#1a237e', textTransform: 'uppercase', borderBottom: '1pt solid #1a237e', paddingBottom: '3pt', marginBottom: '12pt' }}>
                        Professional Experience
                    </h2>
                    {experience.map((exp) => (
                        <div key={exp.id} style={{ marginBottom: '15pt' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2pt' }}>
                                <h3 style={{ fontSize: '12pt', fontWeight: 700, color: '#263238' }}>{exp.company}</h3>
                                <span style={{ fontSize: '10pt', fontWeight: 600, color: '#455a64' }}>
                                    {exp.startDate} – {exp.current ? 'PRESENT' : exp.endDate?.toUpperCase()}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6pt' }}>
                                <span style={{ fontSize: '11pt', fontWeight: 600, color: '#1a237e', fontStyle: 'italic' }}>{exp.position}</span>
                                <span style={{ fontSize: '10pt', color: '#607d8b' }}>{exp.location}</span>
                            </div>
                            {exp.description.length > 0 && (
                                <ul style={{ marginLeft: '15pt', paddingLeft: 0, listStyle: 'square outside' }}>
                                    {exp.description.map((desc, idx) => (
                                        desc.trim() && (
                                            <li key={idx} style={{ fontSize: '10pt', lineHeight: '1.4', color: '#37474f', marginBottom: '4pt' }}>
                                                {desc}
                                            </li>
                                        )
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Projects or Achievements - conditional layout */}
            <div style={{ display: 'flex', gap: '30pt', marginBottom: '20pt' }}>
                {/* Left Column: Education & Skills */}
                <div style={{ flex: 1 }}>
                    {education.length > 0 && (
                        <section style={{ marginBottom: '20pt' }}>
                            <h2 style={{ fontSize: '13pt', fontWeight: 700, color: '#1a237e', textTransform: 'uppercase', borderBottom: '1pt solid #1a237e', paddingBottom: '3pt', marginBottom: '10pt' }}>
                                Education
                            </h2>
                            {education.map((edu) => (
                                <div key={edu.id} style={{ marginBottom: '10pt' }}>
                                    <div style={{ fontSize: '11pt', fontWeight: 700, color: '#263238' }}>{edu.school}</div>
                                    <div style={{ fontSize: '10pt', fontWeight: 600, color: '#1a237e' }}>{edu.degree} {edu.field && `in ${edu.field}`}</div>
                                    <div style={{ fontSize: '9pt', color: '#607d8b' }}>{edu.startDate} – {edu.endDate}</div>
                                    {edu.gpa && <div style={{ fontSize: '9pt', color: '#455a64', marginTop: '2pt' }}>GPA: {edu.gpa}</div>}
                                </div>
                            ))}
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section>
                            <h2 style={{ fontSize: '13pt', fontWeight: 700, color: '#1a237e', textTransform: 'uppercase', borderBottom: '1pt solid #1a237e', paddingBottom: '3pt', marginBottom: '10pt' }}>
                                Key Expertise
                            </h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6pt' }}>
                                {skills.map((skill) => (
                                    <span key={skill.id} style={{ fontSize: '9pt', fontWeight: 600, color: '#37474f', border: '1pt solid #cfd8dc', padding: '2pt 6pt' }}>
                                        {skill.name.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column: Achievements & Projects */}
                <div style={{ flex: 1.2 }}>
                    {achievements.length > 0 && (
                        <section style={{ marginBottom: '20pt' }}>
                            <h2 style={{ fontSize: '13pt', fontWeight: 700, color: '#1a237e', textTransform: 'uppercase', borderBottom: '1pt solid #1a237e', paddingBottom: '3pt', marginBottom: '10pt' }}>
                                Key Achievements
                            </h2>
                            {achievements.map((achievement) => (
                                <div key={achievement.id} style={{ marginBottom: '10pt' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <h3 style={{ fontSize: '10pt', fontWeight: 700, color: '#263238' }}>{achievement.title}</h3>
                                        <span style={{ fontSize: '8pt', color: '#90a4ae' }}>{achievement.date}</span>
                                    </div>
                                    <p style={{ fontSize: '9pt', color: '#455a64', marginTop: '2pt', fontStyle: 'italic' }}>
                                        {achievement.description}
                                    </p>
                                </div>
                            ))}
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <h2 style={{ fontSize: '13pt', fontWeight: 700, color: '#1a237e', textTransform: 'uppercase', borderBottom: '1pt solid #1a237e', paddingBottom: '3pt', marginBottom: '10pt' }}>
                                Selected Projects
                            </h2>
                            {projects.map((project) => (
                                <div key={project.id} style={{ marginBottom: '10pt' }}>
                                    <h3 style={{ fontSize: '10pt', fontWeight: 700, color: '#263238' }}>{project.name}</h3>
                                    <p style={{ fontSize: '9pt', color: '#455a64', marginTop: '2pt', lineHeight: '1.4' }}>
                                        {project.description}
                                    </p>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
