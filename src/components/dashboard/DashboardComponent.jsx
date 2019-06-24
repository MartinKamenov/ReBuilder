import React, { Component } from 'react';
import './DashboardComponent.css';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import UserProjectsListComponent from './user-projects/UserProjectsListComponent';

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
                },
                {
                    name: 'test2',
                    userName: 'vasko',
                    userId: 'someOtherId',
                    projectImageUrl: 'https://cdn2.slidemodel.com/wp-content/uploads/FF0104-free-dashboard-concept-slide-16x9.jpg'
                },
                {
                    name: 'test3',
                    userName: 'vasko',
                    userId: 'someOtherId',
                    projectImageUrl: 'https://www.themeineed.com/wp-content/uploads/edd/2017/10/klorofil-v2.0-opt.png'
                },
            ]
        }
     }
    render() { 
        return ( 
            <div>
                <nav id="user-navbar">
                    <button class="user-profile">
                    <a class="navbar-brand user-image" href="#">
                        <img src={this.state.user.imageUrl} height="100%" alt="user avatar" />
                    </a>
                    <div class="username">{this.state.user.username}
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                    </button>
                    <button type="button" class="btn btn-outline-dark">New <FontAwesomeIcon icon={faPlusCircle} /></button>
                </nav>
                <UserProjectsListComponent projects={this.state.user.projects}/>
            </div>
        );
    }
}
 
export default DashboardComponent;