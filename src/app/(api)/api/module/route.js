import connectDB from "@/lib/db";
import { Module } from "@/models/Module";
import { NextResponse } from "next/server";


export const GET = async () => {
  try {
    await connectDB();
    
    const modules = await Module.find({})
      .sort({ academicLevel: 1, specialty: 1, name: 1 })

    return NextResponse.json(
      { modules },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error.message 
      },
      { status: 500 }
    );
  }
}