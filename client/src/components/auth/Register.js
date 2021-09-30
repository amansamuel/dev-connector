import React, { Component } from 'react';
import propsTypes from 'prop-types';
import {connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import {registerUser} from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';
 class Register extends Component {


    constructor() {
        super();
        this.state = {
            name:'',
            email:'',
            password:'',
            password2:'',
            errors:'',
        }
        this.onChange =this.onChange.bind(this);
        this.onSubmit =this.onSubmit.bind(this);
    }
    componentDidMount() {
      if(this.props.auth.isAuthenticated) {
        this.props.history.push('dashboard');
      }
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.errors) {
        this.setState({errors:nextProps.errors.errors})
      }
    }
    onChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }
    onSubmit(e) {
        e.preventDefault();
        const newUser ={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        }
        this.props.registerUser(newUser, this.props.history)
        // axios.post('/api/users/register', newUser)
        //       .then(res =>console.log(res.data))
        //         .catch(err =>this.setState({errors:err.response.data}))
    }
    render() {
      const {errors} =this.state;
      
        return (
         
            <div className="register">
            <div className="container">
              <div className="row">
                
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your DevConnector account</p>
                  <form onSubmit={this.onSubmit}>
                   
                    <TextFieldGroup type="text"
                    errors={errors.name}
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.onChange}

                    />
                    <TextFieldGroup 
                    type="email"
                    errors={errors.email}
                    name="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.onChange}
                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                    />
                   
                    <TextFieldGroup 
                    type="password"
                    errors={errors.password}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    />

                    <TextFieldGroup 
                    type="password"
                    errors={errors.password2}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
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

Register.propsTypes = {
  registerUser:propsTypes.func.isRequired,
  auth:propsTypes.object.isRequired,
  errors:propsTypes.object.isRequired
}

const mapstateToprops =(state) =>({
  auth:state.auth,
  errors:state.errors
})

export default connect(mapstateToprops, {registerUser})(withRouter(Register));