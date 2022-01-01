import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../state/action-creators/authActions';
import { Link, Navigate } from 'react-router-dom';

import './Login.css';

class LoginPage extends Component {
    state = {
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            if(error.id === 'LOGIN_FAIL') {
                this.setState({msg: error.msg.msg });
            } else {
                this.setState({ msg: null })
            }
        }

        if(isAuthenticated) {
            return <Navigate to="/profile" />
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const {email, password} = this.state;

        const user = {
            email,
            password
        }

        this.props.login(user);
    }

    render() {
        const { isAuthenticated } = this.props;

        return (
            <div className='loginpage'>
                {isAuthenticated ? <Navigate to='/profile' /> :<div>
                {this.state.msg ? <div className='error'>{this.state.msg}</div> : null}
                <form onSubmit={this.onSubmit}>
                    <div className='item1'>
                        <div className='label'>Email:</div>
                        <input type='email' className='input1' name='email' placeholder='Email' onChange={this.onChange} />
                    </div>
                    <div className='item1'>
                        <div className='label'>Password: </div>
                        <input type='password' name='password' className='input' placeholder='Password' onChange={this.onChange} />
                    </div>
                    <button>Login</button>
                </form>
                <div className='register-button'>
                    <Link to='/register'>Don't have an account? Click here to register!</Link>
                </div></div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(
    mapStateToProps,
    { login }
)(LoginPage);