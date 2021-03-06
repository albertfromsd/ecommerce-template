import React from 'react';

// [ COMPONENTS ]
import Spinner from '../Spinner/Spinner';

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return ( isLoading 
        ? <Spinner />
        : <WrappedComponent {...otherProps } />
    );
};


export default WithSpinner;
