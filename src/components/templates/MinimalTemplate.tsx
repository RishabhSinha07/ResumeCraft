import type { ResumeData } from '../../types/resume'

interface MinimalTemplateProps {
  data: ResumeData
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personalInfo, education, experience, projects, skills, achievements } = data

  return (
    <div className="resume-container">
      {/* Minimal Header */}
      <header className="resume-header" style={{ marginBottom: '12pt', paddingBottom: '6pt', borderBottom: '1pt solid #000' }}>
        <h1 className="resume-header-name">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="resume-contact" style={{ display: 'flex', flexWrap: 'wrap', gap: '6pt' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <span>• LinkedIn: {personalInfo.linkedin.replace(/^https?:\/\//, '').replace(/^www\./, '')}</span>
          )}
          {personalInfo.github && (
            <span>• GitHub: {personalInfo.github.replace(/^https?:\/\//, '').replace(/^www\./, '')}</span>
          )}
          {personalInfo.portfolio && (
            <span>• {personalInfo.portfolio.replace(/^https?:\/\//, '').replace(/^www\./, '')}</span>
          )}
        </div>
      </header>

      {/* Education */}
      {education.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3pt', flexWrap: 'wrap', gap: '4pt' }}>
                <div style={{ flex: '1', minWidth: '60%' }}>
                  <h3 style={{ fontSize: '11pt', fontWeight: 500, marginBottom: '2pt' }}>
                    {edu.degree || 'Degree'} {edu.field ? `in ${edu.field}` : ''}
                  </h3>
                  <p style={{ fontSize: '10pt', marginTop: '2pt' }}>{edu.school || 'Institution Name'}</p>
                </div>
                <div style={{ textAlign: 'right', fontSize: '10pt', whiteSpace: 'nowrap' }}>
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

      {/* Experience */}
      {experience.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '8pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4pt', flexWrap: 'wrap', gap: '4pt' }}>
                <div style={{ flex: '1', minWidth: '60%' }}>
                  <h3 style={{ fontSize: '11pt', fontWeight: 500, marginBottom: '2pt' }}>
                    {exp.position || 'Position Title'}
                  </h3>
                  <p style={{ fontSize: '10pt', marginTop: '2pt' }}>
                    {exp.company || 'Company Name'}
                    {exp.location && `, ${exp.location}`}
                  </p>
                </div>
                <p style={{ fontSize: '10pt', whiteSpace: 'nowrap' }}>
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
          <h2 className="section-heading">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} style={{ marginBottom: '8pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4pt', flexWrap: 'wrap', gap: '4pt' }}>
                <h3 style={{ fontSize: '11pt', fontWeight: 500 }}>
                  {project.name || 'Project Name'}
                </h3>
                <div style={{ display: 'flex', gap: '4pt', fontSize: '9pt' }}>
                  {project.github && (
                    <span>GitHub: {project.github.replace(/^https?:\/\//, '').replace(/^www\./, '')}</span>
                  )}
                  {project.link && (
                    <span>Live: {project.link.replace(/^https?:\/\//, '').replace(/^www\./, '')}</span>
                  )}
                </div>
              </div>
              <p style={{ fontSize: '10pt', marginBottom: '4pt', lineHeight: '1.5' }}>
                {project.description || 'Project description'}
              </p>
              {project.technologies.length > 0 && (
                <p style={{ fontSize: '9pt', marginTop: '3pt' }}>
                  Technologies: {project.technologies.join(', ')}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Skills</h2>
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
          <h2 className="section-heading">Achievements</h2>
          {achievements.map((achievement) => (
            <div key={achievement.id} style={{ marginBottom: '6pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '4pt' }}>
                <div style={{ flex: '1' }}>
                  <h3 style={{ fontSize: '11pt', fontWeight: 500 }}>
                    {achievement.title || 'Achievement Title'}
                  </h3>
                  {achievement.description && (
                    <p style={{ fontSize: '10pt', marginTop: '3pt', lineHeight: '1.5' }}>
                      {achievement.description}
                    </p>
                  )}
                </div>
                {achievement.date && (
                  <p style={{ fontSize: '10pt', whiteSpace: 'nowrap' }}>{achievement.date}</p>
                )}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
