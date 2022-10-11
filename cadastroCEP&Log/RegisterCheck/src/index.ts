import express from "express"
import { RunResult } from "sqlite3"
import database from "./database"

const port = 8080
const app = express()
const session: any = {}

app.use(express.json())

//STATIC
app.use("/", express.static("../../Register/dist"))

//BUSCAR TODOS OS USUÁRIOS
app.get("/api/users", (req, res) => {
    const sql = "SELECT id, name FROM user"

    database.all(sql, [], (req, res) => {
        if (err){
            res.status(400).json({ "error": err.message })
            return
        }

        res.json({
            "message": "success",
            "data": rows
        })
    })
})

//BUSCAR UM USUÁRIO
app.get("/api/user/:id", (req, res) => {
    const sql = "SELECT id, name FROM user WHERE id = ?"

    database.get(sql, [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message})
            return
        }

        res.json({
            "message": "success",
            "data": row
        })
    })
})

//CREATE
app.post("/api/user/", (req, res) => {
    const errors = []

    if(!req.body.password)
    errors.push("No password specified")

    if(!req.body.email)
    errors.push("no email specified")

    if(errors.length) {
        res.status(400).json({ "error": errors.join()})
        return
    }

    const {name, password} = req.body
    const sql = 'INSERT INTO user (name, password) VALUES (?,?)'
    const params = [name, password]

    database.run(sql, params, function (this: RunResult, err) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        
        res.json({
            "message": "success",
            "data": {name, password},
            "id": this.lastID
        })
    })
})

// UPDATE
app.patch("/api/user/:id", (req, res) => {
    const { name, password } = req.body
    const sql = `
    UPDATE user SET 
        name = coalesce(?, name),
        password = COALESCE(?, password)
    WHERE
        id = ?
    `

    database.run(sql, [name, password, req.params.id],
        function (this: RunResult, err) {
            if (err) {
                res.status(400).json({"error": err.message})
                return
            }

            res.json({
                message: "success",
                data: {name, password},
                changes: this.changes
            })

//DELETE
app.delete("/api/user/:id", (req, res) => {
    const sql = 'DELETE FROM user WHERE id = ?'
    database.run(sql, [req.params.id],
        function (this: RunResult, err) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return
            }
        
            res.json({ "message": "deleted", changes: this.changes })
        })
    })

app.post("/api/login/", (req, res) => {
    const sql = "SELECT id, name FROM user WHERE password = ?"
    const { email, password } = req.body

    database.get(sql, [password], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }

        if (!row.id) {
            res.status(404).json({ "message": "user not found!"})
            return
        }

        require('crypto').randomBytes(48, (err: any, buffer: any) => {
            const token = buffer.toString('hex')
            session[token] = row
            res.json({ "message": "success", "sesid": token })
        })
    })
})
app.post("/api/logged/:sesid", (req, res) => {
    res.json(session[req.params.sesid] || "nada")
})
    })
})

app.listen(port, () => console.log(`⚡ servidor ${port}`))