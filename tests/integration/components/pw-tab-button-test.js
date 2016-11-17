import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pw-tab-button', 'Integration | Component | pw tab button', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pw-tab-button}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pw-tab-button}}
      template block text
    {{/pw-tab-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
