# Catálogo de Produtos (simples)

Este projeto é uma pequena loja de exemplo criada com Vite + React. O objetivo deste README é explicar, de forma simples, como o projeto funciona e onde editar as partes principais.

**Como rodar**

- Instale dependências:

```
npm install
```

- Inicie o servidor de desenvolvimento:

```
npm run dev
```

**Arquivos principais**

- `src/App.jsx` ([ver arquivo](src/App.jsx#L1-L200))
  - Faz o carregamento de produtos da API (`fetch('https://fakestoreapi.com/products?limit=10')`).
  - Mantém estados: `page`, `products`, `loading`, `error`.
  - Em caso de erro usa a lista `fallbackProducts` para mostrar produtos de exemplo.

- `src/index.css` ([ver arquivo](src/index.css#L1-L52))
  - Define variáveis CSS (`--bg`, `--text`, etc.) em `:root`.
  - Contém `color-scheme: light dark;` e `@media (prefers-color-scheme: dark)` para detectar automaticamente o tema do sistema e alterar as variáveis.
  - O app usa essas variáveis para que a interface acompanhe o tema do navegador.

- `src/components/Product_card.jsx` ([ver arquivo](src/components/Product_card.jsx#L1-L200))
  - Componente que recebe `product` e renderiza imagem, título e preço.

**Explicação rápida (trecho importante)**

- `fallbackProducts` (em `src/App.jsx`): é um array local usado quando a requisição falha, garantindo que a página não fique vazia.
