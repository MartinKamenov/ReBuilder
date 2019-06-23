import React from 'react';
import './UserProjectsListComponent.css'
import UserProjectComponent from './UserProjectComponent';

const UserProjectsListComponent = (props) => {
    return ( 
        <div class="user-projects-list">
            <UserProjectComponent />
        </div>
     );
}
 
export default UserProjectsListComponent;