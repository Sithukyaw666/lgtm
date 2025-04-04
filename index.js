require('./instrumentation')
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const app = express();
const port = process.env.PORT || 3000;

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/books';
console.log('MongoDB URL:', mongoUrl);
mongoose.connect(mongoUrl).then(() => {
    console.log('Connected to MongoDB');
}
).catch(err => {
    console.error('Error connecting to MongoDB', err);
}
);

app.get('/books', async(req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);
app.get('/books/:id', async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);  

app.post('/books', async(req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}
);  
app.delete('/books/:id', async(req, res) => {  
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);