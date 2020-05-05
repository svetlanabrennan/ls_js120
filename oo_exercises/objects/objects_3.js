function objectsEqual(obj1, obj2) {
  let obj1Keys = Object.keys(obj1);
  let obj2Keys = Object.keys(obj2);

  if (!checkKeys(obj1Keys, obj2Keys)) {
    return false;
  } else {
    for (let idx = 0; idx <= obj1Keys.length; idx += 1) {
      let key = obj1Keys[idx];
      if (!obj1[key] === obj2[key]) {
        return false;
      }
    }
    return true;
  }
}

function checkKeys(arr1, arr2) {
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);

  for (let idx = 0; idx < arr1.length; idx += 1) {
    if (arr1[idx] !== arr2[idx]) {
      return false;
    }
  }
  return true;
}

console.log(objectsEqual({ a: 'foo' }, { a: 'foo' }));                      // true
console.log(objectsEqual({ a: 'foo', b: 'bar' }, { a: 'foo' }));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({ a: 'foo', b: undefined }, { a: 'foo', c: 1 }));  // false