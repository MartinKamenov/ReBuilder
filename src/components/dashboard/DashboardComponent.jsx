import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import './DashboardComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import UserProjectsListComponent from './user-projects/UserProjectsListComponent';
import { Link } from 'react-router-dom';
import PagingComponent from '../common/paging/PagingComponent';
import pagingService from '../../service/paging.service';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import ButtonComponent from '../common/button/ButtonComponent';

const DashboardComponent = ({ location: { search }, history }) => {
    const [page, setPage] = useState(1);

    const user = useSelector((state) => state.user);

    const changePage = (selectedPage) => {
        setPage(selectedPage);
    };

    useEffect(() => {
        let queryObject = queryString.parse(search);
        const queryPage = parseInt(queryObject.page, 10);
        setPage(queryPage || 1);
    }, [user, search]);

    const redirectTo = useCallback(
        (path) => {
            history.push(path);
            return;
        },
        [history]
    );
    
    if (!user.id) {
        return (
            <div className='unauthorized-container'>
                <h1>Unauthorized</h1>
                <p>Please log in using your credentials</p>
                <Link to='/login' className='nav-link navbar_element'>Log In</Link>
            </div>
        );
    }
    return (
        <div className='auth-container'>
            <nav id='user-navbar'>
                <Link
                    className='user-profile'
                    style={{ textDecoration: 'none' }}
                    to={`/users/${user.id}`}>
                    <div className='navbar-brand user-image'>
                        <img src={user.imageUrl} height='100%' alt='user avatar' />
                    </div>
                    <h4 className='vertical-centered username-hover'>
                        {user.username}
                    </h4>
                </Link>
                
                <ButtonComponent
                    style={{ width: 200, fontWeight: 'bold', fontSize: 12, height: 50 }}
                    variant='outlined'
                    color='secondary'
                    className='vertical-centered'
                    onClick={() => redirectTo('/project/new')}>
                    <FontAwesomeIcon className='action-icon' icon={faPlusCircle} />
                    Create new project
                </ButtonComponent>
            </nav>
            <UserProjectsListComponent
                user={user}
                projects={pagingService
                    .getCollectionByPage(user.projects, page)}/>
            <PagingComponent
                page={page}
                pagesNumbers={pagingService.getPagesNumbers(user.projects, page)}
                totalPagesCount={pagingService.getTotalPagesCount(user.projects)}
                changePage={changePage}/>
        </div>
    );
};

DashboardComponent.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string.isRequired
    }).isRequired
};

export default DashboardComponent;