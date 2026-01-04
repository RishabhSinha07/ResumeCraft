import type { ResumeData } from '../../types/resume'

interface ModernCreativeTemplateProps {
  data: ResumeData
}

export function ModernCreativeTemplate({ data }: ModernCreativeTemplateProps) {
  const { personalInfo, education, experience, projects, skills, achievements } = data

  return (
    <div className="resume-container" style={{ display: 'flex', gap: '20pt', padding: '0' }}>
      {/* Sidebar */}
      <aside style={{ width: '30%', backgroundColor: '#f8fafc', padding: '15mm 10mm', height: '297mm', borderRight: '1pt solid #e2e8f0' }}>
        <div style={{ marginBottom: '20pt' }}>
          <h1 style={{ fontSize: '20pt', fontWeight: 700, lineHeight: '1.2', color: '#1e293b', marginBottom: '10pt' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div style={{ fontSize: '9pt', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '4pt' }}>
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
          </div>
        </div>

        <div style={{ marginBottom: '20pt' }}>
          <h2 style={{ fontSize: '11pt', fontWeight: 600, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10pt', borderBottom: '1pt solid #cbd5e1', paddingBottom: '3pt' }}>
            Contact
          </h2>
          <div style={{ fontSize: '9pt', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6pt' }}>
            {personalInfo.linkedin && (
              <div>
                <span style={{ fontWeight: 600, display: 'block' }}>LinkedIn</span>
                {personalInfo.linkedin.replace(/^https?:\/\//, '').replace(/^www\./, '')}
              </div>
            )}
            {personalInfo.github && (
              <div>
                <span style={{ fontWeight: 600, display: 'block' }}>GitHub</span>
                {personalInfo.github.replace(/^https?:\/\//, '').replace(/^www\./, '')}
              </div>
            )}
            {personalInfo.portfolio && (
              <div>
                <span style={{ fontWeight: 600, display: 'block' }}>Portfolio</span>
                {personalInfo.portfolio.replace(/^https?:\/\//, '').replace(/^www\./, '')}
              </div>
            )}
          </div>
        </div>

        {skills.length > 0 && (
          <div style={{ marginBottom: '20pt' }}>
            <h2 style={{ fontSize: '11pt', fontWeight: 600, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10pt', borderBottom: '1pt solid #cbd5e1', paddingBottom: '3pt' }}>
              Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4pt' }}>
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  style={{
                    fontSize: '8pt',
                    backgroundColor: '#e2e8f0',
                    color: '#334155',
                    padding: '2pt 6pt',
                    borderRadius: '4pt',
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div style={{ marginBottom: '20pt' }}>
            <h2 style={{ fontSize: '11pt', fontWeight: 600, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10pt', borderBottom: '1pt solid #cbd5e1', paddingBottom: '3pt' }}>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10pt' }}>
                <div style={{ fontSize: '9pt', fontWeight: 600, color: '#334155' }}>{edu.degree}</div>
                <div style={{ fontSize: '8pt', color: '#64748b' }}>{edu.school}</div>
                <div style={{ fontSize: '8pt', color: '#94a3b8' }}>{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main style={{ width: '70%', padding: '15mm 10mm 15mm 0' }}>
        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: '20pt' }}>
            <h2 style={{ fontSize: '14pt', fontWeight: 700, color: '#1e293b', marginBottom: '10pt', display: 'flex', alignItems: 'center', gap: '8pt' }}>
              Experience
              <div style={{ flex: 1, height: '1pt', backgroundColor: '#e2e8f0' }}></div>
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '15pt' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4pt' }}>
                  <div>
                    <h3 style={{ fontSize: '11pt', fontWeight: 600, color: '#0f172a' }}>{exp.position}</h3>
                    <div style={{ fontSize: '10pt', color: '#3b82f6', fontWeight: 500 }}>{exp.company}</div>
                  </div>
                  <div style={{ fontSize: '9pt', color: '#64748b', textAlign: 'right' }}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    <div style={{ fontSize: '8pt' }}>{exp.location}</div>
                  </div>
                </div>
                {exp.description.length > 0 && (
                  <ul style={{ marginLeft: '12pt', paddingLeft: 0, listStyle: 'disc outside' }}>
                    {exp.description.map((desc, idx) => (
                      desc.trim() && (
                        <li key={idx} style={{ fontSize: '10pt', lineHeight: '1.5', color: '#475569', marginBottom: '2pt' }}>
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

        {/* Projects */}
        {projects.length > 0 && (
          <section style={{ marginBottom: '20pt' }}>
            <h2 style={{ fontSize: '14pt', fontWeight: 700, color: '#1e293b', marginBottom: '10pt', display: 'flex', alignItems: 'center', gap: '8pt' }}>
              Projects
              <div style={{ flex: 1, height: '1pt', backgroundColor: '#e2e8f0' }}></div>
            </h2>
            {projects.map((project) => (
              <div key={project.id} style={{ marginBottom: '12pt' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '11pt', fontWeight: 600, color: '#0f172a' }}>{project.name}</h3>
                  <div style={{ fontSize: '8pt', color: '#3b82f6' }}>
                    {project.github && <span style={{ marginRight: '6pt' }}>GitHub</span>}
                    {project.link && <span>Live Demo</span>}
                  </div>
                </div>
                <p style={{ fontSize: '10pt', color: '#475569', marginTop: '2pt', lineHeight: '1.4' }}>
                  {project.description}
                </p>
                {project.technologies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3pt', marginTop: '4pt' }}>
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} style={{ fontSize: '8pt', color: '#64748b', fontStyle: 'italic' }}>
                        #{tech}{idx < project.technologies.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <section>
            <h2 style={{ fontSize: '14pt', fontWeight: 700, color: '#1e293b', marginBottom: '10pt', display: 'flex', alignItems: 'center', gap: '8pt' }}>
              Achievements
              <div style={{ flex: 1, height: '1pt', backgroundColor: '#e2e8f0' }}></div>
            </h2>
            {achievements.map((achievement) => (
              <div key={achievement.id} style={{ marginBottom: '8pt' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '10pt', fontWeight: 600, color: '#0f172a' }}>{achievement.title}</h3>
                  <span style={{ fontSize: '8pt', color: '#94a3b8' }}>{achievement.date}</span>
                </div>
                <p style={{ fontSize: '9pt', color: '#475569', marginTop: '1pt' }}>{achievement.description}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
