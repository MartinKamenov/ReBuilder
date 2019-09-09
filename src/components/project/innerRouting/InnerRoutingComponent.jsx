import React, { Component } from 'react';
import * as projectActions from '../../../actions/projectActions';
import * as deploymentActions from '../../../actions/deploymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoadingComponent from '../../common/LoadingComponent';
import uuid from 'uuid';
import projectGenerator from '../../../service/projectGenerator.service';
import SaveStatus from '../components/saveStatus';

import './InnerRoutingComponent.css';
import './PageElementsStyle.css';
import ButtonComponent from '../../common/ButtonComponent';
import ProjectActionButtonsComponent from '../../common/ProjectActionButtonsComponent';
import { componentTypes } from '../components/componentTypes';
import tabs from './tabs/projectTabs';

class InnerRoutingComponent extends Component {
    state = {
        isLoading: true,
        pages: [],
        newPageName: '',
        newPageRoute: '',

        newPageNameError: '',
        newPageRouteError: '',

        isUpdating: false,
        updatePage: null,

        saveStatus: SaveStatus.Saved,
        tab: tabs[0]
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

    componentWillReceiveProps(props) {
        if(props.project.pages) {
            this.setState({ pages: props.project.pages, isLoading: false }, () => {
                this.executeStylesScript();
            });
        }
    }

    generateProject = () => {
        const pages = [...this.props.project.pages];
        const index = pages.findIndex((p) => p.id === this.state.pageId);
        pages[index] = this.state.page;

        const project = Object.assign({}, this.props.project);
        projectGenerator.generateProject(project.name, pages, project.projectImageUrl);
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
        }

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

    updateNewPageValue = (field, value) => {
        this.setState({ [field]: value });
    }

    navigateToPage = (pageId) => {
        const project = Object.assign({}, this.props.project);
        this.setState({ isLoading: false });
        const history = this.props.history;
        history.push(`/projects/${project.id}/${pageId}`);
    }
    handleEnterPressed = (key) => {
        if (key === "Enter") {
            this.addNewPage();
        }
    }

    addNewPage = () => {
        const name = this.state.newPageName;
        const route = this.state.newPageRoute;
        if(!this.isValid('newPageName')) {
            this.setState({ 
                newPageNameError: 'Please provide unique name only using symbols and numbers.'
            });
            return;
        }

        this.setState({ newPageNameError: '' });

        if(!this.isValid('newPageRoute')) {
            this.setState({ newPageRouteError: `Please provide unique route, which starts with "/" symbol.` });
            return;
        }

        this.setState({ newPageRouteError: '' });

        const page = {
            id: uuid.v1(),
            route,
            name,
            elements: []
        };

        const pages = [...this.props.project.pages];
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

    isValid = (field) => {
        const value = this.state[field];
        switch(field) {
            case 'newPageName':
                if(!value || !value.match("^[A-z0-9]+$") ||
                    this.state.pages.find((p => p.name.toLowerCase() === value.toLowerCase()))) {
                    return false;
                }
                return true;
            case 'newPageRoute':
                if(!value || !value.match("^[A-z0-9/]+$") || !value.startsWith('/') ||
                    this.state.pages.find((p => p.route.toLowerCase() === value.toLowerCase()))) {
                    return false;
                }
                return true;
            default:
                return false;
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

    isValidClass = (errorField) => {
        if(this.state[errorField]) {
            return 'routing-form-input-invalid';
        }
    }

    getComponentJSX = (component) => {
        const style = Object.assign({}, component.style);
        if(style.height.endsWith('px')) {
            const height = parseInt(style.height, 10);
            style.height = (height / document.documentElement.scrollHeight * 200) + 'px';
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
            case componentTypes.Container:
                return (<div key={component.index} style={style}>{
                    component.children.map(child => this.getComponentJSX(child))
                }</div>);
            default:
                return (<div key={component.index} style={style}>{component.innerText}</div>);
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
                        handleDeployProject={this.handleDeployProject}
                    />
                    <div className='center-container'>
                        { tabs.map((tab, i) => (
                        <div className='header-tab' style={{
                            display: 'inline-block',
                            width: 100 / tabs.length + '%',
                            height: 30,
                            border: '1px solid red'
                        }} key={i}>{tab}</div>)) }
                    </div>
                    <div className='center-container routing-form-container'  onKeyDown={(event) => this.handleEnterPressed(event.key)}>
                        <div className='routing-form-input-container'>
                            <input
                                value={this.state.newPageName}
                                onChange={(event) => this.updateNewPageValue('newPageName', event.target.value)}
                                className={'routing-form-input ' + this.isValidClass('newPageNameError')}
                                placeholder='Page name'/>
                            {
                                this.state.newPageNameError ? (
                                    <div className='routing-form-input-error'>
                                        {this.state.newPageNameError}
                                    </div>
                                ) : (
                                    <div></div>
                                )
                            }
                        </div>
                        <div className='routing-form-input-container'>
                            <input
                                value={this.state.newPageRoute}
                                onChange={(event) => this.updateNewPageValue('newPageRoute', event.target.value)}
                                className={'routing-form-input ' + this.isValidClass('newPageRouteError')}
                                placeholder='Page route'/>
                            {
                                this.state.newPageRouteError ? (
                                    <div className='routing-form-input-error'>
                                        {this.state.newPageRouteError}
                                    </div>
                                ) : (
                                    <div></div>
                                )
                            }
                        </div>
                        { this.state.isUpdating ?
                            (
                                <>
                                    {this.state.updatePage ? (
                                        <>
                                            <ButtonComponent
                                                rounded={false}
                                                type='success'
                                                onClick={this.updatePage}
                                                className='routing-from-button'>
                                                    Save page
                                            </ButtonComponent>
                                            <ButtonComponent
                                                rounded={false}
                                                type='danger'
                                                onClick={this.deletePage}
                                                className='routing-from-button'>
                                                    Delete page
                                            </ButtonComponent>
                                        </>
                                    ) : (null)}

                                    <ButtonComponent
                                        rounded={false}
                                        type='warning'
                                        onClick={this.changeUpdateStatus}
                                        className='routing-from-button'>
                                            Cancel update
                                    </ButtonComponent>
                                </>
                            ) : (
                                <>
                                    <ButtonComponent
                                        rounded={false}
                                        type='success'
                                        onClick={this.addNewPage}
                                        className='routing-from-button'>
                                            Create page
                                    </ButtonComponent>
                                    <ButtonComponent
                                        rounded={false}
                                        type='warning'
                                        onClick={this.changeUpdateStatus}
                                        className='routing-from-button'>
                                            Update page
                                    </ButtonComponent>
                                </>
                            ) 
                        }
                        
                    </div>
                </div>
                <div className='routing-pages-styling-container'>
                    <ul className='routing-page-styling-ul'>
                        {this.state.pages.map((page) => (
                            <li
                                key={page.id}
                                className={'routing-page-styling-li' +
                                    ((
                                        this.state.updatePage &&
                                        this.state.updatePage.id === page.id
                                    ) ? ' blinkdiv' : '')
                                    }>
                                <div
                                    className='normal'
                                    onClick={() => {
                                        if(this.state.isUpdating) {
                                            this.selectPage(page.id);
                                            return;
                                        }

                                        this.navigateToPage(page.id);
                                    }}>
                                    <div className='hover-shadow'>
                                    </div>
                                    <div style={{zIndex: 0}}>
                                        {
                                            page.elements
                                                .map((component) => this.getComponentJSX(component))
                                        }
                                    </div>
                                    
                                </div>
                                <div className='info'>
                                    <h3 className='routing-page-styling-h3'>{page.name}</h3>
                                    <p>{page.route}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.project,
        user: state.user,
        projectStatus: state.projectStatus
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            Object.assign({}, projectActions, deploymentActions),
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InnerRoutingComponent);
