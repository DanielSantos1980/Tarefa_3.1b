
'use strict';
window.ANIMALEC_SEED = {
  animais: [
    {id:'a1',nome:'Lobo-ibérico',cientifico:'Canis lupus signatus',grupo:'Mamífero',habitat:'Florestas e montanhas',estado:'Ativo'},
    {id:'a2',nome:'Lince-ibérico',cientifico:'Lynx pardinus',grupo:'Mamífero',habitat:'Matos mediterrânicos',estado:'Ativo'},
    {id:'a3',nome:'Águia-real',cientifico:'Aquila chrysaetos',grupo:'Ave',habitat:'Escarpas e montanhas',estado:'Ativo'},
    {id:'a4',nome:'Golfinho-roaz',cientifico:'Tursiops truncatus',grupo:'Mamífero',habitat:'Águas costeiras',estado:'Ativo'},
    {id:'a5',nome:'Camaleão-comum',cientifico:'Chamaeleo chamaeleon',grupo:'Réptil',habitat:'Dunas e matos',estado:'Inativo'}
  ],
  utilizadores: [
    {id:'u1',nome:'Joana Costa',email:'joana@example.org',papel:'Editor',estado:'Ativo'},
    {id:'u2',nome:'Miguel Pereira',email:'miguel@example.org',papel:'Professor',estado:'Ativo'},
    {id:'u3',nome:'Sofia Martins',email:'sofia@example.org',papel:'Aluno',estado:'Inativo'}
  ],
  quizzes: [
    {id:'qz1',titulo:'Animais da Península Ibérica',tema:'Biodiversidade',nivel:'Iniciante',estado:'Ativo'},
    {id:'qz2',titulo:'Habitats e conservação',tema:'Ecossistemas',nivel:'Intermédio',estado:'Ativo'}
  ],
  questoes: [
    {id:'qt1',pergunta:'Qual é o nome científico do lince-ibérico?',quiz:'Animais da Península Ibérica',resposta:'Lynx pardinus',estado:'Ativo'},
    {id:'qt2',pergunta:'Onde vivem habitualmente os golfinhos-roazes?',quiz:'Habitats e conservação',resposta:'Águas costeiras',estado:'Ativo'}
  ],
  sponsors: [
    {id:'s1',nome:'Fundação Bosque Vivo',setor:'Conservação ambiental',contacto:'Ana Ribeiro',email:'parcerias@bosque.example',tipoApoio:'Apoio à conservação',animalIds:['a1','a2'],estado:'Ativo'},
    {id:'s2',nome:'Atlântico Azul',setor:'Educação ambiental',contacto:'Rui Ferreira',email:'geral@atlantico.example',tipoApoio:'Material educativo',animalIds:['a4'],estado:'Ativo'},
    {id:'s3',nome:'Aves do Amanhã',setor:'Investigação',contacto:'Sara Lopes',email:'info@aves.example',tipoApoio:'Divulgação científica',animalIds:['a3'],estado:'Inativo'}
  ],
  experts: [
    {id:'e1',nome:'Dra. Inês Carvalho',especialidade:'Mamíferos ibéricos',instituicao:'Centro de Ecologia',email:'ines@ecologia.example',animalIds:['a1','a2'],estado:'Ativo'},
    {id:'e2',nome:'Dr. Luís Correia',especialidade:'Biologia marinha',instituicao:'Instituto do Mar',email:'luis@mar.example',animalIds:['a4'],estado:'Ativo'},
    {id:'e3',nome:'Dra. Marta Reis',especialidade:'Ornitologia',instituicao:'Laboratório de Biodiversidade',email:'marta@aves.example',animalIds:['a3'],estado:'Ativo'}
  ]
};
window.ANIMALEC_SCHEMAS = {
  animais: {title:'Animais',singular:'animal',subtitle:'Espécies e informação para atividades educativas.',desc:'Registo de animais apresentado no caso de estudo.',columns:[['nome','Animal'],['cientifico','Nome científico'],['grupo','Grupo'],['estado','Estado']],fields:[
    {key:'nome',label:'Nome comum',required:true,maxlength:80}, {key:'cientifico',label:'Nome científico',required:true,maxlength:100},
    {key:'grupo',label:'Grupo',type:'select',choices:['Mamífero','Ave','Réptil','Anfíbio','Peixe','Outro'],required:true},
    {key:'habitat',label:'Habitat',maxlength:150}, {key:'estado',label:'Estado',type:'select',choices:['Ativo','Inativo'],required:true}
  ]},
  utilizadores: {title:'Utilizadores',singular:'utilizador',subtitle:'Perfis e permissões dos utilizadores.',desc:'Dados fictícios. Sem gestão de credenciais reais.',columns:[['nome','Nome'],['email','Email'],['papel','Perfil'],['estado','Estado']],fields:[
    {key:'nome',label:'Nome completo',required:true,maxlength:100},{key:'email',label:'Email',type:'email',required:true,maxlength:140},
    {key:'papel',label:'Perfil',type:'select',choices:['Administrador','Editor','Professor','Aluno'],required:true},{key:'estado',label:'Estado',type:'select',choices:['Ativo','Inativo'],required:true}
  ]},
  quizzes: {title:'Quizzes',singular:'quiz',subtitle:'Atividades de avaliação de conhecimento.',desc:'Organização de quizzes por tema e dificuldade.',columns:[['titulo','Quiz'],['tema','Tema'],['nivel','Nível'],['estado','Estado']],fields:[
    {key:'titulo',label:'Título',required:true,maxlength:120},{key:'tema',label:'Tema',required:true,maxlength:80},
    {key:'nivel',label:'Nível',type:'select',choices:['Iniciante','Intermédio','Avançado'],required:true},{key:'estado',label:'Estado',type:'select',choices:['Ativo','Inativo'],required:true}
  ]},
  questoes: {title:'Questões',singular:'questão',subtitle:'Perguntas e respostas associadas aos quizzes.',desc:'Banco de perguntas dos quizzes.',columns:[['pergunta','Questão'],['quiz','Quiz'],['resposta','Resposta correta'],['estado','Estado']],fields:[
    {key:'pergunta',label:'Enunciado',type:'textarea',required:true,maxlength:400},{key:'quiz',label:'Quiz',type:'select',source:'quizzes',sourceLabel:'titulo',required:true},
    {key:'resposta',label:'Resposta correta',required:true,maxlength:200},{key:'estado',label:'Estado',type:'select',choices:['Ativo','Inativo'],required:true}
  ]},
  sponsors: {title:'Patrocinadores',singular:'patrocinador',subtitle:'Organizações que apoiam a divulgação e conservação das espécies.',desc:'Associe cada patrocinador a um ou vários animais.',columns:[['nome','Patrocinador'],['contacto','Contacto'],['tipoApoio','Tipo de apoio'],['animalIds','Animais associados'],['estado','Estado']],fields:[
    {key:'nome',label:'Nome da organização',required:true,maxlength:110},{key:'setor',label:'Área de atuação',required:true,maxlength:100},
    {key:'contacto',label:'Pessoa de contacto',required:true,maxlength:100},{key:'email',label:'Email institucional',type:'email',required:true,maxlength:140},
    {key:'tipoApoio',label:'Tipo de apoio',type:'select',choices:['Apoio à conservação','Material educativo','Divulgação científica','Financiamento','Outro'],required:true},
    {key:'animalIds',label:'Animais associados',type:'animals',required:true},{key:'estado',label:'Estado',type:'select',choices:['Ativo','Inativo'],required:true}
  ]},
  experts: {title:'Especialistas científicos',singular:'especialista',subtitle:'Conhecimento científico associado a espécies e grupos de animais.',desc:'Associe cada especialista a um ou vários animais.',columns:[['nome','Especialista'],['especialidade','Área científica'],['instituicao','Instituição'],['animalIds','Animais estudados'],['estado','Estado']],fields:[
    {key:'nome',label:'Nome completo',required:true,maxlength:110},{key:'especialidade',label:'Área de especialização',required:true,maxlength:120},
    {key:'instituicao',label:'Instituição',required:true,maxlength:120},{key:'email',label:'Email profissional',type:'email',required:true,maxlength:140},
    {key:'animalIds',label:'Espécies / animais associados',type:'animals',required:true},
    {key:'estado',label:'Estado',type:'select',choices:['Ativo','Inativo'],required:true}
  ]}
};
