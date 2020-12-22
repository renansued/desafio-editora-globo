import React, { Component } from "react";
import NewsDataService from "../../services/news.service";
import { Link } from "react-router-dom";

export default class NewsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveNews = this.retrieveNews.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveNews = this.setActiveNews.bind(this);

    this.state = {
      news: [],
      currentNews: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveNews();
  }

  retrieveNews() {

    NewsDataService.getAll()
      .then((response) => {
        const news = response.data;
       
        this.setState({
          news: news
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveNews();
    this.setState({
      currentNews: null,
      currentIndex: -1,
    });
  }

  setActiveNews(news, index) {
    this.setState({
      currentNews: news,
      currentIndex: index,
    });
  }

  render() {
    const {
      news,
      currentNews,
      currentIndex,
    } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Lista de Notícias</h4>

          <ul className="list-group">
            {news &&
              news.map((news, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveNews(news, index)}
                  key={index}
                >
                  {news.title}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentNews ? (
            <div>
              <h4>Notícias</h4>
              <div>
                <label>
                  <strong>Título:</strong>
                </label>{" "}
                {currentNews.title}
              </div>
              <div>
                <label>
                  <strong>Conteúdo:</strong>
                </label>{" "}
                {currentNews.content}
              </div>
              <div>
                <label>
                  <strong>Data de Publicação:</strong>
                </label>{" "}
                {currentNews.publishDate.split("T")[0] + " às " + currentNews.publishDate.split("T")[1]}
              </div>

              <Link
                to={"/news/" + currentNews._id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Selecione uma notícia</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}