import { module, test } from 'ember-qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

const VALUE_PATH = 'title';

module('Integration | Component | validated input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);
    this.valuePath = VALUE_PATH;
    this.placeholder = VALUE_PATH;
    await render(hbs`{{validated-input valuePath=valuePath placeholder=placeholder}}`);
    assert.equal(find('input').getAttribute('placeholder'), VALUE_PATH);
    assert.equal(find('input').required, false, 'required is false');
    assert.equal(find('input').autocomplete, "false", 'autocomplete is false');
  });

  test('it renders input with type', async function(assert) {
    assert.expect(1);
    this.valuePath = VALUE_PATH;
    await render(hbs`{{validated-input valuePath=valuePath type="number"}}`);
    assert.equal(find('input').type, 'number', 'has type set');
  });

  test('it renders input as disabled', async function(assert) {
    assert.expect(1);
    this.valuePath = VALUE_PATH;
    this.disabled = "disabled";
    await render(hbs`{{validated-input valuePath=valuePath disabled=disabled}}`);
    assert.equal(find('input').disabled, true, 'has disabled attr');
  });

  test('renders input with id', async function(assert) {
    assert.expect(1);
    this.valuePath = VALUE_PATH;
    await render(hbs`{{validated-input valuePath=valuePath inputElementId="testId"}}`);
    assert.equal(find('#testId').id, "testId", 'has id attr');
  });

  test('it renders input with value', async function(assert) {
    assert.expect(1);
    this.valuePath = VALUE_PATH;
    this.title = 'foo';
    await render(hbs`{{validated-input value=title valuePath=valuePath}}`);
    assert.equal(find('input').value, 'foo', 'has value');
  });

  test('it renders name', async function(assert) {
    assert.expect(1);
    this.valuePath = VALUE_PATH;
    this.name = 'email';
    await render(hbs`{{validated-input valuePath=valuePath name=name}}`);
    assert.equal(find('[name=email]').name, 'email', 'has name attr');
  });

});
