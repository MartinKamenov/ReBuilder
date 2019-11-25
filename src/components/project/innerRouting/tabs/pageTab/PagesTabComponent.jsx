import React from 'react';
import PropTypes from 'prop-types';

import './PagesTabComponent.css';
import CardComponent from '../../../../common/card/CardComponent';

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
            {pages.map((page) => ( <div className='col-md-4 col-sm-6'>
                <CardComponent
                    key={page.id}
                    header={{
                        name: page.name,
                        subheader: `Route: ${page.route}`
                    }}
                    cardMedia={
                        <div
                            style={{ cursor: 'pointer', height: 200 }}
                            onClick={() => {
                                if(isUpdating) {
                                    selectPage(page.id);
                                    return;
                                }

                                navigateToPage(page.id);
                            }}>
                            <div style={{ width: '100%', zIndex: 1, position: 'relative'}}></div>
                            <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
                                {
                                    page.elements
                                        .map((component) => getComponentJSX(component))
                                }
                            </div>
                        </div>
                    }
                    cardContent={{
                        description: page.route
                    }}
                    collapse={{
                        description: page.route
                    }}/></div>
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