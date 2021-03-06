import React from 'react'
import { Link } from 'react-router-dom';
 const ProfileActions  = () => {
    return (
        <div>
              <div class="btn-group mb-4" role="group">
            <Link to="/edit-profile" class="btn btn-light">
              <i class="fas fa-user-circle text-info mr-1"></i> Edit Profile</Link>
            <Link to="/add-experience" class="btn btn-light">
              <i class="fab fa-black-tie text-info mr-1"></i>
              Add Experience</Link>
            <Link to="/add-education" class="btn btn-light">
              <i class="fas fa-graduation-cap text-info mr-1"></i>
              Add Education</Link>
          </div>
        </div>
    )
}
export default ProfileActions;