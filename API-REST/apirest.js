import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { App } from './app.js'
import cors from 'cors'

const rota = express()
rota.use(express.json())
const porta = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDirectory = path.join(__dirname, 'public')

// Use o middleware CORS
rota.use(cors({
    
    origin: '*' 
}))

const crud = new App() 

// ROTA DE HOMEPAGE (Retorna HTML) ---
rota.get('/', (req,res) => {
res.sendFile('index.html', { root: rootDirectory })
})

// ROTAS RESTful para o recurso 'usuarios' ---

rota.get('/usuarios', async (req, res) => {
 try {
 const usuarios = await crud.executeSearchQuey()
 return res.status(200).json(usuarios)
 } catch (error) {
 console.error('Erro ao listar usuários:', error)
 return res.status(500).json({ message: 'Erro interno do servidor ao listar usuários.' })
 }
})

rota.get('/usuarios/:id', async (req, res) => {
 const id = parseInt(req.params.id)
 if (isNaN(id)) {
 return res.status(400).json({ message: 'ID de usuário inválido.' })
 }
 try {
 const usuario = await crud.SearchQueyById(id)

 if (!usuario) {
 return res.status(404).json({ message: 'Usuário não encontrado.' })
 } 

 return res.status(200).json(usuario)
 
 } catch (error) {
 console.error(`Erro ao buscar usuário ${id}:`, error)
 return res.status(500).json({ message: 'Erro interno do servidor ao buscar usuário.' })
 }
})

rota.post('/usuarios', async (req, res) => {
 const { nome, email } = req.body

 if (!nome || !email) {
 return res.status(400).json({ message: 'Nome e email são obrigatórios.' })
 }

 try {
 const novoUsuario = await crud.InsertQuery(nome, email)
 return res.status(201).json({ 
 message: 'Usuário inserido com sucesso!', 
 usuario: novoUsuario 
})
 } catch (error) {
console.error('Erro ao inserir usuário:', error)
return res.status(500).json({ message: 'Erro interno do servidor ao inserir usuário.' })
}
})

rota.put('/usuarios', async (req, res) => {

const { id, nome, email } = req.body 

 if (isNaN(id)) {
 return res.status(400).json({ message: 'ID de usuário inválido.' })
 }

 if (!id && !nome && !email) {
 return res.status(400).json({ message: 'Pelo menos um campo (nome ou email) deve ser fornecido para atualização.' })
 }

 try {
 const resultado = await crud.UpdatetQuey(id, nome, email) 

return res.status(200).json({ message: `Usuário ${id} atualizado com sucesso!` })
 } catch (error) {
 console.error(`Erro ao atualizar usuário ${id}:`, error)
 return res.status(500).json({ message: 'Erro interno do servidor ao atualizar usuário.' })
 }
})

rota.delete('/usuarios/:id', async (req, res) => {
 const id = parseInt(req.params.id)

 if (isNaN(id)) {
 return res.status(400).json({ message: 'ID de usuário inválido.' })
 }

 try {
 await crud.DeletetQuey(id)
 return res.status(204).send() 
 } catch (error) {
console.error(`Erro ao deletar usuário ${id}:`, error)
 return res.status(500).json({ message: 'Erro interno do servidor ao deletar usuário.' })
 }
})

// --- INICIAR SERVIDOR ---
rota.listen(porta, () => {
 console.log(`API RESTful rodando em: http://localhost:${porta}`)
})