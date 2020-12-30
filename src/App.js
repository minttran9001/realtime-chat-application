import React from 'react'
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./containers/SignUpPage/index";
import Login from "./containers/LoginPage/index";
import Home from "./containers/HomePage/index";
import PrivateRoute from "./components/Private/index.js";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInUser } from "./actions";
function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state=>state.auth)

 React.useEffect(()=>{
    if(!auth.authenticated)
    {
      dispatch(isLoggedInUser())
    }
  },[])
  const routes = [
    { path: "/realtime-chat-application", name: "Home", component: Home },
    { path: "/login", name: "Login", component: Login },
    { path: "/signup", name: "Sign Up", component: SignUp },
  ];
  return (
    <div className="App">
      <Router>
        {routes.map((route) => {
          return (
            <div  key={route.name}>
              {route.name === "Home" ? (
                <PrivateRoute
                  path={route.path}
                  component={route.component}
                  exact
                 
                />
              ) : (
                <Route
                  path={route.path}
                  component={route.component}
                />
              )}
            </div>
          );
        })}
      </Router>
    </div>
  );
}

export default App;
