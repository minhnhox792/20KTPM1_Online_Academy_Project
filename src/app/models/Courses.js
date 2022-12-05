const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var mongoose_delete = require('mongoose-delete');

var mongoo = require('mongoose');
var slug = require('mongoose-slug-generator');

const Course = new Schema({
  name: {type: String},
  description:{type: String},
  img: {type: String},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  slug: { type: String, slug: "name" , unique : true}
});

mongoo.plugin(slug);
Course.plugin(mongoose_delete);
Course.plugin(mongoose_delete, { 
  deleteAt:true, 
  overrideMethods: 'all' });



module.exports = mongoose.model('Course', Course); 