const Productos = require('../models/Productos');

exports.index = async (req, res) => {
    let productos;
    let query = req.query.q || '';  // Definir la variable query aquí para evitar repetición

    if (query) {
        // Si hay una consulta de búsqueda, filtrar los productos por marca usando expresiones regulares
        productos = await Productos.find({ marca: { $regex: new RegExp(query, 'i') } });
    } else {
        // Si no hay consulta, mostrar todos los productos
        productos = await Productos.find();
    }

    // Pasar productos y query a la vista
    res.render('products/index', { productos, query });
};

exports.new = (req, res) => {
    res.render('products/new');
};

exports.create = async (req, res) => {
    const producto = new Productos(req.body.Productos); // Utiliza Productos en lugar de productos
    await producto.save();
    res.redirect(`/products/${producto._id}`);
};

exports.show = async (req, res) => {
    try {
        const producto = await Productos.findById(req.params.id);  // Usar el nombre de variable 'producto' en singular
        if (!producto) {
            return res.status(404).send('El producto no se encontró en la base de datos.');
        }
        res.render('products/show', { producto });  // Pasar la variable 'producto' en singular a la vista
    } catch (error) {
        console.error('Error al mostrar el producto:', error);
        res.status(500).send('Error interno del servidor al mostrar el producto.');
    }
};


exports.edit = async (req, res) => {
    const producto = await Productos.findById(req.params.id);
    res.render('products/edit', { producto });  // Cambiado de productos a producto para reflejar que es un solo producto
};

/*
exports.update = async (req, res) => {
    console.log(req.body);  // Aquí agregas la línea para verificar qué datos se están enviando
    
    const productosId = req.params.id;
    try {
        const producto = await Productos.findByIdAndUpdate(productosId, req.body.Productos, { new: true });
        if (!producto) {
            return res.status(404).send('El producto no se encontró en la base de datos.');
        }
        res.redirect(`/products/${producto._id}`);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).send('Error interno del servidor al actualizar el producto.');
    }
};
*/

exports.update = async (req, res) => {
    console.log(req.body);  // Verifica qué datos se están enviando
    
    const productosId = req.params.id;
    try {
        // Aquí utilizo directamente req.body.producto en lugar de req.body
        const producto = await Productos.findByIdAndUpdate(productosId, req.body.producto, { new: true });
        
        if (!producto) {
            return res.status(404).send('El producto no se encontró en la base de datos.');
        }
        
        res.redirect(`/products/${producto._id}`);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).send('Error interno del servidor al actualizar el producto.');
    }
};


exports.delete = async (req, res) => {
    const productosId = req.params.id;
    try {
        const producto = await Productos.findByIdAndRemove(productosId);
        if (!producto) {
            return res.status(404).send('El producto no se encontró en la base de datos.');
        }
        res.redirect('/products');
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send('Error interno del servidor al eliminar el producto.');
    }
};
