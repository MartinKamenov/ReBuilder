import React, { Component } from 'react';
import * as projectActions from '../../../actions/projectActions';
import * as deploymentActions from '../../../actions/deploymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoadingComponent from '../../common/LoadingComponent';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSave, faArrowAltCircleUp, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import projectGenerator from '../../../service/projectGenerator.service';
import SaveStatus from '../components/saveStatus';

import './InnerRoutingComponent.css';
import './PageElementsStyle.css';
import ButtonComponent from '../../common/ButtonComponent';

class InnerRoutingComponent extends Component {
    state = {
        isLoading: true,
        pages: [],
        newPageName: '',
        newPageRoute: '',

        newPageNameError: '',
        newPageRouteError: ''
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

        const droppedComponents = [...this.state.droppedComponents];
        const page = Object.assign({}, this.state.page);
        page.elements = droppedComponents;

        const pages = [...this.props.project.pages];
        const index = pages.findIndex((p) => p.id === this.state.pageId);
        pages[index] = page;

        this.setState({ page, saveStatus: SaveStatus.Saved });
        
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

    isValidClass = (errorField) => {
        if(this.state[errorField]) {
            return 'routing-form-input-invalid';
        }
    }

    render() {
        if(this.state.isLoading) {
            return (<LoadingComponent message='Fetching project'/>);
        }

        return (
            <div className='inner-routing-container'>
                <div className='container'>
                    <div className='new-project-name-outer-container'>
                        <div className='new-project-name-inner-container'>
                            <div className='generate-project-btn-container'>
                                <ButtonComponent
                                    type='primary'
                                    className='col-md-4 project-action-btn'
                                    onClick={this.handleSaveProject}>
                                    <FontAwesomeIcon icon={faSave} /> 
                                    <span className='new-project-btn-text'>Save project</span>
                                </ButtonComponent>
                                <ButtonComponent
                                    type='warning'
                                    className='col-md-4 project-action-btn'
                                    onClick={this.generateProject}>
                                    <FontAwesomeIcon icon={faDownload} />
                                    <span className='new-project-btn-text'>Generate project</span>
                                </ButtonComponent>
                                <ButtonComponent
                                    type='success'
                                    className='col-md-4 project-action-btn'
                                    onClick={this.handleDeployProject}>
                                    <FontAwesomeIcon icon={faArrowAltCircleUp} />
                                    <span className='new-project-btn-text'>Deploy project</span>
                                </ButtonComponent>
                            </div>
                        </div>
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
                        <ButtonComponent
                            rounded={false}
                            type='success'
                            onClick={this.addNewPage}
                            className='routing-from-button'>
                                Create page
                        </ButtonComponent>
                    </div>
                </div>
                <div className='routing-pages-styling-container'>
                    <ul className='routing-page-styling-ul'>
                        {this.state.pages.map((page) => (
                            <li
                                key={page.id}
                                className='routing-page-styling-li'>
                                <Link
                                    className='normal'
                                    to={`/projects/${this.props.project.id}/${page.id}`}>
                                <svg viewBox='0 0 80 76' x='0px' y='0px'>
                                    <g>
                                    <path d='M 68.9708 24.8623 L 60.4554 2.3018 C 59.9641 0.7017 58.1628 -0.2583 56.5252 0.3817 L 1.9822 20.2222 C 0.3822 20.7022 -0.4179 22.6222 0.2222 24.2223 L 8.8624 47.7797 L 8.8624 35.1484 C 8.8624 29.5024 13.3425 24.8623 18.8857 24.8623 L 32.9442 24.8623 L 50.63 12.862 L 60.7829 24.8623 L 68.9708 24.8623 L 68.9708 24.8623 ZM 77.098 32.0625 L 18.8857 32.0625 C 17.2512 32.0625 16.0625 33.4511 16.0625 35.1484 L 16.0625 72.8491 C 16.0625 74.5477 17.2512 75.9375 18.8857 75.9375 L 77.098 75.9375 C 78.742 75.9375 79.9376 74.5477 79.9376 72.8491 L 79.9376 35.1484 C 79.9376 33.4511 78.742 32.0625 77.098 32.0625 L 77.098 32.0625 ZM 73.0626 68.0625 L 23.9375 68.0625 L 23.9375 61.0852 L 31.4704 43.7232 L 42.7696 57.6777 L 53.4138 46.8062 L 67.1695 41.9375 L 73.0626 55.0815 L 73.0626 68.0625 L 73.0626 68.0625 Z' />
                                    </g>
                                </svg>
                                </Link>
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
