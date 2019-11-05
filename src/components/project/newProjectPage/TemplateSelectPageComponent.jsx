import React, { useState, useEffect, useCallback } from 'react';
import templates from '../../../service/ready-templates/';
import uuid from 'uuid';
// import * as authenticationActions from '../../../actions/authenticationActions';
import * as projectActions from '../../../actions/projectActions';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import './TemplateSelectPageComponent.css';
import LoadingComponent from '../../common/LoadingComponent';
import TemplatesTabComponent from './TemplatesTabComponent';

const TemplateSelectPageComponent = ({ history, location }) => {
    const [isLoading, setIsLoading] = useState(false);

    const { user, project } = useSelector((state) => state);

    const dispatch = useDispatch();

    const handleCreateProject = useCallback((project) => {
        setIsLoading(true);
        const name = location.state.name;
        const imageUrl = location.state.imageUrl;
        project.name = name;
        project.projectImageUrl = imageUrl;
        dispatch(projectActions.createProject(name, imageUrl, user.token, project));
        // TO DO: Update user's projects
        // const token = localStorage.getItem('token');
        // dispatch(authenticationActions.loginByToken(token));
    }, [dispatch, location, user]);

    const selectTemplate = (index) => {
        const project = Object.assign({}, templates[index]);
        project.id = uuid.v1();
        handleCreateProject(project);
    };

    useEffect(() => {
        if(project.id) {
            setIsLoading(false);
            history.push(`projects/${project.id}`);
        }
    }, [project, history]);

    if(isLoading) {
        return <LoadingComponent message='Creating project'/>;
    }

    return (
        <div className='container'>
            {templates.map((template) => (
                <TemplatesTabComponent
                    selectTemplate={selectTemplate}
                    template={template}
                    key={template.id}>
                </TemplatesTabComponent>
            ))}
        </div>
    );
};

TemplateSelectPageComponent.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
        state: PropTypes.shape({
            name: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default TemplateSelectPageComponent;