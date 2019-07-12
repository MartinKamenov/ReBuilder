import React from 'react';
import './InnerRoutingComponent.css';

class InnerRoutingComponent extends Component {
    state = {
        pages: []
    }
    render() { 
        return (
            <div>
                {
                    this.state.pages.map(() => {
                        return <div></div>;
                    })
                }
            </div>
        );
    }
}

export default InnerRoutingComponent;
