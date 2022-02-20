class ValuesRandomizer {

  constructor(minValue, maxValue, decimalCount = 2) {
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.decimalCount = decimalCount;

    // start validate values
    if (this.minValue < 0) {
      this.minValue = this.transfromNegativeValueForPositive(this.minValue);
    }

    if (this.maxValue < 0) {
      this.maxValue = this.transfromNegativeValueForPositive(this.maxValue);
    }

    if (this.minValue > this.maxValue) {
      this.swapValues();
    }

    this.randomInteger = this.getRandomInteger();
    this.floatNumber = this.getRandomFloat();
    //finish validate valuesS
  }

  swapValues() {
    const temporaryValue = this.minValue;
    this.minValue = this.maxValue;
    this.maxValue = temporaryValue;
  }

  transfromNegativeValueForPositive(number) {
    return Math.abs(number);
  }

  roundingFloatNumber(floatNumber, decimalCount) {
    return Number(floatNumber.toFixed(decimalCount));
  }

  getRandomInteger(){
    return Math.floor(Math.random() * (this.maxValue - this.minValue + 1)) + this.minValue;
  }

  getRandomFloat() {
    const floatNumber = Math.random() * (this.maxValue - this.minValue) + this.minValue;
    return this.roundingFloatNumber(floatNumber, this.decimalCount);
  }
}
//Вызов класса без сохранения для устранения ошибки ESLINT
new ValuesRandomizer(-20,-3,4);

