import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './DashboardComponent.css';
import UserProjectsListComponent from './user-projects/UserProjectsListComponent';
import { Link } from 'react-router-dom';
import PagingComponent from '../common/paging/PagingComponent';
import pagingService from '../../service/paging.service';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import ProjectActionsComponent from './create/ProjectActionsComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../common/button/ButtonComponent';

const DashboardComponent = ({ location: { search }, history }) => {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);

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

    const sortedProjects = [...user.projects];
    sortedProjects.sort((a, b) => Date.parse(b.lastUpdated) - Date.parse(a.lastUpdated));

    return (
        <div className='auth-container'>
            <div className='center-container' style={{ width: '100%' }}>
                <ButtonComponent
                    style={{
                        width: 200,
                        fontWeight: 'bold',
                        fontSize: 12,
                        height: 50,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '-30px',
                        marginBottom: '30px'
                    }}
                    variant='outlined'
                    color='secondary'
                    className='vertical-centered'
                    onClick={() => setOpen(true)}>
                    <FontAwesomeIcon className='action-icon' icon={faPlusCircle} />
                    Create new project
                </ButtonComponent>
            </div>
            <ProjectActionsComponent open={open} setOpen={setOpen} type='create' history={history}/>
            <UserProjectsListComponent
                history={history}
                user={user}
                projects={pagingService
                    .getCollectionByPage(sortedProjects, page)}/>
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