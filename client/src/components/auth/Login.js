import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';
 class Login extends Component {


    constructor() {
        super();
        this.state={
            email:'',
            password:'',
            errors:{}
        }
        this.onChange =this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount() {
      if(this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
      }
    }

    componentWillReceiveProps(nextProps) {

      if(nextProps.auth.isAuthenticated) {
        this.props.history.push('/dashboard')
      }

      if(nextProps.errors.errors) {
        this.setState({errors:nextProps.errors.errors})
      }
    }
    onChange(event) {
        this.setState({[event.target.name] :event.target.value})
    } 
   
  
    onSubmit(event) {

        event.preventDefault();
        const user={
            email:this.state.email,
            password:this.state.password
        }
        this.props.loginUser(user)
    }

    render() {

      const {errors} =this.state;

        return (
            <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Log In</h1>
          <p className="lead text-center">Sign in to your DevConnector account</p>
          <form onSubmit={this.onSubmit}>
  
            <TextFieldGroup 
            type="email"
            name="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.onChange} 
            errors={errors.email}
            />
     
             <TextFieldGroup 
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange} 
            errors={errors.password}
            />
           
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
        )
    }
}

Login.propTypes ={
  loginUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}


const mapStateToprops =(state) => ({
  auth:state.auth,
  errors:state.errors
})

export default connect(mapStateToprops, {loginUser})(Login);