module.exports = {
  types: [
    { value: 'code', name: 'code:     Alterações de CÓDIGO do projeto, que não \n            seja imagens, scss/temas, specs/tokens' },
    { value: 'design', name: 'design:   Alterações de DESIGN do projeto, como \n            imagens, scss/temas, specs/tokens' },
    { value: 'feat', name: 'feat:     Nova funcionalidade de código ou design' },
    { value: 'poc', name: 'poc:      Prova de conceito adicionada ou alterada' },
    { value: 'fix', name: 'fix:      Correção de bug em código ou design' },
    { value: 'docs', name: 'docs:     Apenas documentações foram alteradas' },
    { value: 'style', name: 'style:    Alterações que não afetam a semântica do código\n            (espaços, formatação, pontuações faltando, etc)', },
    { value: 'refactor', name: 'refactor: Alteração que não corrige um bug nem adiciona uma funcionalidade', },
    { value: 'perf', name: 'perf:     Alterações para melhoria do desempenho', },
    { value: 'test', name: 'test:     Adicionando testes que faltavam' },
    { value: 'chore', name: 'chore:    Alterações no processo de compilação/build ou \n            ferramentas por ex. para geração de documentação', },
    { value: 'revert', name: 'revert:   Reverter para um commit' },
    { value: 'WIP', name: 'WIP:      Trabalho em progresso' },
    { value: 'CI', name: 'CI:      Integração contínua / Pipeline / Esteira' },
  ],

  scopes: [
    { name: 'components', description: 'Algum dos componentes foi alterado' },
    { name: 'elements', description: 'Custom Elements alterados' },
    { name: 'core', description: 'Core lib foi alterada' },
    { name: 'data', description: 'Data lib foi alterada' },
    { name: 'demo', description: 'Demo app foi alterado' },
    { name: 'storybook', description: 'Storybook app foi alterado' },
    { name: 'playground', description: 'Playground app foi alterado' },
    { name: 'infra', description: 'Documentações de gerenciamento' },
    { name: 'scss', description: 'Ajustes no código de estilos' },
    { name: 'image', description: 'Imagens foram alteradas' },
    { name: 'theme', description: 'Algum tema foi alterado' },
    { name: 'specs', description: 'Especificações de design foram alteradas' },
    { name: 'tokens', description: 'Valores de design tokens alterados' },
    { name: 'config', description: 'Configurações relacionadas ao tipo selecionado' },
  ],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  /*
    scopeOverrides: {
      fix: [
        {name: 'merge'},
        {name: 'style'},
        {name: 'e2eTest'},
        {name: 'unitTest'}
      ]
    },
    */
  // override the messages, defaults are as follows
  messages: {
    type: "Selecione o tipo de alteração que você está enviando:",
    scope: '\nIndique o ESCOPO desta alteração (opcional):',
    // used if allowCustomScopes is true
    customScope: 'Indique o escopo desta alteração:',
    subject: 'Escreva uma descrição CURTA e IMPERATIVA da mudança:\n',
    body:
      'Forneça uma descrição mais detalhada da alteração (optional). Use "|" para quebras de linha:\n',
    breaking: 'Listar quaisquer ALTERAÇÕES DE QUEBRA / BREAKING CHANGES (opcional):\n',
    footer:
      'Liste quaisquer conclusões de PROBLEMAS / ISSUES por esta alteração (opcional). Ex.: #31, #34:\n',
    confirmCommit: 'Tem certeza de que deseja continuar com o commit acima?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['body'],

  // limit subject length
  subjectLimit: 100,
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
};
