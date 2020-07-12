module.exports = {
  types: [
    { value: 'feat', name: 'feat:     Nova funcionalidade' },
    { value: 'fix', name: 'fix:      Correção de bug' },
    { value: 'docs', name: 'docs:     Apenas documentações foram alteradas' },
    { value: 'style', name: 'style:    Alterações que não afetam a semântica do código\n            (espaços, formatação, pontuações faltando, etc)', },
    { value: 'refactor', name: 'refactor: Alteração que não corrige um bug nem adiciona uma funcionalidade', },
    { value: 'perf', name: 'perf:     Alterações para melhoria do desempenho', },
    { value: 'test', name: 'test:     Adicionando testes que faltavam' },
    { value: 'chore', name: 'chore:    Alterações no processo de compilação/build ou \n            ferramentas por ex. para geração de documentação', },
    { value: 'revert', name: 'revert:   Reverter para um commit' },
    { value: 'WIP', name: 'WIP:      Trabalho em progresso' },
  ],

  scopes: [
    { name: 'core-code', description: 'Core lib foi alterada' },
    { name: 'data-code', description: 'Data lib foi alterada' },
    { name: 'shared-code', description: 'Alguma das libs compartilhadas' },
    { name: 'feat-code', description: 'Alguma das libs de funcionalidade' },
    { name: 'docs-team', description: 'Documentações interna da equipe' },
    { name: 'docs-infra', description: 'Documentações de gerenciamento' },
    { name: 'scss-design', description: 'Ajustes no código de estilos' },
    { name: 'image-design', description: 'Imagens foram alteradas' },
    { name: 'theme-design', description: 'Algum tema foi alterado' },
    { name: 'specs-design', description: 'Especificações de design foram alteradas' },
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
