import { combineReducers } from 'redux'; 

export default function createReducerManager(initialReducers: any){
    const reducers = {...initialReducers};
    let combinedReducers = combineReducers(reducers);

    let keysToRemove: Array<any> = [];
    return {
        getReducerMap: () => reducers,
        reduce: (state: any, action: never) => {
            if(keysToRemove.length>0){
                keysToRemove.forEach((key) => {
                    delete state[key];
                })
                keysToRemove = [];
            }
            return combinedReducers(state, action);
        },

        add: (key: string, reducer: any) => {
            if(!key || reducers[key]){
                return;
            }
            reducers[key] = reducer;

            combinedReducers = combineReducers(reducers);
        },

        remove: (key: string) => {
            if(!key || reducers[key]){
                return;
            }
            delete reducers[key];
            keysToRemove.push(key);
            combinedReducers = combineReducers(reducers);
        },

    };
}