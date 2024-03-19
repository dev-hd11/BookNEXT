'use server'
import { NextResponse } from 'next/server'
import { Book } from '@/models/Book'
import { v4 } from 'uuid'
import connectDB from '@/db'

export async function POST(request) {
    try {
        await connectDB()

        let data = await request.json()

        const new_book = new Book({
            name: data.bookName,
            price: parseFloat(data.bookPrice),
            sales: 0,
            book_id: v4()
        })

        await new_book.save()

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