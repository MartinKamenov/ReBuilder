import React from 'react';
import './UserProjectComponent.css';
import PropTypes from 'prop-types';

const UserProjectComponent = ({projectDetails}) => {
    return (
        <div className="user-project">
            <a href="#">
                <div>
                    <img src={projectDetails.projectImageUrl} /> {projectDetails.name}
                </div>
            </a>
        </div>
    );
}

UserProjectComponent.propTypes = {
    projectDetails: PropTypes.object.isRequired,
    projectImageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}
 
export default UserProjectComponent;