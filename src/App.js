import React, { useMemo } from "react";
import "./App.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import SignUp from "./containers/SignUpPage/index";
import Login from "./containers/LoginPage/index";
import Home from "./containers/HomePage/index";
import Profile from "./containers/ProfilePage/index";
import NewFeed from "./containers/NewFeedPage/index";
import PrivateRoute from "./components/Private/index.js";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInUser, setOffLine } from "./actions";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const auth_uid = useMemo(() => {
    return auth.uid;
  }, [auth.uid]);
  React.useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser());
    }
  }, []);

  const routes = [
    { path: "/realtime-chat-application", name: "Home", component: Home },
    { path: "/login", name: "Login", component: Login },
    { path: "/signup", name: "Sign Up", component: SignUp },
    { path: "/newfeed", name: "New Feed", component: NewFeed },
    { path: "/profile/:uid", name: "Profile", component: Profile },
  ];

  return (
    <div className="App">
      <Router>
        {routes.map((route) => {
          return (
            <div key={route.name}>
              {route.name === "Login" || route.name === "Sign Up" ? (
                <Route path={route.path} component={route.component} exact />
              ) : (
                <PrivateRoute path={route.path} component={route.component} />
              )}
            </div>
          );
        })}
      </Router>
    </div>
  );
}

export default App;
