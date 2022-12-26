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
  },
  dateFormat: (input) => {
    var datePart = input.match(/\d+/g),
    year = datePart[0], // get only two digits
    month = datePart[1], day = datePart[2];
    return day+'/'+month+'/'+year;
  },
  reFormatDate: (s) =>{
    var b = s.split(/\D/);
   return b.reverse().join('-');
  }
};
