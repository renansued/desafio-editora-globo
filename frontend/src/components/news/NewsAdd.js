import React, { Component } from "react";
import NewsDataService from "../../services/news.service";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class NewsAdd extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangePublishDate = this.onChangePublishDate.bind(this);
    this.onChangePublishTime = this.onChangePublishTime.bind(this);
    this.saveNews = this.saveNews.bind(this);
    this.newNews = this.newNews.bind(this);

    this.state = {
      id: null,
      title: "",
      content: "", 
      publishDate: "",
      publishTime: "",
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
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

  onChangeContent(editor) {
    const data = editor.getData();
    this.setState({
      content: data
    });
  }

  saveNews() {
    var data = {
      title: this.state.title,
      content: this.state.content,
      publishDate: new Date(this.state.publishDate+"T"+this.state.publishTime)
    };

    NewsDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          content: response.data.content,
          publishDate: response.data.publishDate,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newNews() {
    this.setState({
      id: null,
      title: "",
      content: "",
      publishDate: "",
      publishdTime: "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Enviado com sucesso!</h4>
            <button className="btn btn-success" onClick={this.newNews}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Título</label>
              <input 
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
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
                    data={this.state.content}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.setState({
                            content: data
                        });
                    } }
                />
            </div>
            <button onClick={this.saveNews} className="btn btn-success">
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}