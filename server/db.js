import sql, { createConnection } from 'mysql2'

const db = createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
})

db.connect((err)=>{
    if(err) return console.log(err)
        console.log("Database Connected");
})
export default db;