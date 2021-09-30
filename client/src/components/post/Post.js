import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPost} from '../../actions/postAction'
import Spinner from '../common/Spinner';
import PostItem from './PostItem';
import {Link} from 'react-router-dom';
import AddComment from './AddComment';
import CommentFeed from './CommentFeed';

 class Post extends Component {

    componentDidMount() {
        this.props.getPost(this.props.match.params.id)
    }
    render() {
        const {loading,post} =this.props.post;
        let postContent;
        if(post ===null || loading || Object.keys(post).length === 0) {
            postContent =<Spinner />
        } else {
            postContent=(
                <div>
                    <PostItem post={post} showActions={false}/>
                    <AddComment postId ={post._id}/>
                    
                    <CommentFeed postId={post._id} comments={post.comment}/>
                </div>
            )
        }
        return (
            <div className="post">
                <div className="container">
                    <div className="col-md-12">

                        <Link  to="/feeds" className="btn btn-light"> Back to feed

                        </Link>
                        {postContent}
                    </div>
                   
                </div>
                
            </div>
        )
    }
}
Post.propTypes={
    getPost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired
}
const mapStateToProps=(state) =>({
post:state.post
})

export default connect(mapStateToProps,{getPost})(Post);
