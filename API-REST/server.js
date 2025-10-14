import express, { json } from 'express'

const rota = express()
const porta = 3000

//Iniciar servidor
rota.listen(porta, () => {
    console.log(`http://localhost:${porta}`)
})