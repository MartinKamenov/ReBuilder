import React from 'react';
import ButtonComponent from '../../../../common/ButtonComponent';

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
}) => {
    return (
        <div className='center-container routing-form-container'
            onKeyDown={
                (event) => handleEnterPressed(event.key)
            }>
            <div className='routing-form-input-container'>
                <input
                    value={state.newPageName}
                    onChange={(event) => updateNewPageValue('newPageName', event.target.value)}
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
            <div className='routing-form-input-container'>
                <input
                    value={state.newPageRoute}
                    onChange={(event) => updateNewPageValue('newPageRoute', event.target.value)}
                    className={'routing-form-input ' + isValidClass('newPageRouteError')}
                    placeholder='Page route'/>
                {
                    state.newPageRouteError ? (
                        <div className='routing-form-input-error'>
                            {state.newPageRouteError}
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
}
 
export default PagesEditorComponent;