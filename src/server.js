const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

// configurar pasta publica
server.use(express.static("public"))

// Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar caminhos da minha aplicação
// pagina inicial
// req: Requisição
// res: Resposta

server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título" })
})
server.get("/create-pet", (req, res) => {

    // req.query: Query Strings da nossa url
    // console.log(req.query)

    return res.render("create-pet.html")
})

server.post("/savepet", (req, res) => {

    //  req.body: O corpo do nosso formulario
    // console.log(req.body)

    // inserir dados no banco de dados
    const query = `
        INSERT INTO pets (
            image,
            name,
            age,
            description,
            breed,
            address,
            number,
            state,
            city,
            species
        ) VALUES (?,?,?,?,?,?,?,?,?,?);

    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.age,
        req.body.description,
        req.body.breed,
        req.body.address,
        req.body.number,
        req.body.state,
        req.body.city,
        req.body.species

    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastro com sucesso")
        console.log(this)

        return res.render("create-pet.html", { saved: true })
    }

    db.run(query, values, afterInsertData)


})





server.get("/search", (req, res) => {





    // pegar dados do banco de dados
    db.all(`SELECT * FROM pets`, function(err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
            // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { pets: rows, total: total })
    })


})

// Ligar o servidor
server.listen(3000)