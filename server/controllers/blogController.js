import db from "../db.js";


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
