# Parcel Full MVP Implementation Plan

> **For agentic workers:** REQUIRED: Use the `subagent-driven-development` agent (recommended) or `executing-plans` agent to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete e-commerce MVP with product catalog, shopping cart, and checkout—bootstrapping from the existing homepage foundation.

**Architecture:** 
- Pages: Home (✅ done), Shop (filterable grid), Product Detail (with reviews/recommendations), Cart (persistent), Checkout, Blog (landing only)
- Reuse 12 existing components; add 6 new components (ProductFilter, CartSummary, CheckoutForm, BlogCard, ReviewCard, NotFound)
- Extend Zustand stores with order management and user session
- Mock data throughout; API integration marked as future

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Zustand, Gambetta fonts

---

## File Structure

### New Routes
```
src/app/
├── page.tsx                    (✅ home - existing)
├── shop/
│   ├── page.tsx               (product grid with filters)
│   └── [slug]/page.tsx        (product detail)
├── cart/page.tsx              (shopping cart)
├── checkout/page.tsx          (order summary + shipping/payment forms)
├── blog/page.tsx              (blog landing with featured posts)
└── [...not-found]/page.tsx    (404 fallback)
```

### New Components
```
src/components/
├── ProductFilter.tsx           (category, price, sort filters)
├── ProductGrid.tsx             (reusable grid with layout variants)
├── CartSummary.tsx             (cart totals, empty state, actions)
├── CheckoutForm.tsx            (shipping + payment form)
├── BlogCard.tsx                (blog post preview)
├── ReviewCard.tsx              (customer review item)
└── OrderConfirmation.tsx       (order success summary)
```

### Store Extensions
```
src/stores/
├── cartStore.ts               (✅ existing - extend with checkout state)
├── productStore.ts            (✅ existing - add filters + search)
├── orderStore.ts              (NEW - persist orders, order history)
├── userStore.ts               (NEW - session, shipping address, preferences)
└── testimonialsStore.ts       (✅ existing - no changes)
```

### Types
```
src/types/index.ts             (extend with: Product, Order, User, Review)
```

### Utilities
```
src/utils/
├── formatPrice.ts             (money formatting)
├── calculateShipping.ts       (shipping cost logic)
└── validateEmail.ts           (form validation helpers)
```

---

## Routes Required

| Route | Purpose | Status | Priority |
|-------|---------|--------|----------|
| `/` | Homepage with featured products | ✅ Done | — |
| `/shop` | Browse all products + filters | 1 | P0 |
| `/shop/[slug]` | Product detail, reviews, recommendations | 2 | P0 |
| `/cart` | Review cart, modify quantities, checkout CTA | 3 | P0 |
| `/checkout` | Shipping/payment form, order summary | 4 | P1 |
| `/blog` | Blog post grid (link collection initially) | 5 | P1 |
| `/thank-you` | Order confirmation (redirect from checkout) | 6 | P1 |
| `/404` | Not found fallback | 7 | P2 |

**P0 (Launch MVP):** Shop, Product Detail, Cart  
**P1 (Launch +1 week):** Checkout, Blog, Thank You  
**P2 (Polish):** 404, SEO metadata

---

## Components to Build (Prioritized)

### Existing (Reuse)
- **UI Atoms:** Button, Badge, StarRating, Heading, Text ✅
- **Layout:** Container, Section, Grid ✅
- **Features:** ProductCard, Header ✅
- **Sections:** FeaturedProductsSection, TestimonialsSection ✅

### New (MVP Critical)
1. **ProductFilter** — Sidebar: category/price range/sort dropdowns
2. **ProductGrid** — Responsive grid layout (lazy load ready)
3. **CartSummary** — Cart totals, empty state, checkout button
4. **CheckoutForm** — Name, email, address, payment method (form validation)
5. **OrderConfirmation** — Thank you message, order number, next steps

### New (Launch +1 Week)
6. **ReviewCard** — Individual review item with star rating
7. **BlogCard** — Blog post preview card (title, excerpt, date)
8. **NotFound** — 404 page placeholder

### Reusable Patterns
- **ProductCard** already handles product preview (image, price, rating)
- **Grid** + **Section** handle layout; create **ProductGrid** wrapper for shop-specific logic
- Extend **Button** variants (e.g., primary, secondary, outlined) via Tailwind props

---

## Stores Needed

### cartStore (extend existing)
```typescript
// Add to existing cartStore
checkout: {
  shippingAddress: {
    fullName: string
    email: string
    address: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: 'card' | 'paypal' | null
  shippingCost: number // calculated
  total: number // calculated
}
setShippingAddress(address: object): void
setPaymentMethod(method: string): void
clearCheckout(): void
```

