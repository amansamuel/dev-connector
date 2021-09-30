import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';
// import ProfileHandle from './ProfileHandle';
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom';
import {getProfileByHandle} from '../../actions/profileActions';
import ProfileCreds from './ProfileCreds';

 class Profile extends Component {

    componentDidMount() {
         if(this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle)
         }
    }
    render() {

const {profile, loading} =this.props.profile;
let profileContent;
if(profile===null || loading) {
    profileContent=<Spinner />
} else {
    profileContent=(
        <div>
            <div className="row">
                <div className="col-md-6">
                    <Link to="/profiles" className="btn btn-light mb-3 float-left">GO Back</Link>


                </div>
                <div className="col-md-6" />
            </div>
            <ProfileHeader profile={profile} />
              <ProfileAbout profile={profile}/> 
              <ProfileCreds  experience={profile.experience} education={profile.education}/>
              <ProfileGithub /> 
        </div>
    )
}
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                          {profileContent}
                        </div>
                    </div>
                </div>
             
            </div>
        )
    }
}

Profile.propTypes ={
    getProfileByHandle:PropTypes.func.isRequired, 
    profile:PropTypes.object.isRequired
}

const mapStateToProps =state =>({
profile: state.profile
})

export default connect(mapStateToProps,{getProfileByHandle})(Profile);