# YahooFit — HTML5, Bootstrap 5 e JavaScript puro

Versão estática do protótipo visual da YahooFit, no Jardim Brasília, em Uberlândia/MG. O conteúdo principal está no HTML e as interações usam JavaScript nativo e os componentes do Bootstrap.

**Origem visual:** [IsaqueTI/yahoo-fit-wellness-hub](https://github.com/IsaqueTI/yahoo-fit-wellness-hub), commit `4f033668e69399389199227b5243885f8b08c1fe`.

## Executar

Abra `index.html` no navegador. Para testar com um servidor HTTP local, use uma das opções abaixo na pasta do projeto:

```sh
php -S localhost:8080
```

ou:

```sh
python3 -m http.server 8080
```

Acesse `http://localhost:8080`. Não há instalação de pacotes, compilação, framework de aplicação ou servidor obrigatório em produção. PHP e Python acima são apenas alternativas para servir os arquivos durante o desenvolvimento.

## Estrutura

| Arquivo ou pasta | Responsabilidade |
| --- | --- |
| `index.html` | Conteúdo, metadados, seções e componentes semânticos |
| `assets/css/site.css` | Identidade visual e comportamento responsivo |
| `assets/js/config.js` | Confirmação do contato e do endereço |
| `assets/js/site.js` | Navegação, contatos e complementos de acessibilidade |
| `assets/img/` | Fotografias ilustrativas do protótipo e favicon |
| `assets/vendor/bootstrap/` | Bootstrap 5.3.9 local e sua licença MIT |
| `scripts/check-static.py` | Verificação de referências, HTML, componentes e dependências |
| `docs/MIGRACAO.md` | Decisões e limites da conversão |

## Configurar o WhatsApp

Edite `assets/js/config.js` com o número real, usando DDI 55, DDD e número, somente dígitos. Depois da validação do gestor, marque `whatsappConfirmed: true`.

- O valor inicial está vazio e `whatsappConfirmed` começa em `false`.
- Um número brasileiro válido precisa ter 12 ou 13 dígitos incluindo o DDI 55.
- Sem confirmação, os botões mostram um aviso local e **não abrem um contato vazio ou fictício**.
- Com confirmação, cada botão usa sua própria mensagem e abre o WhatsApp em outra aba. O site não envia mensagens automaticamente.

## Validar endereço e mapa

O endereço `Av. Constelação, 255 – Jardim Brasília, Uberlândia/MG` foi preservado do esboço e permanece marcado como pendente.

Após o gestor confirmar:

1. Confira e, se necessário, atualize o endereço em `index.html`, inclusive no FAQ.
2. Coloque o link oficial do ponto da academia em `mapsUrl` e marque `addressConfirmed: true` em `assets/js/config.js`.
3. Atualize o `src` e o título do iframe com o mapa do local confirmado e ajuste a legenda.
4. Confira o cadastro no Google e a coerência dos dados em todos os canais.

Enquanto isso, o mapa e o link externo apontam **apenas para o bairro**, com legenda explícita. O JavaScript aceita links HTTPS dos domínios do Google indicados no código e mantém o destino do bairro se a configuração for inválida.

## Conteúdo que ainda depende da academia

- Disponibilidade das oito opções de treino do esboço, turmas e faixas etárias.
- Professores, formação e fotos autorizadas da equipe.
- Horários de funcionamento, grade de aulas, planos e valores.
- Disponibilidade e condições de aula experimental.
- Número do WhatsApp, endereço e ponto exato no mapa.
- Fotos reais dos ambientes e respostas finais do FAQ.

As fotografias atuais são ilustrativas e estão identificadas. Os cartões de professores são espaços para preenchimento, sem nomes ou credenciais inventados.

## Publicar

Envie `index.html` e a pasta `assets/` a uma hospedagem estática. Não é necessário Node.js, React, TanStack Start, Vite ou Tailwind para executar o site.

O Bootstrap está incluído localmente. As fontes Anton e Manrope são solicitadas ao Google Fonts; se não houver rede, o navegador usa as fontes de reserva do CSS. O mapa também depende de uma conexão externa com o Google. Não há formulários, banco de dados, analytics ou coleta de dados implementados nesta versão.

## SEO e próximas páginas

A página tem título e descrição próprios, um H1 visível, hierarquia de títulos, atributos `alt`, links internos e todo o conteúdo principal no HTML. Os dados estruturados de negócio, URL canônica, imagem social absoluta, sitemap e páginas específicas de modalidade devem usar o domínio e as informações finais confirmadas. Não foram inventadas URLs de produção ou avaliações.

## Verificar alterações

```sh
python3 scripts/check-static.py
node --check assets/js/config.js
node --check assets/js/site.js
```

Node é utilizado somente na verificação de sintaxe acima; não é uma dependência para publicar ou usar o site. Também confira no navegador o menu móvel, fechamento com Escape, FAQ, detalhes de cada modalidade, aviso de contato pendente e larguras entre 320 e 1440 px.

## Terceiros

Bootstrap 5.3.9 é distribuído sob licença MIT, preservada em `assets/vendor/bootstrap/LICENSE`. As cinco fotografias foram preservadas do repositório de origem, sem alteração dos arquivos. Consulte `docs/MIGRACAO.md` para a origem e as verificações.
