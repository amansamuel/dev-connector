import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {deleteComment} from './../../actions/postAction'
 class CommentItem extends Component {

  onDeleteClick(postId,commentId) {
    this.props.deleteComment(postId,commentId)

  }
    render() {

        const {commentitem, postId,auth} =this.props;  
        return (
            <div className="comments">
                {console.log(this.props)}
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src="https://www.gravatar.com/avatar/anything?s=200&d=mm" alt="" />
                  </a>
                  <br />
                  <p className="text-center">{commentitem.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{commentitem.text}</p>
                  {commentitem.user ===auth.user.id ? (
                                <button onClick={this.onDeleteClick.bind(this,postId,commentitem._id)} type="button" className="btn btn-danger mr-1">
                                <i className="fas fa-times" />
                            </button>
                            ) :null}
                </div>
              </div>
            </div>

          </div>
        )
    }
}

CommentItem.propTypes ={
    deleteComment:PropTypes.func.isRequired,
    comment:PropTypes.object.isRequired,
    postId:PropTypes.string.isRequired,
    auth:PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
    auth:state.auth,
    comment:state.commentitem
})

export default connect(mapStateToProps, {deleteComment})(CommentItem);