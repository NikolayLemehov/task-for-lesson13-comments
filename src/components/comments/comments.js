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
    <div class="comment-list_item" id="{{id}}">
      <div class="comment-list_item_name">
        <span>{{name}}</span>
      </div>
      <div class="comment-list_item_message">
        <span>{{comment}}</span>
      </div>
      <div class="comment-list_item_date">
        <span>{{date}}</span>
      </div>
    </div>`;

class Comments {
  constructor(selector) {
    this._rootElement = document.querySelector(selector);
    this._comments = [
      {
        name: 'Vanya',
        text: 'comment from Vanya Lorem ipsum dolor ' +
        'sit amet, consectetur adipisicing elit. Ad corporis ' +
        'dolor eaque esse, et ex explicabo fugit inventore, ' +
        'ipsum minus nostrum numquam obcaecati ' +
        'possimus quia quis rem, tenetur vel voluptas?',
        id: 88888888888
      },
      {
        name: 'Petya',
        text: 'comment from Petya',
        id: 88889888888
      },
      {
        name: 'Vasya',
        text: 'comment from Vasya',
        id: 88890888888
      }
    ];
  }

  _renderStatic() {
    this._rootElement.innerHTML = template;
    this._content = this._rootElement.querySelector('.comment-list_content');
    this._addBtn = this._rootElement.querySelector('.input-group_btn');
    this._inputName = this._rootElement.querySelector('.input-group_input-name');
    this._inputComment = this._rootElement.querySelector('.input-group_input-comment');
    this._renderList();
  }

  _renderList() {
    let listItemsElementString = [];

    this._comments.forEach((comment) => {
      let listItem = itemTemplate
        .replace('{{name}}',comment.name)
        .replace('{{comment}}',comment.text)
        .replace('{{id}}',comment.id)
        .replace('{{date}}',this._formatIdToDate(comment.id));

      listItemsElementString.push(listItem);
    });

    this._content.innerHTML = listItemsElementString.join('');
  }

  _addComment(textName, textComment) {
    const newTaskItem = {
      name: textName,
      text: textComment,
      id: Date.now()
    };

    this._comments.push(newTaskItem);
    this._renderList();
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
  _formatIdToDate(millisecond) {
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
  }

  init() {
    this._renderStatic();
    this._addEvents();
  }
}

export {Comments};