class Form {

  constructor(formElementSelector) {
    this.formInit(formElementSelector);
  }

  formInit(formElementSelector) {
    this.form = document.querySelector(formElementSelector);
    this.formElements = this.form.elements;
  }

  configurePristine() {
    const locale = 'ru';
    const parameter = ['${', '1}'].join(''); //Костыль для обхода ESlint
    const messages = {
      required: 'Это поле обязательно к заполнению',
      email: 'Введите корректный e-mail адрес',
      number: 'Это поле должно быть числом',
      integer: 'Это поле должно быть только целым числом',
      url: 'Это поле должно содержать ссылку URL',
      tel: 'Введите корректный номер телефона',
      maxlength: `Длина этого поля доложна быть не больше ${parameter} символов`,
      minlength: `Длина этого поля должна быть не меньше ${parameter} символов`,
      min: `Минимальное значение этого поля  ${parameter}`,
      max: `Максимальное значение этого поля ${parameter}`,
      pattern: 'Please match the requested format',
      equals: 'The two fields do not match',
      default: 'Пожалуйста, введите корректно езначение'
    };
    Pristine.setLocale(locale);
    Pristine.addMessages(locale, messages);
  }

}

export {
  Form
};