### orderStore (NEW)
```typescript
type Order = {
  id: string
  items: CartItem[]
  total: number
  shippingAddress: object
  status: 'pending' | 'shipped' | 'delivered'
  createdAt: Date
}

orders: Order[]
currentOrder: Order | null
placeOrder(cart: object, shipping: object): Order
getOrderHistory(): Order[]
getOrderById(id: string): Order | null
```

### userStore (NEW)
```typescript
type User = {
  id: string
  email: string
  savedAddresses: Address[]
  preferences: { currency: string; newsletter: boolean }
}

user: User | null
setUser(user: User): void
setSavedAddress(address: Address): void
logout(): void
```

### productStore (extend existing)
```typescript
// Add to existing productStore
filters: {
  category: string
  priceRange: [number, number]
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating'
}
setFilter(key: string, value: any): void
resetFilters(): void
getFilteredProducts(): Product[]
```

---

## Build Order (10 Steps)

### Phase 1: Data Layer (Steps 1–2)
- [ ] **Step 1: Extend types and stores** — Add Product, Order, User, Review types; extend cartStore with checkout state; create orderStore and userStore with Zustand
- [ ] **Step 2: Add utility functions** — formatPrice(), calculateShipping(), validateEmail()

### Phase 2: Shop Pages (Steps 3–5)
- [ ] **Step 3: Build `/shop` page** — ProductFilter component + ProductGrid layout, mock product list, wire filters to productStore
- [ ] **Step 4: Build `/shop/[slug]` page** — Product detail layout (image, price, reviews, "Add to Cart" button); fetch product by slug using useProducts hook
- [ ] **Step 5: Add ReviewCard component** — Render reviews on product detail page; integrate with mock review data

### Phase 3: Cart & Checkout (Steps 6–8)
- [ ] **Step 6: Build `/cart` page** — CartSummary component, cart item list, "Proceed to Checkout" button; wire to cartStore
- [ ] **Step 7: Build `/checkout` page** — CheckoutForm component (shipping + payment form), order summary, "Place Order" button; validation + orderStore integration
- [ ] **Step 8: Build `/thank-you` page** — OrderConfirmation component; redirect logic from checkout; display order number and estimated delivery

### Phase 4: Content Pages (Steps 9–10)
- [ ] **Step 9: Build `/blog` page** — BlogCard component, mock blog posts grid (3–5 posts); link to external blog or placeholder
- [ ] **Step 10: Add 404 page** — NotFound component, link home; test 404 routing

---

## Task Details

### Task 1: Extend Types and Create Stores

**Files:**
- Modify: `src/types/index.ts`
- Modify: `src/stores/cartStore.ts`
- Create: `src/stores/orderStore.ts`
- Create: `src/stores/userStore.ts`

- [ ] **Step 1a: Add types**

In `src/types/index.ts`, add:

```typescript
export interface Product {
  id: string
  slug: string
  name: string
  price: number
  description: string
  image: string
  category: string
  rating: number
  reviewCount: number
  inStock: boolean
}

export interface CartItem {
  productId: string
  quantity: number
  price: number
}

export interface ShippingAddress {
  fullName: string
  email: string
  address: string
  city: string
  postalCode: string
  country: string
}

export interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  shippingCost: number
  total: number
  shippingAddress: ShippingAddress
  status: 'pending' | 'shipped' | 'delivered'
  createdAt: Date
}

export interface User {
  id: string
  email: string
  savedAddresses: ShippingAddress[]
  preferences: { currency: string; newsletter: boolean }
}

export interface Review {
  id: string
  productId: string
  author: string
  rating: number
  text: string
  createdAt: Date
}
```

- [ ] **Step 1b: Extend cartStore**

In `src/stores/cartStore.ts`, add checkout fields:

```typescript
interface CheckoutState {
  shippingAddress: ShippingAddress | null
  paymentMethod: 'card' | 'paypal' | null
  shippingCost: number
}

// Add to store:
checkout: CheckoutState = {
  shippingAddress: null,
  paymentMethod: null,
  shippingCost: 0,
}

setShippingAddress = (address: ShippingAddress) => {
  this.checkout.shippingAddress = address
}

setPaymentMethod = (method: 'card' | 'paypal') => {
  this.checkout.paymentMethod = method
}

calculateTotal = () => {
  const subtotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return subtotal + this.checkout.shippingCost
}

clearCheckout = () => {
  this.checkout = { shippingAddress: null, paymentMethod: null, shippingCost: 0 }
}
```

- [ ] **Step 1c: Create orderStore**

Create `src/stores/orderStore.ts`:

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Order, CartItem, ShippingAddress } from '@/types'

