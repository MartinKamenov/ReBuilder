import React from 'react';
import './UserProjectComponent.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserProjectComponent = ({projectDetails}) => {
    return (
        <div className="user-project">
            <Link to={ '/projects/' + projectDetails.id + '/routing' }>
                <div>
                    <img alt='Project' src={projectDetails.projectImageUrl} /> {projectDetails.name}
                </div>
            </Link>
        </div>
    );
}

UserProjectComponent.propTypes = {
    projectDetails: PropTypes.shape({
        projectImageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
}
 
export default UserProjectComponent;