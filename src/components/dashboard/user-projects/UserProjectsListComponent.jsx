import React from 'react';
import './UserProjectsListComponent.css';
import UserProjectComponent from './UserProjectComponent';
import PropTypes from 'prop-types';

const UserProjectsListComponent = ({projects}) => {
    return (
        <div className="user-projects-list">
            <div>
                {
                    projects.map((project) => {
                        return (
                            <div className='col-md-4 col-sm-6' key={project.id}>
                                <UserProjectComponent projectDetails={project}/>
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