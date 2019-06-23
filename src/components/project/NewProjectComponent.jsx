import React, { Component } from 'react';
import ProjectComponentsList from './projectComponents/ProjectComponentsList';
import './NewProjectComponent.css';
import componentTypes from './components/componentTypes';

class NewProjectComponent extends Component {
    state = {
        draggableComponents: componentTypes
    }
    onDrop(data) {
        console.log(data)
    }
    render() {
        debugger;
        return (
            <div>
                <h1>Pesho</h1>
                <ProjectComponentsList 
                    draggableComponents={this.state.draggableComponents}/>
                {/* <Droppable
                    types={['fruit']} // <= allowed drop types
                    onDrop={this.onDrop.bind(this)}>
                    <ul className="Smoothie">
                        <p>1</p>
                    </ul>
                </Droppable> */}
            </div>
        );
    }
}
 
export default NewProjectComponent;