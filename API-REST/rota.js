import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { App } from './app.js'

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

    const crud = new App()

    
    crud.executeSearchQuey()
    //crud.SearchQueyById(1)
    //crud.InsertQuey()
    //crud.UpdatetQuey()
    //crud.DeletetQuey(5)


    //console.log("")
}

//rota.get('/testar', teste)



const gravar = (req,res) => {

    const crud = new App()    

    let nomeRecebido = req.query.nome  
    let emailRecebido = req.query.email

    crud.InsertQuery(nomeRecebido,emailRecebido)
}

rota.get('/inserir', gravar)





rota.listen(porta, () => {
    console.log(`http://localhost:${porta}`)
})