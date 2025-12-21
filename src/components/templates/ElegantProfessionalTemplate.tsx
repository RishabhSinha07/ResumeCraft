import type { ResumeData } from '../../types/resume'

interface ElegantProfessionalTemplateProps {
  data: ResumeData
}

export function ElegantProfessionalTemplate({ data }: ElegantProfessionalTemplateProps) {
  const { personalInfo, education, experience, projects, skills, achievements } = data

  return (
    <div className="resume-container">
      {/* Elegant Header */}
      <header className="resume-header" style={{ marginBottom: '14pt', paddingBottom: '8pt', borderBottom: '1pt solid #666' }}>
        <h1 className="resume-header-name" style={{ fontSize: '28pt', fontWeight: 300, letterSpacing: '0.05em' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="resume-contact" style={{ display: 'flex', flexWrap: 'wrap', gap: '8pt', fontSize: '10pt' }}>
          {personalInfo.email && <span style={{ fontWeight: 300 }}>{personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontWeight: 300 }}>{personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontWeight: 300 }}>{personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <span style={{ fontWeight: 300, fontStyle: 'italic' }}>
              LinkedIn: {personalInfo.linkedin.replace(/^https?:\/\//, '').replace(/^www\./, '')}
            </span>
          )}
          {personalInfo.github && (
            <span style={{ fontWeight: 300, fontStyle: 'italic' }}>
              GitHub: {personalInfo.github.replace(/^https?:\/\//, '').replace(/^www\./, '')}
            </span>
          )}
          {personalInfo.portfolio && (
            <span style={{ fontWeight: 300, fontStyle: 'italic' }}>
              {personalInfo.portfolio.replace(/^https?:\/\//, '').replace(/^www\./, '')}
            </span>
          )}
        </div>
      </header>

      {/* Experience First */}
      {experience.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading" style={{ fontSize: '13pt', fontWeight: 400, letterSpacing: '0.1em', borderBottom: '2pt solid #666', paddingBottom: '4pt' }}>
            Professional Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '10pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4pt', flexWrap: 'wrap', gap: '4pt' }}>
                <div style={{ flex: '1', minWidth: '60%' }}>
                  <h3 style={{ fontSize: '12pt', fontWeight: 600, letterSpacing: '0.03em', marginBottom: '2pt' }}>
                    {exp.position || 'Position Title'}
                  </h3>
                  <p style={{ fontSize: '11pt', marginTop: '2pt', fontStyle: 'italic' }}>
                    {exp.company || 'Company Name'}
                    {exp.location && `, ${exp.location}`}
                  </p>
                </div>
                <p style={{ fontSize: '10pt', whiteSpace: 'nowrap', fontStyle: 'italic' }}>
                  {exp.startDate || 'Start'} - {exp.current ? 'Present' : (exp.endDate || 'End')}
                </p>
              </div>
              {exp.description.length > 0 && (
                <ul style={{ marginLeft: '10mm', paddingLeft: 0, listStyle: 'disc outside' }}>
                  {exp.description.map((desc, idx) => (
                    desc.trim() && (
                      <li key={idx} style={{ fontSize: '10pt', lineHeight: '1.5', marginBottom: '3pt' }}>{desc}</li>
                    )
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading" style={{ fontSize: '13pt', fontWeight: 400, letterSpacing: '0.1em', borderBottom: '2pt solid #666', paddingBottom: '4pt' }}>
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3pt', flexWrap: 'wrap', gap: '4pt' }}>
                <div style={{ flex: '1', minWidth: '60%' }}>
                  <h3 style={{ fontSize: '11pt', fontWeight: 600, letterSpacing: '0.03em', marginBottom: '2pt' }}>
                    {edu.degree || 'Degree'} {edu.field ? `in ${edu.field}` : ''}
                  </h3>
                  <p style={{ fontSize: '10pt', marginTop: '2pt', fontStyle: 'italic' }}>{edu.school || 'Institution Name'}</p>
                </div>
                <div style={{ textAlign: 'right', fontSize: '10pt', whiteSpace: 'nowrap', fontStyle: 'italic' }}>
                  <p>{edu.startDate || 'Start'} - {edu.endDate || 'End'}</p>
                  {edu.gpa && <p style={{ marginTop: '2pt' }}>GPA: {edu.gpa}</p>}
                </div>
              </div>
              {edu.description && (
                <p style={{ fontSize: '10pt', marginTop: '4pt', lineHeight: '1.5', fontStyle: 'italic' }}>{edu.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading" style={{ fontSize: '13pt', fontWeight: 400, letterSpacing: '0.1em', borderBottom: '2pt solid #666', paddingBottom: '4pt' }}>
            Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} style={{ marginBottom: '8pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4pt', flexWrap: 'wrap', gap: '4pt' }}>
                <h3 style={{ fontSize: '11pt', fontWeight: 600, letterSpacing: '0.03em' }}>
                  {project.name || 'Project Name'}
                </h3>
                <div style={{ display: 'flex', gap: '8pt', fontSize: '10pt', fontStyle: 'italic' }}>
                  {project.github && (
                    <span>GitHub: {project.github.replace(/^https?:\/\//, '').replace(/^www\./, '')}</span>
                  )}
                  {project.link && (
                    <span>Live: {project.link.replace(/^https?:\/\//, '').replace(/^www\./, '')}</span>
                  )}
                </div>
              </div>
              <p style={{ fontSize: '10pt', marginBottom: '4pt', lineHeight: '1.5', fontStyle: 'italic' }}>
                {project.description || 'Project description'}
              </p>
              {project.technologies.length > 0 && (
                <p style={{ fontSize: '9pt', marginTop: '4pt', fontStyle: 'italic' }}>
                  <span style={{ fontWeight: 600, fontStyle: 'normal' }}>Technologies: </span>
                  {project.technologies.join(', ')}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading" style={{ fontSize: '13pt', fontWeight: 400, letterSpacing: '0.1em', borderBottom: '2pt solid #666', paddingBottom: '4pt' }}>
            Skills
          </h2>
          <div style={{ fontSize: '10pt', lineHeight: '1.5' }}>
            {skills.map((skill, index) => (
              <span key={skill.id}>
                {skill.name}
                {index < skills.length - 1 && ', '}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading" style={{ fontSize: '13pt', fontWeight: 400, letterSpacing: '0.1em', borderBottom: '2pt solid #666', paddingBottom: '4pt' }}>
            Achievements
          </h2>
          {achievements.map((achievement) => (
            <div key={achievement.id} style={{ marginBottom: '8pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '4pt' }}>
                <div style={{ flex: '1' }}>
                  <h3 style={{ fontSize: '11pt', fontWeight: 600, letterSpacing: '0.03em' }}>
                    {achievement.title || 'Achievement Title'}
                  </h3>
                  {achievement.description && (
                    <p style={{ fontSize: '10pt', marginTop: '3pt', lineHeight: '1.5', fontStyle: 'italic' }}>
                      {achievement.description}
                    </p>
                  )}
                </div>
                {achievement.date && (
                  <p style={{ fontSize: '10pt', whiteSpace: 'nowrap', fontStyle: 'italic' }}>{achievement.date}</p>
                )}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
