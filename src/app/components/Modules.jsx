"use client"

import { useState } from 'react';
import CardModules from "./CardModules";
import { modulesData } from '@/lib/modules';


const Modules = () => {
    const [selectedYear, setSelectedYear] = useState('preparatoryYear1');
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [activeFilter, setActiveFilter] = useState('1 ere');

    const yearOptions = [
        { id: 'preparatoryYear1', label: '1st year', displayName: '1st Preparatory Year' },
        { id: 'preparatoryYear2', label: '2nd year', displayName: '2nd Preparatory Year' },
        { id: 'secondCycleYear1', label: '3rd year', displayName: '1st Year Second Cycle' },
        { id: 'secondCycleYear2', label: '4th year', displayName: '2nd Year Second Cycle' },
        { id: 'secondCycleYear3', label: '5th year', displayName: '3rd Year Second Cycle' },
    ];

    const handleYearClick = (yearId, label) => {
        setSelectedYear(yearId);
        setSelectedSpecialty(null);
        setActiveFilter(label);
    };

    const handleSpecialtyClick = (specialtyId) => {
        setSelectedSpecialty(specialtyId);
    };

    const getActiveModules = () => {
        const yearData = modulesData[selectedYear];

        if (selectedSpecialty && yearData.specialties) {
            return yearData.specialties[selectedSpecialty].modules;
        } else if (yearData.modules) {
            return yearData.modules;
        } else if (yearData.specialties) {
            return Object.values(yearData.specialties).flatMap(specialty => specialty.modules);
        }

        return [];
    };

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-7/8 max-w-7xl flex flex-col item-center text-center gap-4 my-16 lg:my-20'>
                <h3 className='text-secondary-medium-orange text-lg font-semibold'>Explore Our Diverse Course Offerings</h3>
                <h1 className='text-title text-5xl font-semibold'>Courses Benefits</h1>
                <p className='text-description lg:w-1/2 self-center mt-6'>
                    Dive into a Wide Range of Subjects and Modules, Catering to Your Unique Interests and Learning Needs
                </p>

                {/* Year filters */}
                <div className='self-center flex items-center justify-between gap-4 mt-6'>
                    {yearOptions.map((option) => (
                        <span
                            key={option.id}
                            className={`px-4 py-2 text-sm font-medium border-[0.5px] border-solid rounded-3xl cursor-pointer transition-all ${activeFilter === option.label
                                    ? 'text-secondary-medium-orange border-secondary-medium-orange bg-orange-50'
                                    : 'text-title border-primary-light-gray'
                                }`}
                            onClick={() => handleYearClick(option.id, option.label)}
                        >
                            {option.label}
                        </span>
                    ))}
                </div>

                {modulesData[selectedYear]?.specialties && (
                    <div className='self-center flex flex-wrap items-center justify-center gap-4 mt-4'>
                        {Object.entries(modulesData[selectedYear].specialties).map(([key, specialty]) => (
                            <span
                                key={key}
                                className={`px-4 py-2 text-sm font-medium border-[0.5px] border-solid rounded-3xl cursor-pointer transition-all ${selectedSpecialty === key
                                    ? 'text-secondary-medium-orange border-secondary-medium-orange bg-orange-50'
                                    : 'text-title border-primary-light-gray'
                                    }`}
                                onClick={() => handleSpecialtyClick(key)}
                            >
                                {specialty.name}
                            </span>
                        ))}
                    </div>
                )}

                <div className='flex flex-wrap items-stretch justify-center gap-4 mt-10'>
                    {getActiveModules().map((module, index) => (
                        <CardModules
                            key={`${module.sign}-${index}`}
                            title={module.name}
                            icon={module.icon}
                            sign={module.sign}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modules;