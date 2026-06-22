import { useEffect, useState } from 'react'
import './App.css'
import Product_card from './components/Product_card'

const fallbackProducts = [
  {
    id: 1,
    title: 'Camiseta Básica',
    price: 49.9,
    image: 'https://via.placeholder.com/300x300?text=Camiseta',
  },
  {
    id: 2,
    title: 'Tênis Esportivo',
    price: 189.9,
    image: 'https://via.placeholder.com/300x300?text=Tênis',
  },
  {
    id: 3,
    title: 'Relógio Moderno',
    price: 279.9,
    image: 'https://via.placeholder.com/300x300?text=Relógio',
  },
]

function App() {
  const [page, setPage] = useState(0)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch('https://fakestoreapi.com/products?limit=10')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        setProducts(data)
      })
      .catch(err => {
        console.error('Erro ao carregar produtos', err)
        setError('Não foi possível carregar os produtos. Mostrando produtos de exemplo.')
        setProducts(fallbackProducts)
      })
      .finally(() => setLoading(false))
  }, [page])

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
