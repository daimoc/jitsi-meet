import ReducerRegistry from '../base/redux/ReducerRegistry';
import { exportToBlob } from '@jitsi/excalidraw';

import { EXPORT_WHITEBOARD, RESET_WHITEBOARD, SETUP_WHITEBOARD, SET_WITEBOARD_API_REF } from './actionTypes';
import { useState } from 'react';

export interface IWhiteboardState {

    /**
     * The whiteboard collaboration details.
     */
    collabDetails?: { roomId: string; roomKey: string; };

    /**
     * The indicator which determines whether the whiteboard is open.
     *
     * @type {boolean}
     */
    isOpen: boolean;

    collabAPIext: any;
}

const DEFAULT_STATE: IWhiteboardState = {
    isOpen: false,
    collabAPIext: null
};

export interface IWhiteboardAction extends Partial<IWhiteboardState> {

    /**
     * The whiteboard collaboration details.
     */
    collabDetails?: { roomId: string; roomKey: string; };

    payload? : any;
    /**
     * The action type.
     */
    type: string;


}

ReducerRegistry.register(
    'features/whiteboard',
    (state: IWhiteboardState = DEFAULT_STATE, action: IWhiteboardAction) => {
        switch (action.type) {
        case SETUP_WHITEBOARD: {
            return {
                ...state,
                isOpen: true,
                collabDetails: action.collabDetails
            };
        }
        
        case SET_WITEBOARD_API_REF:{
            return {
                ...state,
                collabAPIext: action.payload
            };
        }
        case EXPORT_WHITEBOARD:{
            const elements = state.collabAPIext.current.getSceneElements();
            state.collabAPIext.current.exportToBlob(elements);
            return {
                ...state,
            };
        }
        
        case RESET_WHITEBOARD:
            return DEFAULT_STATE;
        }
        return state;
    });
