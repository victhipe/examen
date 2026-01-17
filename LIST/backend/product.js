const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
    name: {type: String, required: true},
    cost: {type: Number, required: true},
    type: {type: String, required: true}
})
module.exports = model('Product', ProductSchema, 'product');
