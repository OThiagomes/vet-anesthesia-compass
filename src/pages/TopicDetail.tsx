import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Activity, Heart, Droplet, Wind, Layers, 
  Syringe, Pill, ListChecks, Stethoscope, Bed 
} from 'lucide-react';
import { anesthesiaTopics } from '../data/anesthesiaTopics';
import Navbar from '../components/Navbar';
import MindMap from '../components/MindMap';
import InfoBalloon from '../components/InfoBalloon';

const TopicDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const topicId = parseInt(id || '1');
  const topic = anesthesiaTopics.find(t => t.id === topicId);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'heart': return <Heart size={28} />;
      case 'droplet': return <Droplet size={28} />;
      case 'wind': return <Wind size={28} />;
      case 'layers': return <Layers size={28} />;
      case 'syringe': return <Syringe size={28} />;
      case 'pill': return <Pill size={28} />;
      case 'list-checks': return <ListChecks size={28} />;
      case 'activity': return <Activity size={28} />;
      case 'lungs': return <Activity size={28} />;
      case 'bed': return <Bed size={28} />;
      case 'stethoscope': return <Stethoscope size={28} />;
      default: return <Activity size={28} />;
    }
  };

  if (!topic) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Tópico não encontrado</h2>
          <Link to="/" className="text-vet-blue hover:underline">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-vet-blue hover:underline"
          >
            <ChevronLeft size={20} />
            <span>Voltar para todos os tópicos</span>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className={`bg-${topic.color} p-8 text-white`}>
            <div className="flex items-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                {getIcon(topic.icon)}
              </div>
              <h1 className="text-3xl font-bold ml-4">
                {topic.id}. {topic.title}
              </h1>
            </div>
            <p className="text-xl opacity-90">{topic.description}</p>
          </div>
          
          <div className="p-6">
            <MindMap 
              title={topic.title}
              color={topic.color}
              subtopics={topic.subtopics}
            />

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-vet-dark">Informações Detalhadas</h2>
              
              {topic.subtopics.map((subtopic, index) => (
                <div key={index} className="mb-8">
                  <h3 className={`text-xl font-semibold mb-4 text-${topic.color}`}>
                    {subtopic.title}
                  </h3>
                  
                  <div className="bg-white rounded-lg border p-6 shadow-sm">
                    <ul className="space-y-4">
                      {subtopic.content.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <div className={`w-6 h-6 rounded-full bg-${topic.color} text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0`}>
                            {i + 1}
                          </div>
                          <p>{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
