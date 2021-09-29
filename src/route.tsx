import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from "./App";
import store from "./common/store";
import Catalog from "./workspaces/Catalog/Catalog";
import CreateCatalogPage from "./workspaces/Catalog/components/crudEntity/components/CreateCatalogPage";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function Routes() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Provider store={store}>
                <Catalog />
            </Provider>
          </Route>
          <Route exact path="/details/:id">
            <Provider store={store}>
                <Catalog type="detail-page" />
            </Provider>
          </Route>
        </Switch>
    </Router>
  );
}
