import { ProductStatus } from "@medusajs/framework/utils";
import { generateRandomString } from "./random-string-generator";

// Random string utilities are now imported from separate file

export interface ProductGeneratorOptions {
  numProducts: number;
  handleId: number;

  variantsPerProduct: number;
  priceRange?: {
    min: number;
    max: number;
  };
  currencies?: string[];
}

export interface SheetVariantCombination extends Record<string, string> {
  Size: string;
  Color: string;
  Height: string;
}

export interface GeneratedProduct {
  title: string;
  category_ids: string[];
  description: string;
  handle: string;
  weight: number;
  status: typeof ProductStatus.PUBLISHED;
  shipping_profile_id: string;
  images: Array<{ url: string }>;
  options: Array<{ title: string; values: string[] }>;
  variants: Array<{
    title: string;
    sku: string;
    options: SheetVariantCombination;
    prices: Array<{
      amount: number;
      currency_code: string;
    }>;
  }>;
  sales_channels: Array<{ id: string }>;
}

/**
 * Generates a list of sheet products with customizable variants
 *
 * @param options Configuration for product generation
 * @param categoryResult Array of categories from Medusa
 * @param shippingProfile Shipping profile object
 * @param defaultSalesChannel Array of sales channels
 * @returns Array of product objects ready for Medusa createProductsWorkflow
 *
 * @example
 * ```typescript
 * const products = generateSheetProducts(
 *   {
 *     numProducts: 10,
 *     variantsPerProduct: 8,
 *     priceRange: { min: 30, max: 100 },
 *     currencies: ["eur", "usd", "gbp"]
 *   },
 *   categoryResult,
 *   shippingProfile,
 *   defaultSalesChannel
 * );
 *
 * await createProductsWorkflow(container).run({
 *   input: { products }
 * });
 * ```
 */
