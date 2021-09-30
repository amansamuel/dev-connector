import React, { Component } from 'react'
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import TextAreaGroup from '../common/TextAreaGroup';
import { addcomment } from '../../actions/postAction';
class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state={
            text:'',
            errors:{}
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const {user} = this.props.auth;
        const {postId} =this.props;
       
        const newComment ={
            text:this.state.text,
            name:user.name,
            avatar:user.avatar
        }
       
        this.props.addcomment(postId,newComment);
        // console.log(this.props.addcomment(postId,newComment))
        this.setState({text : ' '});
       
    }
    onChange(e) {
       
         this.setState({[e.target.name] : e.target.value})
         
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors:nextProps.errors});
            
        }
    }

    render() {
       const {errors} = this.state;
        return (
            <div className="feed">
                <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <div className="post-form mb-3">
                        <div className="card card-info">
                        <div className="card-header bg-info text-white">
                            Make Comment...
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <TextAreaGroup 
                                    name="text"
                                    value={this.state.text}
                                    placeholder="Create a comment"
                                    onChange={this.onChange}
                                    errors={errors.text}
                                    />
                                </div>
                                <button type="submit" className="btn btn-dark">Submit</button>
                            </form>
                        </div>
                        </div>
                    </div>
                   
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
AddComment.propTypes={
    addcomment:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    postId:PropTypes.string.isRequired,
    errors:PropTypes.object.isRequired
}

const mapStateToProps =(state) =>({
auth:state.auth,
errors:state.errors

})

export default connect(mapStateToProps, {addcomment})(AddComment);