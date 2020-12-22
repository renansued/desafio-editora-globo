import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route,Switch,Link } from "react-router-dom";
import "./App.css";

import AddNews from "./components/news/NewsAdd";
import News from "./components/news/News";
import NewsList from "./components/news/NewsList";

export default class App extends React.Component{
    render() {
        return (
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
                  <Link to={"/add"} className="nav-link">
                    Adicionar Notícia
                  </Link>
                </li>
              </div>
            </nav>
    
            <div className="container mt-3">
              <Switch>
                <Route exact path={["/", "/news"]} component={NewsList} />
                <Route exact path="/add" component={AddNews} />
                <Route path="/news/:id" component={News} />
              </Switch>
            </div>
          </div>
        );
      }
    }
    