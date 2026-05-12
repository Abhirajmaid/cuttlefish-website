# Custom Hooks Reference

Complete guide to all custom hooks in the Parcel project.

## Cart Hooks

### useCart()
**File**: `src/hooks/useCart.ts`

Main hook for managing shopping cart state and operations.

**Returns**:
```ts
{
  items: CartItem[];              // Array of items in cart
  addToCart: (product, quantity?) => void;
  removeFromCart: (productId) => void;
  updateItemQuantity: (productId, quantity) => void;
  clearCart: () => void;
  totalItems: number;             // Total quantity of items
  totalPrice: number;             // Total price of all items
}
```

**Example**:
```tsx
'use client';
import { useCart } from '@/hooks/useCart';

export function ShoppingCart() {
  const { items, addToCart, totalPrice, removeFromCart } = useCart();

  return (
    <div>
      <h2>Cart Items: {items.length}</h2>
      <p>Total: ${totalPrice}</p>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

---

## Product Hooks

### useProducts()
**File**: `src/hooks/useProducts.ts`

Fetch all products with memoization.

**Returns**:
```ts
{
  allProducts: Product[];
}
```

**Example**:
```tsx
'use client';
import { useProducts } from '@/hooks/useProducts';

export function AllProducts() {
  const { allProducts } = useProducts();

  return (
    <div>
      {allProducts.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

---

### useProductBySlug()
**File**: `src/hooks/useProducts.ts`

Get a single product by its slug (URL-friendly identifier).

**Parameters**:
- `slug`: string - Product slug (e.g., 'mosaic-puffer')

**Returns**:
- `Product | undefined`

**Example**:
```tsx
'use client';
import { useProductBySlug } from '@/hooks/useProducts';

export function ProductDetail({ slug }: { slug: string }) {
  const product = useProductBySlug(slug);

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
```

---

### useFeaturedProducts()
**File**: `src/hooks/useProducts.ts`

Get featured/new products for homepage.

**Returns**:
- `Product[]` - Array of featured products

**Example**:
```tsx
'use client';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';

export function FeaturedProducts() {
  const featured = useFeaturedProducts();

  return (
    <div className="grid grid-cols-3 gap-8">
      {featured.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## Testimonial Hooks

### useTestimonials()
**File**: `src/hooks/useTestimonials.ts`

Fetch all testimonials with memoization.

**Returns**:
- `Testimonial[]` - Array of testimonials

**Example**:
```tsx
'use client';
import { useTestimonials } from '@/hooks/useTestimonials';
import { TestimonialCard } from '@/components/TestimonialCard';

export function Testimonials() {
  const testimonials = useTestimonials();

  return (
    <div className="grid grid-cols-2 gap-8">
      {testimonials.map(testimonial => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
}
```

---

### useTestimonialById()
**File**: `src/hooks/useTestimonials.ts`

Get a single testimonial by ID.

**Parameters**:
- `id`: string - Testimonial ID

**Returns**:
- `Testimonial | undefined`

**Example**:
```tsx
'use client';
import { useTestimonialById } from '@/hooks/useTestimonials';

export function TestimonialDetail({ id }: { id: string }) {
  const testimonial = useTestimonialById(id);

  if (!testimonial) return <div>Testimonial not found</div>;

  return <TestimonialCard testimonial={testimonial} />;
}
```

---

## UI State Hooks

### useCarousel()
**File**: `src/hooks/useCarousel.ts`

Manage carousel/pagination state and navigation.

**Parameters**:
- `itemCount`: number - Total number of items
- `autoPlayInterval?`: number - Auto-play interval in ms (default: 5000)

**Returns**:
```ts
{
  current: number;              // Current slide index
  next: () => void;             // Go to next slide
  prev: () => void;             // Go to previous slide
  goTo: (index: number) => void; // Go to specific slide
  itemCount: number;            // Total items
}
```

**Example**:
```tsx
'use client';
import { useCarousel } from '@/hooks/useCarousel';

export function ImageCarousel({ images }: { images: string[] }) {
  const { current, next, prev, goTo, itemCount } = useCarousel(images.length);

  return (
    <div>
      <img src={images[current]} alt="carousel" />
      
      <button onClick={prev}>← Previous</button>
      <button onClick={next}>Next →</button>
      
      <div className="dots">
        {Array.from({ length: itemCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={i === current ? 'active' : ''}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## Hook Patterns

### Pattern 1: Using Multiple Hooks Together
```tsx
'use client';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';

export function ProductListing() {
  const { allProducts } = useFeaturedProducts();
  const { addToCart } = useCart();

  return (
    <div>
      {allProducts.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <button onClick={() => addToCart(product, 1)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Pattern 2: Conditional Rendering Based on Data
```tsx
'use client';
import { useProductBySlug } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';

export function ProductDetail({ slug }: { slug: string }) {
  const product = useProductBySlug(slug);
  const { addToCart } = useCart();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <button onClick={() => addToCart(product, 1)}>
        Add to Cart - ${product.price}
      </button>
    </div>
  );
}
```

### Pattern 3: Carousel with Dynamic Data
```tsx
'use client';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useCarousel } from '@/hooks/useCarousel';

export function TestimonialCarousel() {
  const testimonials = useTestimonials();
  const { current, next, prev } = useCarousel(testimonials.length);

  return (
    <div>
      <p>{testimonials[current].content}</p>
      <p>— {testimonials[current].author}</p>
      
      <button onClick={prev}>Previous</button>
      <button onClick={next}>Next</button>
    </div>
  );
}
```

---

## Performance Considerations

### Memoization
All data-fetching hooks use `useMemo` for performance:
- Data is only recalculated when dependencies change
- Perfect for static/mock data
- Ready for API integration

### State Persistence
The `useCart` hook uses Zustand with localStorage:
- Cart persists across page refreshes
- Automatic sync across browser tabs
- No prop drilling needed

### Guidelines
- ✅ Use hooks at the top level of components
- ✅ Follow the "Rule of Hooks" (don't call in loops/conditions)
- ✅ Use client components (`'use client'`) when using these hooks
- ❌ Don't call hooks conditionally
- ❌ Don't create new hook instances in loops

---

## Creating New Hooks

### Template for Data-Fetching Hook
```tsx
'use client';
import { useMemo } from 'react';

export const useMyData = () => {
  const data = useMemo(() => {
    // Expensive computation here
    return fetchOrCompute();
  }, []);
  
  return data;
};
```

### Template for State Management Hook
```tsx
'use client';
import { useCallback } from 'react';
import { useMyStore } from '@/stores/myStore';

export const useMyState = () => {
  const items = useMyStore((state) => state.items);
  const addItem = useMyStore((state) => state.addItem);
  
  const handleAdd = useCallback((item) => {
    addItem(item);
  }, [addItem]);
  
  return { items, handleAdd };
};
```

---

## Testing Hooks

### Example Test
```tsx
import { renderHook, act } from '@testing-library/react';
import { useCart } from '@/hooks/useCart';

test('should add item to cart', () => {
  const { result } = renderHook(() => useCart());
  
  act(() => {
    result.current.addToCart(mockProduct, 1);
  });
  
  expect(result.current.items).toHaveLength(1);
  expect(result.current.totalPrice).toBe(100);
});
```

---

## API Integration

### Converting Mock Hooks to API Calls

**Current (Mock)**:
```tsx
export const useProducts = () => {
  const allProducts = useMemo(() => getAllProducts(), []);
  return { allProducts };
};
```

**With API**:
```tsx
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(setProducts);
  }, []);
  
  return { allProducts: products };
};
```

---

## Debugging Hooks

### Enable Logging
```tsx
export const useCart = () => {
  const items = useCartStore((state) => state.items);
  
  useEffect(() => {
    console.log('Cart items:', items);
  }, [items]);
  
  return { items };
};
```

### React DevTools Profiler
- Install React DevTools browser extension
- Use Profiler tab to measure component performance
- Identify unnecessary re-renders
