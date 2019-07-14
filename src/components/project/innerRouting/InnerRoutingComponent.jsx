import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import * as projectActions from '../../../actions/projectActions';
import * as deploymentActions from '../../../actions/deploymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './InnerRoutingComponent.css';
import LoadingComponent from '../../common/LoadingComponent';
import uuid from 'uuid';

class InnerRoutingComponent extends Component {
    state = {
        pages: []
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

    navigateToPage = (pageId) => {
        const project = this.props.project;
        this.setState({ isLoading: false });
        const history = this.props.history;
        history.push(`/${project.id}/${pageId}`);
    }

    addNewPage = () => {
        const page = {
            uuid: uuid.v1(),
            route: '/routing',
            elements: []
        };

        const project = this.props.project;
        project.pages.push(page);

        this.props.actions.updateProject(project.id, project.pages, this.props.user.id);
        this.setState({ pages: project.pages });
    }

    render() {
        if(!this.props.project.id) {
            return (<LoadingComponent message='Fetching project'/>);
        }
        return (
            <div>
                {
                    this.state.pages.map((page) => {
                        return (
                            <div key={page.id} className='col-md-4 col-sm-6 outer-route-container'>
                                <div className='routing-page-component'>
                                    {page.route}
                                </div>
                            </div>
                        );
                    })
                }

                <div className='col-md-4 col-sm-6 outer-route-container'>
                    <div
                        className='routing-page-component add-route-container'
                        onClick={this.addNewPage}>
                        <h3>Add new page</h3>
                        <FontAwesomeIcon style={{width: 100, height: 100}} icon={faPlusCircle} />
                    </div>
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
