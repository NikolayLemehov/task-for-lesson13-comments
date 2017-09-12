/**
 * Created by IlyaLitvinov on 14.10.16.
 */
/**
 * Created by IlyaLitvinov on 01.12.15.
 */
var _ = require('lodash');
var items = [
  {
    completed: false,
    title: "Test",
    id: 'id'+Date.now()
  },
  {
    completed: true,
    title: "Hello",
    id: 'id'+Date.now() + 5
  }
];

var listModel = {
  setItem: function (data) {
    data.id = 'id'+Date.now();
    data.completed = false;
    items.push(data);
    console.log(data);
    return data;
  },
  getItems: function () {
    return items;
  },
  updateItem: function (data, id) {
    var index = items.reduce((index, item, i) => {
      if (item.id === id) {
        index = i;
      }
      ;
      return index
    }, null);
    if (!index && index !== 0) {
      return index;
    }

    items[index].completed = data.completed;
    items[index].title = data.title;

    return items[index];
  },
  deleteItem: function (id) {
    var index = items.indexOf(_.find(items, function (item) {
      return item.id === id;
    }));

    if (index === -1) {
      return false;
    }

    return items.splice(index, 1);
  }
};

module.exports = listModel;
