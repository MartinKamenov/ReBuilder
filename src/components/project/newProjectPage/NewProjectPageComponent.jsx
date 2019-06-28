import React, { Component } from 'react';

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
            <div>
                <label>Project name</label>
                <input
                    className='new-project-name-input'
                    placeholder='Add name here'
                    value={this.state.name}
                    onChange={(event) => this.handleChangeInput(event.target.value, 'name')}/>
                <label>Project image</label>
                <input
                    className='new-project-name-input'
                    placeholder='Add name here'
                    value={this.state.projectImage}
                    onChange={(event) => this.handleChangeInput(event.target.value, 'projectImage')}/>
            </div>
        );
    }
}
 
export default NewProjectPageComponent;
