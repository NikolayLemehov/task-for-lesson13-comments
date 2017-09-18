/**
 * Created by IlyaLitvinov on 01.12.15.
 */
var _ = require('lodash');
var items = [
  {
    author: 'Jack Jones',
    //date: new Date(),
    date: timeStampToDate(Date.now()),
    text: 'Hello world, I am a dummy comment',
    id: guid()
  },
  {
    author: 'John Smith',
    //date: new Date(),
    date: timeStampToDate(Date.now()),
    text: 'Hello world, I am a dommy comment!!',
    id: guid()
  }];

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4()
}

// 09.09.2016 in 01:24  1 января 1970 "2017-09-17T21:50:14.016Z"
function timeStampToDate(millisecond) {
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


var commentsModel = {
  setItem: function (data) {
    data.id = guid();
    //data.date = new Date();
    data.date = timeStampToDate(Date.now());
    items.push(data);
    console.log('add to Array');
    return items;
  },
  getItems: function () {
    return items;
  },
  updateItem: function (data, id) {
    var index = items.indexOf(_.find(items, function (item) {
      return item.id === id;
    }));

    if (index === -1) {
      throw new Error("Wrong id provided!")
    }
    var updatedObject = items[index];

    //updatedObject.date = new Date();
    updatedObject.date = timeStampToDate(Date.now());
    updatedObject.author = data.author || updatedObject.author;
    updatedObject.text = data.text || updatedObject.text;
    console.log(data);
    return updatedObject;
  },
  deleteItem: function (id) {
    var index = items.indexOf(_.find(items, function (item) {
      return item.id === id;
    }));

    if (index === -1) {
      return false;
    }

    items.splice(index, 1);
    return items;
  }
};

module.exports = commentsModel;