interface OrderState {
  orders: Order[]
  currentOrder: Order | null
  placeOrder: (items: CartItem[], total: number, shipping: ShippingAddress) => Order
  getOrderHistory: () => Order[]
  getOrderById: (id: string) => Order | null
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      placeOrder: (items, total, shipping) => {
        const order: Order = {
          id: `ORD-${Date.now()}`,
          items,
          subtotal: total - 10, // Mock: assume $10 shipping
          shippingCost: 10,
          total,
          shippingAddress: shipping,
          status: 'pending',
          createdAt: new Date(),
        }
        set((state) => ({
          orders: [order, ...state.orders],
          currentOrder: order,
        }))
        return order
      },
      getOrderHistory: () => get().orders,
      getOrderById: (id) => get().orders.find((o) => o.id === id) || null,
    }),
    { name: 'order-store' }
  )
)
```

- [ ] **Step 1d: Create userStore**

Create `src/stores/userStore.ts`:

```typescript
import { create } from 'zustand'
import { User, ShippingAddress } from '@/types'

interface UserState {
  user: User | null
  setUser: (user: User) => void
  setSavedAddress: (address: ShippingAddress) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  setSavedAddress: (address) =>
    set((state) => {
      if (!state.user) return state
      return {
        user: {
          ...state.user,
          savedAddresses: [...state.user.savedAddresses, address],
        },
      }
    }),
  logout: () => set({ user: null }),
}))
```

- [ ] **Step 1e: Commit**

```bash
git add src/types/index.ts src/stores/cartStore.ts src/stores/orderStore.ts src/stores/userStore.ts
git commit -m "feat: extend types and create order/user stores"
```

---

### Task 2: Add Utility Functions

**Files:**
- Create: `src/utils/formatPrice.ts`
- Create: `src/utils/calculateShipping.ts`
- Create: `src/utils/validateEmail.ts`

- [ ] **Step 2a: Create formatPrice**

Create `src/utils/formatPrice.ts`:

```typescript
export const formatPrice = (price: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price)
}
```

- [ ] **Step 2b: Create calculateShipping**

Create `src/utils/calculateShipping.ts`:

```typescript
export const calculateShipping = (subtotal: number, country: string): number => {
  // Mock logic: free over $100, $10 otherwise; $20 for international
  if (country !== 'US' && country !== 'CA') return 20
  return subtotal >= 100 ? 0 : 10
}
```

- [ ] **Step 2c: Create validateEmail**

Create `src/utils/validateEmail.ts`:

```typescript
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePostalCode = (code: string, country: string): boolean => {
  if (country === 'US') return /^\d{5}(-\d{4})?$/.test(code)
  if (country === 'CA') return /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i.test(code)
  return code.length > 3
}
```

- [ ] **Step 2d: Commit**

```bash
git add src/utils/formatPrice.ts src/utils/calculateShipping.ts src/utils/validateEmail.ts
git commit -m "feat: add utility functions for formatting and validation"
```

---

### Task 3: Build `/shop` Page

**Files:**
- Create: `src/app/shop/page.tsx`
- Create: `src/components/ProductFilter.tsx`
- Create: `src/components/ProductGrid.tsx`

- [ ] **Step 3a: Create ProductFilter component**

Create `src/components/ProductFilter.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { Container } from './Container'
import { Button } from './Button'

interface Filters {
  category: string
  priceRange: [number, number]
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating'
}

interface ProductFilterProps {
  onFilterChange: (filters: Filters) => void
}

export const ProductFilter = ({ onFilterChange }: ProductFilterProps) => {
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    priceRange: [0, 500],
    sortBy: 'newest',
  })

  const handleFilterChange = (key: keyof Filters, value: any) => {
    const updated = { ...filters, [key]: value }
    setFilters(updated)
    onFilterChange(updated)
  }

  return (
    <aside className="w-full lg:w-64 space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Category</h3>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full px-3 py-2 border rounded text-sm"
        >
          <option value="all">All Products</option>
          <option value="bags">Bags</option>
          <option value="accessories">Accessories</option>
          <option value="apparel">Apparel</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Price</h3>
        <input
          type="range"
          min="0"
          max="500"
          value={filters.priceRange[1]}
          onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
          className="w-full"
        />
        <p className="text-xs text-gray-600 mt-2">Up to ${filters.priceRange[1]}</p>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value as any)}
          className="w-full px-3 py-2 border rounded text-sm"
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <Button
        onClick={() => handleFilterChange('category', 'all')}
        variant="secondary"
        className="w-full"
      >
        Reset Filters
      </Button>
    </aside>
  )
}
```

- [ ] **Step 3b: Create ProductGrid component**

Create `src/components/ProductGrid.tsx`:

```typescript
'use client'

