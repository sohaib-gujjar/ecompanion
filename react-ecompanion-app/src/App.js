import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import SignUP from "./pages/SignUP";
import SignIN from "./pages/SignIN";
import Setting from "./pages/Setting";
import './styles/App.scss';

function App() {
  return (
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
                sessionStorage.removeItem('token');
                window.location.href = "/"
            })}>

            </Route>
          <Route>
            <h1>Page not found</h1>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
