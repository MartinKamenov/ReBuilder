import React, { Component } from 'react';
import './HomeComponent.css';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

class HomeComponent extends Component {
    state = { 
        user: {
            id: 'someId',
            username: 'testUsername',
            password: 'somepass',
            email: 'test@abv.bg',
            imageUrl: 'https://avatars3.githubusercontent.com/u/18643062?s=400&u=1eb73de3d53dd1589827b68095ca18cf6b2518fc&v=4',
            projects: [
                {
                    name: 'test1',
                    userName: 'vasko',
                    userId: 'someId',
                    projectImageUrl: 'https://www.image-line.com/support/flstudio_online_manual/html/img_shot/browser.png'
                }
            ]
        }
     }
    render() { 
        return ( 
            <div>
                <nav class="navbar" id="user-navbar">
                    <button class="user-profile">
                    <a class="navbar-brand user-image" href="#">
                        <img src={this.state.user.imageUrl} height="100%" alt="user avatar" />
                    </a>
                    <div class="username">{this.state.user.username}
                        <FontAwesomeIcon icon={faCaretDown} /> 
                    </div>
                    </button>
                </nav>
            </div>
        );
    }
}
 
export default HomeComponent;