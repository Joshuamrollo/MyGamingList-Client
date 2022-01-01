import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../state/action-creators/authActions';
import { Link, Navigate } from 'react-router-dom';

import './RegisterPage.css';

class RegisterPage extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            if(error.id === 'REGISTER_FAIL') {
                this.setState({msg: error.msg.msg });
            } else {
                this.setState({ msg: null })
            }
        }

        if(isAuthenticated) {
            return <Navigate to='/profile' />
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const { name, email, password } = this.state;

        const newUser = {
            name,
            email,
            password,
        }

        this.props.register(newUser);
    }

    render() {
        return (
            <div className='registerpage'>
                {this.state.msg ? <div className='error'>{this.state.msg}</div> : null}
                <form onSubmit={this.onSubmit}>
                    <div className='item1'>
                        <div className='label'>Name:</div>
                        <input type='text' name='name' className='input1' placeholder='Name' onChange={this.onChange} />
                    </div>
                    <div className='item1'>
                        <div className='label'>Email:</div>
                        <input type='email' name='email' className='input2' placeholder='Email' onChange={this.onChange} />
                    </div>
                    <div className='item1'>
                        <div className='label'>Password:</div>
                        <input type='password' name='password' className='input3' placeholder='Password' onChange={this.onChange} />
                    </div>
                    <button className='register-button'>Register</button>
                </form>
                <div className='login-button'>
                    <Link to='/login'>Already have an account? Click here to login!</Link>
                </div>
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
    { register }
)(RegisterPage);