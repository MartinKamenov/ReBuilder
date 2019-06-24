import React from 'react';
import './UserProjectComponent.css'

const UserProjectComponent = (props) => {
    return (
        <div class="user-project">
            <a href="#">
                <div>
                    <img src={props.projectDetails.projectImageUrl} /> User: {props.projectDetails.userName} Project: {props.projectDetails.name}
                </div>
            </a>
        </div>
    );
}
 
export default UserProjectComponent;