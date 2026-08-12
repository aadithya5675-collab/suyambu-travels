// Use the webp image paths as imported or absolute paths from public.
// Since Vite handles assets in 'public' directly or imported from src/assets,
// we will assume these images are in public/assets or we import them if we move assets.
// The user prompt said: "assets/vehicles/..." are already there. So they are at /assets/vehicles/ (served by Vite if we move assets to public, or we import them).
// I will move `assets/` to `public/assets/` during the process.

export const vehicles = [
  {
    id: "swift-dzire",
    name: "Swift Dzire",
    seats: 4,
    ac: true,
    price: "₹3,000",
    package: "100 km",
    image: "/assets/vehicles/swift-dzire.webp",
    wide: false
  },
  {
    id: "innova-crysta",
    name: "Innova Crysta",
    seats: 7,
    ac: true,
    price: "₹4,500",
    package: "100 km",
    image: "/assets/vehicles/innova-crysta.webp",
    wide: false
  },
  {
    id: "innova-hycross",
    name: "Innova Hycross",
    seats: 7,
    ac: true,
    price: "₹5,000",
    package: "100 km",
    image: "/assets/vehicles/innova-hycross.webp",
    wide: true // Wide feature span for complete fleet
  },
  {
    id: "tempo-traveller",
    name: "Tempo Traveller",
    seats: 12,
    ac: true,
    price: "Contact for Price",
    package: "",
    image: "/assets/vehicles/tempo-traveller.webp",
    wide: false
  },
  {
    id: "force-urbania",
    name: "Force Urbania",
    seats: 12,
    ac: true,
    price: "Contact for Price",
    package: "",
    image: "/assets/vehicles/force-urbania.webp",
    wide: false
  }
];
