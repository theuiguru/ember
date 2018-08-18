QUnit.module('ESLint | app');

QUnit.test('adapters/application.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
});

QUnit.test('app.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'app.js should pass ESLint\n\n');
});

QUnit.test('controllers/tasks.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'controllers/tasks.js should pass ESLint\n\n');
});

QUnit.test('controllers/tasks/new.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'controllers/tasks/new.js should pass ESLint\n\n');
});

QUnit.test('helpers/format-date.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'helpers/format-date.js should pass ESLint\n\n4:10 - \'moment\' is not defined. (no-undef)\n4:17 - \'params\' is not defined. (no-undef)\n7:16 - Use import { helper as buildHelper } from \'@ember/component/helper\'; instead of using Ember.Helper.helper (ember/new-module-imports)');
});

QUnit.test('models/task.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'models/task.js should pass ESLint\n\n');
});

QUnit.test('resolver.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'resolver.js should pass ESLint\n\n');
});

QUnit.test('router.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'router.js should pass ESLint\n\n');
});

QUnit.test('routes/tasks.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/tasks.js should pass ESLint\n\n');
});

QUnit.test('routes/tasks/new.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/tasks/new.js should pass ESLint\n\n');
});

