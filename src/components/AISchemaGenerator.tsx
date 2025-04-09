
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Share2, Download, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AISchemaGeneratorProps {
  topicTitle: string;
  subtopicTitle?: string;
}

const AISchemaGenerator: React.FC<AISchemaGeneratorProps> = ({ topicTitle, subtopicTitle }) => {
  const [prompt, setPrompt] = useState(`Crie um esquema detalhado sobre ${topicTitle}${subtopicTitle ? ` - ${subtopicTitle}` : ''} na anestesiologia veterinária`);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateSchema = async () => {
    setIsLoading(true);
    try {
      // Simularemos a resposta da API para fins de demonstração
      // Em produção, isso seria substituído por uma chamada real à API
      setTimeout(() => {
        const sampleResponse = `# Esquema: ${topicTitle}${subtopicTitle ? ` - ${subtopicTitle}` : ''}
        
## Conceitos Principais
- Mecanismos de ação
- Farmacocinética e farmacodinâmica 
- Indicações clínicas
- Contraindicações
- Efeitos adversos

## Considerações Clínicas
1. Avaliação pré-anestésica
2. Monitoramento durante o procedimento
3. Ajuste de dosagem baseado no paciente
4. Integração com outros medicamentos
5. Protocolos específicos para diferentes condições

## Aplicabilidade Prática
- Pequenos animais vs. Grandes animais
- Variações por espécie
- Casos especiais (geriátricos, pediátricos, comprometidos)

## Técnicas Avançadas
- Combinações medicamentosas
- Novos agentes e tecnologias
- Manejo de complicações`;

        setResult(sampleResponse);
        setIsLoading(false);
        toast({
          title: "Esquema gerado com sucesso!",
          description: "O esquema foi criado e está pronto para uso",
        });
      }, 2000);
    } catch (error) {
      console.error("Erro ao gerar esquema:", error);
      toast({
        title: "Erro ao gerar esquema",
        description: "Houve um problema ao conectar com a API. Tente novamente.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copiado!",
      description: "O esquema foi copiado para sua área de transferência",
    });
  };

  return (
    <Card className="mb-8 shadow-md">
      <CardHeader>
        <CardTitle className="text-vet-blue">Gerador de Esquemas com IA</CardTitle>
        <CardDescription>
          Crie esquemas personalizados para facilitar seu estudo sobre este tópico
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Descreva o que você gostaria de incluir no seu esquema..."
            className="min-h-[100px]"
          />
          
          <Button 
            onClick={generateSchema} 
            disabled={isLoading || !prompt.trim()}
            className="w-full bg-vet-blue hover:bg-vet-blue/80"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando esquema...
              </>
            ) : (
              "Gerar Esquema"
            )}
          </Button>

          {result && (
            <div className="mt-4 rounded-lg border p-4 bg-slate-50">
              <div className="flex justify-between mb-2">
                <h3 className="text-sm font-medium text-slate-700">Esquema Gerado</h3>
                <div className="space-x-2">
                  <Button variant="outline" size="icon" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <pre className="text-sm whitespace-pre-wrap font-mono bg-slate-50 p-2 rounded">
                {result}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-slate-500">
        <span>Powered by DeepSeek AI</span>
        <span>Use este recurso para expandir seus conhecimentos</span>
      </CardFooter>
    </Card>
  );
};

export default AISchemaGenerator;
