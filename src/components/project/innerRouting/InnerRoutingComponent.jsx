import React, { Component } from 'react';
import * as projectActions from '../../../actions/projectActions';
import * as deploymentActions from '../../../actions/deploymentActions';
import * as getDeploymentActions from '../../../actions/getDeploymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoadingComponent from '../../common/loading-page/LoadingComponent';
import uuid from 'uuid';
import SaveStatus from '../components/saveStatus';
import apiService from '../../../service/api.service';
import projectGenerator from '../../../service/projectGenerator.service';

import './InnerRoutingComponent.css';
import './PageElementsStyle.css';
import ProjectActionButtonsComponent from '../../common/project-actions-buttons/ProjectActionButtonsComponent';
import componentObjects, { componentTypes } from '../components/componentTypes';
import ProjectPageComponent from './tabs/pageTab/PagesTabComponent';
import PagesEditorComponent from './tabs/pageTab/PagesEditorComponent';
import DatabaseTabComponent from './tabs/databaseTab/DatabaseTabComponent';
import DeploymentTabComponent from './tabs/deploymentTab/DeploymentTabComponent';
import tabs from './tabs/projectTabs';
import InputComponent from '../../common/input/InputComponent';

class InnerRoutingComponent extends Component {
    state = {
        isLoading: true,
        pages: [],
        newPageName: '',
        newPageRoute: '',

        newPageNameError: '',

        isUpdating: false,
        updatePage: null,

        saveStatus: SaveStatus.Saved,
        tab: tabs[0],

        deploymentInformation: null
    }
    
    componentDidMount() {
        const token = localStorage.getItem('token');
        if(!this.props.user.id && !token) {
            const history = this.props.history;
            history.push('/');
            return;
        }
        const id = this.props.match.params.id;
        this.setState({ id });
        this.props.actions.updateProject(id, null, token);
    }

    componentDidUpdate() {
        if(this.state.tab === tabs[0]) {
            this.executeStylesScript();
        }
    }

    componentWillReceiveProps(props) {
        if(props.deploymentInformation) {
            this.setState({ deploymentInformation: props.deploymentInformation });
        }
        if(props.project.pages) {
            this.setState({ pages: props.project.pages, isLoading: false }, () => {
                this.executeStylesScript();
            });
        }
    }

    generateProject = async () => {
        const token = localStorage.getItem('token');
        const response = await apiService.getProjectTemplates(this.props.project.id, token);
        const templates = response.data;
        const name = this.props.project.name;
        projectGenerator.generateProjectFiles(templates, name);
    }

    handleSaveProject = () => {
        const token = localStorage.getItem('token');
        if(!token) {
            return;
        }

        const pages = [...this.state.pages];

        this.setState({ saveStatus: SaveStatus.Saved });
        
        this.props.actions.updateProject(this.state.id, pages, token);
    }

    handleDeployProject = async () => {
        this.props.actions.deployProject(this.state.id, this.props.user.token);
    }

