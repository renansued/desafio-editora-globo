import React, { Component } from "react";
import {  withRouter } from "react-router-dom";
import UserDataService  from '../../services/user.service'

class Login extends Component {
  
  state = {
    userLogin: "",
    password: "",
    error: ""
  };

  handleLogin = async e => {
    e.preventDefault();
    const { userLogin, password } = this.state;
    if (!userLogin || !password) {
      this.setState({ error: "Preencha login e senha para continuar!" });
    } else {
      try {
        await UserDataService.login({ login:userLogin, password }).then(() =>{
          
          this.props.history.push("/news");
        });
      } catch (err) {
        this.setState({
          error: "Login ou senha incorreta"
        });
      }
    }
  };

  
  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <h1>Desafio Editora Globo</h1>
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="login"
            id="login"
            placeholder="Login"
            onChange={e => this.setState({ userLogin: e.target.value })}
          />
          <input
            type="password"
            id="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);