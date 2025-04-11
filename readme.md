# 🧮 Simulador de Médias para Disciplinas da UnB Campus Gama - FCTE

Este é um site em JavaScript, HTML, CSS e Bootstrap, que funciona como um simulador de médias para disciplinas da FCTE.

## 🔧 Funcionalidades

- Permite ao usuário inserir as notas de avaliações e trabalhos para cada disciplina.
- Calcula a média ponderada das notas inseridas.
- Informa se o aluno seria aprovado ou reprovado na disciplina, de acordo com a média mínima estabelecida e as notas fornecidas.
- Salva as notas e médias no armazenamento local para uma possivél simulação posterior.
- "Faltômetro" onde o usuário pode ter controle de faltas em uma disciplina.

## 🤝 Contribuição

Este projeto foi criado como parte do meu aprendizado de JavaScript. Se você tiver sugestões de melhorias, novas funcionalidades ou simplesmente atualizar/adicionar uma nova disciplina, fique à vontade para contribuir. Basta fazer um fork deste repositório, fazer suas alterações e enviar um pull request.

## 📸 Imagens

![img](assets/imgs/calcmedia-img-readme.png)
![gif](assets/imgs/gi-readme.gif)

## 📖 Tutorial para execução local
⚠️ Pré-requisitos
- [Docker](https://www.docker.com/get-started)

### ⏬ Clonar o Repositório
Para começar, abra o terminal e clone o repositório em um diretório local da seguinte maneira:

```
https://github.com/Carlos-kadu/calcmedia.git
```

### 💻 Construir a imagem e executar com o Docker
Use o seguinte comando para construir a imagem Docker:

```
docker build -t calcmedia .
```

Inicie o contêiner Docker:

```
docker run -d -p 8080:80 -v ./:/usr/share/nginx/html calcmedia
```
Acesse em um navegador digitando `http://localhost:8080`

## 📖 Tutorial para adicionar/atualizar disciplinas
https://carlos-kadu.github.io/calcmedia/como-adicionar-disciplinas.html

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

**Observação:** Este é apenas um simulador simples e não reflete as regras ou políticas oficiais da Universidade de Brasília - Campus Gama. É importante consultar as informações e regulamentos oficiais da instituição para obter informações precisas sobre as médias e critérios de aprovação das disciplinas.
