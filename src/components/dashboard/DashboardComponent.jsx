import React, { Component } from 'react';
import './DashboardComponent.css';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import UserProjectsListComponent from './user-projects/UserProjectsListComponent';
import { Link } from 'react-router-dom';

class DashboardComponent extends Component {
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
                <nav id="user-navbar">
                    <button className="user-profile">
                    <a className="navbar-brand user-image" href="#">
                        <img src={this.state.user.imageUrl} height="100%" alt="user avatar" />
                    </a>
                    <div className="username">{this.state.user.username}
                        <FontAwesomeIcon icon={faCaretDown} /> 
                    </div>
                    </button>
                    <Link to='/project/new' type="button" className="btn btn-outline-dark">New <FontAwesomeIcon icon={faPlusCircle} /></Link>
                </nav>
                <UserProjectsListComponent />
            </div>
        );
    }
}
 
export default DashboardComponent;