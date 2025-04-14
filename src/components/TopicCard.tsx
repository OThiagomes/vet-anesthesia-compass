
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Heart, Droplet, Wind, Layers, 
  Syringe, Pill, ListChecks, Stethoscope, Bed,
  ArrowRight 
} from 'lucide-react';
import { Topic } from '../data/anesthesiaTopics';
import { cn } from '@/lib/utils';

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
  className?: string;
  animate?: boolean;
}

const TopicCard: React.FC<TopicCardProps> = ({ 
  topic, 
  className,
  animate = true
}) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 border-blue-500",
    green: "bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-500",
    red: "bg-red-500/10 text-red-700 hover:bg-red-500/20 border-red-500",
    purple: "bg-purple-500/10 text-purple-700 hover:bg-purple-500/20 border-purple-500",
    orange: "bg-orange-500/10 text-orange-700 hover:bg-orange-500/20 border-orange-500",
    teal: "bg-teal-500/10 text-teal-700 hover:bg-teal-500/20 border-teal-500",
  };

  const colorClass = colorMap[topic.color] || colorMap.blue;

  return (
    <Link 
      to={`/topic/${topic.id}`} 
      className={cn(
        "block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all",
        animate ? "animate-fade-in" : "",
        className
      )}
    >
      <div className="p-6 border-t-4 border-t-opacity-70 transition-colors duration-200" style={{ borderTopColor: `var(--${topic.color}-500, #3b82f6)` }}>
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center`}>
            {getIcon(topic.icon)}
          </div>
          <h3 className="ml-3 text-lg font-semibold text-gray-800">{topic.title}</h3>
        </div>
        
        <p className="text-gray-600 line-clamp-2 mb-4">{topic.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
            {topic.subtopics.length} subtópicos
          </span>
          <span className="inline-flex items-center text-blue-600 font-medium text-sm group">
            Explorar
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
