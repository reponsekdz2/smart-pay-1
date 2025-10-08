import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { useUserStore } from '../hooks/useUserStore';
import type { IbiminaGroup, CommunityProject } from '../types';
import { Users, Building, HeartHandshake } from 'lucide-react';

const IbiminaCard: React.FC<{ group: IbiminaGroup }> = ({ group }) => (
    <Card className="space-y-2">
        <h3 className="font-bold text-lg text-textPrimary dark:text-white">{group.name}</h3>
        <div className="flex justify-between text-sm text-textSecondary dark:text-gray-400">
            <span>Members: <span className="font-semibold text-textPrimary dark:text-gray-200">{group.members}</span></span>
            <span>Next Meeting: <span className="font-semibold text-textPrimary dark:text-gray-200">{group.nextMeeting}</span></span>
        </div>
        <div>
            <p className="text-sm text-textSecondary dark:text-gray-400">Total Savings</p>
            <p className="font-bold text-xl text-primary">{group.totalSavings.toLocaleString()} RWF</p>
        </div>
    </Card>
);

const ProjectCard: React.FC<{ project: CommunityProject }> = ({ project }) => {
    const progress = (project.collected / project.goal) * 100;
    return (
        <Card>
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-textPrimary dark:text-white">{project.title}</h3>
                {project.verified && <div className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full font-semibold">Verified</div>}
            </div>
            <p className="text-xs text-textSecondary dark:text-gray-400 mb-2">by {project.organizer}</p>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 my-2">
                <div className="bg-success h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-textSecondary dark:text-gray-400">
                <span>{project.collected.toLocaleString()} RWF raised</span>
                <span>{project.goal.toLocaleString()} RWF goal</span>
            </div>
            <button className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primaryDark transition-colors mt-4">
                Contribute
            </button>
        </Card>
    );
};


const CommunityScreen: React.FC = () => {
    const { ibiminaGroups, communityProjects } = useUserStore();
    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Community Banking" />
            <div className="p-4 space-y-6">
                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-primary"/>
                        Your Ibimina Groups
                    </h2>
                    <div className="space-y-4">
                        {ibiminaGroups.map(group => <IbiminaCard key={group.id} group={group} />)}
                    </div>
                </div>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Building className="w-5 h-5 mr-2 text-primary"/>
                        Community Projects
                    </h2>
                    <div className="space-y-4">
                        {communityProjects.map(project => <ProjectCard key={project.id} project={project} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityScreen;
