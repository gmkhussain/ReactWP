import React from 'react';
import Navbar from '../Navbar';

const PublicLayout = ( props ) => {
    return(
        <React.Fragment>
            <Navbar />
            <main className="main">
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default PublicLayout