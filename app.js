// NodeJS (Express)

const express = require('express');
const app = express();
app.use(express.json());

let books = [];

app.get('/books', (req, res) => {
	try {
		res.status(200).json(books)
	} catch (err) {
		res.status(500).json({ message: 'Server failure.' })
	}
});

app.get('/books/:id', (req, res) => {
	try {
		// return book if found, otherwise return an error message
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
		// if request body is not {}, add a new book
		// otherwise return error status
		const book = req.body
		if (Object.keys(book) != 0) {
			books.push(book)
			res.status(201).json(book)
		} else {
			res.status(400).json({ message: 'Error adding book, please try again.' })
		}
	} catch (err) {
		res.status(500)
	}
});

app.put('/books/:id', (req, res) => {
	try {
		const updatedData = req.body
		const idx = books.findIndex(b => b.id == req.params.id)
		
		// if book is found, then replace the old data with new data
		if (idx !== -1) {
			const updatedBook = { ...updatedData, id: parseInt(req.params.id) }
			books.splice(idx, 1, updatedBook)
			res.status(200).json(books[idx])
		} else {
			res.status(404).json({ message: 'Book was not found.' })
		}
	} catch (err) {
		res.status(500)
	}
});

app.delete('/books/:id', (req, res) => {
	try {
		const idx = books.findIndex(b => b.id == req.params.id)
		if (idx !== -1) {
			// remove the book with that id
			books.splice(idx, 1)
			res.status(200).json({ id: parseInt(req.params.id), deleted: true })
		} else {
			res.status(404).json({ message: 'Book was not found.' })
		}
	} catch (err) {
		res.status(500)
	}
});

app.listen(3000, () => console.log('Server running on port 3000'));

module.exports = app







