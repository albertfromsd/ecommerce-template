import React from 'react';

import { 
    ErrorImageOverlay, 
    ErrorImageContainer, 
    ErrorImageText } from './ErrorBoundary.styles'; 

class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            hasErrored: false
        };
    };


    static getDerivedStateFromError( error ) { // a lifecycle method that lets react know this is an ErrorBoundary component

        return {
            hasErrored: true
        };
    };

    componentDidCatch( error, info ) { // another lifecycle method that indicates that this is an ErrorBoundary component
        console.log( "ErrBoundary Error: ", error );
        console.log( "ErrBoundary Info: ", info );
    };

    render() {
        if( this.state.hasErrored ) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl={`https://i.imgur.com/oCkEbrA.png`} />
                    <ErrorImageText> Oops! We let this page get away from us... </ErrorImageText>
                </ErrorImageOverlay>
            )
        };

        return this.props.children;
    };
};

export default ErrorBoundary;

// used to wrap children components inside this ErrorBoundary
// if child throw error, it will activate this component