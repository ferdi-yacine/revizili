import connectDB from "@/lib/db";
import { BecomeTutor } from "@/models/BecomeTutor";
import { Review } from "@/models/Review";
import { Tutor } from "@/models/Tutor";
import { NextResponse } from "next/server";


export const GET = async (request) => {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const moduleId = searchParams.get('moduleId');
        const level = searchParams.get('level');

        const tutors = await Tutor.find({
            modules: moduleId
        }).populate({
            path: 'userId',
            select: 'firstName lastName email'
        }).populate({
            path: 'modules',
            select: 'name sign'
        });

        if (!tutors || tutors.length === 0) {
            return NextResponse.json(
                { tutors: [] },
                { status: 200 }
            );
        }

        const enrichedTutors = await Promise.all(tutors.map(async (tutor) => {
            // Get reviews for this tutor
            const reviews = await Review.find({ tutorId: tutor.userId._id });

            // Calculate average rating
            const rating = reviews.length > 0
                ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
                : 0;

            const tutorApplication = await BecomeTutor.findOne({ userId: tutor.userId._id })
                .select('bio experience languages')
                .lean();

            return {
                id: tutor.userId._id.toString(),
                firstName: tutor.userId.firstName,
                lastName: tutor.userId.lastName,
                modules: tutor.modules.map(m => m.name),
                rating: parseFloat(rating.toFixed(1)),
                reviewCount: reviews.length,
                experience: tutorApplication?.experience || 'Not specified',
                bio: tutorApplication?.bio || '',
                languages: tutorApplication?.languages || [],
                availability: "Flexible schedule"
            };
        }));

        let filteredTutors = enrichedTutors;

        return NextResponse.json(
            { tutors: filteredTutors },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error searching tutors:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
};