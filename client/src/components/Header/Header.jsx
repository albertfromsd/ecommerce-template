import React from 'react';

// [ REDUX ]
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { logoutStart } from '../../redux/user/user.actions';

// [ STYLING ]
import { 
    HeaderContainer, 
    LogoContainer, 
    OptionsContainer, 
    OptionDiv, 
    OptionLink,
    MessageContainer } from './Header.styles';
import { ReactComponent as Logo } from '../../assets/crown.svg';

// [ COMPONENTS ]
import CartIcon from '../Cart/CartIcon/CartIcon';
import CartDropDown from '../Cart/CartDropDown/CartDropDown';


const Header = ({ currentUser, hidden, logoutStart }) => {

    return(
        <HeaderContainer>
            <LogoContainer to='/'>
                <Logo className='logo'/>
            </LogoContainer>
            {currentUser && currentUser.displayName
                ? <MessageContainer> Welcome, { currentUser.displayName }! </MessageContainer>
                : <MessageContainer> Guest mode </MessageContainer>    
            }
            <OptionsContainer>
                <OptionLink to='/shop'> SHOP </OptionLink>
                <OptionLink to='/contact'> CONTACT </OptionLink>
                {currentUser
                    ? ( <OptionDiv onClick={logoutStart}> LOGOUT </OptionDiv> )
                    : ( <OptionLink to='/loginreg'> LOGIN </OptionLink> )
                }
                <CartIcon />    
            </OptionsContainer>
            { hidden
                ? null
                : <CartDropDown />
            }
        </HeaderContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectIsCartHidden,
});

const mapDispatchToProps = dispatch => ({
    logoutStart: () => dispatch( logoutStart() ),
});

export default connect( mapStateToProps, mapDispatchToProps )( Header );
