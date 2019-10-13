import React from 'react';
import PropTypes from 'prop-types';

import './PagingComponent.css';
import { Link } from 'react-router-dom';

const PagingComponent = ({ page, pagesNumbers, totalPagesCount }) => {
    return (
        <div className='container'>
            <div className='paging-container'>
                <a href='/dashboard/1'>
                    <div
                        className='paging-element'
                        key='first'>
                        {'<<'}
                    </div>
                </a>
                {
                    pagesNumbers.map(number => (
                        <a href={`/dashboard/${number}`}>
                            <div
                                className='paging-element'
                                key={number}>
                                {number}
                            </div>
                        </a>
                    ))
                }
                <a href={`/dashboard/${totalPagesCount}`}>
                    <div
                        className='paging-element'
                        key='last'>
                        {'>>'}
                    </div>
                </a>
            </div>
        </div>
    );
};

PagingComponent.propTypes = {
    page: PropTypes.number.isRequired,
    pagesNumbers: PropTypes.array.isRequired,
    totalPagesCount: PropTypes.number.isRequired
};
 
export default PagingComponent;