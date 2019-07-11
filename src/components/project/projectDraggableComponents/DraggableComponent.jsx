import React from 'react';
import { Draggable } from 'react-drag-and-drop';
import PropTypes from 'prop-types';
import './DraggableComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading, faFont, faBorderAll, faItalic } from '@fortawesome/free-solid-svg-icons';

const DraggableComponent = ({draggableComponent}) => {
    return (
        <Draggable type="component" data={draggableComponent.name}>
            <div className='draggable-element'>
                {(() => {
                        let icon = <FontAwesomeIcon className='action-icon' icon={faFont} />;
                        switch(draggableComponent.name) {
                            case 'Header':
                                icon = <FontAwesomeIcon className='action-icon' icon={faHeading} />;
                                break;
                            case 'Text':
                                icon = <FontAwesomeIcon className='action-icon' icon={faFont} />;
                                break;
                            case 'Grid':
                                icon = <FontAwesomeIcon className='action-icon' icon={faBorderAll} />;
                                break;
                            case 'Input':
                                icon = <FontAwesomeIcon className='action-icon' icon={faItalic} />;
                                break;
                            default:
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