import React from 'react';
import PropTypes from 'prop-types';
import PagingComponent from '../../../../common/PagingComponent';
import '../../../../common/PagingComponent.css';
import pagingService from '../../../../../service/paging.service';

import './PagesTabComponent.css';

const PagesTabComponent = ({
    pages,
    singlePage,
    collectionByPage,
    changePage,
    updatePage,
    selectPage,
    navigateToPage,
    getComponentJSX,
    isUpdating
}) => (
    <div className='routing-pages-styling-container'>
        <ul className='routing-page-styling-ul'>
            {pagingService.getCollectionByPage(pages, singlePage, collectionByPage).map((page) => (
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
                        <h3 className='routing-page-styling-h3'>{page.name}</h3>
                        <p>{page.route}</p>
                    </div>
                </li>
            ))}
        </ul>
        <PagingComponent
            page={singlePage}
            pagesNumbers={pagingService.getPagesNumbers(pages, singlePage, collectionByPage)}
            totalPagesCount={pagingService.getTotalPagesCount(pages, collectionByPage)}
            changePage={changePage}/>
    </div>
);

PagesTabComponent.propTypes = {
    pages: PropTypes.array.isRequired,
    singlePage: PropTypes.number.isRequired,
    collectionByPage: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired,
    selectPage: PropTypes.func.isRequired,
    navigateToPage: PropTypes.func.isRequired,
    getComponentJSX: PropTypes.func.isRequired,
    isUpdating: PropTypes.bool.isRequired
};

export default PagesTabComponent;