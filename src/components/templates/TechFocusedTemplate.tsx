import type { ResumeData } from '../../types/resume'

interface TechFocusedTemplateProps {
  data: ResumeData
}

export function TechFocusedTemplate({ data }: TechFocusedTemplateProps) {
  const { personalInfo, education, experience, projects, skills, achievements } = data

  return (
    <div className="resume-container">
      {/* Tech-Focused Header */}
      <header className="resume-header" style={{ marginBottom: '12pt', paddingBottom: '6pt', borderBottom: '2pt solid #3b82f6' }}>
        <h1 className="resume-header-name" style={{ fontSize: '26pt', fontWeight: 700 }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="resume-contact" style={{ display: 'flex', flexWrap: 'wrap', gap: '6pt', fontSize: '9pt' }}>
          {personalInfo.email && <span style={{ fontWeight: 600 }}>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <span style={{ color: '#3b82f6' }}>linkedin.com/{personalInfo.linkedin.split('/').pop()}</span>
          )}
          {personalInfo.github && (
            <span style={{ color: '#3b82f6' }}>github.com/{personalInfo.github.split('/').pop()}</span>
          )}
          {personalInfo.portfolio && (
            <span style={{ color: '#3b82f6' }}>{personalInfo.portfolio.replace(/^https?:\/\//, '').replace(/^www\./, '')}</span>
          )}
        </div>
      </header>

      {/* Skills First */}
      {skills.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading" style={{ color: '#3b82f6', borderBottomColor: '#3b82f6' }}>
            Technical Skills
          </h2>
          <div style={{ fontSize: '10pt', lineHeight: '1.5' }}>
            {skills.map((skill, index) => (
              <span key={skill.id}>
                <span style={{ fontWeight: 600 }}>{skill.name}</span>
                {index < skills.length - 1 && ' • '}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading" style={{ color: '#3b82f6', borderBottomColor: '#3b82f6' }}>
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '8pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4pt', flexWrap: 'wrap', gap: '4pt' }}>
                <div style={{ flex: '1', minWidth: '60%' }}>
                  <h3 style={{ fontSize: '11pt', fontWeight: 700, marginBottom: '2pt' }}>
                    {exp.position || 'Position Title'}
                  </h3>
                  <p style={{ fontSize: '10pt', marginTop: '2pt' }}>
                    {exp.company || 'Company Name'}
                    {exp.location && ` | ${exp.location}`}
                  </p>
                </div>
                <p style={{ fontSize: '10pt', whiteSpace: 'nowrap', fontWeight: 700, color: '#3b82f6' }}>
                  {exp.startDate || 'Start'} - {exp.current ? 'Present' : (exp.endDate || 'End')}
                </p>
              </div>
              {exp.description.length > 0 && (
                <ul style={{ marginLeft: '8mm', paddingLeft: 0, listStyle: 'disc outside' }}>
                  {exp.description.map((desc, idx) => (
                    desc.trim() && (
                      <li key={idx} style={{ fontSize: '10pt', lineHeight: '1.5', marginBottom: '2pt' }}>{desc}</li>
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
        <section className="resume-section">
          <h2 className="section-heading" style={{ color: '#3b82f6', borderBottomColor: '#3b82f6' }}>
            Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} style={{ marginBottom: '8pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4pt', flexWrap: 'wrap', gap: '4pt' }}>
                <h3 style={{ fontSize: '11pt', fontWeight: 700 }}>
                  {project.name || 'Project Name'}
                </h3>
                <div style={{ display: 'flex', gap: '6pt', fontSize: '9pt', color: '#3b82f6' }}>
                  {project.github && (
                    <span style={{ fontWeight: 600 }}>github.com/{project.github.split('/').pop()}</span>
                  )}
                  {project.link && (
                    <span style={{ fontWeight: 600 }}>{project.link.replace(/^https?:\/\//, '').replace(/^www\./, '')}</span>
                  )}
                </div>
              </div>
              <p style={{ fontSize: '10pt', marginBottom: '4pt', lineHeight: '1.5' }}>
                {project.description || 'Project description'}
              </p>
              {project.technologies.length > 0 && (
                <p style={{ fontSize: '9pt', marginTop: '3pt' }}>
                  <span style={{ fontWeight: 700 }}>Stack: </span>
                  {project.technologies.join(' • ')}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading" style={{ color: '#3b82f6', borderBottomColor: '#3b82f6' }}>
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3pt', flexWrap: 'wrap', gap: '4pt' }}>
                <div style={{ flex: '1', minWidth: '60%' }}>
                  <h3 style={{ fontSize: '11pt', fontWeight: 700, marginBottom: '2pt' }}>
                    {edu.degree || 'Degree'} {edu.field ? `in ${edu.field}` : ''}
                  </h3>
                  <p style={{ fontSize: '10pt', marginTop: '2pt' }}>{edu.school || 'Institution Name'}</p>
                </div>
                <div style={{ textAlign: 'right', fontSize: '10pt', whiteSpace: 'nowrap', fontWeight: 700, color: '#3b82f6' }}>
                  <p>{edu.startDate || 'Start'} - {edu.endDate || 'End'}</p>
                  {edu.gpa && <p style={{ marginTop: '2pt' }}>GPA: {edu.gpa}</p>}
                </div>
              </div>
              {edu.description && (
                <p style={{ fontSize: '10pt', marginTop: '4pt', lineHeight: '1.5' }}>{edu.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading" style={{ color: '#3b82f6', borderBottomColor: '#3b82f6' }}>
            Achievements
          </h2>
          {achievements.map((achievement) => (
            <div key={achievement.id} style={{ marginBottom: '6pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '4pt' }}>
                <div style={{ flex: '1' }}>
                  <h3 style={{ fontSize: '11pt', fontWeight: 700 }}>
                    {achievement.title || 'Achievement Title'}
                  </h3>
                  {achievement.description && (
                    <p style={{ fontSize: '10pt', marginTop: '3pt', lineHeight: '1.5' }}>
                      {achievement.description}
                    </p>
                  )}
                </div>
                {achievement.date && (
                  <p style={{ fontSize: '10pt', whiteSpace: 'nowrap', fontWeight: 700, color: '#3b82f6' }}>{achievement.date}</p>
                )}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
