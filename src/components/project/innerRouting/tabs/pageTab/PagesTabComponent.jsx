import React from 'react';
import PropTypes from 'prop-types';

import './PagesTabComponent.css';

const PagesTabComponent = ({
    pages,
    updatePage,
    selectPage,
    navigateToPage,
    getComponentJSX,
    isUpdating
}) => (
    <div className='routing-pages-styling-container'>
        <ul className='routing-page-styling-ul'>
            {pages.map((page) => (
                <li
                    key={page.id}
                    className={'routing-page-styling-li' +
                        ((
                            updatePage &&
                            updatePage.id === page.id
                        ) ? ' blinkdiv' : '')
                    }>
                    <div
                        className='normal'
                        onClick={() => {
                            if(isUpdating) {
                                selectPage(page.id);
                                return;
                            }

                            navigateToPage(page.id);
                        }}>
                        <div className='hover-shadow'>
                        </div>
                        <div style={{zIndex: 0}}>
                            {
                                page.elements
                                    .map((component) => getComponentJSX(component))
                            }
                        </div>
                        
                    </div>
                    <div className='info'>
                        <h3 className='page-name-header'>{page.name}</h3>
                        <p className='page-name-route'>Route: "{page.route}"</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

PagesTabComponent.propTypes = {
    pages: PropTypes.array.isRequired,
    updatePage: PropTypes.func.isRequired,
    selectPage: PropTypes.func.isRequired,
    navigateToPage: PropTypes.func.isRequired,
    getComponentJSX: PropTypes.func.isRequired,
    isUpdating: PropTypes.bool.isRequired
};

export default PagesTabComponent;