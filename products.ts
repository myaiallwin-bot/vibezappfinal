export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'tops' | 'bottoms' | 'outerwear' | 'dresses' | 'shoes' | 'accessories' | 'activewear' | 'swimwear';
  gender: 'men' | 'women';
  badge?: string;
  trending?: boolean;
}

export const products: Product[] = [
  // Men's Tops
  { id: 1, name: "Vintage Band Tee", price: 899, image: "https://placehold.co/300x400/FF006E/FFFFFF?text=VINTAGE+TEE✨", category: 'tops', gender: 'men', badge: "HOT", trending: true },
  { id: 2, name: "Oversized Hoodie", price: 1599, image: "https://placehold.co/300x400/8338EC/FFFFFF?text=HOODIE🔥", category: 'tops', gender: 'men', badge: "TRENDING" },
  { id: 3, name: "Y2K Polo", price: 1299, image: "https://placehold.co/300x400/3A86FF/FFFFFF?text=POLO💙", category: 'tops', gender: 'men' },
  { id: 4, name: "Goth Flannel", price: 1499, image: "https://placehold.co/300x400/000000/FFFFFF?text=FLANNEL🖤", category: 'tops', gender: 'men', trending: true },
  
  // Men's Bottoms
  { id: 5, name: "Baggy Jeans", price: 2299, image: "https://placehold.co/300x400/06FFB4/000000?text=BAGGY+JEANS👖", category: 'bottoms', gender: 'men', badge: "VIBE" },
  { id: 6, name: "Cargo Pants", price: 1999, image: "https://placehold.co/300x400/FFBE0B/000000?text=CARGO🎒", category: 'bottoms', gender: 'men', trending: true },
  { id: 7, name: "Tech Shorts", price: 1199, image: "https://placehold.co/300x400/FB5607/FFFFFF?text=TECH+SHORTS⚡", category: 'bottoms', gender: 'men' },
  { id: 8, name: "Plaid Trousers", price: 2499, image: "https://placehold.co/300x400/FF4365/FFFFFF?text=PLAID🎀", category: 'bottoms', gender: 'men' },
  
  // Men's Outerwear
  { id: 9, name: "Puffer Jacket", price: 3999, image: "https://placehold.co/300x400/00F5FF/000000?text=PUFFER❄️", category: 'outerwear', gender: 'men', badge: "ESSENTIAL" },
  { id: 10, name: "Denim Jacket", price: 2499, image: "https://placehold.co/300x400/7209B7/FFFFFF?text=DENIM🧥", category: 'outerwear', gender: 'men' },
  { id: 11, name: "Bomber Jacket", price: 2999, image: "https://placehold.co/300x400/560BAD/FFFFFF?text=BOMBER✈️", category: 'outerwear', gender: 'men', trending: true },
  { id: 12, name: "Leather Jacket", price: 6999, image: "https://placehold.co/300x400/B5179E/FFFFFF?text=LEATHER🏍️", category: 'outerwear', gender: 'men', badge: "LUXE" },
  
  // Men's Shoes
  { id: 13, name: "Chunky Sneakers", price: 3299, image: "https://placehold.co/300x400/FF006E/FFFFFF?text=CHUNKY👟", category: 'shoes', gender: 'men', trending: true },
  { id: 14, name: "Skate Shoes", price: 1999, image: "https://placehold.co/300x400/FFBE0B/000000?text=SKATE🛹", category: 'shoes', gender: 'men' },
  { id: 15, name: "Combat Boots", price: 3999, image: "https://placehold.co/300x400/000000/FFFFFF?text=COMBAT⚔️", category: 'shoes', gender: 'men', badge: "EDGY" },
  { id: 16, name: "Retro Trainers", price: 2299, image: "https://placehold.co/300x400/3A86FF/FFFFFF?text=RETRO🕹️", category: 'shoes', gender: 'men' },
  
  // Men's Accessories
  { id: 17, name: "Beanie Hat", price: 699, image: "https://placehold.co/300x400/8338EC/FFFFFF?text=BEANIE🧢", category: 'accessories', gender: 'men' },
  { id: 18, name: "Chain Necklace", price: 1199, image: "https://placehold.co/300x400/FFD60A/000000?text=CHAIN⛓️", category: 'accessories', gender: 'men', trending: true },
  { id: 19, name: "Bucket Hat", price: 899, image: "https://placehold.co/300x400/06FFB4/000000?text=BUCKET🪣", category: 'accessories', gender: 'men', badge: "AESTHETIC" },
  { id: 20, name: "Rings Set", price: 999, image: "https://placehold.co/300x400/FB5607/FFFFFF?text=RINGS💍", category: 'accessories', gender: 'men' },
  
  // Men's Activewear
  { id: 21, name: "Gym Tank", price: 999, image: "https://placehold.co/300x400/00F5FF/000000?text=GYM+TANK💪", category: 'activewear', gender: 'men' },
  { id: 22, name: "Sweatpants", price: 1499, image: "https://placehold.co/300x400/7209B7/FFFFFF?text=SWEATPANTS🏃", category: 'activewear', gender: 'men', trending: true },
  { id: 23, name: "Compression Shirt", price: 1199, image: "https://placehold.co/300x400/FF4365/FFFFFF?text=COMPRESSION🎯", category: 'activewear', gender: 'men' },
  { id: 24, name: "Track Jacket", price: 1899, image: "https://placehold.co/300x400/560BAD/FFFFFF?text=TRACK🏁", category: 'activewear', gender: 'men' },
  
  // Women's Tops
  { id: 25, name: "Baby Tee", price: 799, image: "https://placehold.co/300x400/FF006E/FFFFFF?text=BABY+TEE👶", category: 'tops', gender: 'women', badge: "CUTE", trending: true },
  { id: 26, name: "Crop Top", price: 699, image: "https://placehold.co/300x400/FFBE0B/000000?text=CROP+TOP✂️", category: 'tops', gender: 'women' },
  { id: 27, name: "Mesh Top", price: 1099, image: "https://placehold.co/300x400/06FFB4/000000?text=MESH🕸️", category: 'tops', gender: 'women', trending: true },
  { id: 28, name: "Cardigan", price: 1399, image: "https://placehold.co/300x400/3A86FF/FFFFFF?text=CARDIGAN🧶", category: 'tops', gender: 'women' },
  
  // Women's Bottoms
  { id: 29, name: "Mini Skirt", price: 999, image: "https://placehold.co/300x400/8338EC/FFFFFF?text=MINI🎀", category: 'bottoms', gender: 'women', badge: "Y2K" },
  { id: 30, name: "Low Rise Jeans", price: 1999, image: "https://placehold.co/300x400/FF4365/FFFFFF?text=LOW+RISE👖", category: 'bottoms', gender: 'women', trending: true },
  { id: 31, name: "Pleated Skirt", price: 1299, image: "https://placehold.co/300x400/00F5FF/000000?text=PLEATED📐", category: 'bottoms', gender: 'women' },
  { id: 32, name: "Cargo Skirt", price: 1499, image: "https://placehold.co/300x400/7209B7/FFFFFF?text=CARGO+SKIRT🎒", category: 'bottoms', gender: 'women' },
  
  // Women's Outerwear
  { id: 33, name: "Faux Fur Coat", price: 4999, image: "https://placehold.co/300x400/FFD60A/000000?text=FAUX+FUR🐆", category: 'outerwear', gender: 'women', badge: "GLAM" },
  { id: 34, name: "Biker Jacket", price: 3499, image: "https://placehold.co/300x400/000000/FFFFFF?text=BIKER🏍️", category: 'outerwear', gender: 'women' },
  { id: 35, name: "Bolero Shrug", price: 999, image: "https://placehold.co/300x400/FF006E/FFFFFF?text=BOLERO🌸", category: 'outerwear', gender: 'women', trending: true },
  { id: 36, name: "Windbreaker", price: 1799, image: "https://placehold.co/300x400/06FFB4/000000?text=WIND💨", category: 'outerwear', gender: 'women' },
  
  // Women's Dresses
  { id: 37, name: "Slip Dress", price: 1599, image: "https://placehold.co/300x400/8338EC/FFFFFF?text=SLIP👗", category: 'dresses', gender: 'women', badge: "SEXY", trending: true },
  { id: 38, name: "Party Dress", price: 2499, image: "https://placehold.co/300x400/FFBE0B/000000?text=PARTY🎉", category: 'dresses', gender: 'women' },
  { id: 39, name: "Sun Dress", price: 1299, image: "https://placehold.co/300x400/FF4365/FFFFFF?text=SUN☀️", category: 'dresses', gender: 'women' },
  { id: 40, name: "Midi Dress", price: 1899, image: "https://placehold.co/300x400/3A86FF/FFFFFF?text=MIDI🌊", category: 'dresses', gender: 'women' },
  
  // Women's Shoes
  { id: 41, name: "Platform Boots", price: 2999, image: "https://placehold.co/300x400/000000/FFFFFF?text=PLATFORM👢", category: 'shoes', gender: 'women', badge: "ALT" },
  { id: 42, name: "Mary Janes", price: 2299, image: "https://placehold.co/300x400/FF006E/FFFFFF?text=MARY+JANES🎀", category: 'shoes', gender: 'women', trending: true },
  { id: 43, name: "Chunky Sneakers", price: 2799, image: "https://placehold.co/300x400/06FFB4/000000?text=CHUNKY👟", category: 'shoes', gender: 'women' },
  { id: 44, name: "Heeled Sandals", price: 1999, image: "https://placehold.co/300x400/FFD60A/000000?text=HEELS👠", category: 'shoes', gender: 'women' },
  
  // Women's Accessories
  { id: 45, name: "Butterfly Clips", price: 499, image: "https://placehold.co/300x400/FFBE0B/000000?text=BUTTERFLY🦋", category: 'accessories', gender: 'women', badge: "CUTE", trending: true },
  { id: 46, name: "Crossbody Bag", price: 1799, image: "https://placehold.co/300x400/8338EC/FFFFFF?text=BAG👜", category: 'accessories', gender: 'women' },
  { id: 47, name: "Layered Necklace", price: 1199, image: "https://placehold.co/300x400/FF4365/FFFFFF?text=LAYERS⛓️", category: 'accessories', gender: 'women' },
  { id: 48, name: "Hair Scarf", price: 699, image: "https://placehold.co/300x400/00F5FF/000000?text=SCARF🧣", category: 'accessories', gender: 'women' },
  
  // Women's Activewear
  { id: 49, name: "Sports Bra", price: 999, image: "https://placehold.co/300x400/7209B7/FFFFFF?text=SPORTS+BRA🏋️", category: 'activewear', gender: 'women' },
  { id: 50, name: "Bike Shorts", price: 1199, image: "https://placehold.co/300x400/560BAD/FFFFFF?text=BIKE+SHORTS🚴", category: 'activewear', gender: 'women', trending: true },
  { id: 51, name: "Yoga Set", price: 1999, image: "https://placehold.co/300x400/FF006E/FFFFFF?text=YOGA🧘", category: 'activewear', gender: 'women', badge: "SET" },
  { id: 52, name: "Track Suit", price: 2499, image: "https://placehold.co/300x400/06FFB4/000000?text=TRACK+SUIT🏃", category: 'activewear', gender: 'women' },
  
  // Women's Swimwear
  { id: 53, name: "Bikini Set", price: 1499, image: "https://placehold.co/300x400/FFBE0B/000000?text=BIKINI👙", category: 'swimwear', gender: 'women', badge: "SUMMER", trending: true },
  { id: 54, name: "One Piece", price: 1799, image: "https://placehold.co/300x400/3A86FF/FFFFFF?text=ONE+PIECE🏊", category: 'swimwear', gender: 'women' },
  { id: 55, name: "Beach Cover", price: 1199, image: "https://placehold.co/300x400/FF4365/FFFFFF?text=COVER+UP🏖️", category: 'swimwear', gender: 'women' },
  { id: 56, name: "High Waisted", price: 1399, image: "https://placehold.co/300x400/8338EC/FFFFFF?text=HIGH+WAIST⬆️", category: 'swimwear', gender: 'women' },
  
  // Men's Swimwear
  { id: 57, name: "Swim Trunks", price: 1099, image: "https://placehold.co/300x400/00F5FF/000000?text=TRUNKS🩳", category: 'swimwear', gender: 'men' },
  { id: 58, name: "Board Shorts", price: 1399, image: "https://placehold.co/300x400/FF006E/FFFFFF?text=BOARD+SHORTS🏄", category: 'swimwear', gender: 'men', trending: true },
  { id: 59, name: "Rash Guard", price: 1299, image: "https://placehold.co/300x400/7209B7/FFFFFF?text=RASH+GUARD🛡️", category: 'swimwear', gender: 'men' },
  { id: 60, name: "Beach Shirt", price: 999, image: "https://placehold.co/300x400/06FFB4/000000?text=BEACH+SHIRT🌺", category: 'swimwear', gender: 'men', badge: "VACAY" },
];