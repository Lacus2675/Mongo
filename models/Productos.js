
const mongoose = require ('mongoose');

const productosSchema = new mongoose.Schema({
    imagen: String,
    marca: String,
    modelo: String,
    precio: Number
    
})

module.exports = mongoose.model('Productos', productosSchema);

