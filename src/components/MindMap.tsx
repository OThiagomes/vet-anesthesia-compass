
import React from 'react';
import { SubTopic } from '../data/anesthesiaTopics';
import InfoBalloon from './InfoBalloon';

interface MindMapProps {
  title: string;
  color: string;
  subtopics: SubTopic[];
}

const MindMap: React.FC<MindMapProps> = ({ title, color, subtopics }) => {
  const getColorClass = (colorName: string) => {
    switch (colorName) {
      case 'vet-blue': return 'blue';
      case 'vet-green': return 'green';
      case 'vet-red': return 'red';
      case 'vet-orange': return 'orange';
      case 'vet-purple': return 'purple';
      case 'vet-teal': return 'teal';
      default: return 'blue';
    }
  };

  return (
    <div className="w-full my-8">
      <div className={`p-5 bg-${color}/10 rounded-lg mb-6 text-center border border-${color}/20`}>
        <h2 className={`text-xl font-bold text-${color}`}>{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subtopics.map((subtopic, index) => (
          <div key={index} className="flex flex-col">
            <div className={`p-3 bg-${color}/20 rounded-t-lg text-center border border-${color}/30`}>
              <h3 className="font-semibold text-vet-dark">{subtopic.title}</h3>
            </div>
            <div className="bg-white border border-t-0 rounded-b-lg p-4 flex-1">
              <ul className="space-y-2">
                {subtopic.content.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className={`inline-block w-2 h-2 rounded-full bg-${color} mt-2 mr-2`}></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {subtopics.map((subtopic, index) => (
          <InfoBalloon 
            key={index}
            content={`${subtopic.title}: ${subtopic.content[0]}`}
            color={getColorClass(color)}
            className="text-center font-medium"
          />
        ))}
      </div>
    </div>
  );
};

export default MindMap;
