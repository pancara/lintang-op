import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pw-aircraft-add-task', 'Integration | Component | pw aircraft add task', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pw-aircraft-add-task}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pw-aircraft-add-task}}
      template block text
    {{/pw-aircraft-add-task}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
