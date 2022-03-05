const randomizer = {
  getPositiveInteger: function (a, b) {
    const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
  },

  getPositiveFloat: function (a, b, digits = 1) {
    const lower = Math.min(Math.abs(a), Math.abs(b));
    const upper = Math.max(Math.abs(a), Math.abs(b));
    const result = Math.random() * (upper - lower) + lower;
    return Number(result.toFixed(digits));
  },

  shuffleArray(array) {
    const newArray = array.slice();
    let j, temp;
    for (let i = newArray.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = newArray[j];
      newArray[j] = newArray[i];
      newArray[i] = temp;
    }
    return newArray;
  },

  getRandomValuesFromArray: function (array) {
    array = this.shuffleArray(array);
    array.length = this.getPositiveInteger(1, array.length);
    return array;
  },

  getRandomValueFromArray: function (array) {
    const arrayLastItem = array.length - 1;
    return array[this.getPositiveInteger(1, arrayLastItem)];
  }
};

export{randomizer};

