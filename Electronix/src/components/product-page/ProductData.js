const productData = [
  // 🟦 SMARTPHONES
  {
    id: 1,
    title: "iPhone 14 Pro",
    brand: "Apple",
    category: "iPhones",
    price: 129999,
    image: "https://images.unsplash.com/photo-1661961112951-9f57a27f2a1a?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1661961112951-9f57a27f2a1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1674828500008-06f32b2b4d79?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1682685792038-c4b4a1dbf6e4?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "The iPhone 14 Pro features an A16 Bionic chip, a 48MP triple camera system, and a stunning Super Retina XDR display with ProMotion.",
    specs: {
      Display: "6.1-inch Super Retina XDR",
      Processor: "A16 Bionic",
      Battery: "3200mAh",
      Storage: "256GB",
      Camera: "48MP + 12MP + 12MP",
    },
    reviews: [
      { user: "Amit", comment: "Incredible performance and amazing camera quality!" },
      { user: "Neha", comment: "Dynamic Island is really cool. Feels premium." },
    ],
  },
  {
    id: 2,
    title: "Samsung Galaxy S23 Ultra",
    brand: "Samsung",
    category: "Android Phones",
    price: 124999,
    image: "https://images.unsplash.com/photo-1682687220194-98f9d09a2c77?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1682687220194-98f9d09a2c77?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1682690353720-4b6b1e2b5c52?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1693347335660-9b10f25b1e15?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Samsung Galaxy S23 Ultra comes with a 200MP camera, Snapdragon 8 Gen 2 processor, and a large 6.8-inch AMOLED display.",
    specs: {
      Display: "6.8-inch Dynamic AMOLED 2X",
      Processor: "Snapdragon 8 Gen 2",
      Battery: "5000mAh",
      Storage: "256GB",
      Camera: "200MP + 12MP + 10MP + 10MP",
    },
    reviews: [
      { user: "Rahul", comment: "The best Android phone you can buy." },
      { user: "Simran", comment: "Battery life and camera zoom are amazing!" },
    ],
  },

  // 🟩 LAPTOPS
  {
    id: 3,
    title: "MacBook Air M2",
    brand: "Apple",
    category: "MacBooks",
    price: 139999,
    image: "https://images.unsplash.com/photo-1659951728876-9fc6e1ecb7c2?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1659951728876-9fc6e1ecb7c2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1673129493427-3b3a1a0af63d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1678696984030-5c49c5a16a60?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "The MacBook Air M2 redefines power and portability with Apple’s next-gen M2 chip and a stunning 13.6-inch Liquid Retina display.",
    specs: {
      Display: "13.6-inch Liquid Retina",
      Processor: "Apple M2",
      Battery: "18 hours",
      RAM: "8GB",
      Storage: "512GB SSD",
    },
    reviews: [
      { user: "Priya", comment: "Super light and fast — perfect for daily use." },
      { user: "Manish", comment: "Battery life is impressive!" },
    ],
  },
  {
    id: 4,
    title: "HP Victus Gaming Laptop",
    brand: "HP",
    category: "Gaming Laptops",
    price: 85999,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631189897673-9b13e3fbb0c2?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "The HP Victus is a performance-packed gaming laptop with a Ryzen 5 processor and NVIDIA RTX graphics for serious gamers.",
    specs: {
      Display: "15.6-inch Full HD 144Hz",
      Processor: "AMD Ryzen 5 5600H",
      GPU: "NVIDIA RTX 3050",
      RAM: "16GB",
      Storage: "512GB SSD",
    },
    reviews: [
      { user: "Akash", comment: "Great performance at this price point!" },
      { user: "Sneha", comment: "Runs games smoothly with minimal heat." },
    ],
  },

  // 🟨 WATCHES
  {
    id: 5,
    title: "Apple Watch Series 9",
    brand: "Apple",
    category: "Smart Watch",
    price: 49999,
    image: "https://images.unsplash.com/photo-1603791452906-b9d974d1e0fc?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1603791452906-b9d974d1e0fc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589395595558-c44b7e27f4a9?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Track your fitness, monitor your heart rate, and stay connected with the Apple Watch Series 9 featuring an always-on Retina display.",
    specs: {
      Display: "1.9-inch Retina OLED",
      Battery: "18 hours",
      WaterResistance: "50m",
      Connectivity: "Wi-Fi, Bluetooth, GPS",
    },
    reviews: [
      { user: "Riya", comment: "Perfect for workouts and daily tracking." },
      { user: "Jay", comment: "Smooth integration with iPhone." },
    ],
  },
  {
    id: 6,
    title: "Noise ColorFit Pro 4",
    brand: "Noise",
    category: "Fitness Watch",
    price: 4999,
    image: "https://images.unsplash.com/photo-1606813902787-8c7e303edcb0?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1606813902787-8c7e303edcb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606813899903-cd3be97b5d8e?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Noise ColorFit Pro 4 offers a large display, customizable watch faces, and all-day SpO2 and heart rate monitoring.",
    specs: {
      Display: "1.8-inch TFT",
      Battery: "7 days",
      Connectivity: "Bluetooth",
      Features: "Heart rate, SpO2, Sleep Tracking",
    },
    reviews: [
      { user: "Tina", comment: "Affordable and stylish fitness watch." },
      { user: "Kunal", comment: "Battery lasts a week easily!" },
    ],
  },

  // 🟥 HEADPHONES
  {
    id: 7,
    title: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Wireless Headphones",
    price: 29999,
    image: "https://images.unsplash.com/photo-1618354691373-d851cdb95c1d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851cdb95c1d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602524202654-dcc27196c50e?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Industry-leading noise cancellation with Sony’s WH-1000XM5 wireless headphones featuring up to 30 hours of battery life.",
    specs: {
      Battery: "30 hours",
      Connectivity: "Bluetooth 5.2",
      Features: "ANC, Touch Control, Quick Charge",
    },
    reviews: [
      { user: "Rohit", comment: "Best noise cancellation ever!" },
      { user: "Pooja", comment: "Crystal clear sound quality." },
    ],
  },
  {
    id: 8,
    title: "Boat Rockerz 450",
    brand: "Boat",
    category: "Wireless Headphones",
    price: 1499,
    image: "https://images.unsplash.com/photo-1580894894514-9f7c2b74c23c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1580894894514-9f7c2b74c23c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573497490808-6ba9f1e79c0d?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Boat Rockerz 450 offers deep bass, comfortable ear cushions, and up to 15 hours of playback.",
    specs: {
      Battery: "15 hours",
      Connectivity: "Bluetooth 5.0",
      Features: "Lightweight, Deep Bass, Voice Assistant",
    },
    reviews: [
      { user: "Anu", comment: "Great sound at a budget price." },
      { user: "Dev", comment: "Perfect for daily commute." },
    ],
  },

  // 🟪 CAMERAS
  {
    id: 9,
    title: "Canon EOS 1500D",
    brand: "Canon",
    category: "DSLR Cameras",
    price: 44999,
    image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610384121285-cf191a53f4ec?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "The Canon EOS 1500D is an entry-level DSLR with a 24.1MP APS-C sensor, built-in Wi-Fi, and full HD recording.",
    specs: {
      Sensor: "24.1MP APS-C CMOS",
      Display: "3-inch LCD",
      Connectivity: "Wi-Fi, NFC",
      Video: "Full HD 1080p",
    },
    reviews: [
      { user: "Sana", comment: "Excellent DSLR for beginners." },
      { user: "Harsh", comment: "Sharp image quality and easy controls." },
    ],
  },
  {
    id: 10,
    title: "GoPro Hero 12 Black",
    brand: "GoPro",
    category: "Action Cameras",
    price: 55999,
    image: "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608157311313-b2f5aa13ac32?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "GoPro Hero 12 Black delivers 5.3K video, HyperSmooth stabilization, and waterproof durability up to 10m.",
    specs: {
      Video: "5.3K60 / 4K120",
      Battery: "1720mAh",
      Connectivity: "Wi-Fi, Bluetooth",
      Waterproof: "10m",
    },
    reviews: [
      { user: "Yash", comment: "Perfect for travel and sports." },
      { user: "Mira", comment: "Super smooth videos!" },
    ],
  },
  // 🟧 TABLETS
{
  id: 11,
  title: "Apple iPad Pro M4",
  brand: "Apple",
  category: "Tablets",
  price: 112900,
  image: "https://images.unsplash.com/photo-1587574293340-e0011c1a7e48?auto=format&fit=crop&w=800&q=80",
  images: [
    "https://images.unsplash.com/photo-1587574293340-e0011c1a7e48?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
  ],
  description:
    "The iPad Pro M4 is a powerhouse tablet with Apple's latest M4 chip, Liquid Retina XDR display, and Apple Pencil Pro support.",
  specs: {
    Display: "13-inch Liquid Retina XDR",
    Processor: "Apple M4",
    Battery: "10758mAh",
    Storage: "256GB SSD",
    Camera: "12MP Ultra Wide",
  },
  reviews: [
    { user: "Sneha", comment: "Blazing fast performance for creative work." },
    { user: "Amit", comment: "Display quality is unmatched." },
  ],
},

{
  id: 12,
  title: "Samsung Galaxy Tab S9 Ultra",
  brand: "Samsung",
  category: "Tablets",
  price: 108999,
  image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
  images: [
    "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
  ],
  description:
    "A massive 14.6-inch Dynamic AMOLED display with S Pen support, perfect for productivity and entertainment.",
  specs: {
    Display: "14.6-inch AMOLED 120Hz",
    Processor: "Snapdragon 8 Gen 2",
    Battery: "11200mAh",
    Storage: "512GB",
    Camera: "13MP + 8MP",
  },
  reviews: [
    { user: "Rohan", comment: "Best Android tablet experience hands down." },
    { user: "Priya", comment: "Multitasking feels seamless." },
  ],
},

// 🟦 ACCESSORIES
{
  id: 13,
  title: "Apple MagSafe Charger",
  brand: "Apple",
  category: "Chargers",
  price: 4499,
  image: "https://images.unsplash.com/photo-1610390414763-3fabc1adf1c3?auto=format&fit=crop&w=800&q=80",
  images: [
    "https://images.unsplash.com/photo-1610390414763-3fabc1adf1c3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1609945555149-fffc0c859df8?auto=format&fit=crop&w=800&q=80",
  ],
  description:
    "The MagSafe Charger offers efficient wireless charging for iPhone and AirPods with magnetic alignment.",
  specs: {
    Output: "15W",
    Compatibility: "iPhone 12 and later",
    Connector: "USB-C",
    CableLength: "1m",
  },
  reviews: [
    { user: "Tanya", comment: "Charges fast and looks elegant." },
    { user: "Vivek", comment: "Magnetic connection is very convenient." },
  ],
},

{
  id: 14,
  title: "Anker PowerCore 20000 PD",
  brand: "Anker",
  category: "Power Banks",
  price: 6999,
  image: "https://images.unsplash.com/photo-1621379460468-2f9b9e3e4d23?auto=format&fit=crop&w=800&q=80",
  images: [
    "https://images.unsplash.com/photo-1621379460468-2f9b9e3e4d23?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1599677101685-9e6b4dbf3422?auto=format&fit=crop&w=800&q=80",
  ],
  description:
    "High-capacity power bank with 20,000mAh and Power Delivery fast charging support.",
  specs: {
    Capacity: "20000mAh",
    Output: "20W PD",
    Ports: "USB-C, USB-A",
    Weight: "342g",
  },
  reviews: [
    { user: "Ravi", comment: "Charges my phone multiple times!" },
    { user: "Minal", comment: "Compact yet powerful." },
  ],
},

// 🟩 SMART HOME
{
  id: 15,
  title: "Google Nest Mini (2nd Gen)",
  brand: "Google",
  category: "Smart Speakers",
  price: 4499,
  image: "https://images.unsplash.com/photo-1603791452906-b9d974d1e0fc?auto=format&fit=crop&w=800&q=80",
  images: [
    "https://images.unsplash.com/photo-1603791452906-b9d974d1e0fc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1622547748225-8e7b4bdfed0d?auto=format&fit=crop&w=800&q=80",
  ],
  description:
    "Smart speaker powered by Google Assistant for music, news, and home automation control.",
  specs: {
    Audio: "360° Sound",
    Connectivity: "Wi-Fi, Bluetooth",
    VoiceAssistant: "Google Assistant",
  },
  reviews: [
    { user: "Kabir", comment: "Perfect addition to my smart home." },
    { user: "Sneha", comment: "Sound quality is excellent for its size." },
  ],
},

{
  id: 16,
  title: "Amazon Echo Dot (5th Gen)",
  brand: "Amazon",
  category: "Smart Speakers",
  price: 5499,
  image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
  images: [
    "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1622547748225-8e7b4bdfed0d?auto=format&fit=crop&w=800&q=80",
  ],
  description:
    "Alexa-powered smart speaker with improved bass and LED clock display.",
  specs: {
    Audio: "Front-firing 1.73-inch speaker",
    Connectivity: "Wi-Fi, Bluetooth",
    VoiceAssistant: "Alexa",
  },
  reviews: [
    { user: "Ananya", comment: "Very responsive and compact." },
    { user: "Omkar", comment: "Good bass and clear voice output." },
  ],
},

// 🟨 GAMING CONSOLES
{
  id: 17,
  title: "Sony PlayStation 5",
  brand: "Sony",
  category: "Gaming Consoles",
  price: 55999,
  image: "https://images.unsplash.com/photo-1606813902787-8c7e303edcb0?auto=format&fit=crop&w=800&q=80",
  images: [
    "https://images.unsplash.com/photo-1606813902787-8c7e303edcb0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1606813899903-cd3be97b5d8e?auto=format&fit=crop&w=800&q=80",
  ],
  description:
    "Next-gen console offering 4K gaming, ultra-fast SSD, and the revolutionary DualSense controller.",
  specs: {
    GPU: "Custom RDNA 2",
    Storage: "825GB SSD",
    Output: "4K UHD",
    Controller: "DualSense Wireless",
  },
  reviews: [
    { user: "Viraj", comment: "Gameplay feels super immersive." },
    { user: "Isha", comment: "Lightning-fast load times!" },
  ],
},

{
  id: 18,
  title: "Xbox Series X",
  brand: "Microsoft",
  category: "Gaming Consoles",
  price: 54999,
  image: "https://images.unsplash.com/photo-1610484826967-09c5720778f2?auto=format&fit=crop&w=800&q=80",
  images: [
    "https://images.unsplash.com/photo-1610484826967-09c5720778f2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1610484826927-51eab5d2284f?auto=format&fit=crop&w=800&q=80",
  ],
  description:
    "The most powerful Xbox console ever with 12 teraflops of processing power and 4K gaming support.",
  specs: {
    GPU: "12 TFLOPS RDNA 2",
    Storage: "1TB SSD",
    Output: "4K HDR",
    RAM: "16GB GDDR6",
  },
  reviews: [
    { user: "Arjun", comment: "Ultimate performance for Xbox Game Pass titles." },
    { user: "Neha", comment: "Runs quietly and super smooth." },
  ],
},

];

export default productData;
