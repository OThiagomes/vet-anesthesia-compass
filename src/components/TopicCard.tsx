
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Heart, Droplet, Wind, Layers, 
  Syringe, Pill, ListChecks, Lungs, Bed, Stethoscope 
} from 'lucide-react';
import { Topic } from '../data/anesthesiaTopics';

interface TopicCardProps {
  topic: Topic;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'heart': return <Heart size={24} />;
      case 'droplet': return <Droplet size={24} />;
      case 'wind': return <Wind size={24} />;
      case 'layers': return <Layers size={24} />;
      case 'syringe': return <Syringe size={24} />;
      case 'pill': return <Pill size={24} />;
      case 'list-checks': return <ListChecks size={24} />;
      case 'activity': return <Activity size={24} />;
      case 'lungs': return <Lungs size={24} />;
      case 'bed': return <Bed size={24} />;
      case 'stethoscope': return <Stethoscope size={24} />;
      default: return <Activity size={24} />;
    }
  };

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
