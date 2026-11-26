# Mộc Store

Ứng dụng cửa hàng mẫu xây dựng bằng React, TypeScript, Redux Toolkit và Vite. Danh sách sản phẩm được tải từ [Fake Store API](https://fakestoreapi.com/products); giỏ hàng hỗ trợ thêm, xóa và thay đổi số lượng sản phẩm.

## Chạy ứng dụng

```sh
npm install
npm run dev
```

Kiểm tra trước khi phát hành:

```sh
npm run build
npm run lint
```

## Cấu trúc Redux

```text
src/
  app/
    hooks.ts                 # useAppDispatch và useAppSelector có kiểu
    store.ts                 # Redux store và các kiểu RootState/AppDispatch
  features/
    cart/
      cartSlice.ts           # Thêm, xóa, cập nhật số lượng và xóa toàn bộ giỏ
      CartPanel.tsx
    products/
      productsSlice.ts       # fetchProducts, trạng thái tải và lỗi
      ProductCatalog.tsx
      types.ts
```

Các component lấy state và dispatch action qua `useAppSelector` và `useAppDispatch`. Store được cung cấp cho cây React tại `src/main.tsx`.
