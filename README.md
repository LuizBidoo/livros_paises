# Livros & Países

Aplicação web que permite pesquisar livros e visualizar, em um mapa interativo, os países relacionados ao idioma da obra selecionada.

## Como executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador.

## Como usar

1. Digite o título de um livro no campo de pesquisa e clique em **Buscar**
2. Escolha uma obra na lista de resultados
3. O painel lateral exibe título, autor, ano de publicação, idioma e capa da obra
4. O mapa destaca automaticamente os países que falam o idioma principal do livro

## Decisões técnicas

A aplicação foi construída com React e Vite por serem a combinação mais direta para criar uma SPA moderna sem configuração manual de bundler. O estado global (resultados da busca, livro selecionado e lista de países) vive inteiramente no componente `App`, que repassa dados via props para componentes puramente apresentacionais. Essa estrutura mantém o fluxo de dados previsível sem introduzir complexidade desnecessária como Context ou bibliotecas de estado externas.

Para o consumo das APIs foi utilizado o `fetch` nativo do browser, conforme especificado. As chamadas estão centralizadas no `App`, o que facilita o tratamento de erros e o controle dos estados de carregamento. Os quatro casos de falha previstos: busca sem resultado, obra sem idioma, idioma sem países cadastrados e erro de rede, são tratados individualmente com mensagens específicas para o usuário.

A integração entre as duas APIs exigiu uma camada de tradução de códigos de idioma. A Open Library retorna códigos no formato MARC (três letras, como `por`, `fre`, `ger`), enquanto a REST Countries v3.1 aceita busca pelo nome do idioma em inglês ou por códigos ISO 639-3. Como alguns códigos MARC divergem do ISO 639-3, por exemplo, o francês é `fre` no MARC e `fra` no ISO 639-3, nós optamos por converter sempre para o nome em inglês (`portuguese`, `french`, `german`), o que garante compatibilidade independente dessas variações.

A visualização geográfica foi implementada com React Leaflet usando `CircleMarker` para marcar a posição central de cada país. Essa abordagem foi preferida ao carregamento de um arquivo GeoJSON de fronteiras do mundo, que teria mais de 4 MB e tornaria a aplicação perceptivelmente mais lenta. Cada marcador exibe um popup com o nome e a capital do país ao ser clicado. O mapa ajusta o zoom automaticamente com `flyToBounds` para enquadrar todos os países destacados sempre que uma nova obra é selecionada.
