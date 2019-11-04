import React from 'react';
import PropTypes from 'prop-types';
import "../innerRouting/PageElementsStyle.css";
import "./TemplatesTabComponent.css";

const TemplatesTabComponent = ({
    template,
    selectTemplate
}) => {
    return (
        <div className='template-pages-styling-container' onClick={() => selectTemplate(template.id)}>
            <ul className='template-page-styling-ul'>
                {template.pages.map((page) => (
                    <li
                        key={page.id}
                        className='template-page-styling-li'>
                        <div className="normal">
                            <h3>{page.name}</h3>
                            <p>{page.route}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

TemplatesTabComponent.propTypes = {
    pages: PropTypes.array.isRequired,
    selectTemplate: PropTypes.func.isRequired
};

export default TemplatesTabComponent;