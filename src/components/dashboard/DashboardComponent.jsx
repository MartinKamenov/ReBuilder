import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './DashboardComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import UserProjectsListComponent from './user-projects/UserProjectsListComponent';
import { Link } from 'react-router-dom';
import PagingComponent from '../common/PagingComponent';
import pagingService from '../../service/paging.service';
import queryString from 'query-string';

const DashboardComponent = ({ location: { search } }) => {
    const [page, setPage] = useState(1);

    const user = useSelector((state) => state.user);

    const changePage = (selectedPage) => {
        setPage(selectedPage);
    }

    useEffect(() => {
        let queryObject = queryString.parse(search);
        const queryPage = parseInt(queryObject.page, 10);
        setPage(queryPage || 1);
    }, [user, search]);
    
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
        <div>
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
                    .getCollectionByPage(user.projects, page)}/>
            <PagingComponent
                page={page}
                pagesNumbers={pagingService.getPagesNumbers(user.projects, page)}
                totalPagesCount={pagingService.getTotalPagesCount(user.projects)}
                changePage={changePage}/>
        </div>
    );
}

export default DashboardComponent;