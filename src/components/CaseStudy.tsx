
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Lightbulb, FileClock, Stethoscope, Microscope, FlaskConical, ChevronDown, Cat, Dog, Rabbit, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface CaseStep {
  title: string;
  content: string;
  type: 'history' | 'physical' | 'diagnostic' | 'treatment' | 'followup';
}

export interface CaseStudyProps {
  title: string;
  species: string;
  age: string;
  weight?: string;
  mainComplaint: string;
  steps: CaseStep[];
  learningPoints: string[];
}

const CaseStudy: React.FC<CaseStudyProps> = ({
  title,
  species,
  age,
  weight,
  mainComplaint,
  steps,
  learningPoints
}) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [showLearningPoints, setShowLearningPoints] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const getStepIcon = (type: CaseStep['type']) => {
    switch (type) {
      case 'history': return <FileClock className="text-blue-600" size={18} />;
      case 'physical': return <Stethoscope className="text-green-600" size={18} />;
      case 'diagnostic': return <Microscope className="text-purple-600" size={18} />;
      case 'treatment': return <FlaskConical className="text-red-600" size={18} />;
      case 'followup': return <Stethoscope className="text-teal-600" size={18} />;
    }
  };

  const getStepColor = (type: CaseStep['type']) => {
    switch (type) {
      case 'history': return 'border-blue-200 bg-blue-50';
      case 'physical': return 'border-green-200 bg-green-50';
      case 'diagnostic': return 'border-purple-200 bg-purple-50';
      case 'treatment': return 'border-red-200 bg-red-50';
      case 'followup': return 'border-teal-200 bg-teal-50';
    }
  };

  const getAnimalIcon = () => {
    const speciesLower = species.toLowerCase();
    if (speciesLower.includes('can') || speciesLower.includes('dog')) {
      return <Dog size={16} className="mr-1" />;
    } else if (speciesLower.includes('fel') || speciesLower.includes('cat')) {
      return <Cat size={16} className="mr-1" />;
    } else if (speciesLower.includes('lagom') || speciesLower.includes('coelho') || speciesLower.includes('rabbit')) {
      return <Rabbit size={16} className="mr-1" />;
    } else {
      return null;
    }
  };

  return (
    <Card className="mb-6 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-gray-800">{title}</CardTitle>
          <Badge variant="outline" className="bg-white">Caso Clínico</Badge>
        </div>
        
        <CardDescription className="pt-2">
          <div className="flex flex-wrap gap-2 mt-1">
            <Badge variant="secondary" className="flex items-center bg-blue-100 text-blue-800 hover:bg-blue-200">
              {getAnimalIcon()}
              {species}
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
              {age}
            </Badge>
            {weight && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                {weight}
              </Badge>
            )}
          </div>
          <div className="mt-3 text-sm font-medium text-gray-700 p-2 bg-white/80 rounded-md border border-gray-100">
            <span className="text-gray-500">Queixa principal:</span> {mainComplaint}
          </div>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-3">
          {steps.map((step, index) => (
            <Collapsible
              key={index}
              open={expandedStep === index || showAll}
              onOpenChange={() => !showAll && setExpandedStep(expandedStep === index ? null : index)}
            >
              <div className={`border rounded-lg ${getStepColor(step.type)} transition-shadow duration-200 ${(expandedStep === index || showAll) ? 'shadow-md' : ''}`}>
                <CollapsibleTrigger className="w-full p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    {getStepIcon(step.type)}
                    <span className="ml-2 font-medium">{step.title}</span>
                  </div>
                  {!showAll && (
                    <ChevronDown 
                      className={`transition-transform duration-200 ${expandedStep === index ? 'rotate-180' : ''}`} 
                      size={18} 
                    />
                  )}
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="p-4 pt-1 border-t border-dashed border-gray-200">
                    <p className="text-sm whitespace-pre-line">{step.content}</p>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="text-xs"
          >
            {showAll ? "Recolher todos" : "Expandir todos os passos"}
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start pt-2 pb-4 bg-gradient-to-r from-amber-50 to-yellow-50">
        <Button 
          variant="ghost" 
          className="flex items-center text-amber-700 mb-2" 
          onClick={() => setShowLearningPoints(!showLearningPoints)}
        >
          <Lightbulb size={18} className="mr-2 text-amber-500" fill="currentColor" />
          {showLearningPoints ? "Esconder pontos de aprendizado" : "Mostrar pontos de aprendizado"}
        </Button>
        
        {showLearningPoints && (
          <div className="w-full mt-2 p-4 bg-white border border-amber-200 rounded-lg shadow-sm">
            <h5 className="text-sm font-medium mb-3 text-amber-800 flex items-center">
              <BookOpen size={16} className="mr-2" />
              Pontos de Aprendizado Principais:
            </h5>
            <ul className="space-y-2 pl-2">
              {learningPoints.map((point, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-800 w-5 h-5 mr-2 flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CaseStudy;
