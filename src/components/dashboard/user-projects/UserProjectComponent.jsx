import React from 'react';
import './UserProjectComponent.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserProjectComponent = ({projectDetails}) => {
    return (
        <Link className='normal-a' to={ '/projects/' + projectDetails.id }>
            <div className='dashboard-project-component'>
                <div className='dashboard-project-image-container'>
                    <img
                        className='dashboard-project-image'
                        alt='Project'
                        src={projectDetails.projectImageUrl} />
                </div>
                <div className='dashboard-project-text'>
                    {projectDetails.name}
                </div>
            </div>
        </Link>
    );
};

UserProjectComponent.propTypes = {
    projectDetails: PropTypes.shape({
        projectImageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
};
 
export default UserProjectComponent;