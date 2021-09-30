import React, { Component } from 'react'
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import TextAreaGroup from '../common/TextAreaGroup';
import { addPost } from '../../actions/postAction';
class PostForm extends Component {
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
       
        const newPost ={
            text:this.state.text,
            name:user.name,
            avatar:user.avatar
        }
        console.log(newPost);
        this.props.addPost(newPost);
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
                            Say Something...
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <TextAreaGroup 
                                    name="text"
                                    value={this.state.text}
                                    placeholder="Create a Post"
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
addPost.propTypes={
    addPost:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}

const mapStateToProps =(state) =>({
auth:state.auth,
errors:state.errors

})

export default connect(mapStateToProps, {addPost})(PostForm);