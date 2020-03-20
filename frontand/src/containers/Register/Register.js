import React, {Component, Fragment} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import {registerUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";

class Register extends Component {
    state = {
        username: '',
        login: '',
        password: '',
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitFormHandler = event => {
        event.preventDefault();
        this.props.registerUser({...this.state});
    };

    getFieldHasError = fieldName => {
        return (
            this.props.error &&
            this.props.error.errors &&
            this.props.error.errors[fieldName] &&
            this.props.error.errors[fieldName].message
        );
    };


    render() {
        return (
            <Fragment>
                <h2 className="text-center mb-3">Register new user</h2>
                {this.props.error && this.props.error.global && (
                    <div className="alert alert-danger mb-2">
                        {this.props.error.global}
                    </div>
                )}

                <form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName="username"
                        title="Username"
                        type="text"
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldHasError('username')}
                        placeholder="Enter your username"
                    />

                    <FormElement
                        propertyName="login"
                        title="Login"
                        type="text"
                        value={this.state.login}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldHasError('login')}
                        placeholder="Enter new login"
                    />

                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldHasError('password')}
                        placeholder="Enter new password"
                    />

                    <div className="row">
                        <div className="form-group mt-2 col-12">
                            <button type="submit" className="btn btn-info">Register</button>
                        </div>
                    </div>
                </form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.registerError
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
