# Component Index

Quick reference guide for all reusable components in the Parcel project.

## UI Components

### Button
**File**: `src/components/Button.tsx`

Simple, flexible button component with multiple variants.

**Props**:
- `href?`: string - Link destination
- `onClick?`: () => void - Click handler
- `children`: ReactNode - Button content
- `variant?`: 'primary' | 'secondary' | 'ghost' - Button style
- `className?`: string - Additional CSS classes
- `disabled?`: boolean - Disable button
- `external?`: boolean - Open link in new tab

**Variants**:
- `primary`: Black background, white text (default)
- `secondary`: Gray background, black text
- `ghost`: Transparent with black border

**Example**:
```tsx
<Button href="/shop" variant="primary">
  Find my style
</Button>
```

---

### Badge
**File**: `src/components/Badge.tsx`

Label component for highlighting text.

**Props**:
- `label`: string - Badge text
- `variant?`: 'primary' | 'secondary' | 'accent' - Badge style
- `className?`: string - Additional CSS classes

**Variants**:
- `primary`: Black background, white text
- `secondary`: Gray background, black text
- `accent`: Cyan background, dark cyan text

**Example**:
```tsx
<Badge label="NEW STOCK • JUST IN" variant="secondary" />
```

---

### StarRating
**File**: `src/components/StarRating.tsx`

Display star ratings.

**Props**:
- `rating`: number - Number of filled stars
- `maxRating?`: number - Total number of stars (default: 5)
- `size?`: 'sm' | 'md' | 'lg' - Star size
- `className?`: string - Additional CSS classes

**Example**:
```tsx
<StarRating rating={5} size="md" />
```

---

### Heading
**File**: `src/components/Heading.tsx`

Semantic heading component with built-in styling.

**Props**:
- `level?`: 1-6 - Heading level (h1-h6)
- `children`: ReactNode - Heading content
- `className?`: string - Additional CSS classes
- `highlight?`: boolean - Apply emphasis styling

**Example**:
```tsx
<Heading level={2} highlight={true}>
  Discover vintage designer
</Heading>
```

---

### Text
**File**: `src/components/Text.tsx`

Flexible text/paragraph component.

**Props**:
- `children`: ReactNode - Text content
- `variant?`: 'body' | 'small' | 'large' | 'label' - Text size
- `className?`: string - Additional CSS classes
- `highlight?`: boolean - Apply emphasis (font-weight)

**Variants**:
- `body`: Base text size
- `small`: Smaller text
- `large`: Larger text
- `label`: Uppercase label styling

**Example**:
```tsx
<Text variant="label">ALWAYS AUTHENTICATED</Text>
```

---

## Layout Components

### Container
**File**: `src/components/Container.tsx`

Wrapper component for consistent max-width and centering.

**Props**:
- `children`: ReactNode - Content
- `variant?`: 'full' | 'wide' | 'default' - Width variant
- `className?`: string - Additional CSS classes

**Variants**:
- `full`: Full width
- `wide`: Max 6xl
- `default`: Max 7xl (default)

**Example**:
```tsx
<Container variant="default">
  {/* Content */}
</Container>
```

---

### Section
**File**: `src/components/Section.tsx`

Full-width section wrapper with vertical padding.

**Props**:
- `children`: ReactNode - Section content
- `className?`: string - Additional CSS classes (for bg color, etc)
- `id?`: string - Section ID

**Example**:
```tsx
<Section className="bg-background">
  {/* Content */}
</Section>
```

---

### Grid
**File**: `src/components/Grid.tsx`

Responsive grid layout.

**Props**:
- `children`: ReactNode - Grid items
- `columns?`: number - Number of columns (default: 3)
- `gap?`: 'sm' | 'md' | 'lg' - Gap size (default: 'md')
- `className?`: string - Additional CSS classes

**Example**:
```tsx
<Grid columns={3} gap="lg">
  {/* Grid items */}
</Grid>
```

---

## Feature Components

### Header
**File**: `src/components/Header.tsx`

Navigation header with logo, links, and cart indicator.

