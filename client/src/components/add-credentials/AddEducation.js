import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaGroup from '../common/TextAreaGroup';
import PropTypes from 'prop-types';
import {addEducation} from '../../actions/profileActions'
 class AddEducation extends Component {

    constructor(props){
        super(props);
        this.state={
            school:'',
            degree:'',
            fieldofstudy:'',
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
            school:this.state.school,
            degree:this.state.degree,
            fieldofstudy:this.state.fieldsofstudy,
            from:this.state.from,
            to:this.state.to,
            current:this.state.current,
            description:this.state.description
        }
        this.props.addEducation(expData, this.props.history)
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
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">GOback</Link>
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="lead text-center">Add any School you attended that have had in the past or current</p>
                            <small className="d-block pb-3">* =required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                placeholder="* School"
                                name="school"
                                type="text"
                                value={this.state.school}
                                onChange={this.onChange}
                                errors={errors.school}
                                />
                                 <TextFieldGroup
                                placeholder="Degree"
                                name="degree"
                                type="text"
                                value={this.state.degree}
                                onChange={this.onChange}
                                errors={errors.degree}
                                />
                                 <TextFieldGroup
                                placeholder="Field of Study"
                                name="fieldsofstudy"
                                type="text"
                                value={this.state.fieldsofstudy}
                                onChange={this.onChange}
                                errors={errors.fieldsofstudy}
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
AddEducation.propTypes ={
    addEducation:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=state => ({
    profile:state.profile,
    errors:state.errors

});


export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));