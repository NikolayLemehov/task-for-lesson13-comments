import { Api } from "../../api/api";
import './comments.styl'

const template = `
  <div class="comment-list_header">
    <div class="input-group">
      <input type="text" class="input-group_input-name" placeholder="Name" autofocus>
      <textarea class="input-group_input-comment" placeholder="Comment" rows="7"></textarea>
      <button class="input-group_btn">Add comment</button>
    </div>
  </div>
  <div class="comment-list_content">

  </div>`;
const itemTemplate = `
      <div class="comment-list_item_name">
        <span>{{name}}</span>
      </div>
      <div class="comment-list_item_message">
        <span>{{comment}}</span>
      </div>
      <div class="comment-list_item_date">
        <span>{{date}}</span>
      </div>`;

class Comments {
  static get baseUrl() {
    return 'http://localhost:4001/comments'
  }

  constructor(selector) {
    this._rootElement = document.querySelector(selector);
    this._comments = [];

    Api.get(Comments.baseUrl, (response) => {

      this._comments = response;
      this._renderList();
    }, () => {
      this._rootElement.style.background = 'red';
    })
  }

  _renderOne(comment) {
    const newListItemWrapper = document.createElement('div');
    newListItemWrapper.classList.add('comment-list_item');
    newListItemWrapper.id = comment.id;
    newListItemWrapper.innerHTML = itemTemplate
      .replace('{{name}}',comment.author)
      .replace('{{comment}}',comment.text)
      .replace('{{date}}',comment.date);

    return newListItemWrapper;
  }

  _renderList() {
    let listItemsFragment = document.createDocumentFragment();
    this._comments.forEach((comment) => {
      listItemsFragment.appendChild(this._renderOne(comment));
    });
    this._content.innerHTML = '';
    this._content.appendChild(listItemsFragment);
  }

  _renderStatic() {
    this._rootElement.innerHTML = template;
    this._content = this._rootElement.querySelector('.comment-list_content');
    this._addBtn = this._rootElement.querySelector('.input-group_btn');
    this._inputName = this._rootElement.querySelector('.input-group_input-name');
    this._inputComment = this._rootElement.querySelector('.input-group_input-comment');
    this._renderList();
  }

  _addComment(textName, textComment) {
    const newCommentItem = {
      author: textName,
      text: textComment,
    };
    Api.post(Comments.baseUrl, newCommentItem, (response) => {
      const lastItem = response[response.length - 1];
      const newListItem = this._renderOne(lastItem);
      this._content.appendChild(newListItem);
    }, (e) => {
      throw  new Error(e);
    })
  }

  _onCommentAdd() {
    if (this._inputName.value && this._inputComment.value) {
      this._addComment(this._inputName.value, this._inputComment.value);
      this._inputName.value = '';
      this._inputComment.value = '';
    }
    this._inputName.focus();
  }

  _addEvents() {
    this._addBtn.addEventListener('click', this._onCommentAdd.bind(this));
    this._inputComment.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        this._onCommentAdd();
      }
    });
  }

  // 09.09.2016 in 01:24  1 января 1970
  /*_formatIdToDate(millisecond) {
    const date = new Date(1970, 1, 0, 3, 0, 0, millisecond);

    //let sec = date.getSeconds();
    //if (sec < 10) sec = '0' + sec;

    let min = date.getMinutes();
    if (min < 10) min = '0' + min;

    let hh = date.getHours();
    if (hh < 10) hh = '0' + hh;

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth();
    if (mm < 10) mm = '0' + mm;

    let yyyy = date.getFullYear();

    return dd + '.' + mm + '.' + yyyy + ' in ' + hh + ':' + min;
  }*/

  init() {
    this._renderStatic();
    this._addEvents();
  }
}

export {Comments};