    executeStylesScript = () => {
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
                this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
            }
        }

        nodes.forEach(node => new Item(node));
    }

    updateNewPageValue = ({ target: { value }}) => {
        if(!this.isValid('newPageName', value)) {
            this.setState({ newPageNameError: 'Name is not valid', newPageName: value });
            return;
        }

        this.setState({ newPageNameError: '', newPageName: value, newPageRoute: `/${value.toLowerCase()}` });
    }

    navigateToPage = (pageId) => {
        const project = Object.assign({}, this.props.project);
        this.setState({ isLoading: false });
        const history = this.props.history;
        history.push(`/projects/${project.id}/${pageId}`);
    }
    handleEnterPressed = (key) => {
        if (key === 'Enter') {
            this.addNewPage();
        }
    }

    addNewPage = () => {
        const name = this.state.newPageName;
        const route = this.state.newPageRoute;
        const body = {
            ...componentObjects.find((c) => c.name === componentTypes.Body),
            index: 'body'
        };

        const page = {
            id: uuid.v1(),
            route,
            name,
            elements: [ body ]
        };

        const pages = [...this.state.pages];
        pages.push(page);

        const token = localStorage.getItem('token');

        this.props.actions.updateProject(this.props.project.id, pages, token);
        this.setState({ pages, newPageName: '', newPageRoute: '' }, () => {
            this.executeStylesScript();
        });
    }

    changeUpdateStatus = () => {
        if(this.state.isUpdating) {
            this.setState({ newPageName: '', newPageRoute: '', updatePage: null });
        }

        this.setState({ isUpdating: !this.state.isUpdating });
    }

    isValid = (field, value) => {
        switch(field) {
        case 'newPageName':
            if(!value || !value.match('^[A-z0-9]+$') ||
                    this.state.pages.find((p => p.name.toLowerCase() === value.toLowerCase()))) {
                return false;
            }
            return true;
        default:
            return true;
        }
    }

    selectPage = (id) => {
        const pages = [...this.state.pages];
        const page = Object.assign({}, pages.find(p => p.id === id));
        this.setState({
            updatePage: page,
            newPageName: page.name,
            newPageRoute: page.route
        });
    }

    updatePage = () => {
        const page = {
            name: this.state.newPageName,
            route: this.state.newPageRoute
        };

        const pages = [...this.state.pages];
        const foundPageIndex = pages.findIndex((p) => p.id === this.state.updatePage.id);

        page.elements = pages[foundPageIndex].elements;
        page.id = pages[foundPageIndex].id;
        pages[foundPageIndex] = page;

        this.setState({
            pages,
            isUpdating: false,
            updatePage: null,
            newPageName: '',
            newPageRoute: ''
        });
    }

    deletePage = () => {
        const pages = [...this.state.pages];
        const foundPageIndex = pages.findIndex((p) => p.id === this.state.updatePage.id);

        pages.splice(foundPageIndex, 1);
        this.setState({
            pages,
            isUpdating: false,
            updatePage: null,
            newPageName: '',
            newPageRoute: ''
        });
    }

    navigateToDashboard = () => {
        this.setState({ isLoading: false });
        const history = this.props.history;
        history.push('/dashboard');
    }

    getComponentJSX = (component) => {
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
            return (<InputComponent
                placeholder={component.placeholder}
                key={component.index}
                style={style}/>);
        case componentTypes.Container:
            return (<div key={component.index} style={style}>{
                component.children.map(child => this.getComponentJSX(child))
            }</div>);
        default:
            return (<div key={component.index} style={style}>{component.innerText}</div>);
        }
    }

    getDeploymentInformation = () => {
        const id = this.props.project.id;
        const token = 'bla';
        this.props.actions.getDeployment(id, token);
    }

    getTabContent = () => {
        switch(this.state.tab) {
        case 'Pages':
            return (
                    <>
                        <PagesEditorComponent
                            handleEnterPressed={this.handleEnterPressed}
                            updateNewPageValue={this.updateNewPageValue}
                            addNewPage={this.addNewPage}
                            updatePage={this.updatePage}
                            deletePage={this.deletePage}
                            changeUpdateStatus={this.changeUpdateStatus}
                            state={this.state}/>
                        <ProjectPageComponent
                            pages={this.state.pages}
                            updatePage={this.updatePage}
                            selectPage={this.selectPage}
                            navigateToPage={this.navigateToPage}
                            getComponentJSX={this.getComponentJSX}
                            isUpdating={this.state.isUpdating}/>
                    </>
            );
        case 'Database':
            return (
                <DatabaseTabComponent/>
            );
        case 'Deployment':
            this.getDeploymentInformation();
            return (
                <DeploymentTabComponent
                    id={this.state.id}
                    deploymentInformation={this.state.deploymentInformation}
                    handleDeployProject={this.handleDeployProject}/>
            );
        default:
            return (
                <ProjectPageComponent
                    pages={this.state.pages}
                    updatePage={this.updatePage}
                    selectPage={this.selectPage}
                    navigateToPage={this.navigateToPage}
                    getComponentJSX={this.getComponentJSX}
                    isUpdating={this.state.isUpdating}/>
            );
        }
    }

    render() {
        if(this.state.isLoading) {
            return (<LoadingComponent message='Fetching project'/>);
        }

        return (
            <div className='inner-routing-container'>
                <div className='container'>
                    <ProjectActionButtonsComponent
                        returnFunction={this.navigateToDashboard}
                        returnFunctionText='Back to dashboard'
                        handleSaveProject={this.handleSaveProject}
                        generateProject={this.generateProject}
                    />
                    <div className='center-container tabs-container'>
                        { 
                            tabs.map((tab, i) => {
                                let className = 'header-tab';
                                if(i === 0) {
                                    className += ' left-tab';
                                }

                                if(i === tabs.length - 1) {
                                    className += ' right-tab';
                                }

                                if(tab === this.state.tab) {
                                    className += ' active';
                                }

                                return (
                                    <div
                                        className={className}
                                        onClick={() => this.setState({ tab })}
                                        style={{
                                            width: 100 / tabs.length + '%'
                                        }} key={i}>
                                        {tab}
                                    </div>
                                );}) 
                        }
                    </div>
                </div>
                { this.getTabContent() }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.project,
        user: state.user,
        projectStatus: state.projectStatus,
        deploymentInformation: state.deployment
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            Object.assign({}, projectActions, deploymentActions, getDeploymentActions),
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InnerRoutingComponent);
