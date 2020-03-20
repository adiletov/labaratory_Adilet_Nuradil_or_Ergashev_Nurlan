import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {fetchPost} from "../../store/actions/postsActions";
import PostItem from "../../components/PostItem/PostItem";
import Comment from "../../components/Comment/Comment";
import {addComment, fetchComments} from "../../store/actions/commentsActions";
import CommentForm from "../../components/CommentForm/CommentForm";

class Post extends Component {

    async componentDidMount() {
        await this.props.fetchPost(this.props.match.params.id);
        this.props.fetchComments(this.props.match.params.id);
    }

    render() {
        const post = this.props.post;
        const published_at = new Date(post.published_at).toLocaleString('ru-Ru');
        const user = post.user && post.user.username;

        return (
            <Fragment>
                <PostItem
                    title={post.title}
                    image={post.image}
                    description={post.description}
                    user={user}
                    published_at={published_at}
                />

                <div className="comments mb-4">
                    <h4>Comments:</h4>
                    {this.props.comments.map(comment => (
                        <Comment
                            key={comment._id}
                            user={comment.user.fullName}
                            text={comment.text}
                        />
                    ))}
                </div>

                {this.props.user
                    ? <CommentForm
                        postId={this.props.match.params.id}
                        addComment={this.props.addComment}
                        fetchComments={this.props.fetchComments}
                        error={this.props.commentError}
                    />
                    : null
                }

            </Fragment>
        )
    }
}

const mapSateToProps = state => ({
    post: state.posts.post,
    postError: state.posts.error,
    loadingPost: state.posts.loading,

    comments: state.comments.comments,
    commentError: state.comments.error,
    loadingComments: state.comments.loading,

    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    fetchPost: postId => dispatch(fetchPost(postId)),
    fetchComments: postId => dispatch(fetchComments(postId)),
    addComment: commentData => dispatch(addComment(commentData))
});

export default connect(mapSateToProps, mapDispatchToProps)(Post);
