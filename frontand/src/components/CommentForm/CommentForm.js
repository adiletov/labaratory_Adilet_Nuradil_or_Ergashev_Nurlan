import React, {Component} from 'react';
import FormElement from "../UI/Form/FormElement";

class CommentForm extends Component {
    state = {
        text: '',
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    getFieldHasError = fieldName => {
        return (
            this.props.error &&
            this.props.error.errors &&
            this.props.error.errors[fieldName] &&
            this.props.error.errors[fieldName].message
        );
    };

    submitFormHandler = async event => {
        event.preventDefault();

        await this.props.addComment({
            ...this.state,
            post: this.props.postId
        });

        await this.setState({text: ''});

        this.props.fetchComments(this.props.postId);
    };

    render() {
        return (
            <form onSubmit={this.submitFormHandler}>
                <FormElement
                    propertyName="text"
                    title="Add new comment:"
                    type="text"
                    value={this.state.text}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldHasError('text')}
                    placeholder="Enter comment"
                />

                <div className="row">
                    <div className="form-group mt-2 col-12">
                        <button type="submit" className="btn btn-info">Save</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default CommentForm;
