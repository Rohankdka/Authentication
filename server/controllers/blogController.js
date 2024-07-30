import db from "../db.js";
import multer from 'multer';
import path from 'path';

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

export const create = (req, res) => {
    upload.single('photo')(req, res, (err) => {
        if (err) {
            return res.status(500).send({ message: "File upload failed", err });
        }
        const { title, description } = req.body;
        const user_id = req.user.id;
        const photo = req.file ? `/uploads/${req.file.filename}` : '';

        const sql = "INSERT INTO card (`user_id`, `title`, `description`, `photo`) VALUES (?, ?, ?, ?)";

        db.query(sql, [user_id, title, description, photo], (err, result) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send({ message: "Value created", result });
        });
    });
};

export const read = (req, res) => {
    const sql = "SELECT * FROM card";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send({ message: "Value read", result });
    });
};

export const update = (req, res) => {
    upload.single('photo')(req, res, (err) => {
        if (err) {
            return res.status(500).send({ message: "File upload failed", err });
        }
        const { id } = req.params;
        const { title, description } = req.body;
        const userid = req.user.id;
        const photo = req.file ? `/uploads/${req.file.filename}` : '';

        const sql = "UPDATE card SET title=?, description=?, photo=? WHERE id=? AND user_id=?";
        db.query(sql, [title, description, photo, id, userid], (error, result) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }

            if (result.affectedRows === 0) {
                return res.status(400).json({ message: "Blog post not found or user not authorized" });
            }

            return res.status(200).json({ message: "Successfully updated", result });
        });
    });
};

export const del = (req, res) => {
    const { id } = req.params; 
    const userid = req.user.id;

    const sql = "DELETE FROM card WHERE id = ? and user_id=?";

    db.query(sql, [id, userid], (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.affectedRows === 0) {
            return res.status(400).send({ message: "Blog post not found or user not authorized" });
        }
        return res.status(200).send({ message: "Deleted...", result });
    });
};

export const re = (req, res) => {
    const userId = req.user.id;
  
    const sql = "SELECT * FROM card WHERE user_id = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send({ message: "No records found for this user" });
        return res.status(200).send({ message: "Value read", result });
    });
};