**Props**:
- `showCart?`: boolean - Show cart icon

**Features**:
- Logo link to home
- Navigation links (Shop, Insider Edition)
- Cart icon with item count badge
- Responsive design

**Example**:
```tsx
<Header showCart={true} />
```

---

### ProductCard
**File**: `src/components/ProductCard.tsx`

Individual product card with image, name, rating, and price.

**Props**:
- `product`: Product - Product data
- `showPrice?`: boolean - Show price (default: true)
- `showRating?`: boolean - Show star rating (default: true)
- `className?`: string - Additional CSS classes
- `imageClassName?`: string - Image container CSS classes

**Example**:
```tsx
<ProductCard 
  product={product}
  showPrice={true}
  showRating={true}
/>
```

---

### TestimonialCard
**File**: `src/components/TestimonialCard.tsx`

Individual testimonial with avatar, author, rating, and content.

**Props**:
- `testimonial`: Testimonial - Testimonial data
- `className?`: string - Additional CSS classes

**Example**:
```tsx
<TestimonialCard testimonial={testimonial} />
```

---

## Section Components

### HeroSection
**File**: `src/components/HeroSection.tsx`

Large hero banner with headline and CTA.

**Props**:
- `title`: string - Main headline
- `description?`: string - Optional description text
- `ctaText?`: string - Button text (default: 'Find my style')
- `ctaHref?`: string - Button link (default: '/shop')
- `backgroundImage?`: string - Hero background image
- `backgroundGradient?`: string - Tailwind gradient class

**Example**:
```tsx
<HeroSection
  title="The ultimate refurbished designer retailer"
  ctaText="Find my style"
  ctaHref="/shop"
  backgroundGradient="from-cyan-50 to-blue-50"
/>
```

---

### FeaturedProductsSection
**File**: `src/components/FeaturedProductsSection.tsx`

Product grid section with header and optional "View All" button.

**Props**:
- `products`: Product[] - Array of products
- `title`: string - Section title
- `subtitle?`: string - Optional label (e.g., "NEW STOCK • JUST IN")
- `showViewAllButton?`: boolean - Show view all link (default: true)
- `viewAllHref?`: string - Link destination (default: '/shop')

**Example**:
```tsx
<FeaturedProductsSection
  products={featuredProducts}
  title="Discover vintage designer"
  subtitle="NEW STOCK • JUST IN"
  showViewAllButton={true}
  viewAllHref="/shop"
/>
```

---

### TestimonialsSection
**File**: `src/components/TestimonialsSection.tsx`

Carousel testimonials with pagination and auto-rotation.

**Props**:
- `testimonials`: Testimonial[] - Array of testimonials
- `title`: string - Section title
- `itemsPerView?`: number - Items per page (default: 2)

**Features**:
- 5-second auto-rotation
- Manual pagination dots
- Previous/Next buttons
- Responsive grid (1 col on mobile, 2 on desktop)

**Example**:
```tsx
<TestimonialsSection
  testimonials={testimonials}
  title="What the family has to say"
  itemsPerView={2}
/>
```

---

## Usage Guidelines

### Do's ✅
- Compose components together for complex layouts
- Use `className` prop for overrides
- Pass all content as props (no hard-coded text)
- Use TypeScript for type safety
- Memoize expensive data operations

### Don'ts ❌
- Don't hard-code styling into component logic
- Don't create wrapper components when `className` works
- Don't ignore TypeScript warnings
- Don't pass too many props (consider composition)
- Don't use inline styles (use Tailwind utilities)

---

## Common Patterns

### Creating a New Section
```tsx
<Section className="bg-gray-50">
  <Container>
    <Heading level={2}>Section Title</Heading>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Content */}
    </div>
  </Container>
</Section>
```

### Creating a Grid of Cards
```tsx
<Grid columns={3} gap="lg">
  {items.map(item => (
    <ProductCard key={item.id} product={item} />
  ))}
</Grid>
```

### Building a Hero
```tsx
<HeroSection
  title="Your Headline"
  description="Optional description"
  ctaText="CTA Button"
  ctaHref="/destination"
/>
```
