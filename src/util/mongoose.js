export default {
  multipleMongooseToOject: (DBarray) => {
    return DBarray.map((e) => e.toObject());
  },
  mongooseToOject: (DBarray) => {
    return DBarray ? DBarray.toObject() : DBarray;
  },
};
