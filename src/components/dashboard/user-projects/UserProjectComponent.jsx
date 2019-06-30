import React from 'react';
import './UserProjectComponent.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserProjectComponent = ({projectDetails}) => {
    return (
        <div className="user-project">
            <Link to={ '/projects/' + projectDetails.id }>
                <div>
                    <img alt='Project' src={projectDetails.projectImageUrl} /> {projectDetails.name}
                </div>
            </Link>
        </div>
    );
}

UserProjectComponent.propTypes = {
    projectDetails: PropTypes.object.isRequired,
    projectImageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}
 
export default UserProjectComponent;