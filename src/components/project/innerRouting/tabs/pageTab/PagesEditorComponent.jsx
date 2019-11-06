import React from 'react';
import ButtonComponent from '../../../../common/ButtonComponent';
import PropTypes from 'prop-types';

import './PagesEditorComponent.css';

const PagesEditorComponent = ({
    handleEnterPressed,
    updateNewPageValue,
    isValidClass,
    addNewPage,
    updatePage,
    deletePage,
    changeUpdateStatus,
    state
}) => (
    <div className='center-container routing-form-container'
        onKeyDown={
            (event) => handleEnterPressed(event.key)
        }>
        <div className='routing-form-input-container'>
            <input
                value={state.newPageName}
                onChange={updateNewPageValue}
                className={'routing-form-input ' + isValidClass('newPageNameError')}
                placeholder='Page name'/>
            {
                state.newPageNameError ? (
                    <div className='routing-form-input-error'>
                        {state.newPageNameError}
                    </div>
                ) : (
                    <div></div>
                )
            }
        </div>
        { state.isUpdating ?
            (
                <>
                    {state.updatePage ? (
                        <>
                            <ButtonComponent
                                rounded={false}
                                type='success'
                                onClick={updatePage}
                                className='routing-from-button'>
                                    Save page
                            </ButtonComponent>
                            <ButtonComponent
                                rounded={false}
                                type='danger'
                                onClick={deletePage}
                                className='routing-from-button'>
                                    Delete page
                            </ButtonComponent>
                        </>
                    ) : (null)}

                    <ButtonComponent
                        rounded={false}
                        type='warning'
                        onClick={changeUpdateStatus}
                        className='routing-from-button'>
                            Cancel update
                    </ButtonComponent>
                </>
            ) : (
                <>
                    <ButtonComponent
                        rounded={false}
                        type='success'
                        onClick={addNewPage}
                        className='routing-from-button'>
                            Create page
                    </ButtonComponent>
                    <ButtonComponent
                        rounded={false}
                        type='warning'
                        onClick={changeUpdateStatus}
                        className='routing-from-button'>
                            Update page
                    </ButtonComponent>
                </>
            ) 
        }
        
    </div>
);

PagesEditorComponent.propTypes = {
    handleEnterPressed: PropTypes.func.isRequired,
    updateNewPageValue: PropTypes.func.isRequired,
    isValidClass: PropTypes.func.isRequired,
    addNewPage: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired,
    deletePage: PropTypes.func.isRequired,
    changeUpdateStatus: PropTypes.func.isRequired,
    state: PropTypes.shape({
        newPageName: PropTypes.string.isRequired,
        newPageNameError: PropTypes.string.isRequired,
        newPageRoute: PropTypes.string.isRequired,
        isUpdating: PropTypes.bool.isRequired,
        updatePage: PropTypes.object
    }).isRequired
};
 
export default PagesEditorComponent;