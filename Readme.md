# Instituto Patas Unidas

Um site para o resgate e adoção de animais em perigo e maus tratos.

## Páginas do site

- Início: apresentação do instituto e avisos
- Adote um pet: lista de animais para adoção, com favoritos
- Contato: telefone, e-mail e endereço
- Seja voluntário: formulário de cadastro com validação

## Tecnologias usadas

- HTML5: estrutura das páginas
- CSS3: visual do site, com Grid, Flexbox e @media para funcionar no celular e no computador
- JavaScript: troca de páginas sem recarregar (SPA), lista de pets, validação do formulário e favoritos salvos no navegador (localStorage)
- Day.js: biblioteca usada pela CDN para mostrar há quantos dias cada pet está no abrigo

## Estrutura de pastas

- `html/`: páginas do site
- `css/`: estilos
- `js/`: códigos JavaScript
- `imagens/`: fotos
- `estudos/`: anotações de estudo

## Pré-requisitos

- Um navegador (Chrome, Edge ou Firefox)
- Git, para baixar o projeto
- VS Code com a extensão Live Server (opcional)

## Como rodar o projeto no computador

1. Baixe o projeto:
   ```
   git clone https://github.com/marcondeswesley135-hash/patas-unidas.git
   ```
2. Entre na pasta:
   ```
   cd patas-unidas
   ```
3. Abra o arquivo `html/index.html` no navegador, ou clique com o botão direito nele no VS Code e escolha "Open with Live Server".

Não é preciso instalar nada além disso, porque o site usa só HTML, CSS e JavaScript.

## Build de produção e deploy

O site no ar: https://marcondeswesley135-hash.github.io/patas-unidas/

Para gerar a versão otimizada (precisa do Node.js):

```
npm install
npm run build
```

O comando cria a pasta `dist/` com:
- HTML, CSS e JavaScript minificados com **esbuild** e **html-minifier-terser** (cerca de 43% menores)
- a foto principal também em **WebP** (52% menor) e **AVIF** (71% menor), usadas com a tag `<picture>`

O deploy é automático: a cada push ou merge na `main`, o GitHub Actions (`.github/workflows/deploy.yml`) roda o build e publica a pasta `dist/` no **GitHub Pages**.

## Versionamento

- O projeto usa **GitFlow**:
  - `main`: versão pronta do site
  - `develop`: onde o trabalho é juntado e testado
  - `feature/...`: uma branch para cada funcionalidade nova
- As mensagens de commit seguem o padrão **Conventional Commits**: `docs:` (documentação), `feat:` (funcionalidade nova), `fix:` (correção), `style:` (visual) e `release:` (lançamento).
- As versões seguem o **versionamento semântico** (exemplo: `v1.0.0`) e são marcadas com tags e releases no GitHub.

## Como contribuir

1. Atualize a develop: `git switch develop` e `git pull`
2. Crie uma branch nova: `git switch -c feature/nome-da-funcionalidade`
3. Faça os commits com o prefixo certo, por exemplo: `feat: adiciona botão de doação`
4. Envie para o GitHub: `git push -u origin feature/nome-da-funcionalidade`
5. Abra um Pull Request para a `develop`, explicando o que foi feito e por quê

## Autor

José Wesley - [GitHub](https://github.com/marcondeswesley135-hash)
