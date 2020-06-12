import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;

    @media screen and ( max-width: 800px ) {
        height: 60px;
        padding: 10px;
        margin-bottom: 20px;
    }
`;

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;

    @media screen and ( max-width: 800px ) {
        width: 50px;
        padding: 0;
    }
`;

export const MessageContainer = styled.h4`
    width: 25%;
    padding: 0;
    margin-left: 5px; 
    text-align: center;
    font-size: 12px;
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media screen and ( max-width: 800px ) {
        width: 70%;
    }
`;

const OptionContainerStyles = css`
    padding: 10px 15px;
    cursor: pointer;
    
    :hover, :focus {
        border-bottom: 1px solid black;
        font-weight: bold;
    }
`;

export const OptionLink = styled(Link)`
    ${ OptionContainerStyles }
`;

export const OptionDiv = styled.div`
    ${OptionContainerStyles}
`;

