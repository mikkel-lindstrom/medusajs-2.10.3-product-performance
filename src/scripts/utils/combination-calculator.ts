/**
 * Utility to calculate and display available product combinations
 * Useful for planning performance tests and understanding variant limits
 */

export function calculateSheetCombinations() {
  // Generate size combinations: width 70-220 (increments of 10), length 180-240 (increments of 10)
  const widths: number[] = [];
  for (let w = 70; w <= 220; w += 10) {
    widths.push(w);
  }

  const lengths: number[] = [];
  for (let l = 180; l <= 240; l += 10) {
    lengths.push(l);
  }

  const sizes = widths.length * lengths.length; // 16 × 7 = 112

  const colors = 50; // As defined in product-generator.ts
  const heights = 12; // As defined in product-generator.ts

  const totalCombinations = sizes * colors * heights;

  return {
    widths: widths.length,
    lengths: lengths.length,
    sizes,
    colors,
    heights,
    totalCombinations,
    details: {
      widthRange: `${widths[0]}-${widths[widths.length - 1]}`,
      lengthRange: `${lengths[0]}-${lengths[lengths.length - 1]}`,
      sizeExamples: [
        `${widths[0]}x${lengths[0]}`,
        `${widths[Math.floor(widths.length / 2)]}x${
          lengths[Math.floor(lengths.length / 2)]
        }`,
        `${widths[widths.length - 1]}x${lengths[lengths.length - 1]}`,
      ],
    },
  };
}

export function displayCombinationInfo() {
  const info = calculateSheetCombinations();

  console.log("🔢 Sheet Product Combination Calculator");
  console.log("=====================================");
  console.log(
    `📐 Widths: ${info.widths} options (${info.details.widthRange}cm)`
  );
  console.log(
    `📏 Lengths: ${info.lengths} options (${info.details.lengthRange}cm)`
  );
  console.log(`📦 Total Sizes: ${info.sizes} combinations`);
  console.log(`🎨 Colors: ${info.colors} options`);
  console.log(`📏 Heights: ${info.heights} options (20cm-50cm)`);
  console.log("");
  console.log(
    `🔢 TOTAL POSSIBLE VARIANTS: ${info.totalCombinations.toLocaleString()}`
  );
  console.log("");
  console.log("📋 Size Examples:");
  info.details.sizeExamples.forEach((size, i) => {
    const label = i === 0 ? "Smallest" : i === 1 ? "Medium" : "Largest";
    console.log(`   ${label}: ${size}`);
  });
  console.log("");
  console.log("🎯 Recommended Test Scenarios:");
  console.log(`   • Small test: 10-50 variants`);
  console.log(`   • Medium test: 100-500 variants`);
  console.log(`   • Large test: 500-1000 variants`);
  console.log(
    `   • Maximum: ${Math.min(
      1000,
      info.totalCombinations
    ).toLocaleString()} variants`
  );
  console.log("");

  if (info.totalCombinations >= 1000) {
    console.log(
      "✅ Can generate 1000+ unique variants for performance testing!"
    );
  } else {
    console.log(
      "⚠️  Limited to " + info.totalCombinations + " unique variants"
    );
  }

  return info;
}

// Example usage:
if (require.main === module) {
  displayCombinationInfo();
}
