import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeComponent from '../home/HomeComponent';
import NavbarComponent from '../navigation/NavbarComponent';

const AppRouter = () => {
    return (
        <Router>
            <div>
                <NavbarComponent/>
                <div className='container'>
                    <Route exact path="/" component={HomeComponent} />
                </div>
            </div>
        </Router>    
    );
};
 
export default AppRouter;