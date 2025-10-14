import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const rota = express()
const porta = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDirectory = path.join(__dirname, 'public');


rota.get('/', (req,res) => {
   res.sendFile('index.html', { root: rootDirectory })
 
   
})

rota.get('/sobre', (req,res) => {
    res.sendFile('sobre.html', { root: rootDirectory })
    //res.sendFile(path.join(__dirname,'/public','sobre.html'))
})


const teste = (req,res) => {
    console.log("Meu teste")
}

rota.get('/testar', teste)



rota.listen(porta, () => {
    console.log(`http://localhost:${porta}`)
})