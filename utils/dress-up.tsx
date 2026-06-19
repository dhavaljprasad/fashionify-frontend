export const DressUpConfig = {
  Women: [
    {
      name: "ShararaKurti",
      needs: [
        { name: "Sharara", optional: false },
        { name: "Kurti", optional: true },
        { name: "Dupatta", optional: true },
      ],
    },
    {
      name: "PlazoKurti",
      needs: [
        { name: "Plazo", optional: false },
        { name: "Kurti", optional: true },
        { name: "Dupatta", optional: true },
      ],
    },
    {
      name: "AnarkaliSet",
      needs: [
        { name: "Anarkali", optional: false },
        { name: "Churidar/Legging", optional: true },
        { name: "Dupatta", optional: true },
      ],
    },
    {
      name: "SareeBlouse",
      needs: [
        { name: "Saree", optional: false },
        { name: "Blouse", optional: false },
      ],
    },
    {
      name: "LehengaCholi",
      needs: [
        { name: "Lehenga", optional: false },
        { name: "Choli", optional: false },
        { name: "Dupatta", optional: true },
      ],
    },
    {
      name: "Gown",
      needs: [{ name: "Gown", optional: false }],
    },
    {
      name: "SalwarKameez",
      needs: [
        { name: "Kameez", optional: false },
        { name: "Salwar", optional: false },
        { name: "Dupatta", optional: true },
      ],
    },
    {
      name: "IndoWestern",
      needs: [
        { name: "Top", optional: false },
        { name: "Bottom", optional: false },
        { name: "Dupatta", optional: true },
      ],
    },

    // Additional Indian Categories

    {
      name: "PatialaSuit",
      needs: [
        { name: "Kurti", optional: false },
        { name: "Patiala", optional: false },
        { name: "Dupatta", optional: true },
      ],
    },
    {
      name: "ChikankariSet",
      needs: [
        { name: "Kurti", optional: false },
        { name: "Bottom", optional: true },
        { name: "Dupatta", optional: true },
      ],
    },
    {
      name: "CoOrdSet",
      needs: [
        { name: "Top", optional: false },
        { name: "Bottom", optional: false },
      ],
    },
    {
      name: "Kaftan",
      needs: [{ name: "Kaftan", optional: false }],
    },

    // Global Categories

    {
      name: "CocktailDress",
      needs: [{ name: "Dress", optional: false }],
    },
    {
      name: "EveningGown",
      needs: [{ name: "Evening Gown", optional: false }],
    },
    {
      name: "BallGown",
      needs: [{ name: "Ball Gown", optional: false }],
    },
    {
      name: "WeddingDress",
      needs: [{ name: "Wedding Dress", optional: false }],
    },
    {
      name: "Pantsuit",
      needs: [
        { name: "Blazer", optional: false },
        { name: "Trousers", optional: false },
        { name: "Blouse", optional: true },
      ],
    },
    {
      name: "SkirtSuit",
      needs: [
        { name: "Blazer", optional: false },
        { name: "Skirt", optional: false },
        { name: "Blouse", optional: true },
      ],
    },
    {
      name: "Jumpsuit",
      needs: [{ name: "Jumpsuit", optional: false }],
    },
    {
      name: "Romper",
      needs: [{ name: "Romper", optional: false }],
    },
    {
      name: "BlouseSkirt",
      needs: [
        { name: "Blouse", optional: false },
        { name: "Skirt", optional: false },
      ],
    },
    {
      name: "BlouseTrousers",
      needs: [
        { name: "Blouse", optional: false },
        { name: "Trousers", optional: false },
      ],
    },
  ],

  Men: [
    {
      name: "SherwaniSet",
      needs: [
        { name: "Sherwani", optional: false },
        { name: "Churidar/Dhoti", optional: true },
        { name: "Dupatta", optional: true },
      ],
    },
    {
      name: "KurtaPyjama",
      needs: [
        { name: "Kurta", optional: false },
        { name: "Pyjama", optional: false },
        { name: "Dupatta", optional: true },
      ],
    },
    {
      name: "NehruJacketSet",
      needs: [
        { name: "Nehru Jacket", optional: false },
        { name: "Kurta", optional: true },
        { name: "Pyjama", optional: true },
      ],
    },
    {
      name: "DhotiKurta",
      needs: [
        { name: "Dhoti", optional: false },
        { name: "Kurta", optional: false },
        { name: "Dupatta", optional: true },
      ],
    },
    {
      name: "JodhpuriSuit",
      needs: [
        { name: "Jodhpuri Jacket", optional: false },
        { name: "Trousers", optional: false },
        { name: "Shirt", optional: true },
      ],
    },
    {
      name: "FormalSuit",
      needs: [
        { name: "Blazer", optional: false },
        { name: "Trousers", optional: false },
        { name: "Shirt", optional: false },
      ],
    },
    {
      name: "Tuxedo",
      needs: [
        { name: "Tuxedo Jacket", optional: false },
        { name: "Trousers", optional: false },
        { name: "Shirt", optional: false },
      ],
    },

    // Additional Indian

    {
      name: "BandhgalaSuit",
      needs: [
        { name: "Bandhgala Jacket", optional: false },
        { name: "Trousers", optional: false },
      ],
    },

    // Global

    {
      name: "TwoPieceSuit",
      needs: [
        { name: "Suit Jacket", optional: false },
        { name: "Trousers", optional: false },
      ],
    },
    {
      name: "ThreePieceSuit",
      needs: [
        { name: "Suit Jacket", optional: false },
        { name: "Waistcoat", optional: false },
        { name: "Trousers", optional: false },
        { name: "Shirt", optional: true },
      ],
    },
    {
      name: "BlazerTrousers",
      needs: [
        { name: "Blazer", optional: false },
        { name: "Trousers", optional: false },
        { name: "Shirt", optional: true },
      ],
    },
    {
      name: "WaistcoatSet",
      needs: [
        { name: "Waistcoat", optional: false },
        { name: "Shirt", optional: false },
        { name: "Trousers", optional: false },
      ],
    },
    {
      name: "TailcoatSuit",
      needs: [
        { name: "Tailcoat", optional: false },
        { name: "Trousers", optional: false },
        { name: "Shirt", optional: false },
      ],
    },
    {
      name: "MorningSuit",
      needs: [
        { name: "Morning Coat", optional: false },
        { name: "Waistcoat", optional: true },
        { name: "Trousers", optional: false },
      ],
    },
  ],

  Others: [
    { name: "Trousers", needs: [{ name: "Trousers", optional: false }] },
    { name: "Shirt", needs: [{ name: "Shirt", optional: false }] },
    { name: "Skirt", needs: [{ name: "Skirt", optional: false }] },
    { name: "Shorts", needs: [{ name: "Shorts", optional: false }] },
    { name: "Top", needs: [{ name: "Top", optional: false }] },
    { name: "Bottom", needs: [{ name: "Bottom", optional: false }] },

    // Professional / Utility

    {
      name: "Scrubs",
      needs: [
        { name: "Scrub Top", optional: false },
        { name: "Scrub Pants", optional: false },
      ],
    },
    {
      name: "ChefUniform",
      needs: [
        { name: "Chef Coat", optional: false },
        { name: "Chef Pants", optional: false },
      ],
    },
    {
      name: "Coveralls",
      needs: [{ name: "Coveralls", optional: false }],
    },
    {
      name: "LabCoatSet",
      needs: [
        { name: "Lab Coat", optional: false },
        { name: "Top", optional: true },
        { name: "Trousers", optional: true },
      ],
    },
  ],
}
