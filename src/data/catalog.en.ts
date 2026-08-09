/** English counterpart to catalogOverrides.ts — full title/blurb/details for all 15 category slugs. */
export const CATALOG_EN: Record<
  string,
  { title: string; blurb?: string; details?: { title: string; lines: string[] }[] }
> = {
  'fresh-fruits': {
    title: 'Fresh Fruits',
    blurb: 'Seasonal fruit varieties packed and graded to export standards for bulk supply.',
    details: [
      {
        title: 'Citrus (Orange, Lemon, Grapefruit)',
        lines: [
          'Navel varieties (regular, seedless, Shamouti), Valencia, Baladi and Succari.',
          'Harvest windows from November through May, depending on variety.',
          'Open-top or telescopic cartons, 15 kg net / 16 kg gross, or 7.5 kg / 8.25 kg.',
          'A 40 ft reefer container loads approximately 24 tons. All sizes available.',
        ],
      },
      {
        title: 'Grapefruit',
        lines: [
          'Rio Red and Star Ruby varieties with red flesh and a mild flavor.',
          'White variety in large and medium sizes with relatively few seeds.',
          'Transport at 6–8°C and storage at 8°C. Packed in 15 kg cartons.',
        ],
      },
      {
        title: 'Mango',
        lines: [
          'Keitt, Ataulfo, Haden, Alphonso, Fajri, Zebda, Timour, Palmer and Naomi varieties.',
          'Open-top cartons (15 kg net / 16 kg gross weight).',
          '171 cartons per pallet, 20 pallets per container (approx. 3,420 cartons per container).',
        ],
      },
      {
        title: 'Grapes',
        lines: [
          'Flame Seedless (red), Ruby, Thompson and Superior Seedless (green) varieties.',
          '4.5–5 kg cartons with 450–700 g punnets, or 500 g clear plastic clamshells.',
          'A 40 ft container holds approximately 17 tons when stored near 2°C.',
        ],
      },
      {
        title: 'Strawberries',
        lines: [
          'Sangina, Festival and Camarosa varieties.',
          'Optimal temperature 0–2.5°C with a maximum variance of 1°C.',
          'Packed 8 or 10 punnets per carton, 2–2.5 kg per carton.',
        ],
      },
      {
        title: 'Guava',
        lines: [
          'Raei, Assiuti, Hijazi and Red Ruby varieties.',
          'Supply season from August through October.',
          'Up to 3,600 cartons per container.',
        ],
      },
      {
        title: 'Watermelon & Melon',
        lines: [
          'Fresh watermelon and melon packed to order by weight.',
          'Non-ventilated plastic bags to preserve freshness.',
          'Refrigerated transport and storage to maintain optimal temperature and humidity.',
        ],
      },
      {
        title: 'Loading & Shipping',
        lines: [
          'A 40 ft reefer container holds approximately 22 cartons per pallet, at 20 pallets per container.',
          'Full customization of packing and weight by variety, destination and quantity.',
        ],
      },
    ],
  },
  meat: {
    title: 'Meat',
    blurb: 'We import frozen and chilled meat according to international specifications and standards.',
  },
  'frozen-chicken': {
    title: 'Frozen Chicken',
    blurb: 'Halal frozen chicken of high quality in a range of sizes and cuts for distribution and export.',
    details: [
      {
        title: 'Halal & Quality Certification',
        lines: [
          'Private poultry farms with fully integrated primary production for every frozen chicken part.',
          'A modern abattoir operating in strict compliance with Islamic slaughter requirements.',
          'The highest international and local quality standards applied for product safety.',
        ],
      },
      {
        title: 'Whole Frozen Chicken',
        lines: ['Weights from 800 g to 1,400 g.', 'An ideal choice for a wide range of recipes.'],
      },
      {
        title: 'Boneless, Skinless Chicken Breast',
        lines: ['Available at 450 g or 900 g.'],
      },
      {
        title: 'Chicken Legs',
        lines: ['Available at 450 g or 900 g.'],
      },
      {
        title: 'Chicken Wings (Whole & Mid-Joint)',
        lines: ['Available at 450 g or 900 g.'],
      },
      {
        title: 'Frozen Eviscerated Chicken',
        lines: ['Ready for distribution and food manufacturing.'],
      },
    ],
  },
  buffalo: {
    title: 'Buffalo Meat',
    blurb: 'High-quality frozen buffalo meat within our import and supply portfolio.',
    details: [
      {
        title: 'Highlights',
        lines: [
          'Frozen buffalo meat to commercial supply standards.',
          'Cold-chain packing and shipping that preserves quality through to arrival.',
        ],
      },
    ],
  },
  seafood: {
    title: 'Seafood & Aquatic Products',
    blurb: 'Fresh and farmed fish and seafood at export quality.',
    details: [
      {
        title: 'Fish & Seafood',
        lines: [
          'Fresh fish, cephalopods and crustaceans from wild catch and high-quality aquaculture.',
          'A commitment to competitive pricing, comprehensive quality control and on-time delivery.',
        ],
      },
      {
        title: 'Our Supply Vision',
        lines: [
          'Continuous improvement of product quality and export diversification to meet our customers\u2019 needs worldwide.',
        ],
      },
    ],
  },
  sawakni: {
    title: 'Sawakni Meat',
    blurb: 'Sawakni meat cuts within our chilled supply portfolio for abattoirs and distributors.',
    details: [
      {
        title: 'Supply',
        lines: [
          'Made-to-order supply for regional markets.',
          'A controlled cold chain from origin through to delivery.',
          'Specifications, sizes and packing agreed with the customer before shipping.',
        ],
      },
    ],
  },
  grains: {
    title: 'Grains',
    blurb: 'We import grains such as rice and sesame for bulk supply.',
  },
  sesame: {
    title: 'Sesame',
    blurb: 'Sesame seeds for commercial supply and industrial and food use.',
    details: [
      {
        title: 'Uses',
        lines: [
          'Suitable for food manufacturing and commercial use.',
          'Bulk supply with purity grade and packing specified on request.',
        ],
      },
    ],
  },
  rice: {
    title: 'Rice',
    blurb: 'Basmati rice with precise packing and shipping specifications for bulk supply.',
    details: [
      {
        title: 'Basmati Rice, Grade 1121 (Golden Sella)',
        lines: [
          'Grain length 8.28 mm, 93%+ purity.',
          'Brand as specified by the buyer.',
          '40 kg jute bag packing.',
          '24-ton payload in a 20 ft container.',
        ],
      },
      {
        title: 'Documents & Shipping',
        lines: [
          'Bill of lading, commercial invoice, packing list, phytosanitary certificate and certificate of origin.',
          'Insurance provided by the shipper. Additional documents available on request at actual cost.',
          'Prices subject to reconfirmation and negotiation based on quantity and shipping schedule.',
        ],
      },
    ],
  },
  vegetables: {
    title: 'Fresh Vegetables',
    blurb: 'Fresh vegetables, sorted and packed for export.',
    details: [
      {
        title: 'White Garlic',
        lines: [
          'Transport and storage from -3° to +2°C.',
          'Shelf life of up to 12 months under proper storage conditions.',
          'Loose packing or 10–20 kg mesh bags.',
          'Sizes from 4.5 to 6.5 cm and above.',
        ],
      },
      {
        title: 'Fresh Carrots',
        lines: [
          'All sizes and weights available.',
          'Packed in well-ventilated boxes and bags.',
          'Transported in specialized vehicles to retain moisture and prevent spoilage.',
        ],
      },
      {
        title: 'Sweet Pepper (Pimento)',
        lines: [
          'Green, red and yellow colors, in large, medium and small sizes.',
          'Completely free of bruising, decay and pest damage.',
          '5 kg cartons, minimum diameter 4.5 cm.',
          'A 20 ft container holds approximately 20 metric tons.',
        ],
      },
      {
        title: 'Onions',
        lines: [
          'Well-formed shape with a smooth, double papery skin.',
          'Meets EU Class 1 standards, with a sharp flavor and crisp texture.',
          'Dry storage for up to 8 months in perforated bags on wooden pallets.',
          'Minimum shelf life of 14 days from receipt.',
        ],
      },
      {
        title: 'Potatoes',
        lines: [
          '"Spunta" variety, 5–9 cm, graded to European standards.',
          'Uniform shape and color, free of deformity or imbalance.',
          'Weight from half a kilogram to one kilogram, minimum diameter 76 mm.',
          'Stored at 85–95% relative humidity.',
        ],
      },
      {
        title: 'Grape Leaves',
        lines: [
          'Preserved in various weights inside glass jars with safe materials protecting against spoilage.',
          'Stored and transported in dedicated refrigeration to maintain quality.',
        ],
      },
      {
        title: 'Lemons',
        lines: [
          'Adalia, Verna and seedless lemon varieties.',
          'Round to oval shape with a smooth surface.',
          'Open-top cartons, 15 kg net or 8 kg. All sizes available (64–188).',
        ],
      },
    ],
  },
  'frozen-produce': {
    title: 'Frozen Fruits & Vegetables',
    blurb: 'Frozen fruits and vegetables ready for commercial distribution.',
    details: [
      {
        title: 'Frozen Spinach',
        lines: [
          'Rich in potassium, which helps lower blood pressure.',
          'An excellent source of the antioxidant lutein, which protects eye health.',
          'No preservatives, non-GMO, and rich in vitamins B1, B2 and B12.',
          'Net weight 400 g.',
        ],
      },
      {
        title: 'Frozen Sweet Corn',
        lines: [
          'Combines natural taste with high nutritional value.',
          'No preservatives, non-GMO, and rich in vitamin C.',
          'Net weight 400 g.',
        ],
      },
      {
        title: 'Frozen Broccoli',
        lines: [
          'Florets that are an excellent source of vitamins A and C, in convenient ready-to-cook packs.',
          'No preservatives, non-GMO, and rich in vitamins B6 and B12.',
          'Net weight 400 g.',
        ],
      },
      {
        title: 'Frozen Molokhia (Jute Mallow)',
        lines: [
          'Grade-1 fresh molokhia, ready for direct cooking.',
          'No preservatives, non-GMO, and rich in vitamins B7 and B12.',
          'Net weight 250 g.',
        ],
      },
      {
        title: 'Frozen Green Peas',
        lines: [
          'A pantry staple packed with protein, fiber and vitamins.',
          'No preservatives, non-GMO, and rich in vitamins B9 and B3.',
          'Net weight 400 g.',
        ],
      },
      {
        title: 'Frozen Green Beans',
        lines: [
          'A crisp, low-calorie taste, rich in vitamin C, folic acid and vitamin K.',
          'Supports bone, skin and hair health.',
          'No preservatives and non-GMO.',
        ],
      },
      {
        title: 'Frozen Mixed Vegetables',
        lines: [
          'Contains grade-1 fresh-frozen beans, peas, carrots and cauliflower.',
          'Quick to prepare and free of preservatives.',
        ],
      },
      {
        title: 'Shredded Mozzarella Cheese',
        lines: [
          'Made from fresh, pasteurized cow\u2019s milk, easy to prepare.',
          'Ideal for pizza, lasagna and pasta.',
          'Net weight 1 kg.',
        ],
      },
      {
        title: 'Frozen Okra',
        lines: ['Selected small-size ("zero") okra, prepared for direct cooking.'],
      },
    ],
  },
  'frozen-fries': {
    title: 'Frozen Par-Fried Potatoes (Fries)',
    blurb: 'Premium grade-1 frozen par-fried potatoes, free of preservatives.',
    details: [
      {
        title: 'Premium Grade-1 Par-Fried Potatoes',
        lines: [
          'Free of genetically modified ingredients.',
          'Zero gluten, zero trans fats, and zero added sugars.',
          'No preservatives of any kind.',
        ],
      },
      {
        title: 'Integrated Farming & Export',
        lines: [
          'We grow and export raw potatoes and frozen par-fried potatoes to multiple global markets.',
        ],
      },
    ],
  },
  eggs: {
    title: 'Chicken Eggs',
    blurb: 'Chicken eggs for commercial supply and export to regional markets.',
    details: [
      {
        title: 'Supply',
        lines: [
          'Export and supply of chicken eggs to regional and global markets.',
          'Sizes, packing and shipping schedules specified on customer request.',
        ],
      },
    ],
  },
  oils: {
    title: 'Cooking Oils',
    blurb: 'Cooking oils for commercial supply and industrial use.',
    details: [
      {
        title: 'Supply',
        lines: [
          'Cooking oils in commercial packaging suited to bulk supply and distribution.',
          'Specifications and volumes provided per market requirements.',
        ],
      },
    ],
  },
  cashew: {
    title: 'Salted Cashews',
    blurb: 'Salted cashews in select grades for distribution and export.',
    details: [
      {
        title: 'Product',
        lines: [
          'Salted cashews at the highest quality grades available for supply.',
          'Commercial packing suited to retail and bulk by agreement.',
        ],
      },
    ],
  },
}
