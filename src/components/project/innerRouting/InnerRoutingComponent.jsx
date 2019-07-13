import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import * as projectActions from '../../../actions/projectActions';
import * as deploymentActions from '../../../actions/deploymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './InnerRoutingComponent.css';

class InnerRoutingComponent extends Component {
    render() {
        return (
            <div>
                {
                    this.state.pages.map(() => {
                        return <div className='col-md-4 routing-page-component'>
                            Pesho
                        </div>;
                    })
                }

                <div className='col-md-4 routing-page-component add-route-container'>
                    <h3>Add new page</h3>
                    <FontAwesomeIcon style={{width: 100, height: 100}} icon={faPlusCircle} />
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
