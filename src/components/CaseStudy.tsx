
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Lightbulb, FileClock, Stethoscope, Microscope, FlaskConical, ChevronDown } from 'lucide-react';

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

  const getStepIcon = (type: CaseStep['type']) => {
    switch (type) {
      case 'history': return <FileClock className="text-vet-blue" size={18} />;
      case 'physical': return <Stethoscope className="text-vet-green" size={18} />;
      case 'diagnostic': return <Microscope className="text-vet-purple" size={18} />;
      case 'treatment': return <FlaskConical className="text-vet-red" size={18} />;
      case 'followup': return <Stethoscope className="text-vet-teal" size={18} />;
    }
  };

  const getStepColor = (type: CaseStep['type']) => {
    switch (type) {
      case 'history': return 'border-vet-blue bg-vet-blue/5';
      case 'physical': return 'border-vet-green bg-vet-green/5';
      case 'diagnostic': return 'border-vet-purple bg-vet-purple/5';
      case 'treatment': return 'border-vet-red bg-vet-red/5';
      case 'followup': return 'border-vet-teal bg-vet-teal/5';
    }
  };

  return (
    <Card className="mb-6 shadow-md">
      <CardHeader className="bg-vet-blue/10">
        <CardTitle className="text-vet-dark">{title}</CardTitle>
        <CardDescription>
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-vet-blue/20 text-vet-blue">
              {species}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-vet-green/20 text-vet-green">
              {age}
            </span>
            {weight && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-vet-purple/20 text-vet-purple">
                {weight}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm font-medium text-gray-700">{mainComplaint}</p>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <Collapsible
              key={index}
              open={expandedStep === index}
              onOpenChange={() => setExpandedStep(expandedStep === index ? null : index)}
            >
              <div className={`border rounded-lg ${getStepColor(step.type)}`}>
                <CollapsibleTrigger className="w-full p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    {getStepIcon(step.type)}
                    <span className="ml-2 font-medium">{step.title}</span>
                  </div>
                  <ChevronDown 
                    className={`transition-transform duration-200 ${expandedStep === index ? 'rotate-180' : ''}`} 
                    size={18} 
                  />
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="p-3 pt-0 border-t border-dashed border-gray-200">
                    <p className="text-sm whitespace-pre-line">{step.content}</p>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start pt-2 pb-4">
        <Button 
          variant="ghost" 
          className="flex items-center text-vet-blue mb-2" 
          onClick={() => setShowLearningPoints(!showLearningPoints)}
        >
          <Lightbulb size={18} className="mr-2 text-amber-500" />
          {showLearningPoints ? "Esconder pontos de aprendizado" : "Mostrar pontos de aprendizado"}
        </Button>
        
        {showLearningPoints && (
          <div className="w-full mt-2 p-3 bg-amber-50 border border-amber-100 rounded-lg">
            <h5 className="text-sm font-medium mb-2 text-amber-800">Pontos de Aprendizado Principais:</h5>
            <ul className="list-disc pl-5 space-y-1">
              {learningPoints.map((point, index) => (
                <li key={index} className="text-sm text-amber-700">{point}</li>
              ))}
            </ul>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CaseStudy;
