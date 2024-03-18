'use server'
import fs from 'fs/promises'
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        let x = await fs.readFile('user.json')
        let data = await x.toString()
        data = JSON.parse(x)

        return NextResponse.json(data)
    } catch (error) {
        console.log('error')
    }
}