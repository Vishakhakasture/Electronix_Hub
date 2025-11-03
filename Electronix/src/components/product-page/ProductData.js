const productData = [
  // 🟦 SMARTPHONES
  {
    id: 1,
    title: "iPhone 14 Pro",
    brand: "Apple",
    category: "iPhones",
    price: 129999,
    image: "data:image/jpeg;base64,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",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3uMD4p_JEWcqyNLXbRgy8a2_rU92-WuiuibzFXKr3RQyVVF21IvlgjybEnH-Mx8aNAAw&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQORqW-ex6KAtNM6i2H16NRGM52PRptTnm3lqGLABS4KXu-HD93JowIN-5UikYvkQXyqjY&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb7Jwn-B4Nttc8fs1d43su_ukb5sdAQrUVGu-u2IJp8EvkrGePjP263O1YLEU2GYAMxJM&usqp=CAU",
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
    image: "data:image/webp;base64,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",
    images: [
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRpyxbvU39Th9K-nL9qhmu_Quk3pLTP1jsjaHTyCg_5IgrKw1yorevga80A7hQT6jFhZeDhpR1Qit7s6xmvVSWsW5W-kGDQSUBpejjgyRejtpCEgka_hqJu52lVKw&usqp=CAc",
      "data:image/jpeg;base64,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",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnXpwsrmIgGO1sB4DQN99mw3eafo_L_LBlzQ&s",
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
    image: "https://media.emaxme.com/i/emax/100000347717_1?$pdp-d-sqr$&$quality-standard$&fmt=auto",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/6/316874613/ZQ/DR/VJ/41354006/apple-macbook-air-500x500.PNG",
      "https://shopdunk.com/images/thumbs/0005888_air-m2-silver_1600.jpeg",
      "https://dalilalmustaqbil.com/cdn/shop/files/IMG_4089_e04cf091-1bfe-4768-9969-d501a6567beb.jpg?v=1728397821",
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
    image: "https://www.jiomart.com/images/product/original/493837767/hp-victus-15-fa0998tx-gaming-laptop-12th-gen-intel-core-i5-12450h-16-gb-512-gb-ssd-nvidia-geforce-windows-11-home-full-hd-39-6-cm-15-6-inch-digital-o493837767-p602470274-0-202306151930.jpeg?im=Resize=(420,420)",
    images: [
      "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_156017845?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402",
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/61/7350032/1.jpg?6068",
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
    image: "https://www.drei.at/media/common/shop/handys/apple/apple-watch-9/apple-watch-9-45-mitternacht-1-sportloop_11_Image.png",
    images: [
      "https://rukminim2.flixcart.com/image/480/640/xif0q/smartwatch/q/a/l/-original-imagte4s6z5ykbzb.jpeg?q=90",
      "https://images.wsj.net/im-854269?width=1280&size=1",
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
    image: "https://m.media-amazon.com/images/I/71hUqNCL-zL._UF1000,1000_QL80_.jpg",
    images: [
      "https://images-eu.ssl-images-amazon.com/images/I/61lKe3Lp68L._AC_UL210_SR210,210_.jpg",
      "https://www.gonoise.com/cdn/shop/files/Carousel-500x500-1_3029f4e1-69ab-48fe-a088-41f4e79e2f2f_grande.png?v=1697711374",
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
    image: "https://sony.scene7.com/is/image/sonyglobalsolutions/Primary_image_black?$S7Product$&fmt=png-alpha",
    images: [
      "https://www.istudio.store/cdn/shop/files/SonyWF-1000XM5-Black._001.jpg?v=1733912717&width=823",
      "https://bcec.vn/upload/original-image/cdn1/images/202303/source_img/tai-nghe-sony-wf-1000xm5-P8773-1679561751260.jpg",
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
    image: "https://friskyglobal.com/wp-content/uploads/2023/08/Black-main-img3_600x-Black.webp",
    images: [
      "https://nayejaisa.com/wp-content/uploads/2022/07/Images-2-1.webp",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTba6hDGPtK2js5YyVv8c8mV3PW8i1RH3B1JKrobOiuqtUQz2kNigD9NVllQ4D_tbk9Itc&usqp=CAU",
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
    image: "https://m.media-amazon.com/images/I/51yFk+hRprL._AC_UF1000,1000_QL80_.jpg",
    images: [
      "https://media.tatacroma.com/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/267969_2_lqhhba.png",
      "https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fcategories%2Fcameras%2Fdslr-cameras%2Fcanon-1500d%2Fcanon-1500D-on-rent-sharepal-11.webp&w=3840&q=75",
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
    image: "https://m.media-amazon.com/images/I/81w6e+7s1dL._AC_UF350,350_QL80_.jpg",
    images: [
      "https://action-jo-v2.action.jo/cdn-cgi/image/w=220,h=220,f=webp,q=90,fit=contain/https://action-v2-backend.b-cdn.net/25516/1716035570_0519480be636d17dfc82.png",
      "https://i5.walmartimages.com/asr/d7d07d36-da66-4506-a263-cff472fe1b86.100400ed6c288ded26cfb937debc0cbc.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
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
  image: "https://www.q3tech.com/wp-content/uploads/2024/05/Apple-m4-chip.png",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMVXZIQIDypoz4pD9iEMw3PxvxKN5CcD7UGqgJD2UbLIILtUsjrjNOm7pX0YMXu2u93fQ&usqp=CAU",
    "https://9to5mac.com/wp-content/uploads/sites/6/2025/06/ipad-pro-m5.jpg?quality=82&strip=all&w=1024",
    "https://cdn.istanbulticaretgazetesi.com/front/uploads/haber/842x474/yeni-ipad-pro-m5-cipiyle-geliyor_842x474_EVqtGZafbN.webp",
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
  image: "https://static1.anpoimages.com/wordpress/wp-content/uploads/2023/08/samsung-galaxy-tab-s9-ultra-colorful-wallpaper.jpg",
  images: [
    "https://media.cnn.com/api/v1/images/stellar/prod/img-5825.jpg?q=h_2267,w_4030,x_0,y_0",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjIPP__bXehJKxnnE-3RiA21Pc0Z_7uBL1iV9e4WGFm5y1AvGLzufG47DqPmB2Ux468B8&usqp=CAU",
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
  image: "https://photos5.appleinsider.com/price_guide/magsafe-accessories-pp-header.png",
  images: [
    "https://grandhub.co.ke/wp-content/uploads/2023/07/Apple-MagSafe-Battery-Pack-in-Kenya.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm_H0j4FZz3KLRA1EXXp9OTBB6es4DweDcPvEFZBWFBrPobQ7aW90VtYSboZjI1E3jmz8&usqp=CAU",
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
  image: "https://bcdn.alfuhod.com/media/catalog/product/cache/c49c6d580f7f24178041719fd0fed908/image/10143b16b/anker-powercore-metro-essential-20000-pd-black-fabric-limited-edition.png",
  images: [
    "https://telefon.gr/image/cache/catalog/yukatel/193575000893-550x550.png",
    "https://i5.walmartimages.com/asr/ec3f5a5f-1459-48de-992d-523d1e75f597.2e4295b277e2d2a61ef9ac0d268a9010.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
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
  image: "https://bcdn.alfuhod.com/media/catalog/product/cache/c49c6d580f7f24178041719fd0fed908/image/10143b16b/anker-powercore-metro-essential-20000-pd-black-fabric-limited-edition.png",
  images: [
    "https://telefon.gr/image/cache/catalog/yukatel/193575000893-550x550.png",
    "https://i5.walmartimages.com/asr/ec3f5a5f-1459-48de-992d-523d1e75f597.2e4295b277e2d2a61ef9ac0d268a9010.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
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
  image: "https://m.media-amazon.com/images/I/71jNr0MoZEL._AC_UF894,1000_QL80_.jpg",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyweArk2x45bMndgGdQkFtGjP8jltQhz9X6rPvc9JzCqhdcRMbrKn32TcV7Qhs_f_0eU4&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDkdXHG7PYT3Cby9HrAWM62AVFRQfkFrOboZIXQfWRhkHzD_UIpIQ2itiTVRhp3gzEtII&usqp=CAU",
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
  image: "https://i.extremetech.com/imagery/content-types/06EtefH72LzkSgz3DA4c9ch/hero-image.fit_lim.v1678673314.jpg",
  images: [
    "https://static.independent.co.uk/2024/02/23/16/playstation%205%20disc%20edition%20%281%29.png",
    "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/110/MTA-85949264/oem_oem_full01.jpg",
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
  image: "https://cms-assets.xboxservices.com/assets/bc/40/bc40fdf3-85a6-4c36-af92-dca2d36fc7e5.png?n=642227_Hero-Gallery-0_A1_857x676.png",
  images: [
    "https://m.media-amazon.com/images/I/71aBXvHYUpL._AC_UF894,1000_QL80_.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6jHkDskeGpuklFe9YkdHfxTYXcAFhOC4oN1t1IMkkvWMqIVy5F2_vKxyV14viKYLv53c&usqp=CAU",
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
