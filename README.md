# Relatório de Erros e Correções

## Visão geral
Este README documenta os problemas encontrados durante o desenvolvimento do projeto `catalogo-react`, os ajustes aplicados e o status atual do app.

## Problemas identificados e correções

### 1. Erros no `src/App.jsx`
- `fetch('https://fakestoreapi.com/products?limit=10&offset=${page * 10}')`
  - Problema: uso de string simples em vez de template string.
  - Correção: alterado para `fetch(`https://fakestoreapi.com/products?limit=10&offset=${page * 10}`)`.
- `.finaly(() => setLoading(false))`
  - Problema: método escrito incorretamente.
  - Correção: trocado para `.finally(() => setLoading(false))`.
- Comportamento de carregamento
  - `useEffect` foi ajustado com dependência `[page]` para recarregar corretamente quando a página muda.

### 2. Erro de CSS no `src/App.css`
- O arquivo continha sintaxe de Sass/SCSS (`&:hover`, aninhamento de seletores) que não é válida em CSS puro usado pelo Vite.
- Correção: transformado em CSS padrão válido, sem aninhamento.

### 3. Erro de rede / API externa
- O browser retornou:
  - `net::ERR_CERT_DATE_INVALID`
  - `TypeError: Failed to fetch`
- O terminal mostrou erros de SSL:
  - `ssl.SSLCertVerificationError: certificate verify failed: certificate is not yet valid`
- Conclusão: o app está correto, mas a API externa `fakestoreapi.com` está com problema de certificado/rede no ambiente atual.

### 4. Ajuste de fallback local
- Para garantir que os produtos apareçam mesmo quando a API falha, foi adicionada uma lista de `fallbackProducts` em `src/App.jsx`.
- Quando a requisição externa falha, o app agora mostra uma mensagem de erro e exibe produtos de exemplo.

### 5. Layout dos cards
- Os cards de produto estavam se sobrepondo devido ao estilo do componente.
- Correção aplicada em `src/components/Product_card.css`:
  - `width: 100%` com `max-width: 260px`
  - `min-height: 360px`
  - `display: flex` e `flex-direction: column`
  - `gap: 12px`
  - `product-image` com `object-fit: contain`

## Status atual
- `npm run build` passa com sucesso.
- O app carrega localmente em `http://127.0.0.1:4173/`.
- A lista de produtos agora aparece usando dados de fallback quando a API falha.
- A fonte do problema atual é a API externa, que apresenta erro de certificado no navegador.

## Recomendações
- Se for necessário usar a API externa, valide o certificado e a conexão HTTPS no ambiente de execução.
- Para testes locais, mantenha o fallback ativado ou crie uma rota fake no app que sirva dados estáticos.
- Considere migrar a busca para um backend próprio se o serviço externo continuar instável.

## Comandos úteis
- Iniciar o app: `npm run dev -- --host 127.0.0.1 --port 4173`
- Build de produção: `npm run build`

## Observação
O relatório nesta documentação reflete o histórico de erros desde o início da sessão de desenvolvimento até o estado atual do projeto.
