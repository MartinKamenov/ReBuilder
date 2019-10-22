import React, { useEffect, useState, useCallback } from 'react';
import * as projectActions from '../../../actions/projectActions';
import * as deploymentActions from '../../../actions/deploymentActions';
import * as getDeploymentActions from '../../../actions/getDeploymentActions';
import { bindActionCreators } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../common/LoadingComponent';
import uuid from 'uuid';
import projectGenerator from '../../../service/projectGenerator.service';

import './InnerRoutingComponent.css';
import './PageElementsStyle.css';
import ProjectActionButtonsComponent from '../../common/ProjectActionButtonsComponent';
import { componentTypes } from '../components/componentTypes';
import ProjectPageComponent from './tabs/pageTab/PagesTabComponent';
import PagesEditorComponent from './tabs/pageTab/PagesEditorComponent';
import DatabaseTabComponent from './tabs/databaseTab/DatabaseTabComponent';
import DeploymentTabComponent from './tabs/deploymentTab/DeploymentTabComponent';
import tabTypes from './tabs/projectTabs';

const InnerRoutingComponent = ({ history, match, actions }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pages, setPages] = useState([]);
    const [newPageName,setNewPageName] = useState('');
    const [newPageRoute, setNewPageRoute] = useState('');
    const [newPageNameError, setNewPageNameError] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatePage, setUpdatePage] = useState(null);
    const [tab, setTab] = useState(tabTypes[0]);
    const [deploymentInformation, setDeploymentInformation] = useState(null);
    const [id, setId] = useState('');

    const { user, deploymentInformation: stateDeployment, project } = useSelector((state) => state);

    const clearState = (pages) => {
        setPages(pages);
        setIsUpdating(false);
        setUpdatePage(null);
        setNewPageName('');
        setNewPageRoute('');
    }

    const generateProject = () => {
        const pages = [...project.pages];

        const project = Object.assign({}, project);
        projectGenerator.generateProject(project.name, pages, project.projectImageUrl);
    }

    const handleSaveProject = () => {
        const token = localStorage.getItem('token');
        if(!token) {
            return;
        }

        const pages = [...pages];
        
        actions.updateProject(id, pages, token);
    }

    const handleDeployProject = async () => {
        actions.deployProject(id, user.token);
    }

    const executeStylesScript = () => {
        const nodes = [].slice.call(document.querySelectorAll('li'), 0);
        const directions  = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
        const classNames = ['in', 'out'].map((p) => Object.values(directions).map((d) => `${p}-${d}`)).reduce((a, b) => a.concat(b));

        const getDirectionKey = (ev, node) => {
            const { width, height, top, left } = node.getBoundingClientRect();
            const l = ev.pageX - (left + window.pageXOffset);
            const t = ev.pageY - (top + window.pageYOffset);
            const x = (l - (width/2) * (width > height ? (height/width) : 1));
            const y = (t - (height/2) * (height > width ? (width/height) : 1));
            return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
        };

        class Item {
            constructor(element) {
                this.element = element;    
                this.element.addEventListener('mouseover', (ev) => this.update(ev, 'in'));
                this.element.addEventListener('mouseout', (ev) => this.update(ev, 'out'));
            }
            
            update(ev, prefix) {
                this.element.classList.remove(...classNames);
                this.element.classList
                    .add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
            }
        }

        nodes.forEach(node => new Item(node));
    }

    const updateNewPageValue = ({ target: { value }}) => {
        if(!isValid('newPageName', value)) {
            setNewPageNameError('Name is not valid');
            setNewPageName(value);
            return;
        }

        setNewPageNameError('');
        setNewPageName(value);
        setNewPageRoute(`/${value.toLowerCase()}`)
    }

    const navigateToPage = (pageId) => {
        const project = Object.assign({}, project);
        setIsLoading(false);
        history.push(`/projects/${project.id}/${pageId}`);
    }
    const handleEnterPressed = (key) => {
        if (key === 'Enter') {
            addNewPage();
        }
    }

    const addNewPage = () => {
        const name = newPageName;
        const route = newPageRoute;

        const page = {
            id: uuid.v1(),
            route,
            name,
            elements: []
        };

        const pages = [...pages];
        pages.push(page);

        const token = localStorage.getItem('token');

        actions.updateProject(project.id, pages, token);
        setPages(pages);
        setNewPageName('');
        setNewPageRoute('');

        // setState callback
        executeStylesScript();
    }

    const changeUpdateStatus = () => {
        if(isUpdating) {
            setNewPageName('');
            setNewPageRoute('');
            setUpdatePage(null);
        }

        setIsUpdating(!isUpdating);
    }

    const isValid = (field, value) => {
        switch(field) {
        case 'newPageName':
            if(!value || !value.match('^[A-z0-9]+$') ||
                    pages.find((p => p.name.toLowerCase() === value.toLowerCase()))) {
                return false;
            }
            return true;
        default:
            return true;
        }
    }

    const selectPage = (id) => {
        const pages = [...pages];
        const page = Object.assign({}, pages.find(p => p.id === id));
        setUpdatePage(page);
        setNewPageName(page.name);
        setNewPageRoute(page.route);
    }

    const handleUpdatePage = () => {
        const page = {
            name: newPageName,
            route: newPageRoute
        };

        const pages = [...pages];
        const foundPageIndex = pages.findIndex((p) => p.id === updatePage.id);

        page.elements = pages[foundPageIndex].elements;
        page.id = pages[foundPageIndex].id;
        pages[foundPageIndex] = page;

        clearState(pages);
    }

    const deletePage = () => {
        const pages = [...pages];
        const foundPageIndex = pages.findIndex((p) => p.id === updatePage.id);

        pages.splice(foundPageIndex, 1);
        clearState(pages);
    }

    const navigateToDashboard = () => {
        setIsLoading(false);
        history.push('/dashboard');
    }

    const isValidClass = () => {
        if(newPageNameError) {
            return 'routing-form-input-invalid';
        }
    }

    const getComponentJSX = (component) => {
        const style = Object.assign({}, component.style);
        if(style.height.endsWith('px')) {
            const height = parseInt(style.height, 10);
            style.height = (height / document.documentElement.scrollHeight * 200) + 'px';
            const lineHeight = parseInt(style.lineHeight, 10);
            style.lineHeight = (lineHeight / document.documentElement.scrollHeight * 200) + 'px';
        }

        if(style.fontSize) {
            const fontSize = parseInt(style.fontSize, 10);
            style.fontSize = parseInt(fontSize / document.documentElement.scrollHeight * 200, 10);
        }

        switch(component.name) {
        case componentTypes.Image:
            return (<img
                alt='element'
                key={component.index}
                src={component.src}
                style={style}/>);
        case componentTypes.Button:
            return (<button
                key={component.index}
                style={style}>
                {component.innerText}
            </button>);
        case componentTypes.Input:
            return (<input
                placeholder={component.placeholder}
                key={component.index}
                style={style}/>);
        case componentTypes.Container:
            return (<div key={component.index} style={style}>{
                component.children.map(child => getComponentJSX(child))
            }</div>);
        default:
            return (<div key={component.index} style={style}>{component.innerText}</div>);
        }
    }

    const getDeploymentInformation = () => {
        const id = project.id;
        const token = 'bla';
        actions.getDeployment(id, token);
    }

    const getTabContent = () => {
        switch(tab) {
        case 'Pages':
            return (
                    <>
                        <PagesEditorComponent
                            handleEnterPressed={handleEnterPressed}
                            updateNewPageValue={updateNewPageValue}
                            isValidClass={isValidClass}
                            addNewPage={addNewPage}
                            updatePage={handleUpdatePage}
                            deletePage={deletePage}
                            changeUpdateStatus={changeUpdateStatus}
                            state={{
                                newPageName,
                                newPageNameError,
                                isUpdating,
                                updatePage
                            }}/>
                        <ProjectPageComponent
                            pages={pages}
                            updatePage={handleUpdatePage}
                            selectPage={selectPage}
                            navigateToPage={navigateToPage}
                            getComponentJSX={getComponentJSX}
                            isUpdating={isUpdating}/>
                    </>
            );
        case 'Database':
            return (
                <DatabaseTabComponent/>
            );
        case 'Deployment':
            getDeploymentInformation();
            return (
                <DeploymentTabComponent
                    id={id}
                    deploymentInformation={deploymentInformation}
                    handleDeployProject={handleDeployProject}/>
            );
        default:
            return (
                <ProjectPageComponent
                    pages={pages}
                    updatePage={handleUpdatePage}
                    selectPage={selectPage}
                    navigateToPage={navigateToPage}
                    getComponentJSX={getComponentJSX}
                    isUpdating={isUpdating}/>
            );
        }
    }

    useEffect(() => {
        if(tab === tabTypes[0]) {
            executeStylesScript();
            return;
        }

        if(stateDeployment) {
            setDeploymentInformation(stateDeployment);
        }
        if(project.pages) {
            setPages(project.pages);
            setIsLoading(false);
            // This was wrapped in setState callback
            // Use callback for setting state
            executeStylesScript();
        }

        const token = localStorage.getItem('token');
        if(!user.id && !token) {
            history.push('/');
            return;
        }
        
        setId(match.params.id);
        actions.updateProject(id, null, token);
    }, [tab, stateDeployment]);

    if(isLoading) {
        return (<LoadingComponent message='Fetching project'/>);
    }

    return (
        <div className='inner-routing-container'>
            <div className='container'>
                <ProjectActionButtonsComponent
                    returnFunction={navigateToDashboard}
                    returnFunctionText='Back to dashboard'
                    handleSaveProject={handleSaveProject}
                    generateProject={generateProject}
                />
                <div className='center-container tabs-container'>
                    { 
                        tabTypes.map((tabElement, i) => {
                            let className = 'header-tab';
                            if(i === 0) {
                                className += ' left-tab';
                            }

                            if(i === tabTypes.length - 1) {
                                className += ' right-tab';
                            }

                            if(tabElement === tab) {
                                className += ' active';
                            }

                            return (
                                <div
                                    className={className}
                                    onClick={() => setTab(tabElement)}
                                    style={{
                                        width: 100 / tabTypes.length + '%'
                                    }} key={i}>
                                    {tabElement}
                                </div>
                            );}) 
                    }
                </div>
            </div>
            { getTabContent() }
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            Object.assign({}, projectActions, deploymentActions, getDeploymentActions),
            dispatch
        )
    };
};

export default connect(null, mapDispatchToProps)(InnerRoutingComponent);
