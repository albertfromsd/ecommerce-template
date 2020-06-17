import React from 'react';

import { 
    ErrorImageOverlay, 
    ErrorImageContainer, 
    ErrorImageText } from './ErrorBoundary.styles'; 


// used to wrap children components inside this ErrorBoundary
// if child throw error, it will activate this component
class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            hasErrored: false
        };
    };

    // a lifecycle method that lets react know this is an ErrorBoundary component. 
    // If error gets thrown, hasErrored state becomes true
    static getDerivedStateFromError( error ) { 
        return {
            hasErrored: true
        };
    };

    // another lifecycle method that indicates that this is an ErrorBoundary component
    // and catches errors
    componentDidCatch( error, info ) { 
        console.log( "ErrBoundary Error: ", error );
        console.log( "ErrBoundary Info: ", info );
    };

    render() {
        if( this.state.hasErrored ) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl={`https://i.imgur.com/oCkEbrA.png`} />
                    <ErrorImageText> Oops! We let this page get away from us... Please try loading the page again. </ErrorImageText>
                </ErrorImageOverlay>
            )
        };

        return this.props.children;
    };
};

export default ErrorBoundary;