import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Precal11',
  database: 'test',
});

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  //   res.json({ message: 'Hello World' });
  res.json('Hello this is the backend');
});

app.get('/books', (req, res) => {
  const q = 'SELECT * FROM books';
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post('/books', (req, res) => {
  const que =
    'INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)';
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(que, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book added successfully');
  });
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const que = 'DELETE FROM books WHERE id = ?';
  db.query(que, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book deleted successfully.');
  });
});

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const que =
    'UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?';
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
    bookId,
  ];
  db.query(que, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book updated successfully.');
  });
});

app.listen(3000, () => {
  console.log('Connected to backend on PORT 3000');
});
