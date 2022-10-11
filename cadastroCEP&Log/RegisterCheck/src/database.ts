import {Database} from "sqlite3"

const db = new Database(
    "db.sqlite",
    err => {
        if (err)
        throw new Error(`Erro ao conectar no banco de dados: ${err.message}`)
    
        db.run(
            `CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                password TEXT
            )
            `,
            err => {
                if (err)
                throw new Error(`Erro ao criar tabela 'user': ${err.message}`)

                const insert = 'INSERT OR IGNORE INTO user (name, password) Values (?,?)'
                db.run(insert, ["admin", "123456"])
                db.run(insert, ["user", "654321"])
            }
        )
    }
)