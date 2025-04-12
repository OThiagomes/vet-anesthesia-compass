export interface SubTopic {
  title: string;
  content: string[];
  clinicalNotes?: string;
  keyPoints?: string[];
  references?: string[];
  expandedContent?: {
    title: string;
    content: string;
  }[];
}

export interface Topic {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  subtopics: SubTopic[];
  introduction?: string;
  clinicalImportance?: string;
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
    introduction: "A fluidoterapia adequada durante o procedimento anestésico é fundamental para manutenção da volemia, pressão arterial e perfusão tecidual, especialmente renal. A compreensão dos diferentes tipos de fluidos, suas indicações e contraindicações, bem como o monitoramento da função renal são essenciais para garantir a segurança do paciente e prevenir complicações pós-anestésicas.",
    clinicalImportance: "O rim é particularmente vulnerável durante a anestesia devido à vasoconstrição renal induzida por diversos agentes anestésicos, hipotensão perioperatória e alterações na regulação do fluxo sanguíneo renal. A implementação de estratégias renoprotetoras e o manejo adequado de fluidos podem prevenir a injúria renal aguda, uma complicação potencialmente grave em pacientes anestesiados.",
    subtopics: [
      {
        title: "Diferentes tipos de fluidos e protocolos",
        content: [
          "Cristaloides: isotônicos (Ringer Lactato, NaCl 0,9%), hipotônicos (NaCl 0,45%), hipertônicos (NaCl 7,5%)",
          "Colóides: naturais (albumina, plasma) e sintéticos (hidroxietilamido, dextrana)",
          "Taxas de infusão de manutenção vs ressuscitação",
          "Goal-directed fluid therapy",
          "Considerações espécie-específicas para fluidoterapia"
        ],
        clinicalNotes: "A escolha do tipo de fluido deve considerar o estado hemodinâmico do paciente, a patologia de base e o procedimento a ser realizado. Cristaloides isotônicos como Ringer Lactato são geralmente a primeira escolha para manutenção em pacientes saudáveis, enquanto coloides podem ser indicados em pacientes com hipoalbuminemia ou quando há necessidade de expansão volêmica rápida sem sobrecarga de volume.",
        keyPoints: [
          "Cristaloides isotônicos (ex: Ringer Lactato): 3-5 ml/kg/h é a taxa tradicional de manutenção para cães e gatos sob anestesia",
          "Para procedimentos minimamente invasivos em pacientes saudáveis, taxas mais restritivas (2-3 ml/kg/h) podem ser apropriadas",
          "Taxas de ressuscitação para hipotensão: cristaloides 10-20 ml/kg em bolus, coloides 3-5 ml/kg em bolus",
          "Solução hipertônica (NaCl 7,5%): 2-4 ml/kg em bolus lento, seguido por cristaloides isotônicos",
          "Monitoramento da resposta clínica é essencial para ajuste dinâmico das taxas de infusão"
        ],
        expandedContent: [
          {
            title: "Cristaloides Isotônicos",
            content: "São soluções com osmolaridade próxima ao plasma (270-310 mOsm/L) que se distribuem primariamente no espaço extracelular. O Ringer Lactato (RL) é preferido para a maioria dos pacientes anestesiados por sua composição mais fisiológica, incluindo lactato que é metabolizado a bicarbonato, auxiliando na correção de acidose metabólica leve. Já o NaCl 0,9% (soro fisiológico) pode levar à acidose hiperclorêmica quando administrado em grandes volumes. Aproximadamente 75% do volume infundido de cristaloides isotônicos deixa o espaço intravascular na primeira hora, o que explica a necessidade de volumes maiores comparados aos coloides."
          },
          {
            title: "Cristaloides Hipertônicos",
            content: "São soluções com osmolaridade superior ao plasma (>310 mOsm/L). O NaCl 7,5% promove rápida expansão do volume plasmático por criar gradiente osmótico que atrai água do espaço intracelular para o intravascular. É particularmente útil em ressuscitação volêmica de emergência e tratamento de hipertensão intracraniana. Deve ser administrado lentamente (durante 5-10 minutos) e sempre seguido por fluidoterapia com cristaloides isotônicos. Contraindicado em pacientes desidratados ou com hipernatremia."
          },
          {
            title: "Coloides",
            content: "São soluções contendo moléculas de alto peso molecular que permanecem predominantemente no espaço intravascular, proporcionando expansão volêmica mais eficiente e duradoura. Os coloides naturais incluem albumina e plasma fresco congelado. Os sintéticos incluem hidroxietilamido (HES), dextranas e gelatinas. O HES 130/0.4 (Voluven®) é o mais utilizado atualmente em medicina veterinária, com menor impacto na coagulação e função renal comparado às gerações anteriores. A dose típica é de 5-10 ml/kg/dia, não excedendo 20 ml/kg/dia. Contraindicados em pacientes com coagulopatias graves, insuficiência renal ou insuficiência cardíaca descompensada."
          },
          {
            title: "Goal-Directed Fluid Therapy (GDFT)",
            content: "É uma abordagem individualizada que utiliza parâmetros hemodinâmicos específicos para guiar a administração de fluidos, otimizando o volume intravascular sem causar sobrecarga. Os principais parâmetros utilizados incluem variação da pressão de pulso (VPP), variação do volume sistólico (VVS), tempo de preenchimento capilar, lactato sérico, débito urinário e resposta a mini-bolus de fluidos (250-500ml em cães grandes ou 3-5 ml/kg em pequenos animais). Esta abordagem tem demonstrado resultados superiores à fluidoterapia baseada apenas no peso corporal, reduzindo complicações como edema pulmonar e injúria renal aguda."
          }
        ],
        references: [
          "Muir WW, et al. Handbook of Veterinary Anesthesia. 5th ed. Mosby; 2013.",
          "Davis H, et al. AAHA/AAFP Fluid Therapy Guidelines for Dogs and Cats. J Am Anim Hosp Assoc. 2013;49(3):149-159.",
          "Driessen B, et al. Beneficial effect of low volume resuscitation in treatment of hemorrhagic shock. J Vet Emerg Crit Care. 2006;16(4):231-239."
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
        ],
        clinicalNotes: "A função renal é particularmente vulnerável durante a anestesia devido à hipotensão frequentemente observada. Manter a pressão arterial média acima de 60-70 mmHg é essencial para garantir adequada perfusão renal. O débito urinário é um parâmetro útil de monitorização, sendo que valores inferiores a 0,5-1 ml/kg/h podem indicar hipoperfusão renal.",
        keyPoints: [
          "Pressão Arterial Média (PAM) ideal: manter acima de 60-70 mmHg para garantir adequada perfusão renal",
          "Débito urinário normal durante anestesia: 0,5-1 ml/kg/h (valores inferiores podem indicar hipoperfusão)",
          "Posicionamento: evitar compressão abdominal excessiva que possa comprometer fluxo renal",
          "Fármacos que podem causar nefrotoxicidade perioperatória: AINEs, aminoglicosídeos, agentes de contraste",
          "Manitol (0,25-1,0 g/kg IV) pode ser utilizado como protetor renal em procedimentos com risco elevado de lesão renal"
        ],
        expandedContent: [
          {
            title: "Fisiopatologia da Injúria Renal Aguda Perioperatória",
            content: "A injúria renal aguda (IRA) perioperatória pode ocorrer por três mecanismos principais: 1) Pré-renal: redução do fluxo sanguíneo renal devido a hipotensão, hipovolemia ou diminuição do débito cardíaco durante anestesia; 2) Renal intrínseca: lesão direta ao parênquima renal por nefrotoxinas, isquemia prolongada ou inflamação; 3) Pós-renal: obstrução do fluxo urinário. A maioria dos casos de IRA perioperatória em animais é de origem pré-renal, relacionada à hipoperfusão durante anestesia, especialmente em procedimentos prolongados ou em pacientes com comorbidades cardiovasculares."
          },
          {
            title: "Estratégias de Monitoramento Renal",
            content: "O monitoramento da função renal durante anestesia deve incluir: 1) Pressão arterial contínua, preferencialmente invasiva em pacientes de alto risco; 2) Débito urinário através de cateterização uretral; 3) Avaliação da coloração e densidade da urina; 4) Em casos selecionados, marcadores bioquímicos como SDMA, NGAL ou cistatina C podem ser úteis para detecção precoce de lesão renal. A oligúria persistente (<0,5 ml/kg/h) por mais de 2-3 horas, apesar de adequada fluidoterapia e pressão arterial normal, deve ser investigada."
          },
          {
            title: "Impacto do Posicionamento Cirúrgico",
            content: "O posicionamento do paciente durante cirurgia pode afetar significativamente a função renal. A posição de Trendelenburg (cabeça para baixo) pode aumentar a pressão venosa renal e reduzir o fluxo sanguíneo efetivo. A compressão abdominal em decúbito ventral ou a pressão excessiva sobre a região lombar em decúbito lateral podem comprometer diretamente o parênquima renal. Em procedimentos laparoscópicos, o pneumoperitôneo pode reduzir o fluxo sanguíneo renal por aumento da pressão intra-abdominal, especialmente quando a pressão excede 15 mmHg. Recomenda-se utilizar a menor pressão de pneumoperitôneo eficaz e considerar pausas intermitentes em procedimentos prolongados."
          },
          {
            title: "Fármacos Renoprotetores",
            content: "Manitol (0,25-1,0 g/kg IV): osmótico diurético que aumenta fluxo tubular renal, reduz edema celular e atua como varredor de radicais livres. Indicado em situações de alto risco como cirurgias vasculares ou com uso de contraste. Fenoldopam (0,1-0,5 μg/kg/min): agonista dopaminérgico D1 seletivo que promove vasodilatação renal sem afetar significativamente a pressão arterial sistêmica. Estudos em medicina veterinária ainda são limitados, mas resultados promissores em situações de risco para IRA. N-acetilcisteína (50-100 mg/kg IV): antioxidante que pode atenuar a lesão de isquemia-reperfusão renal e a nefrotoxicidade induzida por contrastes."
          },
          {
            title: "Manejo Perioperatório em Pacientes de Risco",
            content: "Pacientes com doença renal crônica pré-existente, diabéticos, geriátricos, hipertensos ou hipotensos representam população de alto risco para IRA perioperatória. Recomenda-se: 1) Avaliação pré-anestésica detalhada incluindo ureia, creatinina, SDMA e urinálise; 2) Hidratação pré-anestésica com cristaloides balanceados (2-3 ml/kg/h por 4-6 horas antes da anestesia); 3) Manter PAM >70 mmHg durante todo o procedimento; 4) Evitar fármacos potencialmente nefrotóxicos; 5) Considerar uso profilático de manitol (0,25 g/kg IV); 6) Monitoramento intensivo no pós-operatório imediato, com avaliação sequencial de parâmetros renais."
          }
        ],
        references: [
          "Fritsch DE, et al. The kidney in critical illness. Vet Clin North Am Small Anim Pract. 2020;50(1):167-183.",
          "Bellomo R, et al. Acute kidney injury. Lancet. 2012;380(9843):756-766.",
          "Palm CA, et al. Acute Kidney Injury in Dogs and Cats. Vet Clin North Am Small Anim Pract. 2016;46(6):957-975.",
          "Langston C, et al. Practice Guidelines for the Management of Acute Kidney Injury in the Dog and Cat. J Vet Intern Med. 2016;30(4):1055-1088."
        ]
      },
      {
        title: "Fluidoterapia em populações especiais",
        content: [
          "Pacientes pediátricos: maior risco de hipoglicemia e desequilíbrios eletrolíticos",
          "Pacientes geriátricos: redução da reserva funcional renal e cardíaca",
          "Pacientes cardiopatas: manejo delicado entre hipovolemia e sobrecarga de volume",
          "Pacientes nefropatas: individualização de protocolos e monitoração intensiva",
          "Pacientes com distúrbios eletrolíticos pré-existentes: correção antes da anestesia"
        ],
        clinicalNotes: "Populações especiais requerem ajustes específicos na fluidoterapia. Pacientes pediátricos têm maior percentual de água corporal total e maior taxa metabólica, exigindo taxas de infusão proporcionalmente maiores e atenção à glicemia. Pacientes geriátricos e cardiopatas beneficiam-se de abordagens mais restritivas para evitar sobrecarga de volume.",
        keyPoints: [
          "Pacientes pediátricos: taxas de manutenção de 3-5 ml/kg/h, considerar suplementação de dextrose para prevenir hipoglicemia",
          "Pacientes geriátricos: iniciar com taxas mais baixas (1-2 ml/kg/h) e titular conforme resposta clínica",
          "Cardiopatas: monitoração rigorosa com taxas restritivas (1-3 ml/kg/h), preferir bolus pequenos (2-3 ml/kg) quando necessário",
          "Nefropatas: evitar soluções com altos níveis de potássio, considerar taxas ligeiramente mais elevadas (3-5 ml/kg/h) para garantir diurese",
          "Hipocalemia: corrigir antes da anestesia; suplementação de 0,1-0,5 mEq/kg/h de potássio pode ser necessária durante procedimentos prolongados"
        ],
        expandedContent: [
          {
            title: "Fluidoterapia em Pacientes Pediátricos",
            content: "Pacientes pediátricos (até 12 semanas) apresentam características fisiológicas únicas que impactam a fluidoterapia perioperatória. Possuem maior porcentagem de água corporal total (70-80% vs 60% em adultos), menor capacidade de concentração renal, reservas de glicogênio limitadas e maior área de superfície corporal em relação ao peso. A taxa de manutenção recomendada é de 3-5 ml/kg/h de cristaloides isotônicos, preferencialmente soluções balanceadas como Ringer Lactato. Em procedimentos superiores a 1 hora, considerar adição de dextrose para manter 2,5-5% da solução final (ex: 50-100ml de dextrose 50% para cada litro de cristaloide), monitorando glicemia a cada 30-60 minutos. São particularmente sensíveis a perdas e desequilíbrios eletrolíticos, exigindo monitoramento mais frequente."
          },
          {
            title: "Fluidoterapia em Pacientes Geriátricos",
            content: "Pacientes geriátricos (acima de 7-10 anos para cães e 11-14 anos para gatos, dependendo do porte) apresentam redução fisiológica da função renal e cardíaca, com menor capacidade de adaptação a alterações volêmicas. A função renal pode estar reduzida em até 50% sem alterações evidentes em parâmetros laboratoriais de rotina. A abordagem deve ser mais conservadora, iniciando com taxas de 1-2 ml/kg/h e ajustando conforme parâmetros hemodinâmicos. O monitoramento de pressão arterial, débito urinário e sinais de sobrecarga (crepitações pulmonares, distensão jugular) deve ser mais rigoroso. Considerar monitoramento de pressão venosa central em pacientes de alto risco. Estes pacientes são mais suscetíveis a desequilíbrios ácido-básicos e eletrolíticos durante anestesia prolongada."
          },
          {
            title: "Fluidoterapia em Pacientes Cardiopatas",
            content: "Em pacientes com doença cardíaca, o manejo de fluidos representa um desafio particular. O objetivo é manter adequada perfusão tecidual sem sobrecarregar um coração com reserva funcional reduzida. Para insuficiência cardíaca por disfunção sistólica (ex: cardiomiopatia dilatada), taxas de manutenção de 1-2 ml/kg/h são recomendadas. Em pacientes com disfunção diastólica (ex: cardiomiopatia hipertrófica), manter pré-carga adequada é crucial, com taxas de 2-3 ml/kg/h. Evitar bolus grandes; quando necessário para correção de hipotensão, administrar pequenos volumes (2-3 ml/kg) e reavaliar frequentemente. O uso de coloides pode ser vantajoso por proporcionar expansão volêmica com menor volume total. Monitorização multiparamétrica é essencial, idealmente incluindo ecocardiografia transesofágica em pacientes críticos ou procedimentos de alto risco."
          },
          {
            title: "Fluidoterapia em Pacientes Nefropatas",
            content: "Pacientes com doença renal requerem individualização cuidadosa da fluidoterapia. Em estágios iniciais (IRIS 1-2), taxas de manutenção de 3-5 ml/kg/h são geralmente seguras, visando manter adequada perfusão renal e diurese. Em estágios avançados (IRIS 3-4), o balanço entre garantir perfusão renal e evitar sobrecarga de volume torna-se mais crítico. Monitoramento de débito urinário torna-se mandatório. Preferir soluções balanceadas com baixo teor de potássio como Plasma-Lyte ou NaCl 0,9% caso haja hipercalemia. Em pacientes urêmicos, taxas mais elevadas (5-10 ml/kg/h) por períodos curtos podem auxiliar na redução de ureia sérica antes da anestesia. Evitar nefrotoxinas e ajustar doses de fármacos excretados por via renal. Considerar diálise pré-operatória em casos selecionados de uremia grave (creatinina >5-7 mg/dl)."
          },
          {
            title: "Fluidoterapia em Distúrbios Eletrolíticos",
            content: "A correção de desequilíbrios eletrolíticos pré-existentes é fundamental antes da anestesia. Hipocalemia (K+ <3,5 mEq/L) aumenta o risco de arritmias e potencializa bloqueadores neuromusculares. Correção IV: 0,5 mEq/kg/h (máximo 0,5 mEq/kg/h para administração periférica; máximo 1 mEq/kg/h em via central). Hiponatremia crônica (Na+ <135 mEq/L) deve ser corrigida lentamente (aumento de no máximo 8-10 mEq/L/24h) para evitar mielinólise pontina central. Hipocalcemia (Ca++ ionizado <1,0 mmol/L) pode causar hipotensão refratária e prolongar os efeitos de bloqueadores neuromusculares; correção com gluconato de cálcio 10% (0,5-1,5 ml/kg IV lento). Distúrbios ácido-básicos significativos também devem ser abordados antes da anestesia, especialmente acidose metabólica grave (pH <7,2 ou HCO3- <12 mEq/L)."
          }
        ],
        references: [
          "Seeler DC. Fluid, Electrolyte, and Blood Component Therapy. In: Grimm KA, et al. Veterinary Anesthesia and Analgesia: The Fifth Edition of Lumb and Jones. Wiley; 2015:386-415.",
          "DiBartola SP, Westropp JL. Clinical Approach to Advanced Renal Function Testing in Dogs and Cats. Vet Clin North Am Small Anim Pract. 2017;47(6):1157-1182.",
          "Hopper K, et al. ACVIM consensus statement: Guidelines for the identification, evaluation, and management of systemic hypertension in dogs and cats. J Vet Intern Med. 2018;32(6):1803-1822."
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
