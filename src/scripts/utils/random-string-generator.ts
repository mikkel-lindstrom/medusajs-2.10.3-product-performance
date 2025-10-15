import { randomBytes, randomUUID } from "crypto";

// ============================================================================
// RANDOM STRING UTILITIES
// ============================================================================

/**
 * Generates a random alphanumeric string of specified length
 * @param length Length of the random string to generate
 * @param includeUppercase Whether to include uppercase letters (default: true)
 * @param includeLowercase Whether to include lowercase letters (default: true)
 * @param includeNumbers Whether to include numbers (default: true)
 * @returns Random string of specified length
 *
 * @example
 * ```typescript
 * generateRandomString(8) // "aB3xY9k2"
 * generateRandomString(6, true, false, true) // "A7B9C2"
 * generateRandomString(10, false, true, false) // "abcdefghij"
 * ```
 */
export function generateRandomString(
  length: number,
  includeUppercase = true,
  includeLowercase = true,
  includeNumbers = true
): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  let charset = "";
  if (includeUppercase) charset += uppercase;
  if (includeLowercase) charset += lowercase;
  if (includeNumbers) charset += numbers;

  if (charset === "") {
    throw new Error("At least one character type must be included");
  }

  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }

  return result;
}

/**
 * Generates a cryptographically secure random string using Node.js crypto
 * More secure than Math.random() but not guaranteed unique across calls
 * @param length Length of the random string
 * @returns Cryptographically secure random string
 *
 * @example
 * ```typescript
 * generateSecureRandomString(12) // "x7K9mN2pQ8vZ"
 * ```
 */
export function generateSecureRandomString(length: number): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = randomBytes(length);
  let result = "";

  for (let i = 0; i < length; i++) {
    result += charset[bytes[i] % charset.length];
  }

  return result;
}

/**
 * Generates a UUID v4 (guaranteed unique across time and space)
 * @returns UUID string (36 characters with dashes)
 *
 * @example
 * ```typescript
 * generateUniqueId() // "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 * ```
 */
export function generateUniqueId(): string {
  return randomUUID();
}

/**
 * Generates a short unique identifier (timestamp + random)
 * High probability of uniqueness for most use cases
 * @param length Length of random part (default: 6)
 * @returns Short unique string
 *
 * @example
 * ```typescript
 * generateShortUniqueId() // "1729123456_aB3xY9"
 * generateShortUniqueId(4) // "1729123456_aB3x"
 * ```
 */
export function generateShortUniqueId(length = 6): string {
  const timestamp = Date.now();
  const randomPart = generateSecureRandomString(length);
  return `${timestamp}_${randomPart}`;
}

/**
 * Generates a URL-friendly unique slug
 * @param prefix Optional prefix for the slug
 * @param length Length of random part (default: 8)
 * @returns URL-friendly unique slug
 *
 * @example
 * ```typescript
 * generateUniqueSlug() // "item-1729123456-aB3xY9k2"
 * generateUniqueSlug("product") // "product-1729123456-aB3xY9k2"
 * ```
 */
export function generateUniqueSlug(prefix = "item", length = 8): string {
  const timestamp = Date.now();
  const randomPart = generateRandomString(length, false, true, true); // lowercase + numbers only
  return `${prefix}-${timestamp}-${randomPart}`;
}

/**
 * Generates a hex string of specified length
 * @param length Length of hex string (must be even)
 * @returns Hex string
 *
 * @example
 * ```typescript
 * generateHexString(8) // "a1b2c3d4"
 * generateHexString(16) // "a1b2c3d4e5f67890"
 * ```
 */
export function generateHexString(length: number): string {
  if (length % 2 !== 0) {
    throw new Error("Hex string length must be even");
  }

  const bytes = randomBytes(length / 2);
  return bytes.toString("hex");
}

/**
 * Generates a base64 string of specified length (approximately)
 * @param length Approximate length of base64 string
 * @returns Base64 string (actual length may vary slightly)
 *
 * @example
 * ```typescript
 * generateBase64String(12) // "xK9mN2pQ8vZa"
 * ```
 */
export function generateBase64String(length: number): string {
  const bytes = randomBytes(Math.ceil((length * 3) / 4));
  return bytes.toString("base64").substring(0, length);
}

/**
 * Generates a random string with custom character set
 * @param length Length of the string
 * @param charset Custom character set to use
 * @returns Random string using custom charset
 *
 * @example
 * ```typescript
 * generateCustomRandomString(8, "ABCDEF123456") // "A3B6C1F2"
 * generateCustomRandomString(5, "!@#$%^&*") // "!@$%*"
 * ```
 */
export function generateCustomRandomString(
  length: number,
  charset: string
): string {
  if (charset.length === 0) {
    throw new Error("Charset cannot be empty");
  }

  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }

  return result;
}

/**
 * Simple in-memory unique string generator (session-based uniqueness)
 * Guarantees uniqueness within the current session/process
 */
export class UniqueStringGenerator {
  private used = new Set<string>();

  /**
   * Generates a unique string that hasn't been generated before in this session
   * @param length Length of the string
   * @param maxAttempts Maximum attempts to generate unique string (default: 100)
   * @returns Guaranteed unique string for this session
   */
  generate(length: number, maxAttempts = 100): string {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const candidate = generateSecureRandomString(length);
      if (!this.used.has(candidate)) {
        this.used.add(candidate);
        return candidate;
      }
    }

    // Fallback: use timestamp + random if we can't find unused string
    const fallback = generateShortUniqueId(length - 13); // Account for timestamp length
    this.used.add(fallback);
    return fallback;
  }

  /**
   * Clear the used strings set (reset uniqueness tracking)
   */
  reset(): void {
    this.used.clear();
  }

  /**
   * Get count of generated unique strings
   */
  getCount(): number {
    return this.used.size;
  }
}

// Export a default instance for convenience
export const uniqueStringGenerator = new UniqueStringGenerator();

/**
 * Quick function for session-unique strings
 * @param length Length of the unique string
 * @returns String guaranteed unique in current session
 *
 * @example
 * ```typescript
 * generateSessionUniqueString(10) // "aB3xY9k2mN" (guaranteed not generated before)
 * ```
 */
export function generateSessionUniqueString(length: number): string {
  return uniqueStringGenerator.generate(length);
}

/**
 * Generates multiple unique strings at once
 * @param count Number of strings to generate
 * @param length Length of each string
 * @returns Array of unique strings
 *
 * @example
 * ```typescript
 * generateMultipleUniqueStrings(5, 8) // ["aB3xY9k2", "mN7pQ4vZ", "K2fH8jL9", "T6nR5gB3", "W9cE2sA7"]
 * ```
 */
export function generateMultipleUniqueStrings(
  count: number,
  length: number
): string[] {
  const results: string[] = [];

  for (let i = 0; i < count; i++) {
    results.push(generateSessionUniqueString(length));
  }

  return results;
}

// ============================================================================
// UTILITY CONSTANTS
// ============================================================================

export const CHARSET = {
  UPPERCASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  LOWERCASE: "abcdefghijklmnopqrstuvwxyz",
  NUMBERS: "0123456789",
  ALPHANUMERIC:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  HEX: "0123456789ABCDEF",
  URL_SAFE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  SYMBOLS: "!@#$%^&*()_+-=[]{}|;:,.<>?",
} as const;
