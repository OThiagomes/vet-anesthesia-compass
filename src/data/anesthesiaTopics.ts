
export interface SubTopic {
  title: string;
  content: string[];
}

export interface Topic {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  subtopics: SubTopic[];
}

export const anesthesiaTopics: Topic[] = [
  {
    id: 1,
    title: "Avaliação do paciente para protocolos e risco anestésico",
    description: "Avaliação completa do paciente para definição adequada de protocolos e classificação de risco anestésico.",
    color: "vet-blue",
    icon: "stethoscope",
    subtopics: [
      {
        title: "Importância de conhecer os pacientes",
        content: [
          "Histórico médico completo, incluindo doenças preexistentes e medicamentos em uso",
          "Exames laboratoriais pré-anestésicos (hemograma, bioquímicos, coagulograma)",
          "Avaliação cardiopulmonar específica (exames complementares quando necessário)",
          "Conhecimento de particularidades de cada espécie e raça"
        ]
      },
      {
        title: "Classificação ASA de risco anestésico",
        content: [
          "ASA I: Paciente saudável, sem alterações fisiológicas",
          "ASA II: Paciente com doença sistêmica leve (ex: obesidade leve, infecção localizada)",
          "ASA III: Paciente com doença sistêmica grave (ex: cardiopatia compensada, diabetes)",
          "ASA IV: Paciente com doença sistêmica grave, risco constante de vida (ex: insuficiência cardíaca)",
          "ASA V: Paciente moribundo, baixa chance de sobrevivência sem cirurgia",
          "ASA E: Adicionado em emergências, independente da classificação"
        ]
      },
      {
        title: "Avaliação do grau de sedação",
        content: [
          "Escala de Ramsay modificada para animais",
          "Avaliação de reflexos protetores (palpebral, corneal, laringotraqueal)",
          "Monitoramento de parâmetros fisiológicos (FC, FR, PA)",
          "Avaliação de tônus muscular e resposta a estímulos"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Medicação pré-anestésica",
    description: "Farmacologia e usos das drogas pré-anestésicas para preparo adequado do paciente.",
    color: "vet-green",
    icon: "pill",
    subtopics: [
      {
        title: "Farmacologia de drogas pré-anestésicas",
        content: [
          "Fenotiazínicos: acepromazina, clorpromazina (tranquilizantes)",
          "Benzodiazepínicos: diazepam, midazolam (ansiolíticos/miorrelaxantes)",
          "Agonistas α-2: xilazina, dexmedetomidina (sedativos)",
          "Opióides: morfina, metadona, fentanil (analgésicos)",
          "Anticolinérgicos: atropina, glicopirrolato (controle de secreções)"
        ]
      },
      {
        title: "Objetivos da Medicação pré-anestésica",
        content: [
          "Redução da ansiedade e estresse",
          "Promoção de sedação e analgesia",
          "Redução da dose do anestésico geral",
          "Prevenção de efeitos adversos (bradicardia, salivação excessiva)",
          "Facilitação da indução anestésica",
          "Diminuição do metabolismo e demanda de oxigênio"
        ]
      },
      {
        title: "Indicações e usos",
        content: [
          "Adaptação do protocolo ao estado físico do paciente",
          "Considerações específicas por espécie e raça",
          "Associações medicamentosas comuns (neuroleptoanalgesia)",
          "Vias de administração disponíveis (IM, SC, IV)",
          "Tempo de espera para efeito antes da indução"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Anestesia Injetável",
    description: "Técnicas e farmacologia dos anestésicos injetáveis, desde dissociativos até TIVA e PIVA.",
    color: "vet-purple",
    icon: "syringe",
    subtopics: [
      {
        title: "Farmacologia dos anestésicos injetáveis",
        content: [
          "Barbitúricos: tiopental, pentobarbital (efeitos, duração, metabolismo)",
          "Propofol: características farmacocinéticas e farmacodinâmicas",
          "Etomidato: estabilidade cardiovascular, uso em pacientes críticos",
          "Alfaxalona: margem de segurança, uso em diferentes espécies"
        ]
      },
      {
        title: "Anestesia dissociativa",
        content: [
          "Cetamina: mecanismo de ação como antagonista NMDA",
          "Tiletamina: potência e duração comparadas à cetamina",
          "Associações comuns (Cetamina-Diazepam, Tiletamina-Zolazepam)",
          "Efeitos sobre sistema cardiovascular e sistema nervoso central",
          "Limitações e contraindicações"
        ]
      },
      {
        title: "Anestesia geral intravenosa",
        content: [
          "Bolus único x doses fracionadas",
          "Características da indução e recuperação",
          "Monitorização específica para anestesia intravenosa",
          "Vantagens e desvantagens em relação à anestesia inalatória"
        ]
      },
      {
        title: "Anestesia Balanceada",
        content: [
          "Conceito de multimodalidade anestésica",
          "Combinação de técnicas injetáveis e inalatórias",
          "Redução de doses e efeitos adversos",
          "Otimização da estabilidade cardiovascular"
        ]
      },
      {
        title: "Infusão contínua",
        content: [
          "Cálculos de taxas de infusão (μg/kg/min, mL/h)",
          "Equipamentos necessários (bombas de infusão)",
          "Ajustes baseados em resposta clínica",
          "Controle preciso da profundidade anestésica"
        ]
      },
      {
        title: "TIVA - Anestesia Totalmente Intravenosa",
        content: [
          "Protocolo sem uso de anestésicos inalatórios",
          "Combinações comuns (propofol + opioide)",
          "Modelos farmacocinéticos para infusão",
          "Indicações específicas e limitações"
        ]
      },
      {
        title: "PIVA - Anestesia Parcialmente Intravenosa",
        content: [
          "Associação de agentes injetáveis e inalatórios",
          "Conceito de CAM-sparing (redução da concentração de inalatório)",
          "Protocolos comuns: propofol, cetamina, lidocaína, dexmedetomidina",
          "Vantagens sobre TIVA e anestesia inalatória pura"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Anestesia Inalatória",
    description: "Princípios e aplicação da anestesia inalatória, incluindo farmacologia e equipamentos.",
    color: "vet-orange",
    icon: "wind",
    subtopics: [
      {
        title: "Farmacologia dos anestésicos inalatórios",
        content: [
          "Isoflurano: características físico-químicas, CAM, metabolismo",
          "Sevoflurano: indução suave, baixa solubilidade sanguínea",
          "Desflurano: recuperação rápida, irritação das vias aéreas",
          "Óxido nitroso: analgesia, segundo gás, efeito concentração"
        ]
      },
      {
        title: "Vantagens e desvantagens",
        content: [
          "Controle preciso da profundidade anestésica",
          "Rápida indução e recuperação",
          "Mínimo metabolismo hepático (isoflurano, sevoflurano)",
          "Necessidade de equipamento específico e custoso",
          "Potencial de poluição ambiental",
          "Riscos ocupacionais para equipe"
        ]
      },
      {
        title: "Aparelho de anestesia inalatória",
        content: [
          "Vaporizadores: precisão, temperatura-compensados, agente-específicos",
          "Circuitos anestésicos: Mapleson, circular, não-reinalação",
          "Fluxômetros e válvulas redutoras de pressão",
          "Sistema de evacuação de gases",
          "Ventiladores mecânicos acoplados"
        ]
      },
      {
        title: "Escolha do anestésico ideal",
        content: [
          "Considerações espécie-específicas",
          "Estado de saúde do paciente (cardiopatas, hepatopatas, etc)",
          "Duração do procedimento",
          "Disponibilidade de equipamentos",
          "Análise custo-benefício dos diferentes agentes"
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Identificação dos planos de anestesia no paciente",
    description: "Métodos para avaliação e classificação do plano anestésico em diferentes modelos.",
    color: "vet-teal",
    icon: "layers",
    subtopics: [
      {
        title: "Modelo de Guedel",
        content: [
          "Estágios clássicos: analgesia, excitação, anestesia cirúrgica, paralisia bulbar",
          "Parâmetros observacionais: reflexos, movimentos, respiração",
          "Aplicabilidade e limitações em medicina veterinária",
          "Adaptações por espécie animal"
        ]
      },
      {
        title: "Conceito moderno",
        content: [
          "Monitorização multiparamétrica",
          "Avaliação das respostas autônomas e somáticas",
          "Sinais clínicos de profundidade anestésica",
          "Variabilidade individual e importância da avaliação contínua"
        ]
      },
      {
        title: "Complicações na anestesia",
        content: [
          "Plano superficial: movimento, resposta a estímulos, taquicardia, hipertensão",
          "Plano profundo: depressão respiratória e cardiovascular",
          "Despertar intraoperatório e consciência",
          "Emergências anestésicas relacionadas à profundidade inadequada"
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Analgesia multimodal para o paciente cirúrgico",
    description: "Técnicas combinadas para controle efetivo da dor antes, durante e após procedimentos.",
    color: "vet-red",
    icon: "heart",
    subtopics: [
      {
        title: "Técnicas combinadas de analgesia",
        content: [
          "Bloqueios locais e regionais (epidural, plexo braquial, ciático-femoral)",
          "Analgesia preventiva e conceito de sensibilização central",
          "Terapia adjuvante (anti-inflamatórios, gabapentinóides)",
          "Protocolos específicos para diferentes tipos de cirurgia",
          "Manejo da dor aguda e transição para analgesia pós-operatória"
        ]
      },
      {
        title: "FLK e MLK",
        content: [
          "FLK: Fentanil-Lidocaína-Cetamina (princípios, dosagens, indicações)",
          "MLK: Morfina-Lidocaína-Cetamina (princípios, dosagens, indicações)",
          "Benefícios da abordagem multimodal",
          "Monitorização da eficácia analgésica",
          "Ajustes de protocolo baseados na avaliação de dor"
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Fluidoterapia para o paciente anestesiado e renoproteção",
    description: "Protocolos de fluidoterapia e cuidados com a função renal durante a anestesia.",
    color: "vet-blue",
    icon: "droplet",
    subtopics: [
      {
        title: "Diferentes tipos de fluidos e protocolos",
        content: [
          "Cristaloides: isotônicos, hipotônicos, hipertônicos",
          "Colóides: naturais e sintéticos",
          "Taxas de infusão de manutenção vs ressuscitação",
          "Goal-directed fluid therapy",
          "Considerações espécie-específicas para fluidoterapia"
        ]
      },
      {
        title: "Precaução com a função renal",
        content: [
          "Monitoramento da pressão arterial e manutenção da perfusão renal",
          "Posicionamento cirúrgico e impacto na função renal",
          "Débito urinário como indicador de adequada perfusão",
          "Fármacos renoprotetores",
          "Manejo de complicações renais perioperatórias"
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Sugestão de protocolos de anestesia",
    description: "Combinações de fármacos e equipamentos utilizados em anestesia geral balanceada.",
    color: "vet-green",
    icon: "list-checks",
    subtopics: [
      {
        title: "Combinações de fármacos para anestesia balanceada",
        content: [
          "Protocolos para pacientes saudáveis vs comprometidos",
          "Ajustes para pacientes pediátricos e geriátricos",
          "Protocolos específicos para procedimentos comuns",
          "Anestesia para procedimentos minimamente invasivos",
          "Considerações para cirurgias de emergência"
        ]
      },
      {
        title: "Equipamentos de anestesia geral inalatória",
        content: [
          "Aparelhos anestésicos tradicionais vs compactos",
          "Manutenção preventiva e checagem pré-anestésica",
          "Sistemas de monitorização integrados",
          "Avanços tecnológicos recentes"
        ]
      },
      {
        title: "Componentes do aparelho de anestesia inalatória",
        content: [
          "Tipos de vaporizadores e princípios de funcionamento",
          "Circuitos respiratórios e canister de cal sodada",
          "Válvulas unidirecionais e válvula pop-off",
          "Conexões e adaptadores para diferentes espécies"
        ]
      },
      {
        title: "Utilização de bombas de infusão",
        content: [
          "Bombas de seringa: programação, alarmes, precisão",
          "Bombas peristálticas: vantagens para grandes volumes",
          "Cálculos de taxa e concentração para infusões contínuas",
          "Combinação de múltiplas infusões simultâneas"
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Introdução a ventilação mecânica",
    description: "Funcionamento do ventilador, pressões respiratórias e técnicas de recrutamento alveolar.",
    color: "vet-purple",
    icon: "lungs",
    subtopics: [
      {
        title: "O ventilador e seu funcionamento",
        content: [
          "Ventilação controlada por volume vs pressão",
          "Ciclagem, disparo e limite na ventilação mecânica",
          "Parâmetros ventilatórios (volume corrente, frequência, fluxo)",
          "Curvas de pressão, fluxo e volume",
          "Tipos de ventiladores disponíveis para medicina veterinária"
        ]
      },
      {
        title: "Pressões de Pico",
        content: [
          "Interpretação da pressão de pico inspiratória",
          "Causas de aumento da pressão de pico",
          "Manejo de pressões elevadas",
          "Relação com complacência pulmonar e resistência de vias aéreas",
          "Valores normais por espécie e porte"
        ]
      },
      {
        title: "PEEP",
        content: [
          "Definição e objetivos da pressão positiva ao final da expiração",
          "Indicações clínicas para uso de PEEP",
          "Técnica de titulação da PEEP ideal",
          "PEEP em pacientes com comprometimento respiratório",
          "Efeitos hemodinâmicos da PEEP"
        ]
      },
      {
        title: "Recrutamento alveolar",
        content: [
          "Conceito e importância da manobra de recrutamento",
          "Técnicas de recrutamento (sustentada vs progressiva)",
          "Indicações e contraindicações",
          "Avaliação da eficácia do recrutamento",
          "Prevenção de atelectasia perioperatória"
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Monitorização anestésica",
    description: "Técnicas e equipamentos para monitorização completa do paciente anestesiado.",
    color: "vet-teal",
    icon: "activity",
    subtopics: [
      {
        title: "Oximetria de pulso",
        content: [
          "Princípios físicos da oximetria",
          "Interpretação da SpO₂ e onda pletismográfica",
          "Limitações e causas de artefatos",
          "Posicionamento adequado do sensor por espécie",
          "Valores normais e limiares de intervenção"
        ]
      },
      {
        title: "Capnografia e capnometria",
        content: [
          "Princípios da medição de CO₂ expirado",
          "Interpretação da curva de capnografia",
          "Valores normais de ETCO₂ e significado clínico",
          "Detecção de problemas respiratórios e metabólicos",
          "Tipos de capnógrafos (mainstream vs sidestream)"
        ]
      },
      {
        title: "Eletrocardiografia",
        content: [
          "Posicionamento dos eletrodos em diferentes espécies",
          "Identificação de arritmias comuns durante anestesia",
          "Efeitos dos anestésicos sobre o ECG",
          "Intervenção em alterações eletrocardiográficas"
        ]
      },
      {
        title: "Pressão arterial não invasiva",
        content: [
          "Método Doppler: técnica e interpretação",
          "Método oscilométrico: vantagens e limitações",
          "Posicionamento adequado do manguito",
          "Frequência de medição e valores de referência",
          "Intervenção em casos de hipotensão ou hipertensão"
        ]
      },
      {
        title: "Pressão arterial Invasiva",
        content: [
          "Técnicas de cateterização arterial",
          "Manutenção do sistema (flush, calibração)",
          "Interpretação da curva de pressão",
          "Complicações potenciais",
          "Indicações específicas para monitorização invasiva"
        ]
      },
      {
        title: "Outros parâmetros de monitorização",
        content: [
          "Temperatura esofágica: prevenção e manejo da hipotermia",
          "Frequência cardíaca: variações normais e patológicas",
          "Frequência respiratória: padrões e alterações",
          "Estetoscópio esofágico: posicionamento e utilidade"
        ]
      }
    ]
  },
  {
    id: 11,
    title: "Recuperação anestésica",
    description: "Cuidados e técnicas para uma recuperação anestésica segura e tranquila.",
    color: "vet-orange",
    icon: "bed",
    subtopics: [
      {
        title: "Abordagem para recuperação tranquila",
        content: [
          "Ambiente adequado (temperatura, ruído, iluminação)",
          "Posicionamento do paciente durante recuperação",
          "Monitorização contínua de parâmetros vitais",
          "Avaliação neurológica intermitente",
          "Prevenção de complicações comuns"
        ]
      },
      {
        title: "Cuidados na extubação e respiração",
        content: [
          "Momento ideal para extubação (reflexos protetores)",
          "Técnica de extubação segura",
          "Suplementação de oxigênio pós-extubação",
          "Intervenções em caso de complicações respiratórias",
          "Observação prolongada em pacientes de risco"
        ]
      }
    ]
  }
];
