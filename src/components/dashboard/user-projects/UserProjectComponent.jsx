import React, { useState } from 'react';
import './UserProjectComponent.css';
import PropTypes from 'prop-types';
import dateService, {dateFormatTypes} from '../../../service/date.service';
import ProjectActionsComponent from '../create/ProjectActionsComponent';
import CardComponent from '../../common/card/CardComponent';

const UserProjectComponent = ({ projectDetails, user, history }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const lastUpdated = new Date(projectDetails.lastUpdated);
    const hasDescription = !!projectDetails.description;
    let description = projectDetails.description || 'This project has no description';
    description = description.substring(0, 100) + (description.length > 100 ? '...' : '');
    return (
        <CardComponent
            header={{
                src: user.imageUrl,
                link: `/users/${user.id}`,
                onSettingsClick: handleOpen,
                name: projectDetails.name,
                subheader: dateService.formatDate(lastUpdated, dateFormatTypes.Material)
            }}
            cardMedia={{
                link: `/projects/${projectDetails.id}`,
                imageUrl: projectDetails.projectImageUrl,
                title: projectDetails.name
            }}
            cardContent={{
                description
            }}
            collapse={{
                description: projectDetails.description
            }}
            hasDescription={hasDescription}>
            <ProjectActionsComponent projectInformation={projectDetails} open={open} setOpen={setOpen} type='update' history={history}/>
        </CardComponent>
    );
};

UserProjectComponent.propTypes = {
    projectDetails: PropTypes.shape({
        projectImageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
};
 
export default UserProjectComponent;