import React from 'react';
import './UserProjectsListComponent.css';
import UserProjectComponent from './UserProjectComponent';
import PropTypes from 'prop-types';

const UserProjectsListComponent = ({projects, user}) => {
    const sortedProjects = projects
        .sort((a, b) => Date.parse(b.lastUpdated) - Date.parse(a.lastUpdated));
    return (
        <div className="user-projects-list">
            <div>
                {
                    sortedProjects.map((project) => {
                        return (
                            <div className='col-md-4 col-sm-6' key={project.id}>
                                <UserProjectComponent user={user} projectDetails={project}/>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};
UserProjectComponent.PropTypes = {
    projects: PropTypes.array.isRequired
};
 
export default UserProjectsListComponent;