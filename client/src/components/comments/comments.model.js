import {Api} from "../../api/api";
import {EventEmitter} from "./eventEmitter";

const possibleFilter = {
  label: 'ALL',
  value: 'ALL'
};

export const EVENTS = {
  COMMENT_UPDATED: 'COMMENT_UPDATED',
  COMMENT_ADDED: 'COMMENT_ADDED',
  COMMENT_DELETED: 'COMMENT_DELETED'
};

export class CommentsModel extends EventEmitter {
  static get baseUrl() {
    return 'http://localhost:4001/comments'
  }

  constructor(controller) {
    super();
    this.EVENTS = EVENTS;
    console.log('Model init!');
    this._comments = [];
    this.getComments();
    this._controller = controller;
    this._controller.on(this._controller.EVENTS.ADD_COMMENT, this.addComment.bind(this));
    this._controller.on(this._controller.EVENTS.DELETE_COMMENT, (id) => {this.deleteComment(id);});
  };

  getComments() {
    Api.get(CommentsModel.baseUrl, (response) => {
      this._comments = response;
      //const filteredItems = this._filterItems();
      this.dispatch(EVENTS.COMMENT_UPDATED, this._comments);
    })
  }

  _filterItems() {
    return this._comments;
  }

  /**
   * @param {Object} newComment
   * */
  addComment(newComment) {
    console.log('DATA AT MODEL ');
    console.log('NEW comment', newComment);
    // if(!newComment || !newComment.title) {
    //   throw new Error('Param text should be defined');
    // }
    //
    Api.post(CommentsModel.baseUrl, newComment, (response) => {
      const lastItem = response[response.length - 1];
      this._comments = response;
      this.dispatch(this.EVENTS.COMMENT_ADDED, lastItem);
    });
  }

  deleteComment(id) {
    console.log('DATA AT MODEL DELETE ');
    console.log('delete # ', id);
    Api.delete(CommentsModel.baseUrl+`/${id}`, () => {
      // const targetElement = this._content.find('#'+id);
      // targetElement.fadeOut(fadeOutTime, () =>  targetElement.remove());
      this._comments = this._comments.filter((item) => {
        return item.id !== id;
      });
      this.dispatch(this.EVENTS.COMMENT_DELETED, id);
      console.log('model: EVENTS.COMMENT_DELETED');
    })
  }
}