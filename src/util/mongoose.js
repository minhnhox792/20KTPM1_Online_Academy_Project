export const multipleMongooseToOject = (DBarray) => {
  return DBarray.map((e) => e.toObject());
};
export const mongooseToOject = (DBarray) => {
  return DBarray ? DBarray.toObject() : DBarray;
};
