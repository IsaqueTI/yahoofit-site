# yahoofit — HTML5, Bootstrap 5 e JavaScript puro

Versão estática do protótipo visual da yahoofit, no Jardim Brasília, em Uberlândia/MG. O conteúdo principal está no HTML e as interações usam JavaScript nativo e os componentes do Bootstrap.

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
| `assets/img/` | Logo fornecido pela academia, fotografias ilustrativas e favicon |
| `assets/vendor/bootstrap/` | Bootstrap 5.3.9 local e sua licença MIT |
| `scripts/check-static.py` | Verificação de referências, HTML, componentes e dependências |
| `docs/MIGRACAO.md` | Decisões e limites da conversão |

## Configurar o WhatsApp

Edite `assets/js/config.js` com o número real, usando DDI 55, DDD e número, somente dígitos. Depois da validação do gestor, marque `whatsappConfirmed: true`.

- O usuário confirmou `5534998680136` em 13/11/2026; `whatsappConfirmed` está em `true`.
- Os botões também têm links reais no HTML para uso sem JavaScript. Ao trocar o número, atualize a configuração e esses links.
- Um número brasileiro válido precisa ter 12 ou 13 dígitos incluindo o DDI 55.
- Sem confirmação, os botões mostram um aviso local e **não abrem um contato vazio ou fictício**.
- Com confirmação, cada botão usa sua própria mensagem e abre o WhatsApp em outra aba. O site não envia mensagens automaticamente.
- Todas as mensagens começam com “Olá vim pelo site da yahoofit”, mantendo o assunto de cada botão (modalidade, plano, benefício ou horários). O padrão também vale para os links estáticos e a mensagem de reserva do JavaScript.

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
- Horários de funcionamento, grade de aulas e condições específicas de matrícula.
- Disponibilidade e condições de aula experimental.
- Endereço e ponto exato no mapa.
- Fotos reais dos ambientes e respostas finais do FAQ.

As fotografias atuais são ilustrativas e estão identificadas. A seção de professores tem oito perfis fictícios solicitados para a avaliação do layout, com nomes de demonstração e retratos gerados por IA. Cada cartão é identificado como “Perfil fictício” e “Imagem ilustrativa”. Os exemplos não representam a equipe real e não incluem formação, certificações, graduações ou contatos inventados. Os cartões incluem um ícone de Instagram à direita: sete abrem um aviso de demonstração com o nome do professor, e o exemplo Thiago Ribeiro mostra o estado desabilitado e esmaecido. Nenhum ícone aponta para um usuário fictício no Instagram. Quando os perfis reais forem confirmados, os botões de demonstração podem ser substituídos por links oficiais com rótulo acessível.

## Planos e Instagram

Valores autorizados pelo usuário em 13/11/2026: R$ 129,90 por mês no plano recorrente e R$ 150,00 no plano mensal sem recorrência. A distinção entre as formas de pagamento foi preservada do HTML anterior da YahooFit. Não foram adicionadas condições de fidelidade, taxas ou promessas de disponibilidade das turmas. O FAQ acompanha os cartões, e a consulta de horários fica em um bloco separado.

O Instagram institucional `https://www.instagram.com/academiayahoofit/`, identificado no HTML anterior e na ficha da academia no Wellhub, aparece no cabeçalho, menu móvel, contato e rodapé. Os perfis demonstrativos dos professores continuam separados do perfil institucional.

## Benefícios aceitos

A aceitação de TotalPass e Wellhub foi informada pelo usuário. A home apresenta “Aceitamos seu benefício” dentro da seção `#planos`, abaixo dos preços e da consulta de horários, com os nomes das duas plataformas, acesso à consulta de condições e uma resposta no FAQ. Planos de cada plataforma e condições específicas de acesso devem ser validados com a academia.

As marcas dos parceiros aparecem em cards com suas cores e links para os sites oficiais (nova aba). Os arquivos são servidos localmente, sem depender de carregamento externo:

- `assets/img/parceiros/totalpass.png`: marca original obtida em `https://totalpass.com/_next/static/media/logo-tp.2jvd88idyp7c0.png`, referenciada no site brasileiro da TotalPass.
- `assets/img/parceiros/wellhub.svg`: SVG original da marca rosa extraído do cabeçalho de `https://wellhub.com/pt-br/`.

As marcas foram consultadas em 13/11/2026; suas proporções e cores foram preservadas. A ação de consulta das condições continua direcionada ao contato da academia.

## Publicar

Envie `index.html` e a pasta `assets/` a uma hospedagem estática. Não é necessário Node.js, React, TanStack Start, Vite ou Tailwind para executar o site.

O Bootstrap está incluído localmente. As fontes Anton e Manrope são solicitadas ao Google Fonts; se não houver rede, o navegador usa as fontes de reserva do CSS. O mapa também depende de uma conexão externa com o Google. Não há formulários, banco de dados, analytics ou coleta de dados implementados nesta versão.

## SEO e próximas páginas

A página tem título e descrição próprios, um H1 visível, hierarquia de títulos, atributos `alt`, links internos e todo o conteúdo principal no HTML. Os dados estruturados de negócio, URL canônica, imagem social absoluta, sitemap e páginas específicas de modalidade devem usar o domínio e as informações finais confirmadas. Não foram inventadas URLs de produção ou avaliações.

As futuras páginas individuais serão vinculadas aos cartões conforme forem criadas. A home apresenta as oito modalidades na mesma grade; o cartão de Jiu-Jitsu Kids oferece “Consultar aulas” e o destaque exclusivo dessa modalidade foi removido.

## Verificar alterações

```sh
python3 scripts/check-static.py
node --check assets/js/config.js
node --check assets/js/site.js
```

Node é utilizado somente na verificação de sintaxe acima; não é uma dependência para publicar ou usar o site. Também confira no navegador o menu móvel, fechamento com Escape, FAQ, os oito cartões de modalidade, links de WhatsApp e Instagram e larguras entre 320 e 1440 px.

## Terceiros

A marca é escrita como `yahoofit`. A imagem enviada pela academia está em `assets/img/yahoofit-logo.png`, sem alteração dos pixels originais, e também é usada como favicon. A versão de apresentação `assets/img/yahoofit-logo-site.svg` incorpora essa mesma imagem e remove o fundo escuro com uma máscara de opacidade na renderização. O enquadramento preserva o símbolo e o nome inteiros, sem os ornamentos dos cantos. O cabeçalho, o menu móvel e o rodapé usam a mesma versão, com proporção preservada e fundo transparente.

Bootstrap 5.3.9 é distribuído sob licença MIT, preservada em `assets/vendor/bootstrap/LICENSE`. As cinco fotografias de origem foram preservadas sem alteração dos arquivos. A seção de modalidades mostra oito cartões com fotos e descrições sempre visíveis, em quatro colunas nas telas grandes, duas nas intermediárias e uma no celular. ABS, GAP, Fit Dance e Muay Thai usam quatro imagens adicionais geradas por IA, identificadas como ilustrativas e otimizadas em WebP. Consulte `docs/MIGRACAO.md` para a origem e as verificações e `docs/IMAGENS-ILUSTRATIVAS.md` para os novos ativos.

O ícone de WhatsApp incorporado ao HTML é do Bootstrap Icons, sob licença MIT, preservada em `assets/vendor/bootstrap-icons/LICENSE`. O botão circular aparece no computador e no celular; seu halo pulsa a cada dois segundos, como no Team Baiano, e é desativado quando a pessoa prefere reduzir movimento. O destino continua controlado por `assets/js/config.js`.
