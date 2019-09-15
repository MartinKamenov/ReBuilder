import React, { Component } from 'react';
import './DashboardComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import UserProjectsListComponent from './user-projects/UserProjectsListComponent';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class DashboardComponent extends Component {
    render() {
        if (!this.props.user.id) {
            return (
                <div className='unauthorized-container'>
                    <h1>Unauthorized</h1>
                    <p>Please log in using your credentials</p>
                    <Link to='/login' className='nav-link navbar_element'>Log In</Link>
                </div>
            );
        }
        return ( 
            <div>
                <nav id='user-navbar'>
                    <button className='user-profile'>
                        <div className='navbar-brand user-image'>
                            <img src={this.props.user.imageUrl} height='100%' alt='user avatar' />
                        </div>
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={`/users/${this.props.user.id}`}>
                            <h4 className='vertical-centered'>
                                {this.props.user.username}
                            </h4>
                        </Link>
                    </button>
                    <div id='addButton' className='vertical-centered'>
                        <Link
                            to='/project/new'
                            type='button'
                            className='btn btn-outline-dark'>
                            New <FontAwesomeIcon icon={faPlusCircle} />
                        </Link>
                    </div>
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