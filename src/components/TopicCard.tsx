import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Heart, Droplet, Wind, Layers, 
  Syringe, Pill, ListChecks, Stethoscope, Bed, Lungs as LungsIcon 
} from 'lucide-react';
import { Topic } from '../data/anesthesiaTopics';

const Lungs = (props: any) => (
  <LungsIcon {...props} />
);

const getIcon = (iconName: string, size: number = 24) => {
  switch (iconName) {
    case 'heart': return <Heart size={size} />;
    case 'droplet': return <Droplet size={size} />;
    case 'wind': return <Wind size={size} />;
    case 'layers': return <Layers size={size} />;
    case 'syringe': return <Syringe size={size} />;
    case 'pill': return <Pill size={size} />;
    case 'list-checks': return <ListChecks size={size} />;
    case 'activity': return <Activity size={size} />;
    case 'lungs': return <Activity size={size} />;
    case 'bed': return <Bed size={size} />;
    case 'stethoscope': return <Stethoscope size={size} />;
    default: return <Activity size={size} />;
  }
};

interface TopicCardProps {
  topic: Topic;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  return (
    <Link 
      to={`/topic/${topic.id}`} 
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow animate-fade-in"
    >
      <div className={`p-6 border-t-4 border-${topic.color}`}>
        <div className="flex items-center mb-4">
          <div className={`w-10 h-10 rounded-full bg-${topic.color}/20 flex items-center justify-center text-${topic.color}`}>
            {getIcon(topic.icon)}
          </div>
          <h3 className="ml-3 text-lg font-semibold text-vet-dark">{topic.title}</h3>
        </div>
        <p className="text-gray-600">{topic.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">{topic.subtopics.length} subtópicos</span>
          <span className="inline-flex items-center text-vet-blue text-sm font-medium">
            Saiba mais
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
