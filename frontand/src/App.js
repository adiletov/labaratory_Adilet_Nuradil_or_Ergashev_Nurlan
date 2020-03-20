import React, {Component, Fragment} from 'react';
import Header from "./components/Header/Header";
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import {logoutUser} from "./store/actions/usersActions";

import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Posts from "./containers/Posts/Posts";
import Post from "./containers/Post/Post";
import NewPost from "./containers/NewPost/NewPost";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header
                    user={this.props.user}
                    logout={this.props.logoutUser}
                />
                <main className="container py-3">
                    <Switch>
                        <Route path="/" exact component={Posts}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/posts/new" exact component={NewPost}/>
                        <Route path="/posts/:id" component={Post}/>
                    </Switch>
                </main>
            </Fragment>
        );
    }

}

const mapStateToProps = state => ({
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
