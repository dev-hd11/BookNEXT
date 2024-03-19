import mongoose  from 'mongoose'

const bookSchema = new mongoose.Schema({
    name: String,
    price: Number,
    sales: Number,
    book_id: String
})

export const Book =  mongoose.models.Book || mongoose.model('Book' ,bookSchema)

