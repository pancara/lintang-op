import { moduleFor, test } from 'ember-qunit';

moduleFor('service:user-service', 'Unit | Service | user service', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('authenticate', function(assert) {
let service =this.subject();
  var result = service.authenticate('abcd','operator', 'abc');
  assert.ok(result, 'Passed');
});
