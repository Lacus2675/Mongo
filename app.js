const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

// Cadena de conexión a MongoDB Atlas
const uri = "mongodb+srv://jmllacu26:101010@cluster0.pt1cwxl.mongodb.net/fullstack?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conectado a la base de datos MongoDB Atlas");
    })
    .catch(err => {
        console.error('Error de conexión con la base de datos', err);
    });

mongoose.connection.on('error', err => {
    console.error('Error de conexión con la base de datos', err);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Mueve esta línea antes de definir tus rutas

const homeController = require('./controllers/homeController');
const productRoutes = require('./routes/products');

app.get('/', homeController.index);
app.use('/', productRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Problemas en el servidor.');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
