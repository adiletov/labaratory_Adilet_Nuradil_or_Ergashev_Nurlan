import React, {Component, Fragment} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import {connect} from "react-redux";
import {loginUser} from "../../store/actions/usersActions";

class Login extends Component {
    state = {
        login: '',
        password: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitFormHandler = event => {
        event.preventDefault();
        this.props.loginUser({...this.state})
    };

    render() {
        return (
            <Fragment>
                <h2 className="text-center mb-3">Login</h2>
                {this.props.error && (
                        <div className="alert alert-danger">
                            {this.props.error.message || this.props.error.global}
                        </div>
                )}
                <form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName="login"
                        title="Username"
                        type="text"
                        value={this.state.login}
                        onChange={this.inputChangeHandler}
                        placeholder="Enter your login"
                    />

                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        placeholder="Enter your password"
                    />

                    <div className="row">
                        <div className="form-group mt-2 col-12">
                            <button type="submit" className="btn btn-info">Login</button>
                        </div>
                    </div>
                </form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
    loginUser: userData => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
