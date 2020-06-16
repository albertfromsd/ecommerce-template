import React, { useEffect, lazy, Suspense, Profiler } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// [ REDUX ]
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions'

// [ STYLING ]
import { GlobalStyle } from './global.styles';

// [ COMPONENTS ]
import Header from './components/Header/Header'; // Header is everywhere, so no need to lazy load
import Spinner from './components/Spinner/Spinner';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

// [ VIEWS: DYNAMIC IMPORTS ]
const HomePage = lazy( () => 
    import('./views/HomePage/HomePage') );
const ShopPage = lazy( () => 
    import('./views/ShopPage/ShopPage') );
const LoginRegPage = lazy( () => 
    import('./views/LoginRegPage/LoginRegPage') );
const CheckoutPage = lazy( () => 
    import('./views/CheckoutPage/CheckoutPage') );
const ContactPage = lazy( () => 
    import('./views/ContactPage/ContactPage') );



const App = ({ checkUserSession, currentUser }) => {
  
  useEffect( () => {
    checkUserSession(); // checks to see if a user is currently logged in

  }, [ checkUserSession ]);


    return (
      <Profiler id="App" onRender={( id, phase, duration ) => {
          console.log({ id, phase, duration }) 
        } } > 
      {/* Profiler gives runtime performance stats on mount and renders */}

          <GlobalStyle /> 
          {/* GlobalStyle replaces the css styling of App.css */}

          <Header />

          <Switch> 
            <ErrorBoundary>
            {/* Catches any errors thrown by children components and displays error message instead of spinning indefinitely */}
              <Suspense fallback={ <Spinner /> }> 
              {/* Displays Spinner component while any of the nested components are still loading */}
                <Route exact path='/' component={HomePage} />
                <Route path='/shop' component={ShopPage} />
                <Route exact path='/contact' component={ContactPage} />
                <Route exact path='/checkout' component={CheckoutPage} />
                <Route exact path='/loginreg' 
                  render={ () => currentUser 
                    ? <Redirect to='/' />
                    : <LoginRegPage /> 
                  } />
              </Suspense>
            </ErrorBoundary>
          </Switch>

      </Profiler>
    );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch( checkUserSession() ),
})

export default connect( mapStateToProps, mapDispatchToProps )( App );