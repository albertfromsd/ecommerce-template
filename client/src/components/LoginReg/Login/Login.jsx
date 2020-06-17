import React, { useState } from 'react';

// [ REDUX ]
import { connect } from 'react-redux';
import { googleLoginStart, emailLoginStart } from '../../../redux/user/user.actions';

// [ COMPONENTS ]
import FormInput from '../../FormInput/FormInput';
import CustomButton from '../../CustomButton/CustomButton';

// [ STYLING ]
import './Login.styles.scss';


const Login = ({ googleLoginStart, emailLoginStart }) => {
    const [ formState, setFormState ] = useState({
        email: "",
        password: ""
    });
    const { email, password } = formState;

    const handleOnChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async e => {
        e.preventDefault();
        
        emailLoginStart( email, password );
    };


    return (
        <div className='login'>

            <h2>I already have an account</h2>
            <span> Login with your e-mail and password below </span>

            <form onSubmit={handleSubmit}>
                <FormInput name="email" value={email} handleOnChange={handleOnChange} label='E-mail' required />
                <FormInput name="password" value={password} type="password" handleOnChange={handleOnChange} label='Password' required />

                <div className='buttons'>
                    <CustomButton type="submit"> 
                        Login </CustomButton>
                    <CustomButton type='button' onClick={googleLoginStart} isGoogleSignIn> 
                        Login with Google </CustomButton>
                </div>
                
            </form>
            
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    googleLoginStart: () => dispatch( googleLoginStart() ),
    emailLoginStart: (email, password) => dispatch( emailLoginStart({ email, password }) ),
});

export default connect(null, mapDispatchToProps)( Login );
