import React from 'react';

// [ STYLING ]
import { CustomButtonContainer } from './CustomButton.styles';

// children of CustomButton component are passed down as props
// i.e. inside the tag <CustomButton> Children </CustomButton>
const CustomButton = ({ children, ...props }) => {

    return (
        <CustomButtonContainer {...props} >
            { children }
        </CustomButtonContainer>
    );

};

export default CustomButton;
