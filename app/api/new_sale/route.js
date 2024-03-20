'use server'
import { NextResponse } from 'next/server'
import { Book } from '@/models/Book'
import { Sale } from '@/models/Sale'
import connectDB from '@/db'

export async function POST(request) {
    try {
        await connectDB()

        let data = await request.json()

        let book = await Book.findOne({name: data.bookName})

        let new_sales = book.sales + 1

        let update = await Book.updateOne({name: data.bookName}, {$set: {sales: new_sales}})

        const date = new Date()

        let new_sale = new Sale({
            amount: book.price,
            date: `${date.getFullYear()}-${date.getMonth()}`
        })

        await new_sale.save()

        return NextResponse.json({
            status: 'ok'
        })
    } catch (error) {
        console.log('error:', error)
        return NextResponse.json({
            status: 'error'
        })
    }
}