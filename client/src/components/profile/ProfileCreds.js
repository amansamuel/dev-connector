import React, { Component } from 'react'
// import isEmpty from '../../validation/is-empty';

 class ProfileCreds extends Component {
    render() {
        const {education,experience} =this.props;

        const experiences =experience.map((exp) =>(
         <li key={exp._id} className="list-group-item">
           <h4>{exp.company}</h4>
           <p>{exp.from} - {exp.to == null ? ('Now') : exp.to}</p>
           <p>
              <strong>Position:</strong> {exp.title}
           </p>
           <p>
                    <strong>Description:</strong>{exp.description}</p>
         </li>   
        ))
        const educations =education.map((edu,index) => (
            <li key={edu._id} className="list-group-item">
            <h4>{edu.school}</h4>
            <p>{edu.to} {edu.to ==null ?('Now') :edu.to}</p>
            <p>
              <strong>Degree: </strong>{edu.degree}</p>
            <p>
              <strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
              <p>
                <strong>Description:</strong> {edu.description}
                </p>
          </li>
        ))
        return (
            <div>
                <div className="row">
               <div className="col-md-6">
              <h3 className="text-center text-info">Experience</h3>
              <ul className="list-group">
                {experiences}
                
              </ul>
            </div>
            <div className="col-md-6">
              <h3 className="text-center text-info">Education</h3>
              <ul className="list-group">
               {educations}
              </ul>
            </div>
          </div>
            </div>
        )
    }
}

export default ProfileCreds;
