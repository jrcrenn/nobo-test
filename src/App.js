import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
import ShowsList from "./components/List";

import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import ShowDetail from "./components/Detail";

function App() {
  const [showsFilter, setShowsFilter] = React.useState(null);
  return (
    <Router>
      <Header setShowsFilter={setShowsFilter} />
      <div style={{ minHeight: "80vh" }}>
        <Switch>
          <Route exact path="/">
            <ShowsList useFilter={showsFilter} />
          </Route>
          <Route exact path="/show/:showId">
            <ShowDetail />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
