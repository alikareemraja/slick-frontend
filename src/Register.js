import React, { Component } from 'react';
import UserService from './UserService';

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

    handleRegister(event) {
        event.preventDefault();

        if (this.state.password1 !== this.state.password2) {
            window.alert("Your passwords do not match!");
            return;
        }

        console.log("Trying to register user: " + this.state.username + ", pass: " + this.state.password1);
        UserService.register(this.state.username, this.state.password1).then((data) => {
            console.log("Hurray, you are registered!");
            this.props.history.push("/app/wardrobe");
        }).catch((e) => {
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
                default:
            }
        }
        console.log(this.state);
    }

    render() {
        return (
            <div className="register-box">
                <div className="register-logo">
                    <a href="../../index2.html"><b>Slick</b></a>
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
                        <div className="row">
                            <div className="col-xs-8">
                                <div className="checkbox icheck">
                                    <label>
                                        <input type="checkbox" /> I agree to the <a href="fake_url">terms</a>
                                    </label>
                                </div>
                            </div>
                            {/* /.col */}
                            <div className="col-xs-4">
                                <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
                            </div>
                            {/* /.col */}
                        </div>
                    </form>
                    <div className="social-auth-links text-center">
                        <p>- OR -</p>
                        <a href="fake_url" className="btn btn-block btn-social btn-facebook btn-flat"><i className="fa fa-facebook" /> Sign up using
        Facebook</a>
                        <a href="fake_url" className="btn btn-block btn-social btn-google btn-flat"><i className="fa fa-google-plus" /> Sign up using
        Google+</a>
                    </div>
                    <a href="login.html" className="text-center">I already have a membership</a>
                </div>
                {/* /.form-box */}
            </div>

        );
    }
}

export default Register;