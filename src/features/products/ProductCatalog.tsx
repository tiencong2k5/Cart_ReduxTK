import { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addToCart } from '../cart/cartSlice'
import { fetchProducts } from './productsSlice'
import type { Product } from './types'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch()

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img className="product-image" src={product.image} alt={product.title} />
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-details">
        <h3 title={product.title}>{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-card-footer">
          <strong>{currency.format(product.price)}</strong>
          <button
            className="add-button"
            type="button"
            onClick={() => dispatch(addToCart(product))}
            aria-label={`Thêm ${product.title} vào giỏ hàng`}
          >
            <span aria-hidden="true">+</span> Thêm
          </button>
        </div>
      </div>
    </article>
  )
}

export function ProductCatalog() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.products)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const categories = useMemo(
    () => [...new Set(items.map((product) => product.category))].sort(),
    [items],
  )

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()
    return items.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      const matchesCategory = category === 'all' || product.category === category
      return matchesSearch && matchesCategory
    })
  }, [category, items, search])

  return (
    <section className="catalog" aria-labelledby="catalog-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">BỘ SƯU TẬP CỦA CHÚNG TÔI</p>
          <h2 id="catalog-title">Sản phẩm nổi bật</h2>
        </div>
        {status === 'succeeded' && (
          <span className="result-count">{filteredItems.length} sản phẩm</span>
        )}
      </div>

      <div className="catalog-toolbar">
        <label className="search-field">
          <span className="sr-only">Tìm sản phẩm</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input
            type="search"
            placeholder="Tìm sản phẩm..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <label className="category-select">
          <span className="sr-only">Lọc theo danh mục</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      {status === 'loading' && (
        <div className="catalog-message" role="status">
          <span className="spinner" />
          <p>Đang tải sản phẩm...</p>
        </div>
      )}

      {status === 'failed' && (
        <div className="catalog-message error-message" role="alert">
          <p>{error}</p>
          <button
            type="button"
            className="retry-button"
            onClick={() => void dispatch(fetchProducts())}
          >
            Thử lại
          </button>
        </div>
      )}

      {status === 'succeeded' && filteredItems.length === 0 && (
        <div className="catalog-message">
          <p>Không tìm thấy sản phẩm phù hợp.</p>
        </div>
      )}

      {status === 'succeeded' && filteredItems.length > 0 && (
        <div className="product-grid">
          {filteredItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
