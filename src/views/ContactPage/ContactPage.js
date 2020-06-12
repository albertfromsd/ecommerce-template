import React from 'react';

// [ STYLING ]
import './ContactPage.styles.scss';

const ContactPage = () => {


    return (
        <>
        <div className='contact-container'>

            <div className='title-container'>
                <h4 className='contact-title'> CONTACT INFO </h4>
            </div> {/* [end] title-continer */}

            <p className='name-title'> Albert Ahn </p>

            <div className='info-container'>

                <div className='label-container'>
                    <p className='email-label'> E-mail &nbsp; </p>
                    <p className='resume-label'> Resume &nbsp; </p>
                    <p className='linkedin-label'> LinkedIn &nbsp; </p>
                    <p className='github-label'> GitHub &nbsp; </p>
                </div> {/* [end] label-container */}

                <div className='field-container'>

                    <p className='email'> 
                        <a href='mailto: albert.ahn@gmail.com'> albert.ahn@gmail.com </a> 
                    </p>
                    
                    <p className='resume'> 
                        <span className='resume-simple-link'> 
                            <a href='linke to resume'> Simple &nbsp; &nbsp; </a> 
                        </span> 
                            |
                        <span className='resume-indepth-link'> 
                            <a href='linke to resume'> &nbsp; &nbsp; In-depth </a> 
                        </span> 
                    </p>
                    
                    <p className='linkedin'> 
                        <a href='https://www.linkedin.com/in/albertjahn/'> albertjahn </a> 
                    </p>
                    
                    <p className='github'> 
                        <a href='https://github.com/albertfromsd'> albertfromsd </a> 
                    </p>
                    
                </div> {/* [end] field-container*/}

            </div> {/* [end] info-container*/}

            <br/>

            <div className='about-container'>
                <h4 className='about-title'> About me </h4>

                <p className='about-text'>
                    My name is Albert Ahn and I currently reside in Los Angeles, CA. Enter a bunch more text here blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah. Enter a bunch more text here blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah. 
                    <br/> <br/>
                    Enter a bunch more text here blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah. Enter a bunch more text here blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah. 
                </p>

            </div> {/* [end] about-container */}

        </div> {/* [end] contact-container  */}
        </>
    );
};

export default ContactPage;
