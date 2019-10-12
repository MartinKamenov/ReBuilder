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
    faLink,
    faBox,
    faRoute,
    faImage
} from '@fortawesome/free-solid-svg-icons';

import { componentTypes } from '../components/componentTypes';

const DraggableComponent = ({draggableComponent}) => {
    return (
        <Draggable type="component"
            data={draggableComponent.name}
            style={{
                display: 'inline-block',
                marginLeft: '2px',
                marginRight: '2px',
                borderRadius: '50%'
            }}
            title={`${draggableComponent.name}\n${draggableComponent.description}`}>
            <div className='draggable-element'>
                {(() => {
                    let icon = <FontAwesomeIcon icon={faFont} />;
                    switch(draggableComponent.name) {
                    case componentTypes.Header:
                        icon = <FontAwesomeIcon icon={faHeading} />;
                        break;
                    case componentTypes.Text:
                        icon = <FontAwesomeIcon icon={faFont} />;
                        break;
                    case componentTypes.Image:
                        icon = <FontAwesomeIcon icon={faImage} />;
                        break;
                    case componentTypes.Grid:
                        icon = <FontAwesomeIcon icon={faBorderAll} />;
                        break;
                    case componentTypes.Input:
                        icon = <FontAwesomeIcon icon={faItalic} />;
                        break;
                    case componentTypes.RoutingLink:
                        icon = <FontAwesomeIcon icon={faLink} />;
                        break;
                    case componentTypes.Container:
                        icon = <FontAwesomeIcon icon={faBox} />;
                        break;
                    case componentTypes.NavigationBar:
                        icon = <FontAwesomeIcon icon={faRoute} />;
                        break;
                    default:
                        break;
                    }
                    return icon;
                })()}
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