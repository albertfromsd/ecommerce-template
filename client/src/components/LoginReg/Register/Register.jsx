import React, { useState } from 'react';

// [ REDUX ]
import { connect } from 'react-redux';
import { registerStart } from '../../../redux/user/user.actions';

// [ STYLING ]
import './Register.styles.scss';

// [ COMPONENTS ]
import FormInput from '../../FormInput/FormInput';
import CustomButton from '../../CustomButton/CustomButton';


const Register = ({ registerStart }) => {
    const [ formState, setFormState ] = useState({
        email: '',
        displayName: '',
        password: '',
        confirmPassword: ''
    });
    const { email, displayName, password, confirmPassword } = formState;

    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if( password !== confirmPassword ) {
            alert("Passwords do not match")
            return;
        };

        registerStart( { email, password, displayName } );
    };

    return (
        <div className='register'>
            <h2 className='title'>I do not have an account</h2>
            <span> Register below!</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput 
                    label='Display Name' type='text' 
                    name='displayName' value={displayName} 
                    onChange={handleChange} required />
                <FormInput 
                    label='E-mail' type='email' 
                    name='email' value={email} 
                    onChange={handleChange} required />
                <FormInput 
                    label='Password' type='password' 
                    name='password' value={password} 
                    onChange={handleChange} required />
                <FormInput 
                    label='Confirm Password' type='password' 
                    name='confirmPassword' value={confirmPassword} 
                    onChange={handleChange} required />
                <div className='register-button'>
                    <CustomButton type="submit"> REGISTER </CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    registerStart: userCredentials => dispatch( registerStart(userCredentials) )
});

export default connect( null, mapDispatchToProps )( Register );
