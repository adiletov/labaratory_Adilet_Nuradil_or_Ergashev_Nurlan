import React, {Component} from 'react';
import PostForm from "../../components/PostForm/PostForm";
import {addPost} from "../../store/actions/postsActions";
import {connect} from "react-redux";

class NewPost extends Component {

    render() {
        return <PostForm
            addPost={this.props.addPost}
            error={this.props.error}
        />
    }
}

const mapStateToProps = state => ({
    error: state.posts.error
});

const mapDispatchToProps = dispatch => ({
    addPost: postData => dispatch(addPost(postData))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
