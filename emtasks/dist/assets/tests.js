'use strict';

define('emtasks/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/tasks.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/tasks.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/tasks/new.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/tasks/new.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/format-date.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/format-date.js should pass ESLint\n\n4:10 - \'moment\' is not defined. (no-undef)\n4:17 - \'params\' is not defined. (no-undef)\n7:16 - Use import { helper as buildHelper } from \'@ember/component/helper\'; instead of using Ember.Helper.helper (ember/new-module-imports)');
  });

  QUnit.test('models/task.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/task.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/tasks.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/tasks.js should pass ESLint\n\n');
  });

  QUnit.test('routes/tasks/new.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/tasks/new.js should pass ESLint\n\n');
  });
});
define('emtasks/tests/helpers/create-offline-ref', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createOfflineRef;


  /**
   * Creates an offline firebase reference with optional initial data and url.
   *
   * Be sure to `stubfirebase()` and `unstubfirebase()` in your tests!
   *
   * @param  {!Object} [initialData]
   * @param  {string} [url]
   * @param  {string} [apiKey]
   * @return {!firebase.database.Reference}
   */
  function createOfflineRef(initialData, url = 'https://emberfire-tests-2c814.firebaseio.com', apiKey = 'AIzaSyC9-ndBb1WR05rRF1msVQDV6EBqB752m6o') {

    if (!_firebase.default._unStub) {
      throw new Error('Please use stubFirebase() before calling this method');
    }

    const config = {
      apiKey: apiKey,
      authDomain: 'emberfire-tests-2c814.firebaseapp.com',
      databaseURL: url,
      storageBucket: ''
    };

    let app;

    try {
      app = _firebase.default.app();
    } catch (e) {
      app = _firebase.default.initializeApp(config);
    }

    const ref = app.database().ref();

    app.database().goOffline(); // must be called after the ref is created

    if (initialData) {
      ref.set(initialData);
    }

    return ref;
  }
});
define('emtasks/tests/helpers/destroy-firebase-apps', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyFirebaseApps;


  const { run } = Ember;

  /**
   * Destroy all Firebase apps.
   */
  function destroyFirebaseApps() {
    const deletions = _firebase.default.apps.map(app => app.delete());
    Ember.RSVP.all(deletions).then(() => run(() => {
      // NOOP to delay run loop until the apps are destroyed
    }));
  }
});
define('emtasks/tests/helpers/replace-app-ref', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = replaceAppRef;
  /**
   * Updates the supplied app adapter's Firebase reference.
   *
   * @param  {!Ember.Application} app
   * @param  {!firebase.database.Reference} ref
   * @param  {string} [model]  The model, if overriding a model specific adapter
   */
  function replaceAppRef(app, ref, model = 'application') {
    app.register('service:firebaseMock', ref, { instantiate: false, singleton: true });
    app.inject('adapter:firebase', 'firebase', 'service:firebaseMock');
    app.inject('adapter:' + model, 'firebase', 'service:firebaseMock');
  }
});
define('emtasks/tests/helpers/replace-firebase-app-service', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = replaceFirebaseAppService;
  /**
   * Replaces the `firebaseApp` service with your own using injection overrides.
   *
   * This is usually not needed in test modules, where you can re-register over
   * existing names in the registry, but in acceptance tests, some registry/inject
   * magic is needed.
   *
   * @param  {!Ember.Application} app
   * @param  {!Object} newService
   */
  function replaceFirebaseAppService(app, newService) {
    app.register('service:firebaseAppMock', newService, { instantiate: false, singleton: true });
    app.inject('torii-provider:firebase', 'firebaseApp', 'service:firebaseAppMock');
    app.inject('torii-adapter:firebase', 'firebaseApp', 'service:firebaseAppMock');
  }
});
define('emtasks/tests/helpers/stub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = stubFirebase;


  /**
   * When a reference is in offline mode it will not call any callbacks
   * until it goes online and resyncs. The ref will have already
   * updated its internal cache with the changed values so we shortcut
   * the process and call the supplied callbacks immediately (asynchronously).
   */
  function stubFirebase() {
    // check for existing stubbing
    if (!_firebase.default._unStub) {
      var originalSet = _firebase.default.database.Reference.prototype.set;
      var originalUpdate = _firebase.default.database.Reference.prototype.update;
      var originalRemove = _firebase.default.database.Reference.prototype.remove;

      _firebase.default._unStub = function () {
        _firebase.default.database.Reference.prototype.set = originalSet;
        _firebase.default.database.Reference.prototype.update = originalUpdate;
        _firebase.default.database.Reference.prototype.remove = originalRemove;
      };

      _firebase.default.database.Reference.prototype.set = function (data, cb) {
        originalSet.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase.default.database.Reference.prototype.update = function (data, cb) {
        originalUpdate.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase.default.database.Reference.prototype.remove = function (cb) {
        originalRemove.call(this);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };
    }
  }
});
define('emtasks/tests/helpers/unstub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = unstubFirebase;
  function unstubFirebase() {
    if (typeof _firebase.default._unStub === 'function') {
      _firebase.default._unStub();
      delete _firebase.default._unStub;
    }
  }
});
define('emtasks/tests/test-helper', ['emtasks/app', 'emtasks/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('emtasks/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/tasks-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/tasks-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/tasks/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/tasks/new-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/task-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/task-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/tasks-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/tasks-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/tasks/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/tasks/new-test.js should pass ESLint\n\n');
  });
});
define('emtasks/tests/unit/controllers/tasks-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | tasks', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:tasks');
      assert.ok(controller);
    });
  });
});
define('emtasks/tests/unit/controllers/tasks/new-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | tasks/new', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:tasks/new');
      assert.ok(controller);
    });
  });
});
define('emtasks/tests/unit/models/task-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | task', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('task', {});
      assert.ok(model);
    });
  });
});
define('emtasks/tests/unit/routes/tasks-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | tasks', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:tasks');
      assert.ok(route);
    });
  });
});
define('emtasks/tests/unit/routes/tasks/new-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | tasks/new', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:tasks/new');
      assert.ok(route);
    });
  });
});
define('emtasks/config/environment', [], function() {
  var prefix = 'emtasks';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('emtasks/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
