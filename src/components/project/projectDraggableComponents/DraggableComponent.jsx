import React from 'react';
import { Draggable } from 'react-drag-and-drop';
import PropTypes from 'prop-types';
import './DraggableComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeading,
    faFont,
    faBorderAll,
    faItalic,
    faLink
} from '@fortawesome/free-solid-svg-icons';

import { componentTypes } from '../components/componentTypes';

const DraggableComponent = ({draggableComponent}) => {
    return (
        <Draggable type="component" data={draggableComponent.name}>
            <div className='draggable-element'>
                {(() => {
                        let icon = <FontAwesomeIcon className='action-icon' icon={faFont} />;
                        switch(draggableComponent.name) {
                            case componentTypes.Header:
                                icon = <FontAwesomeIcon className='action-icon' icon={faHeading} />;
                                break;
                            case componentTypes.Text:
                                icon = <FontAwesomeIcon className='action-icon' icon={faFont} />;
                                break;
                            case componentTypes.Grid:
                                icon = <FontAwesomeIcon className='action-icon' icon={faBorderAll} />;
                                break;
                            case componentTypes.Input:
                                icon = <FontAwesomeIcon className='action-icon' icon={faItalic} />;
                                break;
                            case componentTypes.RoutingLink:
                                icon = <FontAwesomeIcon className='action-icon' icon={faLink} />;
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