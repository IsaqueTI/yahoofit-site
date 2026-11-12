# YahooFit — instruções do projeto

- Preserve HTML5, Bootstrap 5 e JavaScript puro. O site deve funcionar como arquivos estáticos, sem compilação.
- O conteúdo principal deve permanecer legível no HTML, sem depender de renderização JavaScript.
- Use o grid e os componentes do Bootstrap local. Preserve as utilidades responsivas e não sobrescreva indiscriminadamente suas propriedades de exibição.
- Mantenha a navegação por teclado, foco visível, rótulos dos botões e a preferência por movimento reduzido.
- Não invente contatos, horários, professores, credenciais, avaliações, preços ou ofertas. Preserve as marcações de pendência até receber validação explícita da academia.
- Fotografia ilustrativa deve continuar identificada até sua substituição por fotos reais autorizadas.
- Números de contato só podem ser habilitados depois de confirmados. Nunca use um telefone fictício para demonstrar o fluxo.
- Não coloque segredos ou credenciais no repositório ou no JavaScript público.
- Antes de concluir mudanças, execute `python3 scripts/check-static.py`, `node --check assets/js/config.js` e `node --check assets/js/site.js`. Faça a verificação visual adequada à mudança.
- O projeto é independente do repositório original do Lovable. Não modifique a origem como efeito colateral de uma tarefa neste repositório.