export function generateSheetProducts(
  options: ProductGeneratorOptions,
  categoryResult: any[],
  shippingProfile: any,
  defaultSalesChannel: any[]
): GeneratedProduct[] {
  const {
    numProducts,
    variantsPerProduct,
    priceRange = { min: 20, max: 80 },
    currencies = ["eur", "usd"],
  } = options;

  // Generate comprehensive size options: width 70-220 (increments of 10), length 180-240 (increments of 10)
  const sizes: string[] = [];
  for (let width = 70; width <= 220; width += 10) {
    for (let length = 180; length <= 240; length += 10) {
      sizes.push(`${width}x${length}`);
    }
  }

  const colors = [
    "White",
    "Cream",
    "Light Blue",
    "Sage Green",
    "Soft Pink",
    "Charcoal",
    "Navy",
    "Burgundy",
    "Lavender",
    "Mint Green",
    "Dusty Rose",
    "Stone Gray",
    "Ivory",
    "Pearl",
    "Silver",
    "Platinum",
    "Champagne",
    "Beige",
    "Taupe",
    "Mocha",
    "Espresso",
    "Black",
    "Midnight Blue",
    "Royal Blue",
    "Teal",
    "Forest Green",
    "Olive",
    "Rose Gold",
    "Blush",
    "Coral",
    "Peach",
    "Apricot",
    "Sunshine",
    "Golden",
    "Amber",
    "Rust",
    "Terracotta",
    "Brick Red",
    "Wine",
    "Plum",
    "Eggplant",
    "Violet",
    "Lilac",
    "Periwinkle",
    "Sky Blue",
    "Aqua",
    "Turquoise",
    "Seafoam",
    "Jade",
    "Emerald",
  ];

  const heights = [
    "20cm", // Ultra Low
    "22cm", // Very Low
    "25cm", // Standard
    "27cm", // Medium Low
    "30cm", // Deep
    "32cm", // Medium Deep
    "35cm", // Extra Deep
    "37cm", // Very Deep
    "40cm", // Super Deep
    "42cm", // Ultra Deep
    "45cm", // Maximum
    "50cm", // Oversized
  ];

  // Sheet types for variety
  const sheetTypes = [
    "Egyptian Cotton",
    "Bamboo",
    "Linen",
    "Percale",
    "Sateen",
    "Jersey",
    "Flannel",
    "Microfiber",
    "Silk",
    "Organic Cotton",
    "Tencel",
    "Hemp",
  ];

  // Descriptions for different sheet types
  const sheetDescriptions: Record<string, string> = {
    "Egyptian Cotton":
      "Premium Egyptian cotton bed sheet set. Experience luxury and comfort with our long-staple cotton sheets, known for their exceptional softness and durability.",
    Bamboo:
      "Eco-friendly bamboo bed sheet set. Naturally antibacterial and moisture-wicking, perfect for sensitive skin and temperature regulation.",
    Linen:
      "100% pure linen bed sheet set. Breathable and naturally textured, offering a relaxed, lived-in luxury that gets softer with every wash.",
    Percale:
      "Crisp percale weave bed sheet set. Cool and breathable with a hotel-like feel, perfect for warm sleepers who prefer a crisp finish.",
    Sateen:
      "Silky sateen weave bed sheet set. Lustrous and smooth with a subtle sheen, offering a luxurious drape and elegant appearance.",
    Jersey:
      "Soft jersey knit bed sheet set. Stretchy and cozy like your favorite t-shirt, providing ultimate comfort and easy care.",
    Flannel:
      "Cozy flannel bed sheet set. Brushed for extra warmth and softness, perfect for cooler months and creating a warm, inviting bed.",
    Microfiber:
      "Ultra-soft microfiber bed sheet set. Wrinkle-resistant and easy-care, offering comfort and convenience at an affordable price.",
    Silk: "Luxurious mulberry silk bed sheet set. Temperature-regulating and hypoallergenic, providing the ultimate in luxury bedding.",
    "Organic Cotton":
      "Certified organic cotton bed sheet set. Grown without harmful chemicals, offering pure comfort that's gentle on you and the environment.",
    Tencel:
      "Sustainable Tencel bed sheet set. Made from eucalyptus fibers, naturally cooling and moisture-wicking with a silky-smooth feel.",
    Hemp: "Durable hemp bed sheet set. Naturally antimicrobial and environmentally friendly, becoming softer and more comfortable over time.",
  };

  const products: GeneratedProduct[] = [];

  // Calculate total possible combinations for logging
  const totalPossibleCombinations =
    sizes.length * colors.length * heights.length;
  console.log(
    `📊 Total possible combinations: ${totalPossibleCombinations.toLocaleString()}`
  );
  console.log(
    `📐 Sizes: ${sizes.length} (${sizes[0]} to ${sizes[sizes.length - 1]})`
  );
  console.log(`🎨 Colors: ${colors.length}`);
  console.log(
    `📏 Heights: ${heights.length} (${heights[0]} to ${
      heights[heights.length - 1]
    })`
  );

  for (let i = 0; i < numProducts; i++) {
    const sheetType = sheetTypes[i % sheetTypes.length];
    const productNumber = i + 1;

    // Generate all possible combinations
    const allCombinations: SheetVariantCombination[] = [];
    for (const size of sizes) {
      for (const color of colors) {
        for (const height of heights) {
          allCombinations.push({ Size: size, Color: color, Height: height });
        }
      }
    }

    // For large variant counts, ensure we can get up to 1000+ unique combinations
    const maxVariants = Math.min(variantsPerProduct, allCombinations.length);

    // Shuffle and take the required number of variants
    const shuffledCombinations = allCombinations
      .sort(() => Math.random() - 0.5)
      .slice(0, maxVariants);

    console.log(
      `🛏️  Product ${productNumber} (${sheetType}): ${shuffledCombinations.length} variants`
    );

    // Generate variants
    const variants = shuffledCombinations.map((combination) => {
      // Generate a random string for SKU uniqueness (8 characters, alphanumeric)
      const randomSuffix = generateRandomString(8, true, true, true);

      const variantSku = `SHEET-${sheetType
        .replace(/\s+/g, "")
        .toUpperCase()}-${combination.Size.replace(
        "x",
        "X"
      )}-${combination.Color.replace(
        /\s+/g,
        ""
      ).toUpperCase()}-${combination.Height.replace(
        "cm",
        "CM"
      )}-${randomSuffix}`;

      // Generate random prices within the specified range
      const prices = currencies.map((currency) => ({
        amount: Math.floor(
          Math.random() * (priceRange.max - priceRange.min) + priceRange.min
        ),
        currency_code: currency,
      }));

      return {
        title: `${combination.Size} / ${combination.Color} / ${combination.Height}`,
        sku: variantSku,
        options: combination,
        prices,
      };
    });

    // Get unique values for each option from selected variants
    const uniqueSizes = [...new Set(shuffledCombinations.map((c) => c.Size))];
    const uniqueColors = [...new Set(shuffledCombinations.map((c) => c.Color))];
    const uniqueHeights = [
      ...new Set(shuffledCombinations.map((c) => c.Height)),
    ];

    // Find the sheets category, fallback to first category if not found
    const categoryId =
      categoryResult.find((cat) => cat.name === "Sheets")?.id ||
      categoryResult.find((cat) => cat.name === "Bedding")?.id ||
      categoryResult[0]?.id;

    const product: GeneratedProduct = {
      title: `${sheetType} Bed Sheet Set ${productNumber}`,
      category_ids: categoryId ? [categoryId] : [],
      description:
        sheetDescriptions[sheetType] ||
        `Premium ${sheetType.toLowerCase()} bed sheet set. Experience luxury and comfort with our high-quality ${sheetType.toLowerCase()} sheets, designed for the perfect night's sleep.`,
      handle: `${sheetType
        .toLowerCase()
        .replace(/\s+/g, "-")}-sheet-set-${productNumber}-${options.handleId}`,
      weight: Math.floor(Math.random() * 400 + 600), // Random weight between 600-1000g
      status: ProductStatus.PUBLISHED,
      shipping_profile_id: shippingProfile.id,
      images: [
        {
          url: `https://res.cloudinary.com/do9lggzv1/image/fetch/c_limit,w_3840/f_auto/q_auto/v1/https://sadrlmedusaprod.blob.core.windows.net/medusaprod/medusaprod/produktbilleder/unikka/hmkuv0902007hb.jpg?_a=BAVAZGE70`,
        },
        {
          url: `https://res.cloudinary.com/do9lggzv1/image/fetch/c_limit,w_3840/f_auto/q_auto/v1/https://sadrlmedusaprod.blob.core.windows.net/medusaprod/medusaprod/produktbilleder/unikka/hmkuv0902007blb.jpg?_a=BAVAZGE70`,
        },
        {
          url: `https://res.cloudinary.com/do9lggzv1/image/fetch/c_limit,w_3840/f_auto/q_auto/v1/https://sadrlmedusaprod.blob.core.windows.net/medusaprod/medusaprod/produktbilleder/hmkuv0902007lgb.jpg?_a=BAVAZGE70`,
        },
      ],
      options: [
        {
          title: "Size",
          values: uniqueSizes.sort((a, b) => {
            // Sort by width first, then height
            const [aW, aH] = a.split("x").map(Number);
            const [bW, bH] = b.split("x").map(Number);
            return aW === bW ? aH - bH : aW - bW;
          }),
        },
        {
          title: "Color",
          values: uniqueColors.sort(),
        },
        {
          title: "Height",
          values: uniqueHeights.sort((a, b) => {
            // Sort by numerical value
            const aNum = parseInt(a.replace("cm", ""));
            const bNum = parseInt(b.replace("cm", ""));
            return aNum - bNum;
          }),
        },
      ],
      variants,
      sales_channels: [
        {
          id: defaultSalesChannel[0].id,
        },
      ],
    };

    products.push(product);
  }

  return products;
}
