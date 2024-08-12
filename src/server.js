const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection using environment variables
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'Projectuser',
    password: 'nitin@2005',
    database: 'flashcards_db',
});

db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        throw err;
    }
    console.log('MySQL Connected...');
});

// Routes for CRUD operations
app.get('/sql/flashcards', (req, res) => {
    const sql = 'SELECT * FROM flashcards';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching flashcards:', err);
            return res.status(500).send('Error fetching flashcards');
        }
        res.json(result);
    });
});

app.post('/sql/flashcards', (req, res) => {
    const newCard = req.body;

    // Check if the question field is present and not empty
    if (!newCard.question || newCard.question.trim() === '') {
        return res.status(400).send('Question is required to add a flashcard.');
    }

    const sql = 'INSERT INTO flashcards SET ?';
    db.query(sql, newCard, (err, result) => {
        if (err) {
            console.error('Error adding flashcard:', err);
            return res.status(500).send('Error adding flashcard');
        }
        res.status(201).send('Flashcard added...');
    });
});

app.put('/sql/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const updatedCard = req.body;

    const sql = 'UPDATE flashcards SET ? WHERE id = ?';
    db.query(sql, [updatedCard, id], (err, result) => {
        if (err) {
            console.error('Error updating flashcard:', err);
            return res.status(500).send('Error updating flashcard');
        }
        res.send('Flashcard updated...');
    });
});

app.delete('/sql/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM flashcards WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error('Error deleting flashcard:', err);
            return res.status(500).send('Error deleting flashcard');
        }
        res.send('Flashcard deleted...');
    });
});

// Use environment variable for port
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
