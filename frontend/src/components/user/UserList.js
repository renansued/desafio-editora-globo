import React, { Component } from "react";
import UserDataService from "../../services/user.service";
import { Link } from "react-router-dom";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.retrieveUser = this.retrieveUser.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);

    this.state = {
      user: [],
      currentUser: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveUser();
  }

  retrieveUser() {

    UserDataService.getAll()
      .then((response) => {
        const user = response.data;
       
        this.setState({
          user: user
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUser();
    this.setState({
      currentUser: null,
      currentIndex: -1,
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index,
    });
  }

  render() {
    const {
      user,
      currentUser,
      currentIndex,
    } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Lista de Usuários</h4>

          <ul className="list-group">
            {user &&
              user.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.title}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>Notícias</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentUser.name}
              </div>
              <div>
                <label>
                  <strong>Login:</strong>
                </label>{" "}
                {currentUser.login}
              </div>

              <Link
                to={"/user/" + currentUser._id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Selecione um usuário</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}