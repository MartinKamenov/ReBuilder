import React, { Component } from 'react';
import './HomeComponent.css';

class HomeComponent extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <nav class="navbar" id="user-navbar">
                    <a class="navbar-brand" href="#">
                        <img src="https://mdbootstrap.com/img/logo/mdb-transparent.png" height="30" alt="mdb logo" />
                    </a>
                </nav>
            </div>
        );
    }
}
 
export default HomeComponent;