import React from 'react';

// [ REDUX ]
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

// [ STYLING ]
import './Directory.styles.scss';

// [ COMPONENTS ]
import MenuItem from '../MenuItem/MenuItem';



const Directory = ({ sections }) => (
    <div className='directory-menu'>
        { sections.map( ({ id, ...remainingSection }) => (
            <MenuItem key={id} {...remainingSection} />
        ) ) }
    </div>
);

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
});


export default connect( mapStateToProps, null )( Directory );
