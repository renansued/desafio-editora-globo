import React, { Component } from "react";
import UserDataService from "../../services/user.service";

export default class UserAdd extends Component {
  constructor(props) {
    super(props);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      _id: null,
      name: "",
      login: "",
      password: "",
      submitted: false
    };
  }

  saveUser() {
    var data = {
      name: this.state.name,
      login: this.state.login,
      password: this.state.password
    };

    UserDataService.create(data)
      .then(response => {
        this.setState({ ...response.data,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      _id: null,
      name: "",
      login: "",
      password: "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Enviado com sucesso!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input 
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="login">Login</label>
              <input
                type="text"
                className="form-control"
                id="login"
                required
                value={this.state.login}
                onChange={e => this.setState({ login: e.target.value })}
                name="login"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                name="password"
              />
            </div>
            <button onClick={this.saveUser} className="btn btn-success">
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}