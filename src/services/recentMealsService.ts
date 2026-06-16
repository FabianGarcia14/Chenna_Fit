import { collection, doc, setDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Meal, MealType, RecentMealCombo } from '../types';

export const saveRecentMeal = async (uid: string, meal: Meal, mealType: MealType): Promise<void> => {
  try {
    const comboId = `${meal.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.round(meal.calories)}`;
    const recentMealRef = doc(db, `users/${uid}/recentMeals/${comboId}`);
    
    const recentMealCombo: RecentMealCombo = {
      comboId,
      meal,
      mealType,
      lastUsed: new Date().toISOString()
    };
    
    await setDoc(recentMealRef, recentMealCombo);
  } catch (error) {
    console.error("Error saving recent meal: ", error);
    throw error;
  }
};

export const getRecentMeals = async (uid: string, mealType: MealType): Promise<RecentMealCombo[]> => {
  if (!mealType) return [];
  try {
    const recentMealsRef = collection(db, `users/${uid}/recentMeals`);
    const q = query(
      recentMealsRef,
      where('mealType', '==', mealType),
      orderBy('lastUsed', 'desc'),
      limit(15)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as RecentMealCombo);
  } catch (error) {
    console.error("Error getting recent meals: ", error);
    throw error;
  }
};
