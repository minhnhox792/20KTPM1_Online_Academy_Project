import numeral from "numeral";

export default function helpers(hbs) {
  hbs.handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });
  hbs.handlebars.registerHelper("compareZero", function (arg1) {
    return arg1 !== 0;
  });
  hbs.handlebars.registerHelper("comparePage", function (arg1, arg2) {
    return arg1 !== arg2;
  });
  hbs.handlebars.registerHelper("compareCurPage", function (last, cur, next) {
    return last !== cur && next !== last;
  });
  hbs.handlebars.registerHelper("compareOne", function (arg1) {
    return arg1 !== 1;
  });
  hbs.handlebars.registerHelper("format_number", function (num) {
    return numeral(num).format("0,0") + "$";
  });
  hbs.handlebars.registerHelper("format_typeNumber", function (num) {
    return numeral(num).format("0,0");
  });
  hbs.handlebars.registerHelper("format_date", function (data) {
    return data.toLocaleDateString("en-US");
  });
  hbs.handlebars.registerHelper("cal_discount", function (price, discount) {
    return price - (price * discount) / 100;
  });
  hbs.handlebars.registerHelper("math_add", function (num1, num2) {
    return num1 + num2;
  });
  hbs.handlebars.registerHelper("math_compare", function (num1, num2) {
    return num1 < num2;
  });
  hbs.handlebars.registerHelper("isBestseller", function (num1) {
    return num1 > 3;
  });
  hbs.handlebars.registerHelper("new_course", function (data) {
    const currentDate = new Date()  
    console.log("Typeof: "+ data+ typeof(data)) 
    const result = (currentDate.getTime() - data.getTime()) <= 60 * 60 * 1000 * 24 * 1
    console.log("Result: ", result)
    return result
  });
}
