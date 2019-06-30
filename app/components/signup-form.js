import Component from '@ember/component';
import RSVP from "rsvp";
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'fullName': [
    validator('presence', {
      presence: true,
      message: 'Este campo não pode ficar em branco'
    })
  ],
  'email': [
    validator('presence', {
      presence: true,
      message: 'Este campo não pode ficar em branco'
    }),
    validator('format', {
      type: 'email',
      message: 'Este campo deve ser um email válido'
    }),
  ],
  'password': [
    validator('presence', {
      presence: true
    }),
    validator('format', {
      regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
    }),
    
  ],
  'passwordConfirmation': [
    validator('presence', {
      presence: true,
      message: 'Este campo não pode ficar em branco'
    }),
    validator('confirmation', {
      on: 'password',
      message: 'As senhas não conferem!'
    })
  ]
});


export default Component.extend(Validations, {
  tagName: 'form',
  classNames: ['form'],
  didValidate: false,
  fullName: null,
  email: null,
  password: null,
  passwordConfirmation: null,

  actions: {
    submit() {
      this.validate().then(({ validations }) => {
        this.set('didValidate', true);

        if (validations.get('isValid')) {
          let { fullName, email, password, passwordConfirmation } = this;
          this.get('onSubmit')({
            fullName,
            email,
            password,
            passwordConfirmation
          });
        } else {
          return RSVP.reject();
        }
      });
    }
  }
});
