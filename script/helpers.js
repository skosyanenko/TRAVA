// добавление данных в массив из объекта (json)
function addDataToArray(obj) {
    let arr = [];
    for (let prop in obj) arr.push(obj[prop]);
    return arr;
}

// соединение свойств объекта в строку
function concatValues(obj) {
    let value = '';
    for (let prop in obj) value += obj[prop];
    return value;
}
