const client = require('./client')

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('views', path.join(__dirname,'views'))
app.set('view engine','hbs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    client.getAll(null, (err,data)=>{
        if(!err){
            res.render("filmes",{
                results:data.filmes
            })
            console.log(data.filmes)
        }
    })
})

app.post('/save',(req,res)=>{
    let novoFilme = {
        nome: req.body.nome,
        diretor: req.body.diretor,
        dataDeEstreia: req.body.dataDeEstreia
    }
    client.insert(novoFilme, (err,data)=>{
        if(err) throw err;

        console.log("Filme Inserido com sucesso", data);
        res.redirect('/')
    })
})

app.post('/update', (req,res)=>{
    const novoFilme ={
        id:req.body.id,
        nome:req.body.nome,
        diretor:req.body.diretor,
        dataDeEstreia:req.body.dataDeEstreia
    }
    client.update(novoFilme,(err,data)=>{
        if(err) throw err;

        console.log('Filme atualidado com sucesso',data)
        res.redirect('/')
    })
})
app.post('/remove',(req,res)=>{
    client.remove({id:req.body.filme_id}, (err, _)=>{
        if(err) throw err;
    
        console.log('Filme removido com sucesso')
        res.redirect('/')
    })
   
})
app.listen(8080,()=>{
    console.log("Client Rodando na porta 8080")
})