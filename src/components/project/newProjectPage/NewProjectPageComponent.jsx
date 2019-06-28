import React, { Component } from 'react';
import './NewProjectPageComponent.css';

class NewProjectPageComponent extends Component {
    state = { 
        name: '',
        projectImage: ''
    }

    handleChangeInput = (text, field) => {
        this.setState({ [field]: text });
    }
    render() { 
        return ( 
            <div className='center-container'>
                <div>
                    <label className='project-page-label'>Project name</label>
                    <input
                        className='project-page-input'
                        placeholder='Add name here'
                        value={this.state.name}
                        onChange={(event) => this.handleChangeInput(event.target.value, 'name')}/>
                    
                </div>
                <div>
                    <label className='project-page-label'>Project image</label>
                    <input
                        className='project-page-input'
                        placeholder='Add url here'
                        value={this.state.projectImage}
                        onChange={(event) => this.handleChangeInput(event.target.value, 'projectImage')}/>
                </div>
                <button className='btn btn-success project-page-button'>Create new project</button>
            </div>
        );
    }
}
 
export default NewProjectPageComponent;
