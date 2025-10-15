const express = require('express');
let mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Koneksi ke database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: 'Binoza2610',
    database: 'mahasiswa'
});

db.connect((err) => {
    if(err){
        console.log('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL successfully');
});

// GET method: ambil semua data biodata
app.get('/biodata', (req, res) => {
    const query = 'SELECT * FROM biodata';
    db.query(query, (err, results) => {
        if(err){
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// POST: tambah data biodata
app.post('/biodata', (req, res) => {
    const { nama, alamat, agama } = req.body;
    if(!nama || !alamat || !agama){
        return res.status(400).json({ error: 'Nama, Alamat, dan Agama wajib diisi' });
    }
    const query = 'INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)';
    db.query(query, [nama, alamat, agama], (err, result) => {
        if(err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Data berhasil ditambahkan', id: result.insertId });
    });
});

// Root route
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
