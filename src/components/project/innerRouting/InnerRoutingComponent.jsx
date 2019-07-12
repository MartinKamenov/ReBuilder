import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './InnerRoutingComponent.css';

class InnerRoutingComponent extends Component {
    state = {
        pages: [{
            route: '/bla',
            components: []
        }]
    }
    render() {
        debugger;
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

export default InnerRoutingComponent;
