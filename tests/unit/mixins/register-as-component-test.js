import Ember from 'ember';
import RegisterAsComponentMixin from 'lintang-op/mixins/register-as-component';
import { module, test } from 'qunit';

module('Unit | Mixin | register as component');

// Replace this with your real tests.
test('it works', function(assert) {
  let RegisterAsComponentObject = Ember.Object.extend(RegisterAsComponentMixin);
  let subject = RegisterAsComponentObject.create();
  assert.ok(subject);
});
