import {Api} from "../../api/api";
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
      <div class="comment-list_item_btn-delete">
        <button data-action="delete">X</button>
      </div>
      <div class="comment-list_item_name">
        <span>{{name}}</span>
      </div>
      <div class="comment-list_item_message">
        <span>{{comment}}</span>
      </div>
      <div class="comment-list_item_date">
        <span>{{date}}</span>
      </div>
`;

class Comments {
  static get baseUrl() {
    return 'http://localhost:4001/comments'
  }

  constructor(selector) {
    this._rootElement = $(selector);
    this._comments = [];

    Api.get(Comments.baseUrl, (response) => {
      this._comments = response;
      this._renderList();
    // }, () => {
    //   this._rootElement.style.background = 'red';
    })
  }

  _renderOne(comment, i) {
    const appearDelay = 150 * i;
    const content = itemTemplate.replace('{{name}}', comment.author)
      .replace('{{comment}}', comment.text)
      .replace('{{date}}', comment.date);
    return $('<div class="comment-list_item">')
      .attr('id', comment.id)
      .html(content)
      .hide()
      .delay(appearDelay)
      .fadeIn();
  }

  _renderList() {
    this._content.html('');
    this._comments.forEach((comment, i) => {
      this._content.append(this._renderOne(comment, i));
    });
  }

  _renderStatic() {
    this._rootElement.html(template);
    this._content = this._rootElement.find('.comment-list_content');
    this._addBtn = this._rootElement.find('.input-group_btn');
    this._inputName = this._rootElement.find('.input-group_input-name');
    this._inputComment = this._rootElement.find('.input-group_input-comment');
    this._renderList();
  }

  _addComment(textName, textComment) {
    const newCommentItem = {
      author: textName,
      text: textComment
    };
    Api.post(Comments.baseUrl, newCommentItem, (response) => {
      const lastItem = response[response.length - 1];
      const newListItem = this._renderOne(lastItem);
      this._content.append(newListItem);
    }, (e) => {
      throw  new Error(e);
    })
  }

  _onCommentAdd() {
    if (this._inputName.val() && this._inputComment.val()) {
      this._addComment(this._inputName.val(), this._inputComment.val());
      this._inputName.val('');
      this._inputComment.val('');
    }
    this._inputName.focus();
  }

  _deleteComment(id) {
    const fadeOutTime = 500;
    Api.delete(Comments.baseUrl+`/${id}`, (resp) => {
      const targetElement = this._content.find('#'+id);
      targetElement.fadeOut(fadeOutTime, () =>  targetElement.remove());
      this._comments = this._comments.filter((item) => {
        return item.id !== id;
      });
    })
  }

  _addEvents() {
    $(this._addBtn).click(this._onCommentAdd.bind(this));
    $(this._inputComment).keypress((e) => {
      if (e.keyCode === 13) {
        this._onCommentAdd();
      }
    });
    $(this._content).click((e) => {
      if($(e.target).attr('data-action') === 'delete') {
        const id = $(e.target).closest('.comment-list_item').attr('id');
        this._deleteComment(id);
      }
    });
  }

  init() {
    this._renderStatic();
    this._addEvents();
  }
}

export {Comments};