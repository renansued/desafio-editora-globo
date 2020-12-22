import React, { Component } from "react";
import UserDataService from "../../services/user.service";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        _id: null,
        name: "",
        login: "",
        password: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }


  getUser(id) {
    UserDataService.get(id)
      .then(response => {
        if(response.data == null)
            return;
        
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished() {
    var data = {
      name: this.state.currentUser.name,
      login: this.state.currentUser.login,
      password: this.state.password
    };

    UserDataService.update(this.state.currentUser._id, data)
      .then(response => {
        this.setState(prevState => ({
          currentUser: {
            ...prevState.currentUser
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    const currentUserTO = {id:this.state.currentUser._id,
                            name:this.state.currentUser.name,
                            content:this.state.currentUser.content,
                            login: this.state.currentUser.login };
    
    UserDataService.update(
      currentUserTO._id,
      currentUserTO
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Usuario atualizado com sucesso"
        });
      })
      .catch(e => {
       
        this.setState({
          message: "Erro ao atualizar"
        });
        console.log(e);
      });
  }

  deleteUser() {    
    UserDataService.delete(this.state.currentUser._id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/user')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={e => this.setState({ name: e.target.value })}
                  onChange={this.onChangeName}
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
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                  value={e => this.setState({ password: e.target.value })}
                  onChange={this.onChangePassword}
                  name="password"
                />
              </div>             
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUser}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecione o usuário</p>
          </div>
        )}
      </div>
    );
  }
}