import React from 'react'

// [ STYLING ]
import { HomePageContainer } from './HomePage.styles';

// [ COMPONENTS ]
import Directory from '../../components/Directory/Directory';


const HomePage = () => {

    return (
        <HomePageContainer>
            <Directory />
        </HomePageContainer>
    )
};

export default HomePage;