import { Grid } from './Grid'
import { ProductCard } from './ProductCard'
import { Product } from '@/types'
import Link from 'next/link'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return <div className="text-center py-12">Loading products...</div>
  }

  if (products.length === 0) {
    return <div className="text-center py-12 text-gray-500">No products found. Try adjusting your filters.</div>
  }

  return (
    <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={{ base: 4, md: 6 }}>
      {products.map((product) => (
        <Link key={product.id} href={`/shop/${product.slug}`}>
          <ProductCard
            image={product.image}
            name={product.name}
            price={product.price}
            rating={product.rating}
            reviewCount={product.reviewCount}
            inStock={product.inStock}
          />
        </Link>
      ))}
    </Grid>
  )
}
```

- [ ] **Step 3c: Build `/shop` page**

Create `src/app/shop/page.tsx`:

```typescript
'use client'

import { useState, useMemo } from 'react'
import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { ProductFilter } from '@/components/ProductFilter'
import { ProductGrid } from '@/components/ProductGrid'
import { useProducts } from '@/hooks/useProducts'

interface Filters {
  category: string
  priceRange: [number, number]
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating'
}

export default function ShopPage() {
  const { products } = useProducts()
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    priceRange: [0, 500],
    sortBy: 'newest',
  })

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category)
    }

    // Filter by price
    result = result.filter((p) => p.price <= filters.priceRange[1])

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        // newest - keep original order
        break
    }

    return result
  }, [products, filters])

  return (
    <main>
      <Container>
        <div className="py-12">
          <Heading level={1} className="mb-8">
            Shop
          </Heading>

          <div className="flex flex-col lg:flex-row gap-8">
            <ProductFilter onFilterChange={setFilters} />
            <div className="flex-1">
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
```

- [ ] **Step 3d: Commit**

```bash
git add src/app/shop/page.tsx src/components/ProductFilter.tsx src/components/ProductGrid.tsx
git commit -m "feat: add shop page with product filters and grid"
```

---

### Task 4: Build `/shop/[slug]` Product Detail Page

**Files:**
- Create: `src/app/shop/[slug]/page.tsx`
- Create: `src/components/ReviewCard.tsx`

- [ ] **Step 4a: Create ReviewCard component**

Create `src/components/ReviewCard.tsx`:

```typescript
import { Review } from '@/types'
import { StarRating } from './StarRating'
import { Text } from './Text'

interface ReviewCardProps {
  review: Review
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="border-t pt-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-sm">{review.author}</p>
          <Text size="xs" className="text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </Text>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <Text size="sm" className="text-gray-700">
        {review.text}
      </Text>
    </div>
  )
}
```

- [ ] **Step 4b: Create product detail page**

Create `src/app/shop/[slug]/page.tsx`:

```typescript
'use client'

