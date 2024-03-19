'use server'
import { NextResponse } from "next/server";
import { Book } from "@/models/Book";
import connectDB from "@/db";

export async function GET(request) {

    await connectDB()
    const books = await Book.find({});


    return NextResponse.json(books);
}