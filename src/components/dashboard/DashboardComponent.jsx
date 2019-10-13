import React, { Component } from 'react';
import './DashboardComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import UserProjectsListComponent from './user-projects/UserProjectsListComponent';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PagingComponent from '../common/PagingComponent';
import pagingService from '../../service/paging.service';

class DashboardComponent extends Component {
    state = {
        page: 1
    }
    componentDidMount() {
        const page = parseInt(this.props.match.params.page, 10);
        this.setState({ page: page || 1 });
    }
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
                <UserProjectsListComponent
                    projects={pagingService
                        .getCollectionByPage(this.props.user.projects, this.state.page)}/>
                <PagingComponent
                    page={this.state.page}
                    pagesNumbers={pagingService.getPagesNumbers(this.props.user.projects, this.state.page)}
                    totalPagesCount={pagingService.getTotalPagesCount(this.props.user.projects)}/>
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