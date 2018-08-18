define('emtasks/models/task', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    title: _emberData.default.attr('string'),
    description: _emberData.default.attr('string'),
    date: _emberData.default.attr('date'),
    created: _emberData.default.attr('string', {
      defaultValue: function () {
        return new Date();
      }
    })
  });
});