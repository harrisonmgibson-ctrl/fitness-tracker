// Pre-built common meals. Each has total macros (for quick-add) and an
// ingredients array (for customisation). Ingredient quantity = number of servings.
const meals = [
  {
    id: 'meal_001', name: 'Bowl of Oatmeal (with milk & banana)', category: 'Breakfast',
    calories: 380, proteinG: 12, carbsG: 65, fatG: 8, fiberG: 7,
    ingredients: [
      { foodId: 'food_002', quantity: 0.5, swapCategory: 'grains' },    // Rolled Oats
      { foodId: 'food_013', quantity: 1,   swapCategory: 'dairy' },     // Full-Fat Milk
      { foodId: 'food_016', quantity: 1,   swapCategory: 'produce' },   // Banana
    ],
  },
  {
    id: 'meal_002', name: 'Smashed Avo on Toast (2 slices sourdough)', category: 'Breakfast',
    calories: 380, proteinG: 10, carbsG: 38, fatG: 20, fiberG: 6,
    ingredients: [
      { foodId: 'food_005', quantity: 2,   swapCategory: 'grains' },    // Sourdough Bread
      { foodId: 'food_023', quantity: 0.5, swapCategory: 'fats' },      // Avocado
      { foodId: 'food_008', quantity: 1,   swapCategory: 'proteins' },  // Egg
      { foodId: 'food_127', quantity: 1,   swapCategory: 'condiments' },// Lemon Juice
    ],
  },
  {
    id: 'meal_003', name: 'Eggs Benedict (2 eggs, hollandaise)', category: 'Breakfast',
    calories: 580, proteinG: 25, carbsG: 35, fatG: 35, fiberG: 1,
    ingredients: [
      { foodId: 'food_008', quantity: 2,   swapCategory: 'proteins' },  // Eggs
      { foodId: 'food_053', quantity: 2,   swapCategory: 'proteins' },  // Deli Ham
      { foodId: 'food_034', quantity: 1,   swapCategory: 'grains' },    // English Muffin
      { foodId: 'food_063', quantity: 1,   swapCategory: 'condiments' },// Butter (hollandaise)
      { foodId: 'food_069', quantity: 1,   swapCategory: 'condiments' },// Mayonnaise
    ],
  },
  {
    id: 'meal_004', name: 'Veggie Omelette (2 eggs)', category: 'Breakfast',
    calories: 220, proteinG: 16, carbsG: 8, fatG: 14, fiberG: 2,
    ingredients: [
      { foodId: 'food_008', quantity: 2,   swapCategory: 'proteins' },  // Eggs
      { foodId: 'food_089', quantity: 0.5, swapCategory: 'produce' },   // Mushrooms
      { foodId: 'food_020', quantity: 0.3, swapCategory: 'produce' },   // Spinach
      { foodId: 'food_083', quantity: 0.5, swapCategory: 'produce' },   // Capsicum
      { foodId: 'food_024', quantity: 0.5, swapCategory: 'fats' },      // Olive Oil
    ],
  },
  {
    id: 'meal_005', name: 'Caesar Salad (dressing & croutons)', category: 'Lunch',
    calories: 350, proteinG: 12, carbsG: 25, fatG: 22, fiberG: 2,
    ingredients: [
      { foodId: 'food_020', quantity: 1.5, swapCategory: 'produce' },   // Spinach (lettuce)
      { foodId: 'food_075', quantity: 2,   swapCategory: 'condiments' },// Caesar Dressing
      { foodId: 'food_057', quantity: 1,   swapCategory: 'dairy' },     // Parmesan
      { foodId: 'food_005', quantity: 0.5, swapCategory: 'grains' },    // Sourdough (croutons)
    ],
  },
  {
    id: 'meal_006', name: 'BLT Sandwich', category: 'Lunch',
    calories: 410, proteinG: 18, carbsG: 42, fatG: 18, fiberG: 3,
    ingredients: [
      { foodId: 'food_048', quantity: 2,   swapCategory: 'proteins' },  // Bacon
      { foodId: 'food_003', quantity: 2,   swapCategory: 'grains' },    // Wholegrain Bread
      { foodId: 'food_020', quantity: 0.3, swapCategory: 'produce' },   // Spinach (lettuce)
      { foodId: 'food_081', quantity: 0.5, swapCategory: 'produce' },   // Cherry Tomatoes
      { foodId: 'food_069', quantity: 1,   swapCategory: 'condiments' },// Mayonnaise
    ],
  },
  {
    id: 'meal_007', name: 'Chicken Caesar Wrap', category: 'Lunch',
    calories: 520, proteinG: 32, carbsG: 48, fatG: 18, fiberG: 3,
    ingredients: [
      { foodId: 'food_006', quantity: 1,   swapCategory: 'proteins' },  // Chicken Breast
      { foodId: 'food_030', quantity: 1,   swapCategory: 'grains' },    // Flour Tortilla
      { foodId: 'food_075', quantity: 2,   swapCategory: 'condiments' },// Caesar Dressing
      { foodId: 'food_057', quantity: 0.5, swapCategory: 'dairy' },     // Parmesan
      { foodId: 'food_020', quantity: 0.3, swapCategory: 'produce' },   // Spinach
    ],
  },
  {
    id: 'meal_008', name: 'Tuna Sushi Roll (6 pieces)', category: 'Lunch',
    calories: 210, proteinG: 12, carbsG: 40, fatG: 2, fiberG: 1,
    ingredients: [
      { foodId: 'food_001', quantity: 1,   swapCategory: 'grains' },    // White Rice
      { foodId: 'food_007', quantity: 0.5, swapCategory: 'proteins' },  // Canned Tuna
      { foodId: 'food_082', quantity: 0.3, swapCategory: 'produce' },   // Cucumber
      { foodId: 'food_072', quantity: 1,   swapCategory: 'condiments' },// Soy Sauce
    ],
  },
  {
    id: 'meal_009', name: 'Chicken Stir Fry (with rice)', category: 'Dinner',
    calories: 520, proteinG: 38, carbsG: 55, fatG: 12, fiberG: 4,
    ingredients: [
      { foodId: 'food_006', quantity: 1,   swapCategory: 'proteins' },  // Chicken Breast
      { foodId: 'food_001', quantity: 1.5, swapCategory: 'grains' },    // White Rice
      { foodId: 'food_072', quantity: 2,   swapCategory: 'condiments' },// Soy Sauce
      { foodId: 'food_110', quantity: 0.5, swapCategory: 'fats' },      // Sesame Oil
      { foodId: 'food_085', quantity: 0.5, swapCategory: 'produce' },   // Frozen Peas
      { foodId: 'food_079', quantity: 1,   swapCategory: 'produce' },   // Carrot
    ],
  },
  {
    id: 'meal_010', name: 'Beef Tacos (2, standard)', category: 'Dinner',
    calories: 480, proteinG: 26, carbsG: 45, fatG: 20, fiberG: 5,
    ingredients: [
      { foodId: 'food_009', quantity: 1,   swapCategory: 'proteins' },  // Beef Mince
      { foodId: 'food_029', quantity: 2,   swapCategory: 'grains' },    // Corn Tortilla
      { foodId: 'food_014', quantity: 1,   swapCategory: 'dairy' },     // Cheddar Cheese
      { foodId: 'food_081', quantity: 0.5, swapCategory: 'produce' },   // Cherry Tomatoes
      { foodId: 'food_020', quantity: 0.3, swapCategory: 'produce' },   // Spinach
      { foodId: 'food_070', quantity: 1,   swapCategory: 'condiments' },// Tomato Sauce
    ],
  },
  {
    id: 'meal_011', name: 'Margherita Pizza (2 slices)', category: 'Dinner',
    calories: 500, proteinG: 20, carbsG: 65, fatG: 16, fiberG: 3,
    ingredients: [
      { foodId: 'food_036', quantity: 1.5, swapCategory: 'grains' },    // Pita Bread (base)
      { foodId: 'food_114', quantity: 1,   swapCategory: 'cooking' },   // Passata
      { foodId: 'food_055', quantity: 2.5, swapCategory: 'dairy' },     // Mozzarella
      { foodId: 'food_024', quantity: 0.5, swapCategory: 'fats' },      // Olive Oil
      { foodId: 'food_157', quantity: 1,   swapCategory: 'spices' },    // Basil
    ],
  },
  {
    id: 'meal_012', name: 'Chicken Fried Rice', category: 'Dinner',
    calories: 550, proteinG: 26, carbsG: 70, fatG: 15, fiberG: 3,
    ingredients: [
      { foodId: 'food_006', quantity: 1,   swapCategory: 'proteins' },  // Chicken Breast
      { foodId: 'food_001', quantity: 1.5, swapCategory: 'grains' },    // White Rice
      { foodId: 'food_008', quantity: 1,   swapCategory: 'proteins' },  // Egg
      { foodId: 'food_072', quantity: 2,   swapCategory: 'condiments' },// Soy Sauce
      { foodId: 'food_110', quantity: 0.5, swapCategory: 'fats' },      // Sesame Oil
      { foodId: 'food_085', quantity: 0.5, swapCategory: 'produce' },   // Frozen Peas
      { foodId: 'food_134', quantity: 2,   swapCategory: 'produce' },   // Spring Onion
    ],
  },
  {
    id: 'meal_013', name: 'Pad Thai', category: 'Dinner',
    calories: 650, proteinG: 22, carbsG: 88, fatG: 20, fiberG: 3,
    ingredients: [
      { foodId: 'food_004', quantity: 0.75, swapCategory: 'grains' },   // Pasta (as noodles)
      { foodId: 'food_006', quantity: 0.75, swapCategory: 'proteins' }, // Chicken Breast
      { foodId: 'food_008', quantity: 1,    swapCategory: 'proteins' }, // Egg
      { foodId: 'food_121', quantity: 2,    swapCategory: 'condiments' },// Fish Sauce
      { foodId: 'food_128', quantity: 1,    swapCategory: 'condiments' },// Lime Juice
      { foodId: 'food_022', quantity: 0.5,  swapCategory: 'fats' },     // Peanut Butter
      { foodId: 'food_110', quantity: 0.5,  swapCategory: 'fats' },     // Sesame Oil
      { foodId: 'food_134', quantity: 2,    swapCategory: 'produce' },  // Spring Onion
    ],
  },
  {
    id: 'meal_014', name: 'Butter Chicken (with rice)', category: 'Dinner',
    calories: 700, proteinG: 32, carbsG: 82, fatG: 22, fiberG: 3,
    ingredients: [
      { foodId: 'food_006', quantity: 1,   swapCategory: 'proteins' },  // Chicken Breast
      { foodId: 'food_001', quantity: 2,   swapCategory: 'grains' },    // White Rice
      { foodId: 'food_112', quantity: 0.5, swapCategory: 'cooking' },   // Coconut Milk
      { foodId: 'food_116', quantity: 2,   swapCategory: 'cooking' },   // Tomato Paste
      { foodId: 'food_063', quantity: 1,   swapCategory: 'condiments' },// Butter
      { foodId: 'food_153', quantity: 2,   swapCategory: 'spices' },    // Curry Powder
      { foodId: 'food_092', quantity: 0.5, swapCategory: 'produce' },   // Onion
    ],
  },
  {
    id: 'meal_015', name: 'Beef Stir Fry (with noodles)', category: 'Dinner',
    calories: 580, proteinG: 35, carbsG: 62, fatG: 16, fiberG: 4,
    ingredients: [
      { foodId: 'food_009', quantity: 1,   swapCategory: 'proteins' },  // Beef Mince
      { foodId: 'food_004', quantity: 0.5, swapCategory: 'grains' },    // Pasta (noodles)
      { foodId: 'food_072', quantity: 2,   swapCategory: 'condiments' },// Soy Sauce
      { foodId: 'food_110', quantity: 0.5, swapCategory: 'fats' },      // Sesame Oil
      { foodId: 'food_083', quantity: 0.5, swapCategory: 'produce' },   // Capsicum
      { foodId: 'food_085', quantity: 0.5, swapCategory: 'produce' },   // Frozen Peas
      { foodId: 'food_092', quantity: 0.5, swapCategory: 'produce' },   // Onion
    ],
  },
  {
    id: 'meal_016', name: 'Chicken Schnitzel (with chips)', category: 'Dinner',
    calories: 750, proteinG: 42, carbsG: 65, fatG: 28, fiberG: 4,
    ingredients: [
      { foodId: 'food_006', quantity: 1.5, swapCategory: 'proteins' },  // Chicken Breast
      { foodId: 'food_163', quantity: 0.75, swapCategory: 'fastfood' }, // French Fries (chips)
      { foodId: 'food_008', quantity: 1,   swapCategory: 'proteins' },  // Egg (coating)
      { foodId: 'food_003', quantity: 0.5, swapCategory: 'grains' },    // Breadcrumbs
      { foodId: 'food_024', quantity: 0.5, swapCategory: 'fats' },      // Olive Oil
    ],
  },
];

export default meals;
