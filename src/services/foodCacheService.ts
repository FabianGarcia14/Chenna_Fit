import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { OpenFoodFactsResult } from '../types';

/**
 * Get a cached product by barcode.
 */
export async function getCachedProduct(barcode: string): Promise<OpenFoodFactsResult | null> {
  if (!barcode) return null;
  try {
    const snap = await getDoc(doc(db, 'scanned_products', barcode));
    return snap.exists() ? (snap.data() as OpenFoodFactsResult) : null;
  } catch (error) {
    console.warn("Cache read error:", error);
    return null;
  }
}

/**
 * Cache a product from Open Food Facts into Firestore.
 */
export async function cacheProduct(product: OpenFoodFactsResult): Promise<void> {
  if (!product.barcode) return;
  try {
    await setDoc(doc(db, 'scanned_products', product.barcode), product);
  } catch (error) {
    console.warn("Cache write error:", error);
  }
}
