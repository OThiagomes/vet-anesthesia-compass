
import { DrugInfo } from '../components/Pharmaceuticals';

export const anesthesiaDrugs: DrugInfo[] = [
  {
    id: "propofol",
    name: "Propofol",
    class: "Hipnótico",
    description: "Agente hipnótico injetável de ação ultracurta com propriedades sedativas e hipnóticas para indução e manutenção da anestesia geral. Possui rápido início de ação e recuperação suave.",
    indications: [
      "Indução anestésica",
      "Manutenção anestésica em infusão contínua (TIVA)",
      "Sedação para procedimentos diagnósticos"
    ],
    contraindications: [
      "Hipersensibilidade conhecida ao propofol ou qualquer componente da formulação",
      "Hipovolemia grave",
      "Em felinos, uso prolongado pode causar acúmulo de corpos de Heinz"
    ],
    dosages: [
      {
        species: "canine",
        route: "IV",
        dosage: "4-6 mg/kg para indução; 0.2-0.4 mg/kg/min para manutenção",
        frequency: "Dose única para indução; infusão contínua para manutenção",
        notes: "Reduzir dose em 30-50% quando usado após pré-medicação"
      },
      {
        species: "feline",
        route: "IV",
        dosage: "2-6 mg/kg para indução; 0.1-0.3 mg/kg/min para manutenção",
        frequency: "Dose única para indução; infusão contínua para manutenção",
        notes: "Evitar uso prolongado (> 48h) em gatos"
      },
      {
        species: "equine",
        route: "IV",
        dosage: "2-3 mg/kg para indução",
        frequency: "Dose única",
        notes: "Geralmente usado em combinação com relaxantes musculares"
      },
      {
        species: "exotic",
        route: "IV",
        dosage: "3-10 mg/kg (varia significativamente entre espécies)",
        frequency: "Dose única ou infusão",
        notes: "Consultar literatura específica para cada espécie"
      }
    ],
    sideEffects: [
      "Depressão respiratória dose-dependente",
      "Hipotensão arterial",
      "Apneia transitória",
      "Dor durante injeção (pode ser minimizada usando veias de maior calibre)",
      "Reações excitação durante indução ou recuperação"
    ],
    interactions: [
      "Potencializa efeitos de benzodiazepínicos e opioides",
      "Aumenta depressão cardiovascular quando combinado com alfa-2 agonistas"
    ],
    notes: "Não contém conservantes antimicrobianos, utilizar em até 6 horas após abertura. Formulações em emulsão lipídica favorecem crescimento bacteriano se não manipuladas adequadamente.",
    safetyLevel: "high"
  },
  {
    id: "ketamine",
    name: "Cetamina",
    class: "Anestésico Dissociativo",
    description: "Antagonista não competitivo dos receptores NMDA que produz estado cataléptico dissociando o córtex cerebral do sistema límbico. Preserva reflexos protetores e causa estimulação cardiovascular.",
    indications: [
      "Anestesia para procedimentos curtos em pequenos animais",
      "Indução anestésica em combinação com outros agentes",
      "Analgesia em doses subanestésicas",
      "Anestesia de campo em animais selvagens e de grande porte"
    ],
    contraindications: [
      "Hipertensão arterial grave",
      "Histórico de convulsões",
      "Trauma cranioencefálico com aumento da pressão intracraniana",
      "Cirurgias oftálmicas (pode aumentar pressão intraocular)",
      "Insuficiência cardíaca descompensada"
    ],
    dosages: [
      {
        species: "canine",
        route: "IV/IM",
        dosage: "5-10 mg/kg (IM); 2-5 mg/kg (IV)",
        frequency: "Dose única ou repetir conforme necessário",
        notes: "Geralmente combinada com benzodiazepínicos ou alfa-2 agonistas"
      },
      {
        species: "feline",
        route: "IV/IM",
        dosage: "5-10 mg/kg (IM); 2-5 mg/kg (IV)",
        frequency: "Dose única ou repetir conforme necessário",
        notes: "Excelente opção para gatos, principalmente em combinação com midazolam"
      },
      {
        species: "equine",
        route: "IV",
        dosage: "2-3 mg/kg",
        frequency: "Dose única",
        notes: "Somente utilizar em combinação com relaxantes musculares e/ou alfa-2 agonistas"
      },
      {
        species: "bovine",
        route: "IV/IM",
        dosage: "2-4 mg/kg (IV); 4-10 mg/kg (IM)",
        frequency: "Dose única",
        notes: "Combinação com xilazina é protocolo comum para ruminantes"
      },
      {
        species: "avian",
        route: "IM",
        dosage: "10-30 mg/kg",
        frequency: "Dose única",
        notes: "Ampla variação de dose entre espécies"
      },
      {
        species: "exotic",
        route: "IM",
        dosage: "5-40 mg/kg (varia significativamente entre espécies)",
        frequency: "Dose única",
        notes: "Comumente usada para imobilização química em animais selvagens"
      }
    ],
    sideEffects: [
      "Salivação excessiva",
      "Aumento da pressão intracraniana e intraocular",
      "Reações de emergência (dissociações, excitação, alucinações)",
      "Estímulo cardiovascular (taquicardia, hipertensão)",
      "Aumento do tônus muscular e movimentos involuntários"
    ],
    interactions: [
      "Barbitúricos podem prolongar seu efeito por inibição do metabolismo hepático",
      "Potencializada por benzodiazepínicos e atenuada pelos alfa-2 agonistas"
    ],
    notes: "A combinação com anticolinérgicos (atropina, glicopirrolato) é recomendada para reduzir salivação. Em algumas espécies o tempo de recuperação pode ser prolongado devido ao metabolismo hepático intenso.",
    safetyLevel: "medium"
  },
  {
    id: "dexmedetomidine",
    name: "Dexmedetomidina",
    class: "Alfa-2 Agonista",
    description: "Agonista alfa-2 adrenérgico altamente seletivo que proporciona sedação, analgesia e relaxamento muscular dose-dependentes. É o isômero dextrógiro ativo da medetomidina, sendo duas vezes mais potente.",
    indications: [
      "Sedação e analgesia para procedimentos diagnósticos e terapêuticos",
      "Medicação pré-anestésica",
      "Analgesia como adjuvante em protocolos multimodais",
      "Infusão contínua para anestesia balanceada"
    ],
    contraindications: [
      "Doença cardiovascular grave",
      "Insuficiência hepática ou renal avançada",
      "Doenças respiratórias graves",
      "Animais muito debilitados ou geriátricos"
    ],
    dosages: [
      {
        species: "canine",
        route: "IV/IM",
        dosage: "1-10 μg/kg (IV); 5-20 μg/kg (IM)",
        frequency: "Dose única ou infusão (0.5-3 μg/kg/h)",
        notes: "Doses baixas (1-3 μg/kg) podem ter efeito paradoxal de excitação"
      },
      {
        species: "feline",
        route: "IV/IM",
        dosage: "1-10 μg/kg (IV); 5-20 μg/kg (IM)",
        frequency: "Dose única ou infusão (0.5-3 μg/kg/h)",
        notes: "Gatos geralmente são mais sensíveis que cães, iniciar com doses mais baixas"
      },
      {
        species: "equine",
        route: "IV",
        dosage: "2-5 μg/kg",
        frequency: "Dose única",
        notes: "Uso em equinos limitado a procedimentos em estação ou como parte de protocolos combinados"
      },
      {
        species: "exotic",
        route: "IM",
        dosage: "10-50 μg/kg (varia significativamente entre espécies)",
        frequency: "Dose única",
        notes: "Comumente usada em animais selvagens para contenção química"
      }
    ],
    sideEffects: [
      "Bradicardia (muitas vezes intensa)",
      "Diminuição do débito cardíaco",
      "Vasoconstrição periférica com hipertensão inicial seguida de normotensão",
      "Bloqueios atrioventriculares de 1º e 2º grau",
      "Vômitos (principalmente em cães)",
      "Hiperglicemia transitória",
      "Diurese",
      "Hipotermia"
    ],
    interactions: [
      "Potencializa efeitos de opioides e outros depressores do SNC",
      "Antagonizada por atipamezole (antagonista alfa-2)"
    ],
    notes: "Os efeitos cardiovasculares podem ser minimizados com anticolinérgicos (atropina, glicopirrolato) antes ou durante o uso. Reversível completamente com atipamezole na dose de 5-10x a dose de dexmedetomidina em μg/kg.",
    safetyLevel: "medium"
  },
  {
    id: "isoflurane",
    name: "Isoflurano",
    class: "Anestésico Inalatório",
    description: "Anestésico inalatório halogenado que proporciona indução e recuperação rápidas devido ao seu baixo coeficiente de solubilidade sangue-gás (1,4). Menos metabolizado que o halotano (apenas 0,2%).",
    indications: [
      "Anestesia geral para procedimentos de qualquer duração",
      "Manutenção anestésica após indução intravenosa",
      "Anestesia para pacientes com comprometimento hepático"
    ],
    contraindications: [
      "Predisposição à hipertermia maligna (rara em medicina veterinária)",
      "Não ideal para cesarianas (embora seja usado com adequada ventilação)"
    ],
    dosages: [
      {
        species: "canine",
        route: "Inalatória",
        dosage: "CAM: 1,3-1,5%; indução: 3-5%; manutenção: 1,5-2,5%",
        frequency: "Contínua durante anestesia",
        notes: "A CAM (Concentração Alveolar Mínima) é reduzida com uso de pré-medicação"
      },
      {
        species: "feline",
        route: "Inalatória",
        dosage: "CAM: 1,6-1,8%; indução: 3-5%; manutenção: 1,5-2,5%",
        frequency: "Contínua durante anestesia",
        notes: "Indução por máscara mais aceitável em gatos que em cães"
      },
      {
        species: "equine",
        route: "Inalatória",
        dosage: "CAM: 1,3%; manutenção: 1,5-2,5%",
        frequency: "Contínua durante anestesia",
        notes: "Indução geralmente realizada por via intravenosa devido ao porte"
      },
      {
        species: "bovine",
        route: "Inalatória",
        dosage: "CAM: 1,3-1,5%; manutenção: 1,5-2,5%",
        frequency: "Contínua durante anestesia",
        notes: "Menos potente que o sevoflurano, requer maiores concentrações"
      },
      {
        species: "avian",
        route: "Inalatória",
        dosage: "Indução: 3-5%; manutenção: 2-3%",
        frequency: "Contínua durante anestesia",
        notes: "Aves têm sistema respiratório altamente eficiente - indução e recuperação são muito rápidas"
      },
      {
        species: "exotic",
        route: "Inalatória",
        dosage: "CAM varia conforme espécie; manutenção: 1-3%",
        frequency: "Contínua durante anestesia",
        notes: "Excelente opção para pequenos mamíferos, répteis e outros exóticos"
      }
    ],
    sideEffects: [
      "Depressão cardiovascular dose-dependente",
      "Depressão respiratória dose-dependente",
      "Vasodilatação e hipotensão",
      "Redução do fluxo sanguíneo hepático e renal",
      "Hipertermia maligna (rara, predisposição genética)"
    ],
    interactions: [
      "Potencializado por benzodiazepínicos, opioides e outros depressores do SNC",
      "Arritmias potencializadas por catecolaminas (adrenalina)"
    ],
    notes: "Preserva melhor o débito cardíaco comparado ao halotano. Pouco metabolizado, sendo ideal para pacientes com função hepática comprometida. Causa menor sensibilização do miocárdio a catecolaminas que o halotano.",
    safetyLevel: "high"
  },
  {
    id: "midazolam",
    name: "Midazolam",
    class: "Benzodiazepínico",
    description: "Benzodiazepínico hidrossolúvel de curta ação que atua nos receptores GABA, produzindo sedação, relaxamento muscular e efeito anticonvulsivante. Não possui propriedades analgésicas.",
    indications: [
      "Sedação leve a moderada para procedimentos diagnósticos",
      "Medicação pré-anestésica",
      "Indução anestésica em combinação com outros agentes",
      "Controle de convulsões",
      "Relaxamento muscular"
    ],
    contraindications: [
      "Hipersensibilidade conhecida aos benzodiazepínicos",
      "Glaucoma de ângulo fechado",
      "Insuficiência hepática grave"
    ],
    dosages: [
      {
        species: "canine",
        route: "IV/IM",
        dosage: "0,1-0,3 mg/kg (IV/IM)",
        frequency: "Dose única ou repetir conforme necessário",
        notes: "Em cães saudáveis, pode causar excitação paradoxal quando usado isoladamente"
      },
      {
        species: "feline",
        route: "IV/IM",
        dosage: "0,1-0,3 mg/kg (IV/IM)",
        frequency: "Dose única ou repetir conforme necessário",
        notes: "Causa boa sedação em gatos, principalmente combinado com cetamina ou opioides"
      },
      {
        species: "equine",
        route: "IV",
        dosage: "0,02-0,1 mg/kg",
        frequency: "Dose única",
        notes: "Usado principalmente como anticonvulsivante ou combinado com outros sedativos"
      },
      {
        species: "bovine",
        route: "IV",
        dosage: "0,1-0,2 mg/kg",
        frequency: "Dose única",
        notes: "Efeito limitado em grandes ruminantes quando usado isoladamente"
      },
      {
        species: "avian",
        route: "IM",
        dosage: "0,5-2 mg/kg",
        frequency: "Dose única",
        notes: "Efeito variável entre espécies"
      },
      {
        species: "exotic",
        route: "IV/IM",
        dosage: "0,5-2 mg/kg (varia entre espécies)",
        frequency: "Dose única",
        notes: "Utilizado em várias espécies exóticas, principalmente em combinação com cetamina"
      }
    ],
    sideEffects: [
      "Depressão respiratória (principalmente em doses altas ou combinações)",
      "Sedação prolongada em pacientes com disfunção hepática",
      "Hipotensão (rara, principalmente em doses altas IV)",
      "Excitação paradoxal em algumas espécies ou indivíduos"
    ],
    interactions: [
      "Potencializado por outros depressores do SNC",
      "Efeitos podem ser revertidos por flumazenil (antagonista específico)"
    ],
    notes: "É hidrossolúvel, o que permite administração IV, IM ou intranasal. Não causa dor à injeção como o diazepam. A combinação com opioides ou alfa-2 agonistas produz neuroleptoanalgesia eficaz.",
    safetyLevel: "high"
  },
  {
    id: "morfine",
    name: "Morfina",
    class: "Opioide",
    description: "Opioide agonista puro dos receptores μ que proporciona analgesia potente para dor moderada a severa. Considerado o padrão-ouro para comparação com outros analgésicos.",
    indications: [
      "Controle de dor moderada a severa",
      "Medicação pré-anestésica",
      "Analgesia pós-operatória",
      "Componente de protocolos de neuroleptoanalgesia",
      "Controle de dispneia em edema pulmonar cardiogênico"
    ],
    contraindications: [
      "Depressão respiratória grave",
      "Trauma cranioencefálico com aumento da pressão intracraniana",
      "Hipersensibilidade conhecida",
      "Uso em cólicas em equinos (pode diminuir motilidade intestinal)"
    ],
    dosages: [
      {
        species: "canine",
        route: "IV/IM/SC",
        dosage: "0,1-0,5 mg/kg (IV lentamente); 0,5-1 mg/kg (IM/SC)",
        frequency: "A cada 4-6h conforme necessário",
        notes: "Pode causar liberação de histamina, administrar IV lentamente"
      },
      {
        species: "feline",
        route: "IV/IM/SC",
        dosage: "0,05-0,2 mg/kg (IV lentamente); 0,2-0,5 mg/kg (IM/SC)",
        frequency: "A cada 4-6h conforme necessário",
        notes: "Gatos são mais sensíveis a efeitos disfóricos, monitorar atentamente"
      },
      {
        species: "equine",
        route: "IV/IM",
        dosage: "0,1-0,2 mg/kg (IV); 0,2-0,4 mg/kg (IM)",
        frequency: "A cada 4-6h conforme necessário",
        notes: "Pode causar excitação em equinos, usar com cautela"
      },
      {
        species: "bovine",
        route: "IV/IM/EP",
        dosage: "0,05-0,1 mg/kg (IV); 0,1-0,2 mg/kg (IM/EP)",
        frequency: "A cada 4-6h conforme necessário",
        notes: "Uso limitado em ruminantes, preferir outros analgésicos"
      }
    ],
    sideEffects: [
      "Depressão respiratória dose-dependente",
      "Bradicardia",
      "Liberação de histamina (principalmente IV rápido)",
      "Êmese (mais comum em cães)",
      "Excitação e disforia (principalmente em felinos e equinos)",
      "Retenção urinária",
      "Constipação",
      "Miose (exceto em equinos - midríase)"
    ],
    interactions: [
      "Potencializada por outros depressores do SNC",
      "Antagonizada por naloxona e outros antagonistas opioides",
      "Potencializada por inibidores do citocromo P450"
    ],
    notes: "Possui baixa biodisponibilidade oral em cães e gatos. A administração epidural oferece analgesia potente com menos efeitos sistêmicos. Pode ser administrada por infusão contínua (0,1-0,3 mg/kg/h) para controle de dor intensa.",
    safetyLevel: "medium"
  }
];
