import db from "../db.js";
import bcrypt from 'bcrypt';

// Login User Function
export const loginUser = (req, res) => {
    // Assuming req.body contains { email, password }
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required" });
    }

    const sql = "SELECT * FROM auth WHERE email = ?";
    
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).send({ message: "Database query error", error: err });
        
        if (results.length === 0) {
            return res.status(401).send({ message: "Invalid email or password" });
        }
        
        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).send({ message: "Invalid email or password" });
        }
        
        // Assuming you handle sessions or JWT for authentication
        res.status(200).send({ message: "Login successful", user });
    });
};

// Register User Function
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send({ message: "Username, email, and password are required" });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO auth(`username`,`email`,`password`) VALUES (?,?,?)";

        db.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) {
                // Check for duplicate entry error (e.g., duplicate email)
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).send({ message: "Email already registered" });
                }
                return res.status(500).send({ message: "Database query error", error: err });
            }

            res.status(201).send({ message: "Registration successful", result });
        });
    } catch (err) {
        res.status(500).send({ message: "Error hashing password", error: err });
    }
};


///

export const create = (req,res)=>{
    const sql = "insert into card(`title`,`description`) values (?,?)";
    const value = req.body
    db.query(sql,[value.title,value.description],(err,result)=>{
        if (err) return res.status(500).send(err)
            return res.status(200).send({message:"value created",result})
    })
}

export const read = (req,res)=>{
    const sql = "select*from card";
    db.query(sql,(err,result)=>{
        if (err) return res.status(500).send(err)
            return res.status(200).send({message:"value read",result})
    })
}

export const update = (req, res) => {
    const sql = "UPDATE card SET title=?, description=? WHERE id=?";
    const value = req.body;
    console.log(value);
    db.query(sql,[value.title,value.description,value.id],(error,result)=>{
        if(error) return res.status(500).json({message:error.message})
        return res.status(200).json({message:"Successfully updated",result})
    })
}

export const del = (req, res) => {
    const { id } = req.params; 
    const sql = "DELETE FROM card WHERE id = ?";

    db.query(sql,[id], (err, result) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send({ message: "deleted...", result });
    });
}
