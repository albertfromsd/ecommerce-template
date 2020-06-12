import React from 'react';

// [ STYLING ]
import './LoginRegPage.styles.scss';

// [ COMPONENTS ]
import Login from '../../components/LoginReg/Login/Login';
import Register from '../../components/LoginReg/Register/Register';

const LoginRegPage = () => {

    return (
        <div className='signinup'>
            <Login />
            <Register />
        </div>
    )
};

export default LoginRegPage;
