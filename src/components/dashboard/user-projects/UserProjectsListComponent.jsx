import React from 'react';
import './UserProjectsListComponent.css'
import UserProjectComponent from './UserProjectComponent';

const UserProjectsListComponent = (props) => {
    return ( 
        <div class="user-projects-list">
            <ul>
                {
                    props.projects.map((project) => {
                        return <li> <UserProjectComponent projectDetails={project}/></li>
                    })
                }
            </ul>
        </div>
    );
}
 
export default UserProjectsListComponent;