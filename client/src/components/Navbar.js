import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import {logOut} from '../actions/authAction';
import { clearCurrentProfile  } from '../actions/profileActions';
class Navbar extends Component {

  onLongOutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logOut();
  }
    render() {
    const {isAuthenticated, user} =this.props.auth;

          const authLinks =(
               <ul className="navbar-nav ml-auto">
                 <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/feeds">Post Feed</Link>
                </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={this.onLongOutClick.bind(this)} href="">
                      <img className="rounded-circle" src={user.avatar} style={{width:"25px",height:"25px",marginRight:'5px'}} alt={user.name}/>
                      Logout
                      </a>
                  </li>
                </ul>
    )
    const guessLinks =(
      <ul className="navbar-nav ml-auto">
         <li className="nav-item">
           <Link className="nav-link" to="/register">Sign Up</Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link" to="/login">Login</Link>
         </li>
       </ul>
)
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
              <Link className="navbar-brand" to="/">DevConnector</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                <span className="navbar-toggler-icon"></span>
              </button>
        
              <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    
                    <Link className="nav-link" to="/profiles">
                    {' '}
                      Developers
                    </Link>
                  </li>
                  
                </ul>
        
                {isAuthenticated ? authLinks :guessLinks}
              </div>
            </div>
          </nav>
        
        )
    }
}

Navbar.PropsTypes ={
  logoutUser:PropsTypes.func.isRequired,
  auth:PropsTypes.object.isRequired
}

const mapStateToProps =(state) => ({
  auth:state.auth
})


export default connect(mapStateToProps,{logOut,clearCurrentProfile})(Navbar);