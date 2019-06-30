import Component from '@ember/component';
import { computed } from "@ember/object";
import { defineProperty } from '@ember/object';
import { camelize } from "@ember/string";
import { setProperties } from "@ember/object";

export default Component.extend({
  init() {
    this._super(...arguments);

    setProperties(this, { 
      steps: { one: false, two: false, three: false },
      stepClassNames: ['', 'step-one', 'step-two', 'step-three']
    });

    Object.keys(this.steps).forEach((el) => {
      let property = camelize(`step ${el} Class`); // i.e stepOneClass

      defineProperty(
        this,
        property,
        computed(`steps.{${el}}`, 'stepClass', function () {
          let className = '';

          if (this.get(`steps.${el}`)) {
            className = 'correct';
          } else if (this.get('stepClass')) {
            className = 'incorrect';
          }

          return className;
        }).readOnly()
      );
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let str = this.password;
    let regexDigit = new RegExp(/^[\w-!@#$%^&*]{6,15}$/g);
    let regexUpperCase = new RegExp(/[A-Z]/g);
    let regexNumber = new RegExp(/[0-9]/g);

    setProperties(this.steps, {
      one: regexDigit.test(str),
      two: regexUpperCase.test(str),
      three: regexNumber.test(str)
    });
  },

  stepClass: computed('steps.{one,two,three}', function () {
    let quantity = Object.keys(this.steps).filter((el) => {
      return this.steps[el] === true;
    });

    return this.stepClassNames[quantity.length];
  }).readOnly()
});
