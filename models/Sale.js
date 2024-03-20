import mongoose  from 'mongoose'

const saleSchema = new mongoose.Schema({
    amount: Number,
    date: String
})

export const Sale =  mongoose.models.Sale || mongoose.model('Sale' ,saleSchema)

