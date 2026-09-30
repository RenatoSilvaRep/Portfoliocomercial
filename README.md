# Portfólio comercial

Site estático de apresentação profissional e catálogo de produtos de Renato Silva. A página reúne informações de contato, perfil profissional e abas para as linhas Arla Eco 32 e Bardahl.

## Como abrir

Não há dependências, instalação ou processo de build. Abra o arquivo `index.html` em um navegador. Para editar, abra a pasta do projeto no VS Code e altere os arquivos descritos abaixo.

As fontes DM Sans e Space Grotesk são carregadas do Google Fonts e precisam de conexão com a internet. Sem conexão, o navegador usará uma fonte substituta.

## Estrutura

```text
.
├── index.html   # Conteúdo, estrutura e comportamento das abas
├── style.css    # Layout, cores, tipografia e responsividade
├── README.md    # Esta documentação
└── imagens/     # Logos, retrato e ícones do navegador
```

### Imagens

- `logo renato.png`: logo exibida na aba “Sobre mim”.
- `fotorenao.jpg`: retrato na apresentação profissional.
- `Logo-Arla32-Eco.png`: logo da linha Arla Eco 32.
- `bardahl.png`: logo da linha Bardahl.
- Os arquivos `favicon*`, `apple-touch-icon*` e `android-chrome-*` são ícones do site.

Os caminhos dessas imagens são relativos à pasta do projeto. Ao substituir um arquivo, mantenha o nome e a extensão ou atualize o caminho correspondente no HTML.

## Seções e navegação

O cabeçalho contém o nome, disponibilidade e acesso ao WhatsApp. A introdução apresenta o portfólio e um link de contato. A navegação por abas mostra uma seção por vez:

- **Sobre mim**: apresentação, experiência, clientes atendidos e contato.
- **Arla Eco 32**: produtos da linha pesada.
- **Bardahl**: produtos para proteção do motor.

Os botões usam `data-tab` para identificar o painel relacionado. Cada painel tem um `id` correspondente e começa oculto com o atributo `hidden`, exceto a seção inicial. O JavaScript no final de `index.html` atualiza o estado selecionado, alterna os painéis e aplica o tema correspondente.

Para adicionar ou renomear uma aba, mantenha sincronizados o `data-tab` do botão, o `id` do painel e os atributos de acessibilidade `aria-controls` e `aria-labelledby`. Para uma aba com tema próprio, defina `data-theme` no botão e crie as regras de cores correspondentes em `style.css`.

## Conteúdo e contatos

Edite textos e produtos diretamente em `index.html`. Cada produto está dentro de um elemento `.product-card`, agrupado em `.product-grid`. Os blocos visuais atuais dos produtos são criados com CSS; as imagens de produto não estão armazenadas na pasta `imagens/`.

Os links do WhatsApp aparecem no cabeçalho, na introdução e na seção de perfil. Para atualizar o contato, altere os respectivos links `wa.me` no HTML. Use o número internacional com código do país e DDD, sem espaços ou pontuação.

## Estilos e responsividade

As cores principais estão definidas como variáveis no início de `style.css`. As regras de layout, botões, imagens, estados de foco e temas ficam nesse arquivo. As adaptações para telas menores estão nas media queries de `800px` e `480px`.

Os temas Arla e Bardahl são aplicados à página pela classe `theme-arla` ou `theme-bardahl`. As regras de cada tema ajustam cores de fundo, texto, bordas e estados dos botões.

## Tecnologias

- HTML5 para o conteúdo e a estrutura semântica.
- CSS3 para apresentação e layout responsivo.
- JavaScript nativo, incluído no `index.html`, para a navegação entre abas e a troca de tema.

Não há framework, gerenciador de pacotes ou suíte de testes configurada neste projeto.