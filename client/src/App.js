import React ,{Component} from 'react';
import {BrowserRouter,Route, Switch} from'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logOut, setCurrentUser } from './actions/authAction';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './components/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/post/Posts';
import store from './store';
import './App.css';
import { clearCurrentProfile } from './actions/profileActions';
import AddEducation from './components/add-credentials/AddEducation';
import Post from './components/post/Post';

if(localStorage.jwtToken) {

  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken)

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime) {
    store.dispatch(clearCurrentProfile())
    store.dispatch(logOut());
    window.location.href='/login';
  }
}


class App extends Component{
  render() {
    return (
      <Provider store={ store}>
          <BrowserRouter>
              <div className="App">
                <Navbar/>
                  <Route exact path='/' component={Landing} />
                <div className="container">
                   <Route  exact path="/register" component={Register}/>
                   <Route  exact path="/login" component={Login}/>
                   <Route  exact path="/profiles" component={Profiles}/>
                   <Route  exact path="/profile/:handle" component={Profile}/>
                  <Switch>
                    <PrivateRoute  exact path="/dashboard" component={Dashboard}/>
                    
                  </Switch>
                  <Switch>
                    <PrivateRoute  exact path="/feeds" component={Posts}/>
                    
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path ="/create-profile" component={CreateProfile} />
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path ="/post/:id" component={Post} />
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path ="/edit-profile" component={EditProfile} />
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path ="/add-experience" component={AddExperience} />
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path ="/add-education" component={AddEducation} />
                  </Switch>
                   
                </div>
              <Footer />
              </div>
          </BrowserRouter>
      </Provider>
    )
  }
}
export default App;
