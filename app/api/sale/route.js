'use server'
import { NextResponse } from "next/server";
import { Sale } from "@/models/Sale";
import connectDB from "@/db";

export async function POST(request) {

    await connectDB()
    
    let data = await request.json()

    const sales = await Sale.find({date: data.date})

    let sale = 0

    sales.forEach((value) => {
        sale += value.amount
    })

    return NextResponse.json({sale});
}

export async function GET(request) {

    await connectDB()

    const sales = await Sale.find({})

    let sale = 0

    sales.forEach((value) => {
        sale += value.amount
    })

    return NextResponse.json({sale});
}