import db from "../db.js";

export const create = (req, res) => {
    const { title, description } = req.body;
    const user_id = req.user.id;

    const sql = "INSERT INTO card (`user_id`, `title`, `description`) VALUES (?, ?, ?)";

    db.query(sql, [user_id, title, description], (err, result) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send({ message: "Value created", result });
    });
};


export const read = (req,res)=>{
    const sql = "select*from card";
    db.query(sql,(err,result)=>{
        if (err) return res.status(500).send(err)
            return res.status(200).send({message:"value read",result})
    })
}

export const update = (req, res) => {
    const {id} = req.params;
    const { title, description } = req.body;
    const userid = req.user.id;

    const sql = "UPDATE card SET title=?, description=? WHERE id=? AND user_id=?";
    db.query(sql, [title, description, id, userid], (error, result) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Blog post not found or user not authorized" });
        }

        return res.status(200).json({ message: "Successfully updated", result });
    });
};

export const del = (req, res) => {
    const { id } = req.params; 

    const userid = req.user.id;


    const sql = "DELETE FROM card WHERE id = ? and user_id=?";

    db.query(sql,[id,userid], (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.affectedRows===0){
            return res.status(400).send({message:"blog post not found or user not authorized"})
        }
        return res.status(200).send({ message: "deleted...", result });
    });
}


export const re = (req, res) => {
    const userId = req.user.id;
  
    const sql = "SELECT * FROM card WHERE user_id = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send({ message: "No records found for this user" });
        return res.status(200).send({ message: "Value read", result });
    });
};