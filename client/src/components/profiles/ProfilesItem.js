import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
class ProfilesItem extends Component {

   
    render() {
        const {profile} =this.props;
        return (
            <div className="card card-body bg-light mb-3">
                {console.log(this.props)}
                <div className="row">
                    <div className="col-2">
                        <img src={profile.user.avatar} alt={profile.user.name} className="rounded-circle"  />
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3>{profile.user.name}</h3>
                        <p>
                            {profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}
                        </p>
                        <p>
                            {isEmpty(profile.location) ? null :(<span>{profile.location}</span>)}
                        </p>
                        <Link to={`/profile/${profile.handle}`}  className="btn btn-info">
                            View Profile
                        </Link>
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                        <h4>Skill set</h4>
                        <u className="list-group">
                            {profile.skills.slice(0,4).map((skills, index) => (
                                <li key={index} className="list-group-item">
                                    <i className="fa fa-check pr-1" />
                                    {skills}
                                </li>
                            ))}
                        </u>
                    </div>
                </div>
                
            </div>
        )
    }
}

ProfilesItem.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfilesItem;