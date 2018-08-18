define('emtasks/controllers/tasks/new', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      addTask: function () {
        var title = this.get('title');
        var description = this.get('description');
        var date = this.get('date');

        //Create new task
        var newTask = this.store.createRecord('task', {
          title: title,
          description: description,
          date: new Date(date)
        });

        //Save to Database
        newTask.save();

        //Clear form
        this.setProperties({
          title: '',
          description: '',
          date: ''
        });
      }
    }
  });
});