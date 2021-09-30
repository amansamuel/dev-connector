import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile()
    }

    onDeleteClick(e) {
        this.props.deleteAccount();
    }


    render() {

        const {user } =this.props.auth;
        const {profile,loading} =this.props.profile;
    
        let dashboardContent;

        if(profile === null || loading ) {
            dashboardContent = <Spinner />
        } else {
        
            if(!profile || !profile.noprofile) {
                dashboardContent =(
                    <div>
                        <p className="lead text-muted"> Welcome <Link to={`/profile/${profile.profile}`}>{user.name}</Link></p>
                        <ProfileActions />
                        <Experience experience={profile.profile.experience}/>
                        
                        <Education education={profile.profile.education}/>
                        <div  style={{marginBottom:'60px'}}>
                            <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
                        </div>
                        
                    </div>
                  
                )
                
            } 
            else {
                dashboardContent =(
                    <div>
                          
                        <p className="lead text-muted"> Welcome {user.name}</p>
                       
                    
                        <p className="lead">you have not yet create profile, please more info</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info" >Create Profile</Link>
                    </div>
                )
            }
        }
        

        return (
            <div className="dashboard">
                <div className="container">
                    
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4"> Dashboard
                            {dashboardContent}
                        
                            </h1>
                        </div>
                    </div>

                </div>
                
            </div>
        )
    }
}
Dashboard.propTypes={

    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    deleteAccount:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}
const mapStateToProps =state =>({
    profile:state.profile,
    auth:state.auth
})
export default  connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);