import React from 'react';
import PropTypes from 'prop-types';

import './PagingComponent.css';

const PagingComponent = ({ page, pagesNumbers, totalPagesCount }) => {
    return (
        <div className='container'>
            <div className='paging-container'>
                <div
                    className='paging-element'
                    key='first'>
                    {'<<'}
                </div>
                {
                    pagesNumbers.map(number => (
                        <div
                            className='paging-element'
                            key={number}>
                            {number}
                        </div>
                    ))
                }
                <div
                    className='paging-element'
                    key='last'>
                    {'>>'}
                </div>
            </div>
        </div>
    );
}

PagingComponent.propTypes = {
    page: PropTypes.number.isRequired,
    pagesNumbers: PropTypes.array.isRequired
};
 
export default PagingComponent;