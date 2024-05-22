// NodeJS (Express)

const express = require('express');
const app = express();
app.use(express.json());

let books = [];

app.get('/books', (req, res) => {
});

app.get('/books/:id', (req, res) => {
	try {
		const book = books.find(b => b.id == req.params.id)
		if (book) {
			res.status(200).json(book)
		} else {
			res.status(404).json({ message: 'The book you are requesting was not found, please try again.' })
		}
	} catch (err) {
		res.status(500)
	}
});

app.post('/books', (req, res) => {
	try {
		const book = req.body
		if (book) {
			books.push(book)
			res.status(201).json(book)
		} 
	} catch (err) {
		res.status(500)
	}
});

app.put('/books/:id', (req, res) => {
});

app.delete('/books/:id', (req, res) => {
});

app.listen(3000, () => console.log('Server running on port 3000'));

module.exports = app







