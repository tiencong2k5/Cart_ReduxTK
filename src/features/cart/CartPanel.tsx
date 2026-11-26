import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { removeFromCart, updateQuantity } from './cartSlice'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function CartPanel() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <aside className="cart-panel" id="cart" aria-labelledby="cart-title">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">GIỎ HÀNG CỦA BẠN</p>
          <h2 id="cart-title">Đơn hàng</h2>
        </div>
        <span className="cart-count" aria-label={`${itemCount} sản phẩm`}>
          {itemCount}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48">
              <path d="M7 10h5l4.2 21.1a4 4 0 0 0 3.9 3.2h17.1a4 4 0 0 0 3.9-3.1L44 17H14" />
              <circle cx="20" cy="40" r="2" />
              <circle cx="36" cy="40" r="2" />
            </svg>
          </div>
          <h3>Giỏ hàng đang trống</h3>
          <p>Hãy chọn món đồ bạn yêu thích để bắt đầu.</p>
          <a href="#catalog-title" className="browse-link">
            Khám phá sản phẩm
          </a>
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {items.map((item) => (
              <li className="cart-item" key={item.id}>
                <img src={item.image} alt="" className="cart-item-image" />
                <div className="cart-item-content">
                  <div className="cart-item-title-row">
                    <h3 title={item.title}>{item.title}</h3>
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      aria-label={`Xóa ${item.title} khỏi giỏ hàng`}
                    >
                      <svg viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M4 5h12M8 5V3h4v2m-6 0 1 11h6l1-11M8.5 8v5m3-5v5" />
                      </svg>
                    </button>
                  </div>
                  <span className="cart-item-price">
                    {currency.format(item.price)}
                  </span>
                  <div className="quantity-row">
                    <div className="quantity-control" aria-label="Số lượng">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                        disabled={item.quantity <= 1}
                        aria-label={`Giảm số lượng ${item.title}`}
                      >
                        −
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                        aria-label={`Tăng số lượng ${item.title}`}
                      >
                        +
                      </button>
                    </div>
                    <strong>{currency.format(item.price * item.quantity)}</strong>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div className="subtotal-row">
              <span>Tạm tính</span>
              <strong>{currency.format(subtotal)}</strong>
            </div>
            <p>Phí vận chuyển và thuế được tính khi thanh toán.</p>
            <div className="total-row">
              <span>Tổng cộng</span>
              <strong>{currency.format(subtotal)}</strong>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}
