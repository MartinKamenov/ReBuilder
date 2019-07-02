import React, { Component } from 'react';
import './DashboardComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import UserProjectsListComponent from './user-projects/UserProjectsListComponent';
import { Link } from 'react-router-dom';
import * as authenticationActions from '../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


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
        if (!this.props.user.id) {
            return (
                <div>Unauthorized</div>
            )
        }
        return ( 
            <div>
                <nav id="user-navbar">
                    <button className="user-profile">
                    <div className="navbar-brand user-image">
                        <img src={this.props.user.imageUrl} height="100%" alt="user avatar" />
                    </div>
                    <div className="username">{this.props.user.username}
                        <FontAwesomeIcon icon={faCaretDown} /> 
                    </div>
                    </button>
                    <Link
                        to='/project/new'
                        type="button"
                        className="btn btn-outline-dark">
                            New <FontAwesomeIcon icon={faPlusCircle} />
                    </Link>
                </nav>
                <UserProjectsListComponent projects={this.props.user.projects}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};
export default connect(mapStateToProps)(DashboardComponent);