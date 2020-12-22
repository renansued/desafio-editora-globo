import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";

import AddNews from "./components/news/NewsAdd";
import News from "./components/news/News";
import NewsList from "./components/news/NewsList";
import AddUser from "./components/user/UserAdd";
import User from "./components/user/User";
import UserList from "./components/user/UserList";
import Login from "./components/auth/Login";

import { isAuthenticated } from "./components/auth/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => 
      isAuthenticated() ? (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a href="/news" className="navbar-brand">
                Notícias - Desafio Editora Globo
              </a>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/news"} className="nav-link">
                    Listar Notícias
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/news/add"} className="nav-link">
                    Adicionar Notícia
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    Listar Usuários
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/user/add"} className="nav-link">
                    Adicionar Usuário
                  </Link>
                </li>
              </div>
            </nav>
           <Component {...props} /></div>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={"/"}                   component={Login} />
      <PrivateRoute exact path={"/news"}        component={NewsList} />
      <PrivateRoute exact path="/news/add"      component={AddNews} />
      <PrivateRoute path="/news/:id"            component={News} />
      <PrivateRoute exact path={"/user"}        component={UserList} />
      <PrivateRoute exact path="/user/add"      component={AddUser} />
      <PrivateRoute path="/user/:id"            component={User} />
      <Route        path="*"                    component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;