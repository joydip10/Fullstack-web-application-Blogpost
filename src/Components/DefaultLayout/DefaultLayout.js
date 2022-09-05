import React from 'react';
import Header from '../Header/Header';

const DefaultLayout = ({children}) => {
    return (
        <div>
            <Header/>
            <div className='content'>
                {children}
            </div>
            
        </div>
    );
};

export default DefaultLayout;