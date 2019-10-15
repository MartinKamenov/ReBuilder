import React from 'react';
import PropTypes from 'prop-types';

import './PagingComponent.css';
import { Link } from 'react-router-dom';

const PagingComponent = ({ page, pagesNumbers, totalPagesCount, changePage }) => {
    return (
        <div className='container paging-container'>
            <div
                onClick={() => changePage(1)}
                className='paging-element'
                key='first'>
                {'<<'}
            </div>
            {
                pagesNumbers.map(number => (
                    <div
                        onClick={() => changePage(number)}
                        className={`paging-element ${((number === page) ? ' active-page': '')}`}
                        key={number}>
                        {number}
                    </div>
                ))
            }
            <div
                onClick={() => changePage(totalPagesCount)}
                className='paging-element'
                key='last'>
                {'>>'}
            </div>
        </div>
    );
};

PagingComponent.propTypes = {
    page: PropTypes.number.isRequired,
    pagesNumbers: PropTypes.array.isRequired,
    totalPagesCount: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired
};
 
export default PagingComponent;