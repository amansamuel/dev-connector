import React, { Component } from 'react'
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';
import classnames from 'classnames'
import {deletePost,likePost,removeLike} from '../../actions/postAction'
 class PostItem extends Component {

    onDeleteClick(id) {
        this.props.deletePost(id);
    }
    likePost(id) {
        this.props.likePost(id);
    }
    unlikePost(id) {
       this.props.removeLike(id)
    }
    findUserLike(likes) {
         const {auth} =this.props;
        
         if(likes.filter(like =>like.user === auth.user.id).length > 0) {
             return true
         } else {
             return false;
         }
    }
    render() {
        const {post,auth,showActions} =this.props;

        
        return (
            <div className="posts">
                    
                        <div className="card card-body mb-3">
                        <div className="row">
                            <div className="col-md-2">
                            <a href="profile.html">
                                <img className="rounded-circle d-none d-md-block" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                alt="" />
                            </a>
                            <br />
                            <p className="text-center">{post.name}</p>
                            </div>
                            <div className="col-md-10">
                            <p className="lead">{post.text}</p>
                            {showActions ? (
                                <span>
                                    <button type="button" onClick={this.likePost.bind(this, post._id)} className="btn btn-light mr-1">
                                <i className={
                                    classnames('fas fa-thumbs-up',
                                    {'text-info':this.findUserLike(post.likes)})}>
                                 </i>
                                <span className="badge badge-light">{post.likes.length}</span>
                                
                            </button>
                            <button type="button" onClick={this.unlikePost.bind(this, post._id)} className="btn btn-light mr-1">
                                <i className="text-secondary fas fa-thumbs-down"></i>
                            </button>
                            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                                Comments
                            </Link>
                            {post.user ===auth.user.id ? (
                                <button onClick={this.onDeleteClick.bind(this,post._id)} type="button" className="btn btn-danger mr-1">
                                <i className="fas fa-times" />
                            </button>
                            ) :null}
                                </span>
                            ) : null}
                             
                            </div>
                        </div>
                        </div>

                    </div> 
        )
    }
}
PostItem.propTypes={
    deletePost:PropTypes.func.isRequired,
    likePost:PropTypes.func.isRequired,
    removeLike:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
}
PostItem.defaultProps ={
    showActions:true
}
const mapStateToProps =(state) =>({
    auth:state.auth,
})

export default connect(mapStateToProps, {deletePost,likePost,removeLike})(PostItem);
