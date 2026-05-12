# Parcel - eCommerce Clone

A fully functional MVP eCommerce website clone built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Project Architecture

### Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Header
│   ├── page.tsx            # Homepage with sections
│   ├── globals.css         # Global styles
│   └── components/         # Page-specific components
├── components/             # Reusable UI components
│   ├── Button.tsx          # CTA button component
│   ├── Badge.tsx           # Badge/label component
│   ├── StarRating.tsx      # Star rating display
│   ├── ProductCard.tsx     # Individual product card
│   ├── Header.tsx          # Navigation header
│   ├── Container.tsx       # Layout wrapper
│   ├── Section.tsx         # Section wrapper
│   ├── Grid.tsx            # Grid layout
│   ├── Heading.tsx         # Heading typography
│   ├── Text.tsx            # Body text component
│   ├── TestimonialCard.tsx # Individual testimonial
│   ├── HeroSection.tsx     # Hero section component
│   ├── FeaturedProductsSection.tsx
│   └── TestimonialsSection.tsx
├── hooks/                  # Custom React hooks
│   ├── useCart.ts          # Cart state management
│   ├── useProducts.ts      # Products data fetching
│   ├── useTestimonials.ts  # Testimonials data fetching
│   └── useCarousel.ts      # Carousel/pagination logic
├── stores/                 # Data stores & state
│   ├── productStore.ts     # Product data & methods
│   ├── cartStore.ts        # Zustand cart store
│   └── testimonialsStore.ts # Testimonials data
├── types/
│   └── index.ts            # TypeScript interfaces
└── utils/                  # Utility functions
```

## Key Features

### 1. **Reusable Components**
All components are built with high reusability in mind:

- **Button**: Multi-variant button with link/onClick support
- **ProductCard**: Displays product with image, name, rating, price
- **TestimonialCard**: Shows testimonial with avatar, rating, content
- **Section/Container**: Layout wrapper components for consistency
- **Header**: Navigation with cart indicator
- **HeroSection**: Customizable hero banner
- **FeaturedProductsSection**: Product grid with header and CTA
- **TestimonialsSection**: Carousel testimonials with pagination

### 2. **Custom Hooks**
All state logic is encapsulated in hooks:

- **useCart()**: Manage shopping cart (add, remove, update quantity)
- **useProducts()**: Fetch and cache product data
- **useProductBySlug()**: Get single product by slug
- **useFeaturedProducts()**: Get featured/new products
- **useTestimonials()**: Fetch testimonials
- **useCarousel()**: Handle carousel/pagination state

### 3. **State Management**
- **Zustand** for persistent cart state (localStorage integration)
- **Mock data stores** for products and testimonials
- **React hooks** for component-level state

### 4. **Type Safety**
Full TypeScript support with interfaces for:
- `Product`: Product data structure
- `CartItem`: Product + quantity
- `Testimonial`: Customer review data
- `NavLink`: Navigation links

## Component Usage Examples

### ProductCard
```tsx
<ProductCard 
  product={product}
  showPrice={true}
  showRating={true}
  className="custom-class"
/>
```

### HeroSection
```tsx
<HeroSection
  title="Your headline"
  description="Optional description"
  ctaText="Button text"
  ctaHref="/destination"
  backgroundGradient="from-cyan-50 to-blue-50"
/>
```

### FeaturedProductsSection
```tsx
<FeaturedProductsSection
  products={products}
  title="Discover Products"
  subtitle="NEW STOCK • JUST IN"
  showViewAllButton={true}
  viewAllHref="/shop"
/>
```

### TestimonialsSection
```tsx
<TestimonialsSection
  testimonials={testimonials}
  title="What our customers say"
  itemsPerView={2}
/>
```

## Hooks Usage Examples

### useCart
```tsx
const { items, addToCart, removeFromCart, totalPrice } = useCart();

// Add to cart
addToCart(product, quantity);

// Remove from cart
removeFromCart(productId);

// Get totals
console.log(totalPrice); // Get total price
```

### useProducts
```tsx
const { allProducts } = useProducts();

// Or get featured
const featured = useFeaturedProducts();

// Or get by slug
const product = useProductBySlug('mosaic-puffer');
```

## Data Structures

### Product Interface
```ts
interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  rating?: number;
  category?: string;
  description?: string;
}
```

### CartItem Interface
```ts
interface CartItem extends Product {
  quantity: number;
}
```

### Testimonial Interface
```ts
interface Testimonial {
  id: string;
  author: string;
  rating: number;
  content: string;
  avatar?: string;
  image?: string;
}
```

## Mock Data

The project comes with mock data that can be easily replaced:

- **3 Featured Products**: Mosaic Puffer, Arden Runner, Classic Tote
- **3 Testimonials**: Charles M., Daniel M., Sarah K.
- All data is stored in `/src/stores/` files

## Getting Started

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## Styling

- **Tailwind CSS v4** for utility-first styling
- **Custom color scheme** with black, gray, cyan, and yellow
- **Responsive design** with mobile-first approach
- All components have responsive padding/gaps (sm/md/lg)

## Next Steps (For Future Development)

1. **Replace Mock Data**
   - Connect to real product database
   - Implement product API endpoints
   - Add dynamic filtering and sorting

2. **Add Shop Page**
   - Product listing with filtering
   - Category navigation
   - Search functionality

3. **Product Details Page**
   - Full product information
   - Image gallery
   - Add to cart functionality

4. **Cart Page**
   - Review cart items
   - Update quantities
   - Proceed to checkout

5. **Blog/Insider Edition**
   - Blog listing page
   - Individual article pages
   - Content management

6. **Authentication**
   - User signup/login
   - User profile
   - Order history

7. **Payment Integration**
   - Stripe/PayPal integration
   - Checkout flow
   - Order confirmation

## Asset Placeholders

Current image placeholders are at:
- `/public/products/*.jpg` - Product images
- `/public/avatars/*.jpg` - Customer avatars

Replace these with actual assets to see the full design.

## Component Reusability Features

All components are designed for maximum reusability:

- ✅ **Flexible Props**: Accept className, variants, optional props
- ✅ **Composition Over Inheritance**: Use React composition patterns
- ✅ **Single Responsibility**: Each component has one job
- ✅ **Consistent Props API**: Similar components use similar prop names
- ✅ **Default Values**: All optional props have sensible defaults
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Extensible Styling**: Tailwind utilities + custom classes
- ✅ **No Hard-coded Content**: All text is passed as props

## Performance Optimizations

- Next.js Image optimization (with alt text)
- Lazy loading for images
- Memoized data fetching (useMemo)
- Zustand for efficient state updates
- Tailwind CSS purging

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

**Status**: MVP Complete ✅  
**Next Phase**: Shop page & product filtering
