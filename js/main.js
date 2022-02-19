const exchangeLessForMore = (num1, num2) => {
  if (num1 < num2) {
    [num2, num1] = [num1, num2];
  }
};

const exchangeNegativeForPositive = (num1, num2) => {
  if (num1 < 0 || num2 < 0) {
    [num1, num2] = [Math.abs(num1), Math.abs(num2)];
  }
};

const validateRandomNumbers = (value1, value2) => {
  exchangeNegativeForPositive(value1, value2);
  exchangeLessForMore(value1, value2);
};

const getRandomInteger = (min, max) => {
  validateRandomNumbers(min, max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const getRandomFloat = (min, max, decimalCount=2) => {
  validateRandomNumbers(min, max);
  const num = Math.random() * (max - min) + min;
  return +num.toFixed(decimalCount);
};

//Вывод функций для того, чтобы убрать ошибку ESLint о неиспользуемых функциях
getRandomInteger(3, 20);
getRandomInteger(20, 3);
getRandomFloat(2, 10);
getRandomFloat(2, 10, 4);