import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { StarRating } from '@/components/StarRating'
import { ReviewCard } from '@/components/ReviewCard'
import { useProductBySlug } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import Image from 'next/image'
import { useState } from 'react'
import { formatPrice } from '@/utils/formatPrice'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { product } = useProductBySlug(params.slug)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <Container>
        <div className="py-12 text-center">
          <Heading level={2}>Product not found</Heading>
        </div>
      </Container>
    )
  }

  const mockReviews = [
    {
      id: '1',
      productId: product.id,
      author: 'Sarah M.',
      rating: 5,
      text: 'Great quality and fast shipping!',
      createdAt: new Date('2026-05-10'),
    },
    {
      id: '2',
      productId: product.id,
      author: 'John D.',
      rating: 4,
      text: 'Good product, minor wear after 2 months.',
      createdAt: new Date('2026-05-05'),
    },
  ]

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity,
      price: product.price,
    })
  }

  return (
    <main>
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Image */}
            <div className="relative aspect-square bg-gray-100 rounded overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-start">
              <Heading level={1} className="mb-2">
                {product.name}
              </Heading>
              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={product.rating} />
                <Text size="sm" className="text-gray-500">
                  ({product.reviewCount} reviews)
                </Text>
              </div>

              <Heading level={2} className="mb-6 text-2xl">
                {formatPrice(product.price)}
              </Heading>

              <Text className="text-gray-700 mb-6">{product.description}</Text>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-semibold">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="px-3 py-2 border rounded"
                  >
                    {[1, 2, 3, 4, 5].map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full"
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>

                <Button variant="secondary" className="w-full">
                  View Shipping Policy
                </Button>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="max-w-2xl">
            <Heading level={2} className="mb-6">
              Customer Reviews
            </Heading>
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
```

- [ ] **Step 4c: Add useProductBySlug hook (if missing)**

If not already in `src/hooks/useProducts.ts`, add:

```typescript
export const useProductBySlug = (slug: string) => {
  const { products } = useProducts()
  const product = useMemo(() => products.find((p) => p.slug === slug), [products, slug])
  return { product }
}
```

- [ ] **Step 4d: Commit**

```bash
git add src/app/shop/[slug]/page.tsx src/components/ReviewCard.tsx src/hooks/useProducts.ts
git commit -m "feat: add product detail page with reviews"
```

---

### Task 5: Build `/cart` Page

**Files:**
- Create: `src/app/cart/page.tsx`
- Create: `src/components/CartSummary.tsx`

- [ ] **Step 5a: Create CartSummary component**

Create `src/components/CartSummary.tsx`:

```typescript
'use client'

import { useCart } from '@/hooks/useCart'
import { useOrderStore } from '@/stores/orderStore'
import { Button } from './Button'
import { Heading } from './Heading'
import { Text } from './Text'
import { formatPrice } from '@/utils/formatPrice'
import Link from 'next/link'

export const CartSummary = () => {
  const { items } = useCart()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 100 ? 0 : 10
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded text-center">
        <Heading level={3} className="mb-2">
          Your cart is empty
        </Heading>
        <Text className="text-gray-600 mb-6">
          Continue shopping to add items to your cart.
        </Text>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 p-6 rounded space-y-4">
      <Heading level={3}>Order Summary</Heading>

      <div className="space-y-2 border-b pb-4">
        <div className="flex justify-between text-sm">
          <Text>Subtotal</Text>
          <Text>{formatPrice(subtotal)}</Text>
        </div>
        <div className="flex justify-between text-sm">
          <Text>Shipping</Text>
          <Text>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</Text>
        </div>
      </div>

      <div className="flex justify-between font-semibold text-lg">
        <Text>Total</Text>
        <Text>{formatPrice(total)}</Text>
      </div>

      <Link href="/checkout">
        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  )
}
```

- [ ] **Step 5b: Build `/cart` page**

Create `src/app/cart/page.tsx`:

```typescript
'use client'

import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { CartSummary } from '@/components/CartSummary'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/formatPrice'
import Image from 'next/image'
import { useProducts } from '@/hooks/useProducts'
import { useMemo } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart()
  const { products } = useProducts()

  const cartWithDetails = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      })),
    [items, products]
  )

  return (
    <main>
      <Container>
        <div className="py-12">
          <Heading level={1} className="mb-8">
            Shopping Cart
          </Heading>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <Text className="text-gray-500 mb-4">Your cart is empty</Text>
                </div>
              ) : (
                cartWithDetails.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 border rounded p-4 bg-background"
                  >
                    {item.product && (
                      <>
                        <div className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold">{item.product.name}</p>
                          <p className="text-gray-600 text-sm">
                            {formatPrice(item.price)}
                          </p>

                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.productId, item.quantity - 1)
                                }
                                className="px-2 py-1 border rounded text-sm"
                              >
                                −
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.productId, item.quantity + 1)
                                }
                                className="px-2 py-1 border rounded text-sm"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.productId)}
                              className="text-red-600 text-sm hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="text-right font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
```

- [ ] **Step 5c: Commit**

```bash
git add src/app/cart/page.tsx src/components/CartSummary.tsx
git commit -m "feat: add cart page with item management"
```

---

### Task 6: Build `/checkout` Page

**Files:**
- Create: `src/app/checkout/page.tsx`
- Create: `src/components/CheckoutForm.tsx`

- [ ] **Step 6a: Create CheckoutForm component**

Create `src/components/CheckoutForm.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { ShippingAddress } from '@/types'
import { validateEmail, validatePostalCode } from '@/utils/validateEmail'
import { Button } from './Button'
import { Text } from './Text'
import { Heading } from './Heading'

interface CheckoutFormProps {
  onSubmit: (data: ShippingAddress, paymentMethod: 'card' | 'paypal') => void
  isLoading?: boolean
}

