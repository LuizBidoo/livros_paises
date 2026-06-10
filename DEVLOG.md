# Processo de Desenvolvimento com IA

Este arquivo documenta toda a interação com o assistente de IA (Claude, da Anthropic) utilizado para desenvolver a aplicação Livros & Países, desde a leitura da especificação até a entrega final.

---

## 1. Leitura da especificação e geração do CLAUDE.md

A primeira interação foi o comando `/init`, que instrui o assistente a analisar o repositório e gerar um arquivo `CLAUDE.md` — um documento de orientação para o próprio assistente em sessões futuras.

**Prompt inicial:**
> `/init`

Como o projeto estava vazio (apenas um `spec.md` em branco), o assistente gerou um `CLAUDE.md` mínimo indicando que o projeto estava em fase inicial. Em seguida, a especificação do professor foi adicionada ao `CLAUDE.md`, e o assistente passou a ter acesso completo aos requisitos.

---

## 2. Implementação da aplicação

Com a especificação disponível, foi solicitado ao assistente que realizasse a implementação completa.

**Prompt:**
> "Quero que faça a implementação que especifiquei na parte de Specs do arquivo do Claude. Vamos incrementá-la e ir resolvendo bugs após a primeira iteração de implementação."

O assistente analisou os requisitos e propôs a seguinte arquitetura antes de escrever qualquer código:

- React 18 + Vite como base da SPA
- Estado global centralizado em `App.jsx`, com componentes filhos puramente apresentacionais
- `fetch` nativo para consumo das APIs (conforme especificado)
- React Leaflet com `CircleMarker` para a visualização geográfica (em vez de um arquivo GeoJSON completo, que seria pesado demais para carregar)
- Uma camada utilitária (`languages.js`) para converter os códigos de idioma MARC retornados pela Open Library para o formato esperado pela REST Countries API

A partir dessa análise, o assistente criou automaticamente todos os arquivos do projeto:

- `package.json`, `vite.config.js`, `index.html`
- `src/main.jsx`, `src/index.css`
- `src/App.jsx`, `src/App.css`
- `src/utils/languages.js`
- `src/components/SearchBar.jsx`
- `src/components/BookList.jsx`
- `src/components/BookCard.jsx`
- `src/components/BookDetail.jsx`
- `src/components/WorldMap.jsx`

Após criar os arquivos, o assistente executou `npm install` e `npm run dev` para verificar que o servidor iniciava sem erros.

---

## 3. Identificação e correção de bug

Ao testar manualmente a aplicação, foi encontrado um problema:

**Prompt:**
> "Testei aqui com Capitães de Areia do Jorge Amado e tá dizendo que não achou por idioma (por)."

O assistente diagnosticou a causa raiz: a implementação inicial convertia o código MARC `por` para o código ISO 639-1 de duas letras `pt` e chamava o endpoint `/v3.1/lang/pt` da REST Countries API. Esse endpoint **não aceita** códigos ISO 639-1 — ele busca por nome do idioma em inglês ou por códigos ISO 639-3.

Além disso, o assistente identificou um problema latente para outros idiomas: alguns códigos MARC usam formas bibliográficas que divergem do ISO 639-3 (por exemplo, francês é `fre` no MARC e `fra` no ISO 639-3), o que causaria falhas silenciosas em buscas futuras.

**Correção aplicada:** a tabela de conversão foi alterada para mapear códigos MARC diretamente para nomes em inglês (`por` → `"portuguese"`, `fre` → `"french"`, `ger` → `"german"`, etc.), que é o formato mais robusto aceito pela API.

---

## 4. Revisão de cobertura da especificação

Após a correção, foi solicitado ao assistente que verificasse se todos os requisitos do spec estavam cobertos.

**Prompt:**
> "A aplicação segue tudo que está especificado na parte de specs ou você deixou de fazer algo?"

O assistente revisou cada item da especificação e confirmou que todos os requisitos funcionais estavam implementados. Identificou, porém, uma exigência de entrega que ainda faltava:

> "A entrega deve incluir o código-fonte, instruções de execução e uma breve explicação das decisões tomadas pelo grupo. Decisões em texto corrido."

---

## 5. Criação do README

**Prompt:**
> "Pode criar o README."

O assistente gerou o `README.md` com as instruções de execução (`npm install` / `npm run dev`) e uma explicação em prosa das principais decisões técnicas do projeto: escolha de React + Vite, centralização de estado, a camada de tradução de códigos MARC e o uso de `CircleMarker` em vez de GeoJSON para a visualização geográfica.

---

## 6. Criação deste documento

**Prompt:**
> "Crie um outro arquivo MD com o contexto desse chat nosso."

O assistente criou inicialmente um `DEVLOG.md` com foco técnico nas decisões de implementação. Ao ser informado de que o professor exigia explicitamente o registro da **interação com a IA**, o arquivo foi reescrito no formato atual, documentando cada prompt e resposta relevante da sessão.

---

## Resumo da interação

| Etapa | Prompt do usuário | Ação do assistente |
|---|---|---|
| 1 | `/init` | Gerou `CLAUDE.md` com análise do repositório |
| 2 | Implementar o spec | Criou todos os arquivos do projeto e iniciou o servidor |
| 3 | Reportou bug com "Capitães de Areia" | Diagnosticou erro na conversão de código de idioma e corrigiu |
| 4 | Verificar cobertura do spec | Confirmou cobertura completa; apontou README faltando |
| 5 | Criar README | Gerou `README.md` com instruções e decisões em prosa |
| 6 | Criar registro do chat | Gerou este `DEVLOG.md` |
