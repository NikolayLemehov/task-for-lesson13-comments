import {EventEmitter} from "./eventEmitter";
import {CommentsView} from "./comments.view";
import {CommentsModel} from "./comments.model";

const EVENTS = {
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT'
};

export class CommentsController extends EventEmitter {
  constructor(selector) {
    super();
    this.EVENTS = EVENTS;
    this._model = new CommentsModel(this);
    this._view = new CommentsView(selector, this._model);
    this._view.on(this._view.EVENTS.ADD_COMMENT, (newComment) => {
      console.log('DATA AT CONTROLLER ADD COMMENT');
      this.dispatch(this.EVENTS.ADD_COMMENT, newComment);
    })
    this._view.on(this._view.EVENTS.DELETE_COMMENT, (id) => {
      console.log('DATA AT CONTROLLER DELETE_COMMENT');
      this.dispatch(this._view.EVENTS.DELETE_COMMENT, id);
    })
  }
}