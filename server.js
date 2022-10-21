const express = require("express")
require('dotenv').config()
const contenedor = require("./contenedor.js")

const productosList = new contenedor("productos.txt");

const app = express();

app.get('/', (_req, res) => {
    res.status(200).json({
        health: 'up',
        success: true
    })
})

app.get('/productos', async (_req, res) => {
        const result = await productosList.getAll()
        res.send(result)

})

app.get('/productoRandom', async (_req, res) => {
    const result = await productosList.getAll()
    const randomNumber = Math.floor(Math.random() * result.length);
    res.send(result[randomNumber])
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.info(`Server up and running on port ${PORT}`)
})