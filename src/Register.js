import React, { Component } from 'react';
import UserService from './UserService';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Register extends Component {

    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    componentWillMount() {
        document.getElementById('body').className = 'hold-transition register-page'
    }
    componentWillUnmount() {
        document.getElementById('body').className = 'hold-transition skin-black sidebar-mini'
    }

    socialLogin = function (id) {
        NotificationManager.info('Social login not available');
    }

    handleRegister(event) {
        event.preventDefault();

        if (this.state.password1 !== this.state.password2) {
            NotificationManager.error('Passwords do not match');
            return;
        }

        console.log("Trying to register user: " + this.state.username + ", pass: " + this.state.password1);
        UserService.register(this.state.username, this.state.password1, this.state.fullname).then((d) => {
            var uid = UserService.getCurrentUser().id
            var data = new FormData()
            data.append('file', this.state.file)

            fetch('http://localhost:3001/items/photo/' + uid, {
                method: 'POST',
                body: data
            }).then((data) => {
                NotificationManager.success("Profile Created!");
            }).catch((error) => {
                NotificationManager.error("Profile failed to create");
            })
            console.log("Hurray, you are registered!");
            this.props.history.push("/home/");
        }).catch((e) => {
            NotificationManager.error('Failed to register');
            console.error("An error was returned while registering: " + e);
            this.setState({
                error: e
            });
        });
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
                case "password1":
                    this.setState({
                        password1: event.target.value
                    });
                    break;
                case "password2":
                    this.setState({
                        password2: event.target.value
                    });
                    break;
                case "filePicker":
                    if (event.target.files && event.target.files[0]) {
                        this.setState({
                            imgSrc: URL.createObjectURL(event.target.files[0]),
                            file: event.target.files[0]
                        });
                    }
                    break;
                case "name":
                    this.setState({
                        fullname: event.target.value
                    });
                    break;
                default:
            }
        }
        console.log(this.state);
    }

    render() {
        return (
            <div className="register-box">
                <div className="register-logo">
                    <a href="./register"><b>Slick</b></a>
                </div>
                <div className="register-box-body">
                    <p className="login-box-msg">Register a new membership</p>
                    <form action="../../index.html" onSubmit={this.handleRegister}>
                        <div className="form-group has-feedback">
                            <input id="name" type="text" className="form-control" placeholder="Full name" required={true} onChange={this.handleFormChange} />
                            <span className="glyphicon glyphicon-user form-control-feedback" />
                        </div>
                        <div className="form-group has-feedback">
                            <input id="email" type="email" className="form-control" placeholder="Email" required={true} onChange={this.handleFormChange} />
                            <span className="glyphicon glyphicon-envelope form-control-feedback" />
                        </div>
                        <div className="form-group has-feedback">
                            <input id="password1" type="password" className="form-control" placeholder="Password" required={true} onChange={this.handleFormChange} />
                            <span className="glyphicon glyphicon-lock form-control-feedback" />
                        </div>
                        <div className="form-group has-feedback">
                            <input id="password2" type="password" className="form-control" placeholder="Retype password" required={true} onChange={this.handleFormChange} />
                            <span className="glyphicon glyphicon-log-in form-control-feedback" />
                        </div>
                        <div class="form-group has-feedback">Profile picture:
                            <input id="filePicker" required type="file" class="form-control-file" accept=".gif,.jpg,.jpeg,.png" onChange={this.handleFormChange} />
                        </div>
                        <div className="form-group has-feedback">
                            <div className="col-xs-8" style={{ paddingLeft: "0" }}>
                                <p className="form-check-label" >
                                    <input id="remember" className="form-check-input" type="checkbox" value="" style={{ verticalAlign: "top" }} required /> I agree to the <a href="fake_url">terms</a>
                                </p>
                            </div>
                            <div className="col-xs-4" style={{ paddingRight: "0" }}>
                                <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
                            </div>
                        </div>
                    </form>
                    <div className="social-auth-links text-center">
                        <p>- OR -</p>
                        <a onClick={this.socialLogin.bind(this, 1)} className="btn btn-block btn-social btn-facebook btn-flat"><i className="fa fa-facebook" /> Sign up using
        Facebook</a>
                        <a onClick={this.socialLogin.bind(this, 2)} className="btn btn-block btn-social btn-google btn-flat"><i className="fa fa-google-plus" /> Sign up using
        Google+</a>
                    </div>
                    <a href="login" className="text-center">I already have a membership</a>
                </div>
                <NotificationContainer />
                {/* /.form-box */}
            </div>

        );
    }
}

export default Register;