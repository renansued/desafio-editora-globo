import React, { Component } from "react";
import NewsDataService from "../../services/news.service";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePublishDate = this.onChangePublishDate.bind(this);
    this.onChangePublishTime = this.onChangePublishTime.bind(this);
    this.getNews = this.getNews.bind(this);
    this.updateNews = this.updateNews.bind(this);
    this.deleteNews = this.deleteNews.bind(this);

    this.state = {
      currentNews: {
        id: null,
        title: "",
        content: "",
        publishDate: "",
        publishTime: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getNews(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentNews: {
          ...prevState.currentNews,
          title: title
        }
      };
    });
  }

  onChangePublishDate(e) {
    this.setState({
        publishDate: e.target.value
    });
  }

  onChangePublishTime(e) {
    this.setState({
        publishTime: e.target.value
    });
  }

  getNews(id) {
    NewsDataService.get(id)
      .then(response => {
        if(response.data == null)
            return;

          var dateFormat = require("dateformat");
          var now = new Date(response.data.publishDate);
          const publishDate = dateFormat(now, "yyyy-mm-dd")
          const publishTime = dateFormat(now, "H:MM")
        
        this.setState({
          currentNews: {id : response.data._id,
                      title: response.data.title,
                      content: response.data.content, publishDate: publishDate, publishTime: publishTime},
          publishDate: publishDate,
          publishTime: publishTime
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished() {
    var data = {
      id: this.state.currentNews.id,
      title: this.state.currentNews.title,
      content: this.state.currentNews.content,
      publishDate: new Date(this.state.publishDate+"T"+this.state.publishTime)
    };

    NewsDataService.update(this.state.currentNews.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentNews: {
            ...prevState.currentNews
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateNews() {
    const currentNewsTO = {id:this.state.currentNews.id,
                            title:this.state.currentNews.title,
                            content:this.state.currentNews.content,
                            publishDate: new Date(this.state.publishDate+"T"+this.state.publishTime)};
    
    NewsDataService.update(
      currentNewsTO.id,
      currentNewsTO
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Notícias Atualizadas com sucesso"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteNews() {    
    NewsDataService.delete(this.state.currentNews.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/news')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentNews } = this.state;

    return (
      <div>
        {currentNews ? (
          <div className="edit-form">
            <h4>News</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentNews.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
              <label htmlFor="publishDate">Data de publicação</label>
              <input
                type="date"
                className="form-control"
                id="publishDate"
                required
                value={this.state.publishDate}
                onChange={this.onChangePublishDate}
                name="publishDate"
              />
            </div>
            <div className="form-group">
              <label htmlFor="publishTime">Horário de publicação</label>
              <input
                type="time"
                className="form-control"
                id="publishTime"
                required
                value={this.state.publishTime}
                onChange={this.onChangePublishTime}
                name="publishTime"
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Conteúdo</label>
              <CKEditor
                    editor={ ClassicEditor }
                    id="content"
                    name="content"
                    data={currentNews.content}
                    onChange={ ( event, editor ) => {
                      const data = editor.getData();
    
                      this.setState(prevState => ({
                        currentNews: {
                          ...prevState.currentNews,
                          content: data
                        }
                      }));
                    } }
                />
            </div>
             
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteNews}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateNews}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecione a notícia</p>
          </div>
        )}
      </div>
    );
  }
}