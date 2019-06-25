import React from 'react';
import { Draggable } from 'react-drag-and-drop';
import PropTypes from 'prop-types';
import './DraggableComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading, faFont } from '@fortawesome/free-solid-svg-icons';

const DraggableComponent = ({draggableComponent}) => {
    return (
        <Draggable type="component" data={draggableComponent.name}>
            <div className='draggable-element'>
                {(() => {
                        let icon = <FontAwesomeIcon icon={faFont} />;
                        switch(draggableComponent.name) {
                            case 'Header':
                                icon = <FontAwesomeIcon icon={faHeading} />;
                                break;
                            case 'Text':
                                icon = <FontAwesomeIcon icon={faFont} />;
                                break;
                        }
                    return icon;
                })()}
                
                <span>{draggableComponent.name}</span>
            </div>
        </Draggable>
    );
};

DraggableComponent.propTypes = {
    draggableComponent: PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired
};
 
export default DraggableComponent;