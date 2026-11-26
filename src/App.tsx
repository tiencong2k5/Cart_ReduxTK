import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { CartPanel } from './features/cart/CartPanel'
import { ProductCatalog } from './features/products/ProductCatalog'
import { fetchProducts } from './features/products/productsSlice'
import './App.css'

function App() {
  const dispatch = useAppDispatch()
  const itemCount = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  )

  useEffect(() => {
    void dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div className="storefront">
      <header className="site-header">
        <a className="brand" href="#" aria-label="Mộc — trang chủ">
          <span className="brand-mark">m</span>
          <span>mộc<span className="brand-dot">.</span></span>
        </a>
        <nav className="main-nav" aria-label="Điều hướng chính">
          <a className="nav-active" href="#catalog-title">
            Cửa hàng
          </a>
          <a href="#about">Câu chuyện</a>
        </nav>
        <a className="header-cart-link" href="#cart">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.5L22 8H6" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
          <span>Giỏ hàng</span>
          <span className="header-cart-count">{itemCount}</span>
        </a>
      </header>

      <main>
        <section className="hero" id="about">
          <div className="hero-copy">
            <p className="eyebrow">ĐỒ TỐT, SỐNG CÓ GU</p>
            <h1>Món đồ nhỏ,<br />niềm vui lớn.</h1>
            <p className="hero-description">
              Tuyển chọn những món đồ thiết thực, tinh tế để mỗi ngày của bạn
              thêm cảm hứng.
            </p>
            <a className="hero-link" href="#catalog-title">
              Khám phá bộ sưu tập <span aria-hidden="true">↘</span>
            </a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-sun" />
            <div className="art-shape art-shape-back" />
            <div className="art-shape art-shape-front" />
            <div className="art-stem art-stem-one" />
            <div className="art-stem art-stem-two" />
            <span className="art-caption">a little<br />something</span>
          </div>
        </section>

        <div className="shop-layout">
          <ProductCatalog />
          <CartPanel />
        </div>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#" aria-label="Mộc — trang chủ">
          <span className="brand-mark">m</span>
          <span>mộc<span className="brand-dot">.</span></span>
        </a>
        <p>Chọn điều bạn yêu, sống theo cách của bạn.</p>
        <span>© 2026 Mộc Store</span>
      </footer>
    </div>
  )
}

export default App