export const CheckoutForm = ({ onSubmit, isLoading }: CheckoutFormProps) => {
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'US',
  })
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!validatePostalCode(formData.postalCode, formData.country))
      newErrors.postalCode = 'Valid postal code is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData, paymentMethod)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shipping Address */}
      <div>
        <Heading level={3} className="mb-4">
          Shipping Address
        </Heading>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full px-3 py-2 border rounded ${
                errors.fullName ? 'border-red-500' : ''
              }`}
              placeholder="John Doe"
            />
            {errors.fullName && (
              <Text size="xs" className="text-red-600 mt-1">
                {errors.fullName}
              </Text>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3 py-2 border rounded ${
                errors.email ? 'border-red-500' : ''
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <Text size="xs" className="text-red-600 mt-1">
                {errors.email}
              </Text>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`w-full px-3 py-2 border rounded ${
                errors.address ? 'border-red-500' : ''
              }`}
              placeholder="123 Main St"
            />
            {errors.address && (
              <Text size="xs" className="text-red-600 mt-1">
                {errors.address}
              </Text>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold mb-1">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full px-3 py-2 border rounded ${
                errors.city ? 'border-red-500' : ''
              }`}
              placeholder="New York"
            />
            {errors.city && (
              <Text size="xs" className="text-red-600 mt-1">
                {errors.city}
              </Text>
            )}
          </div>

          {/* Postal Code & Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Postal Code</label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className={`w-full px-3 py-2 border rounded ${
                  errors.postalCode ? 'border-red-500' : ''
                }`}
                placeholder="10001"
              />
              {errors.postalCode && (
                <Text size="xs" className="text-red-600 mt-1">
                  {errors.postalCode}
                </Text>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Country</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <Heading level={3} className="mb-4">
          Payment Method
        </Heading>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'paypal')}
            />
            <Text>Credit Card</Text>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'paypal')}
            />
            <Text>PayPal</Text>
          </label>
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={isLoading} className="w-full" size="lg">
        {isLoading ? 'Processing...' : 'Place Order'}
      </Button>
    </form>
  )
}
```

- [ ] **Step 6b: Build `/checkout` page**

Create `src/app/checkout/page.tsx`:

```typescript
'use client'

import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { CheckoutForm } from '@/components/CheckoutForm'
import { CartSummary } from '@/components/CartSummary'
import { useCart } from '@/hooks/useCart'
import { useOrderStore } from '@/stores/orderStore'
import { ShippingAddress } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CheckoutPage() {
  const { items, checkout, setShippingAddress, clearCheckout } = useCart()
  const { placeOrder } = useOrderStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  if (items.length === 0) {
    return (
      <Container>
        <div className="py-12 text-center">
          <Heading level={2}>Your cart is empty</Heading>
        </div>
      </Container>
    )
  }

  const handleCheckoutSubmit = async (
    address: ShippingAddress,
    paymentMethod: 'card' | 'paypal'
  ) => {
    setIsLoading(true)
    try {
      setShippingAddress(address)

      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const shipping = subtotal >= 100 ? 0 : 10
      const total = subtotal + shipping

      placeOrder(items, total, address)

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      clearCheckout()
      router.push('/thank-you')
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Checkout failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main>
      <Container>
        <div className="py-12">
          <Heading level={1} className="mb-8">
            Checkout
          </Heading>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <CheckoutForm onSubmit={handleCheckoutSubmit} isLoading={isLoading} />
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <CartSummary />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
```

- [ ] **Step 6c: Commit**

```bash
git add src/app/checkout/page.tsx src/components/CheckoutForm.tsx
git commit -m "feat: add checkout page with shipping and payment form"
```

---

### Task 7: Build `/thank-you` Order Confirmation Page

**Files:**
- Create: `src/app/thank-you/page.tsx`
- Create: `src/components/OrderConfirmation.tsx`

- [ ] **Step 7a: Create OrderConfirmation component**

Create `src/components/OrderConfirmation.tsx`:

```typescript
import { Order } from '@/types'
import { Heading } from './Heading'
import { Text } from './Text'
import { formatPrice } from '@/utils/formatPrice'
import { Button } from './Button'
import Link from 'next/link'

interface OrderConfirmationProps {
  order: Order
}

export const OrderConfirmation = ({ order }: OrderConfirmationProps) => {
  return (
    <div className="text-center max-w-2xl mx-auto space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <Heading level={1}>Order Confirmed!</Heading>
      <Text className="text-gray-600">Thank you for your purchase.</Text>

      {/* Order Details */}
      <div className="bg-gray-50 p-6 rounded space-y-4">
        <div>
          <Text size="sm" className="text-gray-500">
            Order Number
          </Text>
          <p className="font-mono text-lg font-semibold">{order.id}</p>
        </div>

        <div className="border-t pt-4">
          <Text size="sm" className="text-gray-500 mb-2">
            Order Total
          </Text>
          <p className="text-2xl font-semibold">{formatPrice(order.total)}</p>
        </div>

        <div className="border-t pt-4">
          <Text size="sm" className="text-gray-500 mb-2">
            Shipping To
          </Text>
          <p className="text-sm">
            {order.shippingAddress.fullName}
            <br />
            {order.shippingAddress.address}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            <br />
            {order.shippingAddress.country}
          </p>
        </div>

        <div className="border-t pt-4">
          <Text size="sm" className="text-gray-500 mb-2">
            Estimated Delivery
          </Text>
          <p className="text-sm">
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            {' + 5-7 business days'}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/shop">
          <Button variant="secondary">Continue Shopping</Button>
        </Link>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 7b: Build `/thank-you` page**

