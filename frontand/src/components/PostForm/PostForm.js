import React, {Component, Fragment} from 'react';
import FormElement from "../UI/Form/FormElement";

class PostForm extends Component {
    state = {
        title: '',
        description: '',
        image: null
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    getFieldHasError = fieldName => {
        return (
            this.props.error &&
            this.props.error.errors &&
            this.props.error.errors[fieldName] &&
            this.props.error.errors[fieldName].message
        );
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            if (this.state[key]) {
                formData.append(key, this.state[key]);
            }
        });

        this.props.addPost(formData)
    };


    render() {
        return (
            <Fragment>
                <h2 className="mb-4">Add new post</h2>

                {this.props.error && this.props.error.error && (
                    <div className="alert alert-danger">
                        {this.props.error.error}
                    </div>
                )}

                <form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName="title"
                        title="Post title:"
                        type="text"
                        value={this.state.title}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldHasError('title')}
                        placeholder="Enter post title"
                    />

                    <FormElement
                        propertyName="description"
                        title="Description:"
                        type="textarea"
                        value={this.state.description}
                        onChange={this.inputChangeHandler}
                        placeholder="Enter post description"
                    />

                    <FormElement
                        propertyName="image"
                        title="Post image:"
                        type="file"
                        onChange={this.fileChangeHandler}
                    />

                    <div className="row">
                        <div className="form-group mt-2 col-12">
                            <button type="submit" className="btn btn-info">Save</button>
                        </div>
                    </div>
                </form>
            </Fragment>
        );
    }
}

export default PostForm;
