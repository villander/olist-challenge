import { module, test } from 'ember-qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll, fillIn, click } from 'ember-native-dom-helpers';

module('Integration | Component | signup form', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(4);

    await render(hbs`{{signup-form}}`);

    assert.equal(find('.form-title').textContent.trim(), 'Crie sua conta', 'component has form title');
    assert.equal(find('.btn-submit').textContent.trim(), 'Criar conta', 'component has submit button');
    assert.equal(findAll('.validated-input').length, 4, 'component has four inputs');
    assert.ok(find('.password-steps'), 'component has password steps');
  });

  test('it tries submit the empty form', async function (assert) {
    assert.expect(1);

    await render(hbs`{{signup-form}}`);
    await click('.btn-submit');

    assert.equal(findAll('.validated-input.has-error').length, 4, 'the error messages was shown correctly');
  });

  test('it tries enter a invalid password', async function (assert) {
    assert.expect(1);

    await render(hbs`{{signup-form}}`);
    await fillIn('.password', 'some text');
    await fillIn('.password-confirmation', 'some text');

    assert.ok(findAll('.has-error.test-password'), 'the password is invalid');
  });

  test('it calls submit action when form is valid', async function (assert) {
    assert.expect(1);

    const newAccont = {
      fullName: 'Mario de Andrade',
      email: 'mario@gmail.com',
      password: 'Sometext9',
      passwordConfirmation: 'Sometext9'
    }

    this.set('handleSubmit', (account) => {
      assert.deepEqual(
        account,
        newAccont,
        'the form was submitted with correctly args'
      );
    });

    await render(hbs`{{signup-form onSubmit=(action handleSubmit)}}`);
    await fillIn('.full-name', newAccont.fullName);
    await fillIn('.email', newAccont.email);
    await fillIn('.password', newAccont.password);
    await fillIn('.password-confirmation', newAccont.passwordConfirmation);
    await click('.btn-submit');

  })
});