Create `src/app/thank-you/page.tsx`:

```typescript
'use client'

import { Container } from '@/components/Container'
import { OrderConfirmation } from '@/components/OrderConfirmation'
import { useOrderStore } from '@/stores/orderStore'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Heading } from '@/components/Heading'

export default function ThankYouPage() {
  const { currentOrder } = useOrderStore()
  const router = useRouter()

  useEffect(() => {
    // Redirect to shop if no current order
    if (!currentOrder) {
      router.push('/shop')
    }
  }, [currentOrder, router])

  if (!currentOrder) {
    return null
  }

  return (
    <main>
      <Container>
        <div className="py-12">
          <OrderConfirmation order={currentOrder} />
        </div>
      </Container>
    </main>
  )
}
```

- [ ] **Step 7c: Commit**

```bash
git add src/app/thank-you/page.tsx src/components/OrderConfirmation.tsx
git commit -m "feat: add order confirmation page"
```

---

### Task 8: Build `/blog` Page

**Files:**
- Create: `src/app/blog/page.tsx`
- Create: `src/components/BlogCard.tsx`
- Create: `src/stores/blogStore.ts`

- [ ] **Step 8a: Create BlogCard component**

Create `src/components/BlogCard.tsx`:

```typescript
import { Text } from './Text'
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  image: string
  date: Date
  readTime: string
  category: string
}

export const BlogCard = ({
  slug,
  title,
  excerpt,
  image,
  date,
  readTime,
  category,
}: BlogCardProps) => {
  return (
    <Link href={`/blog/${slug}`}>
      <article className="group cursor-pointer">
        <div className="relative aspect-video bg-gray-100 rounded overflow-hidden mb-4">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition"
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-gray-500">
            {category}
          </span>
          <Text size="xs" className="text-gray-500">
            {readTime}
          </Text>
        </div>

        <h3 className="font-semibold text-lg mb-2 group-hover:underline">{title}</h3>

        <Text size="sm" className="text-gray-600 mb-3">
          {excerpt}
        </Text>

        <Text size="xs" className="text-gray-500">
          {date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
      </article>
    </Link>
  )
}
```

- [ ] **Step 8b: Create blog store**

Create `src/stores/blogStore.ts`:

```typescript
interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  date: Date
  readTime: string
  category: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'materials-guide',
    title: 'The Ultimate Guide to Premium Materials',
    excerpt: 'Learn what makes quality craftsmanship. We break down fabrics, leathers, and finishes.',
    content: 'Full article content here...',
    image: '/blog/materials.jpg',
    date: new Date('2026-05-08'),
    readTime: '5 min read',
    category: 'Guides',
  },
  {
    id: '2',
    slug: 'care-tips',
    title: 'How to Care for Your Parcel Products',
    excerpt: 'Extend the life of your items with these simple maintenance tips.',
    content: 'Full article content here...',
    image: '/blog/care.jpg',
    date: new Date('2026-05-01'),
    readTime: '4 min read',
    category: 'Care',
  },
  {
    id: '3',
    slug: 'sustainability',
    title: 'Our Commitment to Sustainable Production',
    excerpt: 'Discover how we balance quality with environmental responsibility.',
    content: 'Full article content here...',
    image: '/blog/sustainability.jpg',
    date: new Date('2026-04-24'),
    readTime: '6 min read',
    category: 'Sustainability',
  },
]

export const useBlogStore = () => ({
  posts: BLOG_POSTS,
  getPostBySlug: (slug: string) => BLOG_POSTS.find((p) => p.slug === slug),
  getRecentPosts: (limit = 3) => BLOG_POSTS.slice(0, limit),
})
```

- [ ] **Step 8c: Build `/blog` page**

Create `src/app/blog/page.tsx`:

```typescript
'use client'

import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { BlogCard } from '@/components/BlogCard'
import { Grid } from '@/components/Grid'
import { useBlogStore } from '@/stores/blogStore'

export default function BlogPage() {
  const { posts } = useBlogStore()

  return (
    <main>
      <Container>
        <div className="py-12">
          <Heading level={1} className="mb-8">
            Blog
          </Heading>

          <p className="text-gray-600 mb-12 max-w-2xl">
            Stories, guides, and insights from the Parcel community. Learn about
            materials, care, sustainability, and more.
          </p>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={{ base: 8, md: 10 }}>
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image}
                date={post.date}
                readTime={post.readTime}
                category={post.category}
              />
            ))}
          </Grid>
        </div>
      </Container>
    </main>
  )
}
```

