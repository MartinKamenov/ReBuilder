import React from 'react';
import templates from '../../../service/ready-templates/';
import './TemplateSelectPageComponent.css';

const TemplateSelectPageComponent = () => {
    return (
        <div>
            {templates.map((template, i) => (
                <div key={i}>
                    {template.name}
                </div>
            ))}
        </div>
    );
}
 
export default TemplateSelectPageComponent;