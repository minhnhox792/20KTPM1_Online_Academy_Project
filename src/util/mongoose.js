export default {
  multipleMongooseToOject: (DBarray) => {
    return DBarray.map((e) => e.toObject());
  },
  mongooseToOject: (DBarray) => {
    return DBarray ? DBarray.toObject() : DBarray;
  },
  filter: (arr) => {
    arr = arr.filter(function(x) {
      return x !== undefined;
    });
    return arr;
  }
};
