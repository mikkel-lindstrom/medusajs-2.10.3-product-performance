# Sheet Product Generator Utilities

This utility helps generate realistic sheet products with various options and variants for Medusa.js e-commerce stores. Perfect for testing, development, and seeding your store with products.

## Features

- ✅ **Flexible Product Generation**: Generate any number of products with customizable variants
- ✅ **Realistic Sheet Options**: Size, Color, and Height options that make sense for bedding
- ✅ **Multiple Sheet Types**: Egyptian Cotton, Bamboo, Linen, Percale, Sateen, Jersey, Flannel, etc.
- ✅ **Smart Variant Generation**: Automatically creates logical combinations of options
- ✅ **Customizable Pricing**: Set price ranges and multiple currencies
- ✅ **TypeScript Support**: Full type safety with proper interfaces
- ✅ **Performance Friendly**: Optimized for large-scale product generation

## Quick Start

### Basic Usage

```typescript
import { generateSheetProducts } from "./product-generator";

const products = generateSheetProducts(
  {
    numProducts: 10, // Generate 10 different sheet products
    variantsPerProduct: 8, // Each product has 8 variants
  },
  categoryResult, // Your Medusa categories
  shippingProfile, // Your shipping profile
  defaultSalesChannel // Your sales channel
);

// Use with Medusa workflow
await createProductsWorkflow(container).run({
  input: { products },
});
```

### Advanced Usage with Custom Pricing

```typescript
const premiumProducts = generateSheetProducts(
  {
    numProducts: 5,
    variantsPerProduct: 16,
    priceRange: { min: 50, max: 200 }, // Premium pricing
    currencies: ["eur", "usd", "gbp"], // Multiple currencies
  },
  categoryResult,
  shippingProfile,
  defaultSalesChannel
);
```

## Product Options

### Sizes Available

**Comprehensive size range for performance testing:**

- **Widths:** 70cm to 220cm (increments of 10cm) = 16 options
- **Lengths:** 180cm to 240cm (increments of 10cm) = 7 options
- **Total size combinations:** 112 different sizes
- **Examples:** `70x180`, `140x200`, `180x220`, `220x240`

### Colors Available

**50 different colors for maximum variant combinations:**

- **Basic:** White, Cream, Ivory, Pearl, Beige, Taupe, Black
- **Blues:** Light Blue, Navy, Royal Blue, Sky Blue, Teal, Aqua, Turquoise
- **Greens:** Sage Green, Forest Green, Olive, Mint Green, Seafoam, Jade, Emerald
- **Warm tones:** Soft Pink, Rose Gold, Blush, Coral, Peach, Apricot
- **Earth tones:** Charcoal, Stone Gray, Mocha, Espresso, Rust, Terracotta
- **Rich colors:** Burgundy, Wine, Plum, Eggplant, Violet, Lavender
- **And many more...**

### Heights Available

**12 different mattress heights (20cm to 50cm):**

- `20cm`, `22cm` - Ultra low & very low
- `25cm`, `27cm` - Standard & medium low
- `30cm`, `32cm` - Deep & medium deep
- `35cm`, `37cm` - Extra deep & very deep
- `40cm`, `42cm` - Super deep & ultra deep
- `45cm`, `50cm` - Maximum & oversized

### Sheet Types

- Egyptian Cotton, Bamboo, Linen, Percale
- Sateen, Jersey, Flannel, Microfiber
- Silk, Organic Cotton, Tencel, Hemp

## API Reference

### `generateSheetProducts(options, categoryResult, shippingProfile, defaultSalesChannel)`

Generates a list of sheet products with random variant combinations.

**Parameters:**

- `options: ProductGeneratorOptions` - Configuration object
- `categoryResult: any[]` - Array of Medusa categories
- `shippingProfile: any` - Medusa shipping profile object
- `defaultSalesChannel: any[]` - Array of Medusa sales channels

**Returns:** `GeneratedProduct[]` - Array of products ready for Medusa

### `ProductGeneratorOptions`

```typescript
interface ProductGeneratorOptions {
  numProducts: number; // Number of products to generate
  variantsPerProduct: number; // Number of variants per product
  priceRange?: {
    // Optional price range
    min: number;
    max: number;
  };
  currencies?: string[]; // Optional currency codes
}
```

### `generateSheetProductsWithSpecificCombinations(productConfigs, ...)`

For more control over exact variants created.

**Parameters:**

- `productConfigs: Array<ProductConfig>` - Specific product configurations
- Other parameters same as above

