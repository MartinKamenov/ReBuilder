import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import * as projectActions from '../../../actions/projectActions';
import * as deploymentActions from '../../../actions/deploymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './InnerRoutingComponent.css';
import './PageElementsStyle.css';
import LoadingComponent from '../../common/LoadingComponent';
import uuid from 'uuid';

class InnerRoutingComponent extends Component {
    state = {
        pages: [],
        isAdding: false,
        newPageName: '',
        newPageRoute: ''
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
            this.setState({ pages: props.project.pages });
        }
    }

    updateNewPageValue = (field, value) => {
        this.setState({ [field]: value });
    }

    changeIsAdding = () => {
        this.setState({ isAdding: !this.state.isAdding });
    }

    navigateToPage = (pageId) => {
        const project = Object.assign({}, this.props.project);
        this.setState({ isLoading: false });
        const history = this.props.history;
        history.push(`/projects/${project.id}/${pageId}`);
    }

    addNewPage = () => {
        const page = {
            id: uuid.v1(),
            route: this.state.newPageRoute,
            name: this.state.newPageName,
            elements: []
        };

        const pages = [...this.props.project.pages];
        pages.push(page);

        const token = localStorage.getItem('token');

        this.props.actions.updateProject(this.props.project.id, pages, token);
        this.setState({ pages, isAdding: false });
    }

    render() {
        if(!this.props.project.id) {
            return (<LoadingComponent message='Fetching project'/>);
        }

        return (
            <div>
                <div>
                    {
                        this.state.isAdding ? 
                        (
                        <div className='routing-page-component edit-mode-add-route-container'>
                            <input
                                value={this.state.newPageName}
                                onChange={(event) => this.updateNewPageValue('newPageName', event.target.value)}
                                className='from-input'
                                placeholder='Page name'/>
                            <input
                                value={this.state.newPageRoute}
                                onChange={(event) => this.updateNewPageValue('newPageRoute', event.target.value)}
                                className='from-input'
                                placeholder='Page route'/>
                            <button
                                onClick={this.addNewPage}
                                className='btn btn-success from-input'>
                                    Create page
                            </button>
                        </div>
                        )
                        :
                        (
                            <div
                                className='routing-page-component add-route-container'
                                onClick={this.changeIsAdding}>
                                <h3>Add new page</h3>
                                <FontAwesomeIcon style={{width: 100, height: 100}} icon={faPlusCircle} />
                            </div>
                        )
                    }
                    
                </div>
                {
                    this.state.pages.map((page) => {
                        return (
                            <div
                                onClick={() => this.navigateToPage(page.id)}
                                key={page.id}
                                className='col-md-4 col-sm-6 outer-route-container'>
                                <div className='routing-page-component'>
                                    {page.name}
                                </div>
                            </div>
                        );
                    })
                }
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
