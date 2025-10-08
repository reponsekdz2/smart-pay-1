import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { useUserStore } from '../hooks/useUserStore';
import type { Course, Simulation } from '../types';
import { School, Bot, Gamepad2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockSimulations } from '../constants/educationData';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <Card className="flex items-center justify-between hover:shadow-lg transition-shadow">
        <div>
            <h3 className="font-bold text-textPrimary dark:text-white">{course.title}</h3>
            <p className="text-xs text-textSecondary dark:text-gray-400">{course.difficulty} • {course.duration}</p>
        </div>
        <div className="text-right">
            <p className="text-sm font-semibold text-success">+{course.reward} RWF</p>
            <p className="text-xs text-textSecondary dark:text-gray-400">on completion</p>
        </div>
    </Card>
);

const SimulationCard: React.FC<{ sim: Simulation }> = ({ sim }) => (
    <Card className="hover:shadow-lg transition-shadow">
        <h3 className="font-bold text-textPrimary dark:text-white">{sim.title}</h3>
        <p className="text-sm text-textSecondary dark:text-gray-400 mt-1">{sim.description}</p>
        <button className="w-full text-center text-primary font-semibold pt-3 mt-2 border-t border-gray-100 dark:border-gray-700">
            Start Simulation
        </button>
    </Card>
);


const EducationScreen: React.FC = () => {
    const { courses } = useUserStore();
    const navigate = useNavigate();

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Financial Education" leftAction={<button onClick={() => navigate(-1)}><ArrowLeft/></button>} />
            <div className="p-4 space-y-6">
                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <School className="w-5 h-5 mr-2 text-primary"/>
                        Your Learning Path
                    </h2>
                    <div className="space-y-3">
                        {courses.map(course => <CourseCard key={course.id} course={course} />)}
                    </div>
                </div>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Gamepad2 className="w-5 h-5 mr-2 text-primary"/>
                        Financial Simulations
                    </h2>
                    <div className="space-y-3">
                        {mockSimulations.map(sim => <SimulationCard key={sim.id} sim={sim} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducationScreen;
