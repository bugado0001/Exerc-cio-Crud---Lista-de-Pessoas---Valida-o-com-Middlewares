const express = require("express")
const app = express()
const porta = 3000



// Intemediario que tranfoma o corpo em requisição json  
app.use(express.json())

const pessoaRouter = require("./router/pessoa.js")

app.use(pessoaRouter)


app.listen(porta, ()=>{
    console.log("Api rodando com sucesso na porta", porta)
})