import React from 'react';

export type CatalogContextType = {
    entityTypesList: any,
    state: any,
};

const catalogContext: CatalogContextType = {
    entityTypesList: [],
    state: 'open'
};

const CatalogContext = React.createContext(catalogContext);

export default CatalogContext;
