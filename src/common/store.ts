import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import createReducerManager from "./reducer-manager";

//import your specific reducer

import {crudEntityReducer} from '../workspaces/Catalog/components/crudEntity/state/reducer';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducerManager = createReducerManager({
    catalog: crudEntityReducer,
});

const store = createStore(reducerManager.reduce, composeEnhancers(applyMiddleware(thunk)));

export default store;
// @ts-ignore
store.reducerManager = reducerManager;
