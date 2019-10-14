import React from 'react';
import './UserProjectComponent.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserProjectComponent = ({projectDetails}) => {
    return (
        <div className="user-project">
            <Link to={ '/projects/' + projectDetails.id }>
                <div className='dashboard-project-component'>
                    <img
                        className='dashboard-project-image'
                        alt='Project'
                        src={projectDetails.projectImageUrl} />
                    <div className='dashboard-project-text'>
                        {projectDetails.name}
                    </div>
                </div>
            </Link>
        </div>
    );
};

UserProjectComponent.propTypes = {
    projectDetails: PropTypes.shape({
        projectImageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
};
 
export default UserProjectComponent;