import { useEffect, useState } from 'react'
import './App.css'
import Product_card from './components/Product_card'



//retorno de falha para tratar erro de carregamento de API ou caso a rede caia
// mostrando produtos de armazenamento local como exemplo de produtos a serem exibidos
const fallbackProducts = [
  {
    id: 1,
    title: 'Camiseta Básica',
    price: 49.9,
    image: './public/example_img/camisa.png',
    category: 'Roupas'
  },
  {
    id: 2,
    title: 'Tênis Esportivo',
    price: 189.9,
    image: './public/example_img/tenis.png',
    category: 'Calçados'
  },
  {
    id: 3,
    title: 'Relógio Moderno',
    price: 279.9,
    image: './public/example_img/relogio.png',
    category: 'Acessórios'
  },
]

function App() {
  const [products, setProducts] = useState([]) // estado para armazenar a memoria dos produtos a serem renderizados
  const [loading, setLoading] = useState(false) // estado para armazenar e tratar o carregamento da exibição
  const [error, setError] = useState(null) // estado para armazenar e tratar os erros de carregamento da exibição

  useEffect(() => {
    setLoading(true) // estado de carregamento começa como verdadeiro
    setError(null) // estado de erro começa vazio

    fetch('https://fakestoreapi.com/products?limit=10')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        setProducts(data) // atualiza o estado de produtos com os dados recebidos da API
      })
      .catch(err => {
        console.error('Erro ao carregar produtos', err)
        setError('Não foi possível carregar os produtos. Mostrando produtos de exemplo.')
        setProducts(fallbackProducts) // aqui trata o erro e atualiza o estado de produtos com os produtos de fallback
      })
      .finally(() => setLoading(false)) // assim que termina o estado de caregamento se torna falso
  }, [])

  return (
    <div className="App">
      <div>
        <h1>Catalogo de Produtos</h1>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {error && <p>{error}</p>}
            {products.length === 0 ? (
              <p>Nenhum produto encontrado.</p>
            ) : (
              <div className="product-list">
                {products.map(product => (
                  <Product_card key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App
