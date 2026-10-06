# Portfólio comercial

Site estático de apresentação profissional e catálogo de produtos de Renato Silva. A página reúne informações de contato, perfil profissional e abas para as linhas Arla Eco 32 e Bardahl.

## Como abrir

Não há dependências, instalação ou processo de build. Abra o arquivo `index.html` em um navegador. Para editar, abra a pasta do projeto no VS Code e altere os arquivos descritos abaixo.

As fontes DM Sans e Space Grotesk são carregadas do Google Fonts e precisam de conexão com a internet. Sem conexão, o navegador usará uma fonte substituta.

## Estrutura

```text
.
├── index.html             # Estrutura e conteúdo da página
├── style.css              # Layout, cores, tipografia e responsividade
├── script.js              # Interações e conteúdo dinâmico
├── README.md              # Esta documentação
├── LEIA-ME-CODIGO.txt     # Guia explicativo do código
└── imagens/
    ├── produtos/          # Imagens de produtos Arla Eco 32 e Bardahl
    ├── sobremim/          # Logos das empresas da trajetória profissional
    └── ...                # Logos principais, retrato e ícones
```

### Imagens

- `logo renato.png`: logo exibida na aba “Sobre mim”.
- `fotorenao.jpg`: retrato na apresentação profissional.
- `Logo-Arla32-Eco.png`: logo da linha Arla Eco 32.
- `bardahl.png`: logo da linha Bardahl.
- `produtos/arlaeco32/` e `produtos/bardahl/`: imagens dos produtos.
- `sobremim/`: logos das empresas exibidas na seção de trajetória.
- Os arquivos `favicon*`, `apple-touch-icon*` e `android-chrome-*` são ícones do site.

Os caminhos dessas imagens são relativos à pasta do projeto. Ao substituir um arquivo, mantenha o nome e a extensão ou atualize o caminho correspondente no HTML.

## Seções e navegação

O cabeçalho contém o nome, disponibilidade e acesso ao WhatsApp. A introdução apresenta o portfólio e um link de contato. A navegação por abas mostra uma seção por vez:

- **Sobre mim**: apresentação, experiência, clientes atendidos, contato e lista vertical de empresas com resumos expansíveis.
- **Arla Eco 32**: produtos da linha pesada, com códigos e descrições comerciais.
- **Bardahl**: produtos para proteção do motor.

Os botões usam `data-tab` para identificar o painel relacionado. Cada painel tem um `id` correspondente e começa oculto com o atributo `hidden`, exceto a seção inicial. O arquivo externo `script.js`, carregado no final de `index.html`, atualiza o estado selecionado, alterna os painéis e aplica o tema correspondente.

Para adicionar ou renomear uma aba, mantenha sincronizados o `data-tab` do botão, o `id` do painel e os atributos de acessibilidade `aria-controls` e `aria-labelledby`. Para uma aba com tema próprio, defina `data-theme` no botão e crie as regras de cores correspondentes em `style.css`.

## Conteúdo e contatos

Edite os produtos Arla Eco 32 e os primeiros produtos Bardahl diretamente em `index.html`. Cada produto está dentro de um elemento `.product-card`, agrupado em `.product-grid`. As categorias extras Bardahl e as empresas da trajetória profissional são configuradas em `script.js`.

Os links do WhatsApp aparecem no cabeçalho, na introdução e na seção de perfil. Para atualizar o contato, altere os respectivos links `wa.me` em `index.html`. Use o número internacional com código do país e DDD, sem espaços ou pontuação. Os endereços de e-mail também ficam no HTML.

## Estilos e responsividade

As cores principais estão definidas como variáveis no início de `style.css`. As regras de layout, botões, imagens, estados de foco e temas ficam nesse arquivo. As adaptações para telas menores estão nas media queries de `800px`, `680px` e `480px`.

Os temas Arla e Bardahl são aplicados à página pela classe `theme-arla` ou `theme-bardahl`. As regras de cada tema ajustam cores de fundo, texto, bordas e estados dos botões.

## JavaScript

`script.js` implementa a navegação entre abas, a troca de temas, o botão de voltar ao topo, a ampliação das imagens, a criação dos cartões expansíveis das empresas, as categorias extras Bardahl e o botão “Ver mais”. Os dados das empresas ficam no array `empresas`; os dados das categorias e produtos extras ficam no array `bardahlCategorias`.

## Guia do código

O arquivo `LEIA-ME-CODIGO.txt` explica a estrutura do HTML, os principais grupos de regras CSS e as interações do JavaScript. As referências às linhas podem mudar quando os arquivos forem editados.

## Tecnologias

- HTML5 para o conteúdo e a estrutura semântica.
- CSS3 para apresentação e layout responsivo.
- JavaScript nativo, separado em `script.js`, para interações e conteúdo dinâmico.

Não há framework, gerenciador de pacotes ou suíte de testes configurada neste projeto.