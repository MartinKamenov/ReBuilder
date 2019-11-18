import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './DashboardComponent.css';
import UserProjectsListComponent from './user-projects/UserProjectsListComponent';
import { Link } from 'react-router-dom';
import PagingComponent from '../common/paging/PagingComponent';
import pagingService from '../../service/paging.service';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import CreateProjectComponent from './create/CreateProjectComponent';

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
            <CreateProjectComponent history={history}/>
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