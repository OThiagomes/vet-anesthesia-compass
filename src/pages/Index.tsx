
import React, { useState } from 'react';
import { anesthesiaTopics } from '../data/anesthesiaTopics';
import TopicCard from '../components/TopicCard';
import Navbar from '../components/Navbar';
import { Search, ChevronDown } from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const filteredTopics = anesthesiaTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSection = (id: number) => {
    if (expandedSection === id) {
      setExpandedSection(null);
    } else {
      setExpandedSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-vet-blue to-vet-teal text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">VetAnesthesia Compass</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Plataforma completa de estudos em anestesiologia veterinária para estudantes de medicina veterinária
          </p>
          <div className="mt-8 flex justify-center">
            <a 
              href="#topics" 
              className="px-6 py-3 bg-white text-vet-blue rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Explorar Tópicos
            </a>
          </div>
        </div>
      </div>
      
      {/* Topics Section */}
      <div id="topics" className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold text-vet-dark mb-4 md:mb-0">
            Tópicos de Estudo
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar tópicos..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
      
      {/* About Section */}
      <div id="about" className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-vet-dark mb-8">
            Sobre a Plataforma
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <button 
                className="flex justify-between items-center w-full p-4 bg-gray-50 rounded-lg text-left font-medium text-vet-dark"
                onClick={() => toggleSection(1)}
              >
                <span>Para quem é essa plataforma?</span>
                <ChevronDown 
                  size={20} 
                  className={`transition-transform ${expandedSection === 1 ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedSection === 1 && (
                <div className="p-4 bg-white border border-t-0 rounded-b-lg">
                  <p>
                    Esta plataforma foi desenvolvida especificamente para estudantes de Medicina Veterinária 
                    que buscam aprofundar seus conhecimentos em anestesiologia. O conteúdo abrange desde 
                    conceitos básicos até tópicos avançados, sendo ideal para complementar os estudos acadêmicos.
                  </p>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <button 
                className="flex justify-between items-center w-full p-4 bg-gray-50 rounded-lg text-left font-medium text-vet-dark"
                onClick={() => toggleSection(2)}
              >
                <span>Como utilizar o conteúdo?</span>
                <ChevronDown 
                  size={20} 
                  className={`transition-transform ${expandedSection === 2 ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedSection === 2 && (
                <div className="p-4 bg-white border border-t-0 rounded-b-lg">
                  <p>
                    Cada tópico contém mapas mentais, informações detalhadas e conceitos fundamentais 
                    apresentados de forma didática. Recomendamos estudar seguindo a ordem dos tópicos, 
                    mas você também pode focar em áreas específicas de interesse ou dificuldade.
                  </p>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <button 
                className="flex justify-between items-center w-full p-4 bg-gray-50 rounded-lg text-left font-medium text-vet-dark"
                onClick={() => toggleSection(3)}
              >
                <span>Referências e bibliografia</span>
                <ChevronDown 
                  size={20} 
                  className={`transition-transform ${expandedSection === 3 ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedSection === 3 && (
                <div className="p-4 bg-white border border-t-0 rounded-b-lg">
                  <p>
                    O conteúdo desta plataforma foi desenvolvido com base em literatura científica 
                    atual e protocolos clínicos validados em medicina veterinária. Referências 
                    específicas estão disponíveis em cada tópico para aprofundamento dos estudos.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-vet-dark text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">VetAnesthesia Compass - Plataforma de Estudos em Anestesiologia Veterinária</p>
          <p className="text-sm text-gray-400">© 2025 - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
