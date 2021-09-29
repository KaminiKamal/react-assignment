import React, { useCallback, useContext, useEffect, useState } from "react";
import { Provider } from 'react-redux';
import store from "../../common/store";
import CreateCatalogPage from "./components/crudEntity/components/CreateCatalogPage";
import CatalogContext from "./CatalogContext";
import ViewCatalogPage from "./components/crudEntity/components/ViewCatalogPage";
type Props = {
    type?: string;
};


const Catalog:React.FunctionComponent<Props>  = (props: Props) => {
    return(
        <CatalogContext.Provider value={{entityTypesList: [], state:'open'}}>
            {/* <div>Catalog page here...</div> */}
            <Provider store={store}>
                {
                    props?.type==="detail-page"
                    ?
                    <ViewCatalogPage />
                    :
                    <CreateCatalogPage />
                }
                
            </Provider>
        </CatalogContext.Provider>
    )
};

export default Catalog;