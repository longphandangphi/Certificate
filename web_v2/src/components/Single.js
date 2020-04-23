import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deletePost } from '../actions/postActions'

class Single extends Component {
   handleClick = () => {
       this.props.deletePost(this.props.post.id);
       this.props.history.push('/');
   }
    render() {
        console.log(this.props);
        const post = this.props.post 
            ? (
                <div>
                    <h3>#{this.props.post.id}: {this.props.post.title}</h3>
                    <p>{this.props.post.body}</p>
                    <div className="center">
                        <button className="btn grey" onClick={this.handleClick}>
                            Delete Post
                        </button>
                    </div>
                </div>
            ) 
            : (
                <h5 className="center">Loading page...</h5>
            );
        return (
            <div className="container">
                {post}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.single_id;
    return {
        post: state.posts.find( post => post.id === parseInt(id))
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (id) => { dispatch(deletePost(id)) }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Single)