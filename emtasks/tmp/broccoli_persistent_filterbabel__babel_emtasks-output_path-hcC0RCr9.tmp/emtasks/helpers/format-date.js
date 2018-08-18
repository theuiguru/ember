define('emtasks/helpers/format-date', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.formatDate = formatDate;
  function formatDate() {
    return moment(params[0]).format('YYYY-MM-DD');
  }

  exports.default = Ember.Helper.helper(formatDate);
});