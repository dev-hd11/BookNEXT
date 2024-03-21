'use server'
import { NextResponse } from 'next/server'
import { Book } from '@/models/Book'
import { Sale } from '@/models/Sale'
import connectDB from '@/db'

export async function POST(request) {
    try {
        await connectDB()

        let data = await request.json()

        let del = await Book.deleteOne({ book_id: data.book_id })

        return NextResponse.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 'error' })
    }
}