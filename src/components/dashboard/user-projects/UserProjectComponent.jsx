import React from 'react';
import './UserProjectComponent.css'

const UserProjectComponent = (props) => {
    debugger;
    return (
        <div class="user-project">
            <div>
                {props.projectDetails.projectImageUrl}  
                {props.projectDetails.userName} 
                {props.projectDetails.name}
            </div>
        </div>
      );
}
 
export default UserProjectComponent;