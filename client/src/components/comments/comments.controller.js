import {EventEmitter} from "./eventEmitter";
import {CommentsView} from "./comments.view";
import {CommentsModel} from "./comments.model";

const EVENTS = {
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  TO_FILTER_NAME: 'TO_FILTER_NAME'
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
      this.dispatch(this.EVENTS.DELETE_COMMENT, id);
    })
    this._view.on(this._view.EVENTS.TO_FILTER_NAME, (nameFromFilter) => {
      console.log('DATA AT CONTROLLER TO_FILTER_NAME');
      console.log(nameFromFilter);
      this.dispatch(this.EVENTS.TO_FILTER_NAME, nameFromFilter);
    })
  }
}