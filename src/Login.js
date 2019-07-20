import React, { Component } from 'react';
import UserService from './UserService';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    componentWillMount() {
        document.getElementById('body').className = 'hold-transition login-page'
    }
    componentWillUnmount() {
        document.getElementById('body').className = 'hold-transition skin-black sidebar-mini'
    }

    handleLogin(event) {
        event.preventDefault();

        console.log("TRying to sign in with user: " + this.state.username + ", pass: " + this.state.password);
        UserService.login(this.state.username, this.state.password).then((data) => {
            console.log("Hurray, you are logged in!");
            NotificationManager.success('Login successful!');
            this.props.history.push("/home/");
        }).catch((e) => {
            console.error("An error was returned while logging in: " + e);
            NotificationManager.error('Login failed!');
            this.setState({
                error: e
            });
        });
    }

    socialLogin = function(id){
        NotificationManager.info('Social login not available');
    }

    handleFormChange(event) {
        console.log(event.target);
        if (event.target && event.target.id && event.target.value) {
            switch (event.target.id) {
                case "email":
                    this.setState({
                        username: event.target.value
                    });
                    break;
                case "password":
                    this.setState({
                        password: event.target.value
                    });
                    break;
                default:
            }
        }
        console.log(this.state);
    }

    render() {
        return (

            <div className="login-box">
                
                <script src="../../plugins/iCheck/icheck.min.js"></script>

                <div className="login-logo">
                    <a href="./login"><b>Slick</b></a>
                </div>
                {/* /.login-logo */}
                <div className="login-box-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                    <form  onSubmit={this.handleLogin}>
                        <div className="form-group has-feedback">
                            <input id="email" type="email" className="form-control" placeholder="Email" onChange={this.handleFormChange} required={true} />
                            <span className="glyphicon glyphicon-envelope form-control-feedback" />
                        </div>
                        <div className="form-group has-feedback">
                            <input id="password" type="password" className="form-control" placeholder="Password" onChange={this.handleFormChange} required={true} />
                            <span className="glyphicon glyphicon-lock form-control-feedback" />
                        </div>
                        <div className="row">
                            <div className="col-xs-8">
                                <div className="checkbox icheck">
                                    <label>
                                        <input type="checkbox" /> Remember Me
                                    </label>
                                </div>
                            </div>
                            {/* /.col */}
                            <div className="col-xs-4">
                                <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                            </div>
                            {/* /.col */}
                        </div>
                    </form>
                    <div className="social-auth-links text-center">
                        <p>- OR -</p>
                        <a onClick={this.socialLogin.bind(this,1)}  className="btn btn-block btn-social btn-facebook btn-flat"><i className="fa fa-facebook" /> Sign in using
          Facebook</a>
                        <a onClick={this.socialLogin.bind(this,2)} className="btn btn-block btn-social btn-google btn-flat"><i className="fa fa-google-plus" /> Sign in using
          Google+</a>
                    </div>
                    {/* /.social-auth-links */}
                    {/* <a href="fake_url">I forgot my password</a><br /> */}
                    <a href="register" className="text-center">Register a new membership</a>
                </div>
                {/* /.login-box-body */}
                <NotificationContainer/>
            </div>


        );
    }
}