- [ ] **Step 8d: Commit**

```bash
git add src/app/blog/page.tsx src/components/BlogCard.tsx src/stores/blogStore.ts
git commit -m "feat: add blog landing page"
```

---

### Task 9: Add 404 Fallback Page

**Files:**
- Create: `src/app/[...not-found]/page.tsx`

- [ ] **Step 9a: Create 404 page**

Create `src/app/[...not-found]/page.tsx`:

```typescript
'use client'

import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <main>
      <Container>
        <div className="py-24 text-center">
          <Heading level={1} className="text-5xl mb-4">
            404
          </Heading>
          <Heading level={2} className="mb-4">
            Page Not Found
          </Heading>
          <Text className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </Text>

          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
            <Link href="/shop">
              <Button variant="secondary">Browse Shop</Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}
```

- [ ] **Step 9b: Commit**

```bash
git add src/app/\[...not-found\]/page.tsx
git commit -m "feat: add 404 fallback page"
```

---

### Task 10: Update Navigation Header

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 10a: Update Header with shop/cart links**

Add navigation links to Header (if not already present):

```typescript
// In Header.tsx, ensure it includes:
<nav className="flex gap-6">
  <Link href="/">Home</Link>
  <Link href="/shop">Shop</Link>
  <Link href="/blog">Blog</Link>
  <Link href="/cart">Cart ({cartCount})</Link>
</nav>
```

- [ ] **Step 10b: Test all pages**

Run: `npm run dev`
Visit: `http://localhost:3000`

Test flow:
- Navigate to `/shop` — see product grid with filters
- Click a product — view `/shop/[slug]` detail page
- Add to cart — see cart count in header
- Click cart — view `/cart` page
- Click checkout — fill form on `/checkout`
- Submit — see order confirmation on `/thank-you`
- Visit `/blog` — see blog posts
- Try `/nonexistent` — see 404 page

Expected: All pages render, navigation works, cart persists

- [ ] **Step 10c: Final commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: update header navigation for full MVP"
```

---

## File Structure Summary

```
src/
├── app/
│   ├── page.tsx                  (✅ home)
│   ├── shop/
│   │   ├── page.tsx              (product grid + filters)
│   │   └── [slug]/
│   │       └── page.tsx          (product detail)
│   ├── cart/page.tsx             (shopping cart)
│   ├── checkout/page.tsx         (checkout form)
│   ├── blog/page.tsx             (blog landing)
│   ├── thank-you/page.tsx        (order confirmation)
│   ├── [..not-found]/page.tsx    (404 fallback)
│   ├── layout.tsx                (✅ existing)
│   └── globals.css               (✅ existing)
├── components/
│   ├── (Existing 12 components - reuse as-is)
│   ├── ProductFilter.tsx         (NEW)
│   ├── ProductGrid.tsx           (NEW)
│   ├── CartSummary.tsx           (NEW)
│   ├── CheckoutForm.tsx          (NEW)
│   ├── ReviewCard.tsx            (NEW)
│   ├── BlogCard.tsx              (NEW)
│   ├── OrderConfirmation.tsx     (NEW)
│   └── NotFound.tsx              (referenced in 404 page)
├── hooks/
│   ├── useCart.ts                (✅ existing)
│   ├── useProducts.ts            (✅ existing + extend with useProductBySlug)
│   ├── useTestimonials.ts        (✅ existing)
│   └── useCarousel.ts            (✅ existing)
├── stores/
│   ├── cartStore.ts              (✅ extend with checkout state)
│   ├── productStore.ts           (✅ extend with filters)
│   ├── orderStore.ts             (NEW)
│   ├── userStore.ts              (NEW)
│   ├── blogStore.ts              (NEW)
│   └── testimonialsStore.ts      (✅ existing)
├── types/
│   └── index.ts                  (extend with new types)
└── utils/
    ├── formatPrice.ts            (NEW)
    ├── calculateShipping.ts      (NEW)
    └── validateEmail.ts          (NEW)
```

---

## Execution Handoff

Plan complete and saved to [docs/superpowers/plans/2026-05-12-parcel-full-mvp.md](docs/superpowers/plans/2026-05-12-parcel-full-mvp.md).

**Two execution options:**

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — Execute all tasks in this session using the executing-plans agent, batch execution with checkpoints

Which approach would you prefer?