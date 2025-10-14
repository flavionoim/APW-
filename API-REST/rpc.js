import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { App } from './app.js'

const rota = express()
//const porta = 3000

//RPC (Remote Procedure Call) over HTTP
//No modelo RPC, você chama uma função ou método específico no servidor. A rota não representa um "recurso" (/usuarios), mas sim uma "ação" (/inserirUsuario, /deletarPorId).

const gravar = async (req, res) => {
    const { nome, email } = req.body // Pegando do corpo, o jeito certo

    if (!nome || !email) {
        return res.status(400).json({ message: 'Nome e email são obrigatórios.' })
    }

    try {
        const crud = new App()
        await crud.InsertQuery(nome, email)
        return res.status(201).json({ message: 'Usuário inserido com sucesso!' })
    } catch (error) {
        console.error('Erro ao inserir:', error)
        return res.status(500).json({ message: 'Erro interno do servidor.' })
    }
}

rota.post('/inserirUsuario', gravar)


// Listar todos
const listarTodos = async (req, res) => {
    try {
        const crud = new App()
        // Chama o método para buscar todos
        const usuarios = await crud.executeSearchQuey()
        
        // Retorna 200 OK com a lista de usuários
        return res.status(200).json(usuarios)
    } catch (error) {
        console.error('Erro ao listar usuários:', error)
        return res.status(500).json({ message: 'Erro interno do servidor ao listar usuários.' })
    }
}

rota.get('/listar-usuarios', listarTodos);


//Buscar por Id
const buscarPorId = async (req, res) => {
    // Pega o ID da URL e converte para número
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID de usuário inválido.' })
    }

    try {
        const crud = new App();
        const usuario = await crud.SearchQueyById(id)
        
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' })
        }

        // Retorna 200 OK com o usuário
        return res.status(200).json(usuario)
    } catch (error) {
        console.error(`Erro ao buscar usuário ${id}:`, error)
        return res.status(500).json({ message: 'Erro interno do servidor ao buscar usuário.' })
    }
}

rota.get('/buscar-usuario/:id', buscarPorId)


//Atualizar
const atualizar = async (req, res) => {
    // Pega os dados do corpo (ID é obrigatório para saber quem atualizar)
    const { id, nome, email } = req.body 

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID de usuário inválido.' })
    }

    if (!nome && !email) {
        return res.status(400).json({ message: 'Pelo menos nome ou email deve ser fornecido para atualização.' })
    }

    try {
        const crud = new App()
        // O método deve ser chamado com ID, Nome e Email (como seu crud.UpdatetQuey deve esperar)
        const resultado = await crud.UpdatetQuey(id, nome, email) 

        // Retorna 200 OK
        return res.status(200).json({ message: `Usuário ${id} atualizado com sucesso!` })
    } catch (error) {
        console.error(`Erro ao atualizar usuário ${id}:`, error)
        return res.status(500).json({ message: 'Erro interno do servidor ao atualizar usuário.' })
    }
}

rota.post('/atualizar-usuario', atualizar)


//Apagar
const deletar = async (req, res) => {
    // Pega o ID da URL
    const id = parseInt(req.params.id) 

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID de usuário inválido.' })
    }

    try {
        const crud = new App()
        await crud.DeletetQuey(id)
        
        // Retorna 204 No Content (padrão para sucesso sem corpo de resposta em deleções)
        return res.status(204).send() 
    } catch (error) {
        console.error(`Erro ao deletar usuário ${id}:`, error)
        return res.status(500).json({ message: 'Erro interno do servidor ao deletar usuário.' })
    }
}

rota.post('/deletar-usuario/:id', deletar) 



//Iniciar servidor
//rota.listen(porta, () => {
//    console.log(`http://localhost:${porta}`)
//})