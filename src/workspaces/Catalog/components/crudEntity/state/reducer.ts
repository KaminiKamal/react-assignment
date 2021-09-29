import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { EntityType } from "./types";

//import the services

//import {} from './types';
enum actions {
    IS_LOADING = 'IS_LOADING',
    CREATE_ENTITY = 'CREATE_ENTITY',
    READ_ENTITY = 'READ_ENTITY',
}

export interface Action {
    type: string;
    payload: {
        data: EntityType
    };
};
export type CatalogStateType = {
    isLoading: boolean,
    initialized: boolean,
    entityTypesList: EntityType[]
};

const initialCatalogState: CatalogStateType = {
    isLoading: false,
    initialized: false,
    entityTypesList: [],
};

export const actionCreators = {
    createState: (data: any) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        dispatch({
            type: actions.CREATE_ENTITY,
            payload: {
                data
            }
        })
    },

    readState: (entityId: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        dispatch({
            type: actions.READ_ENTITY,
            payload: {
                entityId,
            }
        })
    }
}

export const crudEntityReducer = (state = initialCatalogState, action: Action) => {
    switch(action.type){
        case actions.CREATE_ENTITY:
            const isPresent = state.entityTypesList.find((el:{id: string}) => (el.id===action.payload.data.id));
            if(!isPresent){
                state.entityTypesList.push(action.payload.data);
            }
            return {
                ...state,
            };

        case actions.READ_ENTITY: 
            return {
                ...state,
            };

        default:
            return initialCatalogState;
    }
};
