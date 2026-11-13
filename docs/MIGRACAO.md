# Migração do protótipo YahooFit

## Origem

- Repositório: `IsaqueTI/yahoo-fit-wellness-hub`.
- Commit consultado: `4f033668e69399389199227b5243885f8b08c1fe`.
- Página: `src/routes/index.tsx`.
- Estilos originais: `src/styles.css`.
- Imagens: cinco arquivos de `src/assets/`.

## Implementação

| No protótipo | Nesta versão |
| --- | --- |
| React e TypeScript | HTML semântico e JavaScript nativo |
| TanStack Start e rotas do framework | Página estática e fragmentos locais |
| Tailwind e utilidades de compilação | Grid/utilidades do Bootstrap e CSS próprio |
| Menu com estado React | Offcanvas do Bootstrap com controle de foco |
| FAQ com estado React | Accordion do Bootstrap |
| Links de modalidade apontando para planos | Detalhes nativos e âncoras de cada modalidade |
| WhatsApp sem número | Configuração validada ou aviso local de contato pendente |
| Rota do bairro apresentada como “Como chegar” | Link “Ver o bairro no Maps” até validar o ponto exato |

O menu do computador e o botão do menu móvel são exclusivos em seus respectivos breakpoints. A função dos botões não depende de classes CSS que substituam essas regras.

## Decisões de conteúdo

- Paleta, tipografia, ordem das seções e fotografias preservam a direção visual aprovada.
- As explicações curtas das modalidades foram colocadas em HTML para tornar cada controle útil e indexável.
- A menção a um ringue foi removida porque a estrutura física não foi confirmada.
- O WhatsApp permanece pendente, assim como no código original, mas não abre URLs sem destinatário.
- O mapa continua aproximado e o endereço mantém a indicação de validação pelo gestor.
- Não foram adicionados preços, horários, depoimentos, números de alunos ou credenciais.
- Não foram criados banco de dados, login, integrações de gestão ou novas páginas com dados não confirmados.

## Dependências estáticas

Bootstrap 5.3.9 foi obtido dos endereços publicados na documentação oficial. O download foi conferido com os hashes SHA-384 do fornecedor:

- CSS: `yEPZ7jP9S0QKiUQ0m3jjsO4ProIW7wvR9gXkI7JOGa2XVsw53Yke2bsdkBbjmmiX`.
- JavaScript bundle: `WyOxWvTyr1QaMPfiPJSv76iReVthorl5uWlFtZPyK0IEB0hGzo9y5Bp9mYanr8Bu`.

Os arquivos continuam locais e sem alteração; a licença MIT do Bootstrap acompanha o código. Mapas e Google Fonts são recursos externos opcionais para a apresentação completa.

## Integridade das fotografias

| Arquivo | SHA do blob Git preservado |
| --- | --- |
| `coletivas.jpg` | `344875a14248e6cf65a56edcb41ce3b03601f386` |
| `hero-treino.jpg` | `084ab182c1ce0ca7374cdb53fcdc327b3ee55b33` |
| `jiujitsu-kids.jpg` | `b08e368d6be1e0bbe663a759befd332e35834fd8` |
| `lutas.jpg` | `76b253b4e72400649758461caea64b56d1e3f087` |
| `musculacao.jpg` | `95953f52dc56975ed8fc46f1f25b0b461cc4bc20` |

## Validação

`scripts/check-static.py` verifica a estrutura HTML, âncoras, referências ARIA, arquivos locais, dependências da migração e integridade dos ativos de origem. A sintaxe dos scripts próprios é verificada com `node --check`.

Verificações concluídas em 12/11/2026:

- Verificação estática e sintaxe dos dois scripts próprios aprovadas.
- Página conferida no Chromium em janela de 1363 px e em quadros de 390 e 320 px; sem rolagem horizontal do documento após ajustar os gutters de planos e contato.
- Menu do computador sem botão móvel duplicado; Offcanvas móvel abre, fecha com Escape e leva o foco à seção escolhida.
- FAQ abre a resposta selecionada; links dos cartões abrem os detalhes da modalidade correspondente.
- Contato pendente abre o aviso local, inclusive pelo menu móvel; ao fechar, o foco retorna ao acionador adequado.

A confirmação dos dados comerciais, a troca das fotos ilustrativas e a revisão no domínio final continuam necessárias antes de disponibilizar a versão comercial.

## Atualização das modalidades — 13/11/2026

As oito modalidades agora têm cartões individuais com foto e descrição visível no HTML. As âncoras antigas de cada modalidade foram preservadas; Jiu-Jitsu Kids também mantém o link para a seção dedicada. A grade usa quatro colunas nas telas grandes, duas nas intermediárias e uma no celular. Quatro novos ativos ilustrativos em WebP complementam as fotografias de origem, sem substituí-las. Os dados comerciais continuam pendentes de validação.
