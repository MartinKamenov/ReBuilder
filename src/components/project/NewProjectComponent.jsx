import React, { Component } from 'react';
import { Draggable, Droppable } from 'react-drag-and-drop'
import './NewProjectComponent.css';

class NewProjectComponent extends Component {
    state = {  }
    onDrop(data) {
        console.log(data)
    }
    render() {
        return (
            <div>
            <ul>
                <Draggable type="fruit" data="banana"><li>Banana</li></Draggable>
                <Draggable type="fruit" data="apple"><li>Apple</li></Draggable>
                <Draggable type="metal" data="silver"><li>Silver</li></Draggable>
            </ul>
            <Droppable
                types={['fruit']} // <= allowed drop types
                onDrop={this.onDrop.bind(this)}>
                <ul className="Smoothie">
                    <p>1</p>
                </ul>
            </Droppable>
        </div>        
        );
    }
}
 
export default NewProjectComponent;