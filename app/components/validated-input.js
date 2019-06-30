import Component from '@ember/component';
import { computed } from "@ember/object";
import { defineProperty } from '@ember/object';

export default Component.extend({
  classNames: ['validated-input'],
  classNameBindings: ['showErrorClass:has-error', 'isValid:has-success'],
  value: null,
  type: 'text',
  inputElementId: null,
  inputClass: null,
  name: null,
  valuePath: '',
  placeholder: '',
  disabled: false,
  autocomplete: false,
  validation: null,
  showValidations: false,
  didValidate: false,
  displayErrorMessage: true,

  notValidating: computed.not('validation.isValidating').readOnly(),
  hasContent: computed.notEmpty('value').readOnly(),
  isValid: computed.and('hasContent', 'validation.isTruelyValid').readOnly(),
  shouldDisplayValidations: computed.or('showValidations', 'didValidate').readOnly(),

  showErrorClass: computed.and('notValidating', 'showErrorMessage', 'validation').readOnly(),
  showErrorMessage: computed.and('shouldDisplayValidations', 'validation.isInvalid').readOnly(),

  init() {
    this._super(...arguments);
    let valuePath = this.get('valuePath');

    defineProperty(this, 'validation', computed.readOnly(`validations.attrs.${valuePath}`));
    defineProperty(this, 'errorMessage', computed.readOnly(`validations.attrs.${valuePath}.message`));
  },

  focusOut() {
    this._super(...arguments);
    this.set('showValidations', true);
  }
});
