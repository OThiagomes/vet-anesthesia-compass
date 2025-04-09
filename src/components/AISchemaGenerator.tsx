
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Share2, Download, Copy, Sparkles, History, CheckCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AISchemaGeneratorProps {
  topicTitle: string;
  subtopicTitle?: string;
}

type SchemaType = 'basic' | 'detailed' | 'clinical' | 'comparative';

interface SchemaOption {
  id: SchemaType;
  title: string;
  description: string;
  prompt: string;
}

const AISchemaGenerator: React.FC<AISchemaGeneratorProps> = ({ topicTitle, subtopicTitle }) => {
  const basePrompt = `Crie um esquema sobre ${topicTitle}${subtopicTitle ? ` - ${subtopicTitle}` : ''} na anestesiologia veterinária`;
  
  const schemaOptions: SchemaOption[] = [
    {
      id: 'basic',
      title: 'Esquema Básico',
      description: 'Conceitos fundamentais organizados de forma clara e concisa',
      prompt: `${basePrompt} com os conceitos fundamentais, organizados por tópicos e subtópicos.`
    },
    {
      id: 'detailed',
      title: 'Esquema Detalhado',
      description: 'Informações aprofundadas com conceitos avançados',
      prompt: `${basePrompt} com informações detalhadas, incluindo mecanismos de ação, doses, contraindicações e particularidades clínicas relevantes.`
    },
    {
      id: 'clinical',
      title: 'Caso Clínico',
      description: 'Aplicação prática dos conceitos em formato de caso clínico',
      prompt: `${basePrompt} no formato de caso clínico, incluindo apresentação do caso, abordagem diagnóstica, procedimento anestésico, monitorização e possíveis complicações.`
    },
    {
      id: 'comparative',
      title: 'Comparativo',
      description: 'Comparação entre diferentes abordagens ou técnicas',
      prompt: `${basePrompt} em formato comparativo, destacando diferenças entre técnicas, fármacos ou abordagens relevantes para este tópico.`
    }
  ];
  
  const [schemaType, setSchemaType] = useState<SchemaType>('basic');
  const [prompt, setPrompt] = useState(schemaOptions[0].prompt);
  const [result, setResult] = useState('');
  const [previousResults, setPreviousResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');
  const { toast } = useToast();

  const handleSchemaTypeChange = (value: SchemaType) => {
    setSchemaType(value);
    const option = schemaOptions.find(opt => opt.id === value);
    if (option) {
      setPrompt(option.prompt);
    }
  };

  const generateSchema = async () => {
    setIsLoading(true);
    try {
      // Simularemos a resposta da API para fins de demonstração
      // Em produção, isso seria substituído por uma chamada real à API
      setTimeout(() => {
        const sampleResponses: Record<SchemaType, string> = {
          basic: `# Esquema: ${topicTitle}${subtopicTitle ? ` - ${subtopicTitle}` : ''}
        
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
- Manejo de complicações`,
          
          detailed: `# Esquema Detalhado: ${topicTitle}${subtopicTitle ? ` - ${subtopicTitle}` : ''}

## 1. Farmacologia Aplicada
### 1.1 Mecanismo de Ação Molecular
- Sítios receptores envolvidos
- Cascatas de sinalização intracelular
- Efeitos sobre canais iônicos específicos
- Interações com neurotransmissores

### 1.2 Farmacocinética Detalhada
- Absorção: fatores que influenciam em diferentes espécies
- Distribuição: especificidades de ligação proteica e volume de distribuição
- Metabolismo: vias enzimáticas específicas e particularidades por espécie
- Excreção: órgãos envolvidos e tempos de eliminação

### 1.3 Parâmetros Farmacocinéticos Essenciais
- Meia-vida (t½)
- Clearance (Cl)
- Volume de distribuição (Vd)
- Biodisponibilidade por diferentes vias

## 2. Aspectos Clínicos Avançados
### 2.1 Dosagem e Administração
- Doses específicas por espécie e porte
- Protocolos de titulação
- Infusão contínua vs. bolus intermitentes
- Técnicas de administração regional

### 2.2 Compatibilidades e Incompatibilidades
- Interações medicamentosas clinicamente significativas
- Soluções compatíveis para diluição
- Estabilidade do fármaco em diferentes condições

### 2.3 Monitoramento Avançado
- Monitoramento hemodinâmico específico
- Parâmetros ventilatórios críticos
- Avaliação neurológica durante anestesia
- Biomarcadores para detecção precoce de complicações

## 3. Manejo de Complicações Específicas
### 3.1 Identificação Precoce
- Sinais de alerta em diferentes espécies
- Alterações paraclínicas significativas
- Comparação entre alterações esperadas vs. patológicas

### 3.2 Intervenções Terapêuticas
- Protocolos de reversão
- Manejo de hipotensão refratária
- Abordagem a arritmias específicas
- Suporte ventilatório avançado

## 4. Evidências Científicas
### 4.1 Estudos Clínicos Relevantes
- Principais ensaios clínicos e seus resultados
- Metanálises disponíveis
- Nível de evidência atual

### 4.2 Diretrizes Atuais
- Recomendações de organizações internacionais
- Controvérsias e áreas de incerteza
- Tendências emergentes na pesquisa`,
          
          clinical: `# Caso Clínico: ${topicTitle}${subtopicTitle ? ` - ${subtopicTitle}` : ''}

## Apresentação do Caso
**Paciente:** Cadela, Golden Retriever, 8 anos, 28 kg
**Motivo da Consulta:** Programação de cirurgia para remoção de neoplasia mamária
**Histórico:** Paciente com histórico de sopro cardíaco grau II/VI, sem sinais clínicos associados. Exames pré-operatórios indicam leve azotemia (creatinina 1.8 mg/dL) e anemia discreta (Ht 33%).

## Avaliação Pré-anestésica
**Classificação ASA:** III
**Exames Complementares:**
- Ecocardiograma: Insuficiência valvar mitral com função sistólica preservada
- Hemograma: Anemia normocítica normocrômica discreta
- Bioquímica: Azotemia renal leve
- Eletrocardiograma: Arritmia sinusal respiratória

## Planejamento Anestésico
**Considerações:**
1. Paciente geriátrico com comorbidades cardíaca e renal
2. Procedimento de duração moderada (~90 min)
3. Necessidade de analgesia pós-operatória eficiente

**Medicação Pré-anestésica:**
- Metadona (0.3 mg/kg) IM
- Acepromazina (0.01 mg/kg) IM

**Indução:**
- Propofol (4 mg/kg) IV titulado até efeito
- Intubação endotraqueal com tubo nº 9

**Manutenção:**
- Isoflurano em oxigênio 100%
- Fluidoterapia com Ringer Lactato (5 ml/kg/h)
- Bloqueio regional: Bloqueio do plano transverso do abdômen (TAP block) com Bupivacaína 0.25%

**Monitoração:**
- Pressão arterial invasiva
- Capnografia
- Oximetria de pulso
- ECG contínuo
- Temperatura esofágica

## Intercorrências e Manejo
**1ª Hora:** Hipotensão (PAM 58 mmHg)
- Intervenção: Redução da concentração de isoflurano, fluidoterapia em bolus (10 ml/kg)
- Resultado: PAM estabilizada em 68-72 mmHg

**2ª Hora:** Diminuição da temperatura (35.8°C) 
- Intervenção: Manta térmica ativa, aquecimento de fluidos
- Resultado: Temperatura estabilizada em 36.5°C

## Recuperação Anestésica
- Extubação: 15 minutos após término da cirurgia
- Primeiros sinais de consciência: 22 minutos após término
- Capacidade de manter posição esternal: 35 minutos após término

## Manejo da Dor Pós-operatória
- Continuação de metadona (0.2 mg/kg) a cada 6h por 24h
- Dipirona (25 mg/kg) a cada 8h por 5 dias
- Avaliação da dor por escala multidimensional (CMPS-SF)

## Lições Clínicas do Caso
1. Importância da adaptação do protocolo para pacientes com comorbidades
2. Valor da monitoração multiparamétrica para detecção precoce de alterações
3. Benefício da analgesia multimodal para controle da dor
4. Manutenção da normotermia como fator crítico para recuperação adequada`,
          
          comparative: `# Análise Comparativa: ${topicTitle}${subtopicTitle ? ` - ${subtopicTitle}` : ''}

## Comparativo de Agentes Anestésicos Injetáveis

| Parâmetro | Propofol | Etomidato | Alfaxalona | Ketamina |
|-----------|----------|-----------|------------|----------|
| **Mecanismo** | Potencialização GABA | Potencialização GABA | Modulação GABA-A | Antagonista NMDA |
| **Indução** | Rápida (30-60 seg) | Rápida (30-60 seg) | Rápida (30-60 seg) | Moderada (1-2 min) |
| **Recuperação** | Rápida (5-10 min) | Rápida (5-10 min) | Rápida (5-10 min) | Prolongada (30-60 min) |
| **Efeito Cardiovascular** | Hipotensão, ↓RVS | Estabilidade | Mínima depressão | ↑FC, ↑PA, ↑DC |
| **Efeito Respiratório** | Depressão moderada | Depressão mínima | Depressão leve | Preservada, broncodilatação |
| **Analgesia** | Nenhuma | Nenhuma | Nenhuma | Moderada |
| **Uso em Cardiopatas** | Contraindicado | Preferencial | Bom | Com cautela |
| **Uso em Nefropatas** | Seguro | Seguro | Seguro | Contraindicado |
| **Uso em Hepatopatas** | Com cautela | Com cautela | Preferencial | Com cautela |
| **Metabolização** | Hepática | Hepática/Plasmática | Hepática | Hepática |
| **Excreção** | Renal | Renal | Renal | Renal (80%) |
| **Particularidades** | Dor à injeção, lipemia | Mioclonias, supressão adrenal | Alto custo | Salivação, catalepsia |

## Análise Comparativa por Espécie

| Espécie | Propofol | Etomidato | Alfaxalona | Ketamina |
|---------|----------|-----------|------------|----------|
| **Cães** | Excelente | Bom | Excelente | Regular |
| **Gatos** | Bom (apneia) | Regular | Excelente | Bom |
| **Equinos** | Limitado | Limitado | Em estudo | Bom |
| **Ruminantes** | Limitado | Limitado | Em estudo | Bom |
| **Suínos** | Bom | Regular | Bom | Bom |
| **Aves** | Regular | Contraindicado | Bom | Bom |
| **Répteis** | Variável | Não recomendado | Bom | Excelente |

## Comparativo de Protocolos por Condição Clínica

| Condição | Protocolo Preferencial | Protocolo Alternativo | Protocolo Contraindicado |
|----------|------------------------|----------------------|--------------------------|
| **Cardiopatia** | Etomidato + Fentanil | Alfaxalona + Fentanil | Propofol + Xilazina |
| **Nefropatia** | Alfaxalona + Metadona | Propofol + Metadona | Ketamina + Midazolam |
| **Hepatopatia** | Alfaxalona + Butorfanol | Etomidato + Butorfanol | Propofol em doses repetidas |
| **Cesariana** | Alfaxalona + Lidocaína | Propofol + Lidocaína | Ketamina + Xilazina |
| **Status epilepticus** | Propofol em CRI | Alfaxalona em CRI | Ketamina |
| **Pediátrico** | Alfaxalona + Midazolam | Propofol (doses reduzidas) | Etomidato |
| **Geriátrico** | Propofol + Fentanil | Alfaxalona + Metadona | Propofol em dose única alta |

## Evidência Científica e Aplicabilidade

| Critério | Propofol | Etomidato | Alfaxalona | Ketamina |
|----------|----------|-----------|------------|----------|
| **Nível de Evidência** | Alto | Moderado | Crescente | Alto |
| **Facilidade de Uso** | Alta | Moderada | Alta | Alta |
| **Custo-benefício** | Moderado | Alto | Baixo | Alto |
| **Versatilidade** | Alta | Moderada | Alta | Alta |
| **Segurança** | Moderada | Alta | Alta | Moderada |`
        };

        // Armazenar resultado anterior
        if (result) {
          setPreviousResults(prev => [...prev, result]);
        }

        const response = sampleResponses[schemaType];
        setResult(response);
        setIsLoading(false);
        setActiveTab('result');
        
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

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([result], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Esquema-${topicTitle.replace(/\s+/g, '-')}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download iniciado",
      description: "O esquema está sendo baixado para seu dispositivo.",
    });
  };

  return (
    <Card className="mb-8 shadow-md">
      <CardHeader>
        <CardTitle className="text-vet-blue flex items-center">
          <Sparkles size={20} className="mr-2 text-amber-500" />
          Gerador de Esquemas com IA
        </CardTitle>
        <CardDescription>
          Crie esquemas personalizados para facilitar seu estudo sobre este tópico
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="edit">Editar Prompt</TabsTrigger>
            <TabsTrigger value="result">Resultado</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Tipo de esquema</h4>
                <Select 
                  value={schemaType} 
                  onValueChange={(value) => handleSchemaTypeChange(value as SchemaType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de esquema" />
                  </SelectTrigger>
                  <SelectContent>
                    {schemaOptions.map(option => (
                      <SelectItem key={option.id} value={option.id}>
                        <div className="py-1">
                          <div className="font-medium">{option.title}</div>
                          <div className="text-xs text-gray-500">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Personalizar prompt</h4>
                <Textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Descreva o que você gostaria de incluir no seu esquema..."
                  className="min-h-[120px]"
                />
              </div>
              
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
              
              {previousResults.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <History size={16} className="mr-2" />
                    Esquemas anteriores
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {previousResults.map((prev, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start overflow-hidden text-ellipsis whitespace-nowrap"
                        onClick={() => {
                          setResult(prev);
                          setActiveTab('result');
                        }}
                      >
                        <span className="truncate">
                          Esquema #{previousResults.length - index}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="result">
            {result ? (
              <div className="space-y-4">
                <div className="flex justify-between mb-2">
                  <h3 className="text-sm font-medium text-slate-700 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Esquema Gerado
                  </h3>
                  <div className="space-x-2">
                    <Button variant="outline" size="icon" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleDownload}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-slate-50 border rounded-lg p-4">
                  <pre className="text-sm whitespace-pre-wrap font-mono">
                    {result}
                  </pre>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setActiveTab('edit')}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Gerar outro esquema
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Nenhum esquema gerado. Vá para a aba "Editar Prompt" para criar um esquema.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-slate-500">
        <span>Powered by DeepSeek AI</span>
        <span>Use este recurso para expandir seus conhecimentos</span>
      </CardFooter>
    </Card>
  );
};

export default AISchemaGenerator;
