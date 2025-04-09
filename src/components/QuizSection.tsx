
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, RefreshCw, HelpCircle, Award } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import InfoBalloon from './InfoBalloon';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizSectionProps {
  title: string;
  description?: string;
  questions: QuizQuestion[];
}

const QuizSection: React.FC<QuizSectionProps> = ({ title, description, questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  const handleOptionSelect = (index: number) => {
    if (showAnswer) return; // Prevent selecting after answer is shown
    setSelectedOption(index);
  };

  const checkAnswer = () => {
    if (selectedOption === null) {
      toast({
        title: "Selecione uma opção",
        description: "Você precisa selecionar uma opção antes de verificar a resposta.",
        variant: "destructive",
      });
      return;
    }
    
    setShowAnswer(true);
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
  };

  const getScore = () => {
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const getFeedback = () => {
    const score = getScore();
    if (score >= 90) return "Excelente! Você domina este tópico.";
    if (score >= 75) return "Muito bom! Você compreende bem o assunto.";
    if (score >= 60) return "Bom! Você está no caminho certo.";
    return "Continue estudando! Este tópico precisa de mais atenção.";
  };

  if (quizCompleted) {
    return (
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gradient-to-r from-vet-blue/20 to-vet-purple/20 text-center">
          <CardTitle className="text-vet-dark">Quiz Completo!</CardTitle>
          <CardDescription>Confira seu resultado</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 pb-6 text-center">
          <div className="mb-6">
            <Award size={64} className="mx-auto text-amber-500 mb-4" />
            <h3 className="text-2xl font-bold text-vet-dark mb-2">
              {getScore()}% de Acertos
            </h3>
            <p className="text-gray-600">
              {getFeedback()}
            </p>
          </div>
          
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 w-full max-w-md h-4 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  getScore() >= 75 ? 'bg-green-500' : 
                  getScore() >= 60 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${getScore()}%` }}
              ></div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-6">
            Você acertou {correctAnswers} de {questions.length} questões
          </p>
        </CardContent>
        
        <CardFooter className="flex flex-col">
          <Button
            className="w-full mb-3"
            onClick={resetQuiz}
          >
            <RefreshCw size={18} className="mr-2" />
            Reiniciar Quiz
          </Button>
          <p className="text-sm text-gray-500 text-center">
            Continuar estudando ajudará a aprimorar seu conhecimento
          </p>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="mb-6 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-vet-dark">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="text-sm text-gray-500">
            {currentQuestion + 1} / {questions.length}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-4">
            {questions[currentQuestion].question}
          </h3>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedOption === index 
                    ? showAnswer
                      ? index === questions[currentQuestion].correctAnswer
                        ? 'bg-green-50 border-green-300'
                        : 'bg-red-50 border-red-300'
                      : 'bg-vet-blue/10 border-vet-blue/30'
                    : showAnswer && index === questions[currentQuestion].correctAnswer
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      selectedOption === index 
                        ? showAnswer
                          ? index === questions[currentQuestion].correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-vet-blue text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                  {showAnswer && (
                    index === questions[currentQuestion].correctAnswer ? (
                      <Check size={20} className="text-green-600" />
                    ) : selectedOption === index ? (
                      <X size={20} className="text-red-600" />
                    ) : null
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {showAnswer && (
          <InfoBalloon 
            content={
              <div>
                <div className="flex items-center mb-2">
                  <HelpCircle size={18} className="mr-2" />
                  <h4 className="font-medium">Explicação</h4>
                </div>
                <p className="text-sm">{questions[currentQuestion].explanation}</p>
              </div>
            }
            color="blue"
            className="mb-4"
          />
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {!showAnswer ? (
          <Button 
            onClick={checkAnswer}
            className="w-full"
          >
            Verificar resposta
          </Button>
        ) : (
          <Button 
            onClick={nextQuestion} 
            className="w-full"
          >
            {currentQuestion < questions.length - 1 ? "Próxima questão" : "Ver resultado"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizSection;
