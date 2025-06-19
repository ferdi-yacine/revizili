import connectDB from "@/lib/db";
import { modulesData } from "@/lib/modules";
import { Module } from "@/models/Module";
import { NextResponse } from "next/server";


export const POST = async () => {
  try {
    await connectDB();

    // Delete existing modules (optional)
    await Module.deleteMany({});
    console.log('Cleared existing modules');

    // Prepare modules to insert
    const modulesToInsert = [];

    // Process preparatoryYear1
    modulesData.preparatoryYear1.modules.forEach(module => {
      modulesToInsert.push({
        name: module.name,
        sign: module.sign,
        icon: module.icon,
        academicLevel: 'preparatoryYear1',
        specialty: null
      });
    });

    // Process preparatoryYear2
    modulesData.preparatoryYear2.modules.forEach(module => {
      modulesToInsert.push({
        name: module.name,
        sign: module.sign,
        icon: module.icon,
        academicLevel: 'preparatoryYear2',
        specialty: null
      });
    });

    // Process secondCycleYear1
    modulesData.secondCycleYear1.modules.forEach(module => {
      modulesToInsert.push({
        name: module.name,
        sign: module.sign,
        icon: module.icon,
        academicLevel: 'secondCycleYear1',
        specialty: null
      });
    });

    // Process secondCycleYear2 specialties
    for (const [specialtyKey, specialtyData] of Object.entries(modulesData.secondCycleYear2.specialties)) {
      specialtyData.modules.forEach(module => {
        modulesToInsert.push({
          name: module.name,
          sign: module.sign,
          icon: module.icon,
          academicLevel: 'secondCycleYear2',
          specialty: specialtyKey
        });
      });
    }

    // Process secondCycleYear3 specialties
    for (const [specialtyKey, specialtyData] of Object.entries(modulesData.secondCycleYear3.specialties)) {
      specialtyData.modules.forEach(module => {
        modulesToInsert.push({
          name: module.name,
          sign: module.sign,
          icon: module.icon,
          academicLevel: 'secondCycleYear3',
          specialty: specialtyKey
        });
      });
    }

    const result = await Module.insertMany(modulesToInsert);

    return NextResponse.json(
      { 
        message: 'Modules seeded successfully',
        count: result.length 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error seeding modules:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error.message 
      },
      { status: 500 }
    );
  }
}