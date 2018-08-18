define("emtasks/templates/tasks", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "rRl30Fya", "block": "{\"symbols\":[],\"statements\":[[1,[21,\"outlet\"],false],[0,\"\\n\"],[7,\"h1\"],[9],[0,\"Tasks\"],[10],[0,\"\\n\"],[4,\"each\",[[23,[\"task\"]],[23,[\"in\"]],[23,[\"model\"]]],null,{\"statements\":[[0,\"  \"],[7,\"div\"],[11,\"class\",\"well\"],[9],[0,\"\\n    \"],[7,\"h4\"],[9],[1,[23,[\"task\",\"title\"]],false],[10],[0,\"\\n    \"],[7,\"small\"],[9],[0,\"Due: \"],[1,[27,\"format-date\",[[23,[\"task\",\"date\"]]],null],false],[10],[0,\"\\n    \"],[7,\"p\"],[9],[1,[23,[\"task\",\"description\"]],false],[10],[0,\"\\n  \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "emtasks/templates/tasks.hbs" } });
});