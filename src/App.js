import React from "react";
import AddWar from "./components/AddWar"
import SearchWar from "./components/SearchWar"
import Home from "./components/Home"
import NavigationBar from "./components/NavigationBar"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
      <Router>
        <NavigationBar/>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/SearchWar">
              <SearchWar />
            </Route>
            <Route path="/AddWar">
              <AddWar/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
  );
}




export default App;