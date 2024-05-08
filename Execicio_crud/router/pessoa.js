const express = require("express")
const router = express.Router()



let listaPessoas =[  {
    id: "1",
    nome: "João",
    idade: 20,
    email: "joão@email.com",
    telefone: "61900010002"
  },
  {
    id: "2",
    nome: "Maria",
    idade: 25,
    email: "maria@email.com",
    telefone: "61900020003"
  },
  {
    id: "3",
    nome: "Pedro",
    idade: 30,
    email: "pedro@email.com",
    telefone: "61900030004"
  },
  {

    id: "4",
    nome: "Ana",
    idade: 22,
    email: "ana@email.com",
    telefone: "61900040005"
  },
  {
    id: "5",
    nome: "Lucas",
    idade: 28,
    email: "lucas@email.com",
    telefone: "61900050006"
  },
  {
    id: "6",
    nome: "Carla",
    idade: 35,
    email: "carla@email.com",
    telefone: "61900060007"
  }

]
// intermediario - middleware 
function validandoPessoa(req, res, next){
const id = req.params.id

//Com essa variavel find eu consigo encontrar o objeto da array com o id 
const pessoa = listaPessoas.find(pessoas => pessoas.id == id )
//Com essa variavel eu consigo emazenar a posição que o ojeto esta na arrey para que ele seja modificado
const index = listaPessoas.findIndex(pessoa => pessoa.id == id)

if(pessoa){
// Se é o carro exitir ele rertonara os valores no res.carro é res.index é api vai continuar com o next()
 res.pessoa = pessoa 
 res.index = index

return next()

}
//Caso não tiver os valores na variaveis retonara essa resposta
return res.status(400).json("Pessoa não encontrada!")
}


//Validando se alguma desses dados estão incorretos
function validarArtributos(req, res, next){
const dados = req.body

if(!dados.nome||!dados.idade||!dados.email||!dados.telefone){
return res.status(400).json("Nome, idade, emails e telefone são obrigatorios!")
}
 return next()
}







//- Recuperar todas as pessoas.
router.get("/pessoa", (req,res)=>{

    res.json(listaPessoas)

})

//   - Recuperar uma pessoa específica por meio de seu identificador.
router.get("/pessoa/:id" , validandoPessoa, (req,res)=>{

res.json(res.pessoa)
})

//    - Adicionar uma nova pessoa.
router.post("/pessoa",validarArtributos,(req, res)=>{

  const dados  = req.body

  console.log(req.body)
const novaPessoa = {
  id: Math.round(Math.random() * 1000),
  nome: dados.nome,
  idade: dados.idade,
  email: dados.email,
  telefone: dados.telefone

}

listaPessoas.push(novaPessoa)


res.json(`Novo usuario adicionado ${req.body}`)
})


// Atualizar uma pessoa existente com base em seu identificador.
 
router.put("/pessoa/:id",validandoPessoa,validarArtributos, (req, res)=>{


  let id = req.params.id

  const dados  = req.body

  const Atualizarpessoa = {
    id: id,
    nome: dados.nome,
    idade: dados.idade,
    email: dados.email,
    telefone: dados.telefone
  }

  listaPessoas[res.index] = Atualizarpessoa
res.json("usuario atualizado")

})

router.delete("/pessoa/:id", validandoPessoa,(req, res)=>{
listaPessoas.splice(res.index,1)
res.json("Pessoa excluida com sucesso")

})


module.exports = router