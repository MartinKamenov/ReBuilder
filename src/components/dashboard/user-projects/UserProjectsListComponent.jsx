import React from 'react';
import './UserProjectsListComponent.css';
import UserProjectComponent from './UserProjectComponent';
import PropTypes from 'prop-types';

const UserProjectsListComponent = ({projects}) => {
    return (
        <div className="user-projects-list">
            <ul>
                {
                    projects.map((project) => {
                        return (
                            <li key={project.id}>
                                <UserProjectComponent projectDetails={project}/>
                            </li>
                        );
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