```typescript
interface ProductConfig {
  sheetType: string;
  combinations: SheetVariantCombination[];
  customTitle?: string;
  customDescription?: string;
}
```

## Examples

### 1. Performance Testing Products

```typescript
// Generate products of different complexities for testing
const performanceProducts = generateSheetProducts(
  {
    numProducts: 100,
    variantsPerProduct: 24,
    priceRange: { min: 20, max: 120 },
  },
  categoryResult,
  shippingProfile,
  defaultSalesChannel
);
```

### 2. Specific Product Collections

```typescript
import { generateSheetProductsWithSpecificCombinations } from "./product-generator";

const luxuryCollection = generateSheetProductsWithSpecificCombinations(
  [
    {
      sheetType: "Egyptian Cotton",
      combinations: [
        { Size: "180x200", Color: "White", Height: "40cm" },
        { Size: "200x200", Color: "Cream", Height: "40cm" },
      ],
      customTitle: "Luxury Egyptian Cotton Collection",
      customDescription:
        "Premium long-staple cotton sheets for ultimate luxury.",
    },
  ],
  categoryResult,
  shippingProfile,
  defaultSalesChannel
);
```

### 3. Budget-Friendly Products

```typescript
const budgetProducts = generateSheetProducts(
  {
    numProducts: 20,
    variantsPerProduct: 4,
    priceRange: { min: 15, max: 35 },
    currencies: ["eur", "usd"],
  },
  categoryResult,
  shippingProfile,
  defaultSalesChannel
);
```

## Integration with Seed Scripts

Add to your `seed.ts` file:

```typescript
import { generateSheetProducts } from "./product-generator";

export default async function seedDemoData({ container }: ExecArgs) {
  // ... existing seed code ...

  // Add sheet products
  logger.info("Generating sheet products...");
  const sheetProducts = generateSheetProducts(
    { numProducts: 10, variantsPerProduct: 8 },
    categoryResult,
    shippingProfile,
    defaultSalesChannel
  );

  await createProductsWorkflow(container).run({
    input: { products: sheetProducts },
  });

  logger.info("Finished seeding sheet products.");
}
```

## Tips

1. **Start Small**: Begin with fewer products/variants to test the integration
2. **Price Ranges**: Adjust price ranges based on your target market
3. **Inventory**: Remember to create inventory levels for generated products
4. **Images**: Replace placeholder image URLs with your actual product images
5. **Categories**: Ensure you have appropriate categories (e.g., "Sheets", "Bedding")

## Performance Testing Capabilities

### 🚀 Large-Scale Variant Generation

- **Maximum variants per product:** 1,000+ (up to 67,200 unique combinations)
- **Total possible combinations:** 112 sizes × 50 colors × 12 heights = 67,200
- **Perfect for performance testing** Medusa's handling of products with many variants

### 📊 Test Scenarios Available

```typescript
// Performance test with varying scales
const performanceProducts = generatePerformanceTestProducts(
  categoryResult,
  shippingProfile,
  defaultSalesChannel
);
// Creates products with 50, 250, 500, 750, and 1000 variants

// Single mega product
const megaProduct = generateSheetProducts(
  {
    numProducts: 1,
    variantsPerProduct: 1000, // Uses 1000 unique combinations
  },
  categoryResult,
  shippingProfile,
  defaultSalesChannel
);
```

### 🎯 Recommended Usage

- **Small test:** 10-50 variants per product
- **Medium test:** 100-500 variants per product
- **Large test:** 500-1000 variants per product
- **Stress test:** 1000+ variants per product

## Performance Considerations

- **Generation Speed**: ~500-1000 variants/second on modern hardware
- **Memory Usage**: Each variant uses ~2-5KB memory during generation
- **Database Impact**: Large variant counts may slow database operations
- **Frontend Performance**: Consider pagination for products with 100+ variants
- **API Response Time**: Monitor response times with large variant datasets

## Error Handling

The utility includes fallbacks for:

- Missing categories (falls back to first available category)
- Invalid parameters (sensible defaults applied)
- Empty results (returns empty array)

## File Structure

```
src/scripts/
├── product-generator.ts    # Core utility functions
├── sheet-examples.ts       # Usage examples
├── seed.ts                # Your main seed file
└── PRODUCT-GENERATOR.md   # This documentation
```

## Contributing

Feel free to extend the utility with:

- Additional sheet types
- More color options
- Different size standards (US, EU, UK)
- Custom material properties
- Brand-specific configurations
