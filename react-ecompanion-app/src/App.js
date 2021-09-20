import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import SignUP from "./pages/SignUP";
import SignIN from "./pages/SignIN";
import Setting from "./pages/Setting";
import './styles/App.scss';
import {  useState } from "react";
import { UserProvider } from "./context/UserContext";

function App() {

  const [user, setUserContext] = useState(false);

  return (
    <UserProvider value={{user, setUserContext}}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/signup">
            <SignUP />
          </Route>
          <Route path="/signin">
            <SignIN />
          </Route>
          <Route path="/setting">
            <Setting />
          </Route>
          <Route path="/logout" component={(() => {
            //sessionStorage.removeItem('token');
            window.location.href = "/"
          })}>

          </Route>
          <Route>
            <h1>Page not found</h1>
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
