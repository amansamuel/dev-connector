import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaGroup from '../common/TextAreaGroup';
import PropTypes from 'prop-types';
import {addExperience} from '../../actions/profileActions'
 class AddExperience extends Component {

    constructor(props){
        super(props);
        this.state={
            company:'',
            title:'',
            location:'',
            from:'',
            to:'',
            current:false,
            description:'',
            errors:{},
            disabled:false

        }
        this.onChange =this.onChange.bind(this);
        this.onSubmit =this.onSubmit.bind(this);
        this.onCheck =this.onCheck.bind(this);
        

    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors:nextProps.errors})
        }
    }
    onSubmit(e){
        e.preventDefault();
        const expData ={
            company:this.state.company,
            title:this.state.title,
            from:this.state.from,
            to:this.state.to,
            current:this.state.current,
            location:this.state.location,
            description:this.state.description
        }
        this.props.addExperience(expData, this.props.history)
    }
    onChange(e) {
     this.setState({[e.target.name] :e.target.value})   
    }
    onCheck(e)  {
        this.setState({
            disabled:!this.state.disabled,
            current:!this.state.current
        })
    }
    render() {
        const {errors} =this.state;
        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">GOback</Link>
                            <h1 className="display-4 text-center">Add Experience</h1>
                            <p className="lead text-center">Add any Job or position that have had in the past or current</p>
                            <small className="d-block pb-3">* =required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                placeholder="* company"
                                name="company"
                                type="text"
                                value={this.state.company}
                                onChange={this.onChange}
                                errors={errors.company}
                                />
                                 <TextFieldGroup
                                placeholder="Job Title"
                                name="title"
                                type="text"
                                value={this.state.title}
                                onChange={this.onChange}
                                errors={errors.title}
                                />
                                 <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                type="text"
                                value={this.state.location}
                                onChange={this.onChange}
                                errors={errors.location}
                                />
                                <h6>From date</h6>
                                <TextFieldGroup
                                placeholder="From"
                                name="from"
                                type="date"
                                value={this.state.from}
                                onChange={this.onChange}
                                errors={errors.from}
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                placeholder="To"
                                name="to"
                                type="date"
                                value={this.state.to}
                                onChange={this.onChange}
                                errors={errors.to}
                                disabled={this.state.disabled ? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input  
                                    type="checkbox"
                                    className="form-check-input"
                                    name="current"
                                    value={this.state.current}
                                    checked={this.state.current}
                                    onChange={this.onCheck}
                                    id="current"
                                    
                                    />
                                    <label htmlFor="current" className="form-check-label">Current Job</label>
                                </div>
                                <TextAreaGroup
                                placeholder="Job description "
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}
                                errors={errors.description}
                                info="Tell us About your Position"
                                />
                                <input type="submit" value="Submit" 
                                className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
AddExperience.propTypes ={
    addExperience:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=state => ({
    profile:state.profile,
    errors:state.errors

});


export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience));