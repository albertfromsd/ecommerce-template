import React, { useEffect, lazy, Suspense } from 'react';
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
    checkUserSession();

  }, [ checkUserSession ]);


    return (
      <>

        <GlobalStyle /> 

        <Header />

        <Switch> 
          <ErrorBoundary>
            <Suspense fallback={ <Spinner /> }> 
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

      </>
    );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch( checkUserSession() ),
})

export default connect( mapStateToProps, mapDispatchToProps )( App );