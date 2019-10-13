import React from 'react';
import PropTypes from 'prop-types';

import './PagingComponent.css';

const PagingComponent = ({ page, pagesNumbers }) => {
    return (
        <div className='container'>
            <div className='paging-container'>
                {
                    pagesNumbers.map(number => (
                        <div
                            className='paging-element'
                            key={number}>
                            {number}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

PagingComponent.propTypes = {
    page: PropTypes.number.isRequired,
    pagesNumbers: PropTypes.array.isRequired
};
 
export default PagingComponent;