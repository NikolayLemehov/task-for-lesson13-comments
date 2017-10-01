import {EventEmitter} from "./eventEmitter";
import './comments.styl';

const widgetTemplate = `
  <div class="comment-list_header">
    <div class="input-group">
      <input type="text" class="input-group_input-name" placeholder="Name" autofocus>
      <textarea class="input-group_input-comment" placeholder="Comment" rows="7"></textarea>
      <button class="input-group_btn">Add comment</button>
      <div class="filter-group">
        <label class="filter-group_lable" for="filter-group_input-id">Filter Name</label>
        <input type="text" class="filter-group_input" id="filter-group_input-id">
        <button class="filter-group_btn">search</button>
      </div>
    </div>
  </div>
  <div class="comment-list_content">
  </div>`;
const itemTemplate = `
      <div class="comment-list_item_head">
        <div class="comment-list_item_head_name">
          <span>{{name}}</span>
        </div>
        <div class="comment-list_item_head_btn-delete">
          <button data-action="delete">X</button>
        </div>
      </div>
      <div class="comment-list_item_message">
        <span>{{comment}}</span>
      </div>
      <div class="comment-list_item_date">
        <span>{{date}}</span>
      </div>
`;

const EVENTS = {
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  TO_FILTER_NAME: 'TO_FILTER_NAME'
};

export class CommentsView extends EventEmitter {
  constructor(selector, model) {
    super();
    console.log("View Init");
    this.EVENTS = EVENTS;
    this._rootElement = $(selector);
    this._model = model;
    this.init();
  }

  _renderOne(comment) {
    const content = itemTemplate
      .replace('{{name}}', comment.author)
      .replace('{{comment}}', comment.text)
      .replace('{{date}}', comment.date);
    return $('<div class="comment-list_item">')
      .attr('id', comment.id)
      .html(content);
  }

  _renderList(comments) {
    console.log(comments);
    const appearDelay = 100;
    this._widgetLayout.content.html('');
    comments.forEach((comment, i) => {
      const newElement = this._renderOne(comment)
        .hide()
        .delay(appearDelay * i)
        .fadeIn();
      this._widgetLayout.content.append(newElement);
    });
  }

  _renderStatic() {
    this._rootElement.html(widgetTemplate);
    this._widgetControls = {
      add: this._rootElement.find('.input-group_btn'),
      inputName: this._rootElement.find('.input-group_input-name'),
      inputComment: this._rootElement.find('.input-group_input-comment'),
      inputFilter: this._rootElement.find('.filter-group_input'),
      filterBtn: this._rootElement.find('.filter-group_btn')
    };
    this._widgetLayout = {
      content: this._rootElement.find('.comment-list_content')
    };
  }

  _addComment() {
    const newCommentItem = {
      author: this._widgetControls.inputName.val(),
      text: this._widgetControls.inputComment.val()
    };
    this.dispatch(this.EVENTS.ADD_COMMENT, newCommentItem);
    this._widgetControls.inputName.val('');
    this._widgetControls.inputComment.val('');
  }

  _deleteComment(id) {
    const fadeOutTime = 500;
    const targetElement = this._widgetLayout.content.find('#'+id);
    targetElement.fadeOut(fadeOutTime, () =>  targetElement.remove());
    this.dispatch(this.EVENTS.DELETE_COMMENT, id);
  }

  _toFilterName() {
    const nameFromFilter = this._widgetControls.inputFilter.val();
    console.log(nameFromFilter);
    this.dispatch(this.EVENTS.TO_FILTER_NAME, nameFromFilter);
}

  _addDOMEventsHandler() {
    this._widgetControls.add.on('click', this._addComment.bind(this));
    this._widgetControls.inputComment.on('keypress', (e)=> {
      if(e.keyCode === 13) {
        this._addComment();
      }
    });
    this._widgetLayout.content.on('click', (e) => {
      if($(e.target).attr('data-action') === 'delete') {
        const id = $(e.target).closest('.comment-list_item').attr('id');
        console.log('_widgetControls.delete' + id);
        this._deleteComment(id);
      }
    });
    this._widgetControls.filterBtn.on('click', this._toFilterName.bind(this));
  }

  _subscribeToModelEvents() {
    this._model.on(this._model.EVENTS.COMMENT_UPDATED, this._renderList.bind(this));
    this._model.on(this._model.EVENTS.COMMENT_ADDED, (resp) => {
      this._widgetLayout.content.append(this._renderOne(resp));
    });
    this._model.on(this._model.EVENTS.COMMENT_DELETED, (resp) => {
    });
    this._model.on(this._model.EVENTS.NAME_FILTERED, this._renderList.bind(this));
  }

  init() {
    this._renderStatic();
    this._subscribeToModelEvents();
    this._addDOMEventsHandler();
  }
}