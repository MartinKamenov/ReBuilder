import React from 'react';
import './UserProjectsListComponent.css';
import UserProjectComponent from './UserProjectComponent';
import PropTypes, { array } from 'prop-types';

const UserProjectsListComponent = ({projects}) => {
    return (
        <div class="user-projects-list">
            <ul>
                {
                    projects.map((project) => {
                        return <li> <UserProjectComponent projectDetails={project}/></li>
                    })
                }
            </ul>
        </div>
    );
}
UserProjectComponent.PropTypes = {
    projects: PropTypes.array.isRequired
}
 
export default UserProjectsListComponent;