export const SHOP = {
  name: "The Baker Ri",
  phone: "7087307505", // her WhatsApp number, country code, no + or spaces
  tagline: "Good things are baked here",
};

export const waLink = (text: string) =>
  `https://wa.me/${SHOP.phone}?text=${encodeURIComponent(text)}`;

export type Cake = {
  slug: string;
  name: string;
  desc: string;
  tag: string;
  image: string; // put the photo in public/cakes/<slug>.jpg
  featured?: boolean;
};

export const cakes: Cake[] = [
  { slug: "vanilla", name: "Classic Vanilla Dry Cake", tag: "Classic", desc: "Soft, buttery and golden. The everyday favourite for tea time.", image: "/cakes/vanilla.jpg", featured: true },
  { slug: "chocolate", name: "Chocolate Dry Cake", tag: "Chocolate", desc: "Deep, rich cocoa flavour for real chocolate lovers.", image: "/cakes/chocolate.jpg", featured: true },
  { slug: "marble", name: "Marble Dry Cake", tag: "Classic", desc: "Vanilla and chocolate swirled together in every slice.", image: "/cakes/marble.jpg", featured: true },
  { slug: "walnut", name: "Walnut Dry Cake", tag: "Nutty", desc: "Crunchy walnuts baked through a soft, golden crumb.", image: "/cakes/walnut.jpg" },
  { slug: "date-walnut", name: "Date & Walnut Dry Cake", tag: "Nutty", desc: "Naturally sweet dates with crunchy walnuts.", image: "/cakes/date-walnut.jpg", featured: true },
  { slug: "almond", name: "Almond Dry Cake", tag: "Nutty", desc: "Topped with toasted almond flakes.", image: "/cakes/almond.jpg" },
  { slug: "honey-almond", name: "Honey Almond Dry Cake", tag: "Nutty", desc: "Almonds with a gentle honey sweetness.", image: "/cakes/honey-almond.jpg" },
  { slug: "banana-walnut", name: "Banana Walnut Dry Cake", tag: "Fruity", desc: "Ripe banana and walnut, soft and homely.", image: "/cakes/banana-walnut.jpg" },
  { slug: "blueberry-banana", name: "Blueberry Banana Dry Cake", tag: "Fruity", desc: "Juicy blueberries in a banana cake.", image: "/cakes/blueberry-banana.jpg" },
  { slug: "fruit", name: "Fruit Dry Cake", tag: "Fruity", desc: "Colourful fruit pieces in every bite.", image: "/cakes/fruit.jpg" },
  { slug: "tutti-frutti", name: "Tutti Frutti Dry Cake", tag: "Fruity", desc: "Bright candied fruit in a soft vanilla loaf.", image: "/cakes/tutti-frutti.jpg", featured: true },
  { slug: "plum", name: "English Plum Cake", tag: "Festive", desc: "Dark, rich and fruity. A true celebration cake.", image: "/cakes/plum.jpg", featured: true },
  { slug: "dry-fruit", name: "Dry Fruit Cake", tag: "Festive", desc: "Loaded with nuts and dried fruits.", image: "/cakes/dry-fruit.jpg" },
  { slug: "choco-chip", name: "Choco Chip Dry Cake", tag: "Chocolate", desc: "Vanilla cake dotted with chocolate chips.", image: "/cakes/choco-chip.jpg" },
  { slug: "mava", name: "Mava Cake", tag: "Classic", desc: "Rich, milky and melt-in-the-mouth.", image: "/cakes/mava.jpg" },
  { slug: "coconut", name: "Coconut Cake", tag: "Classic", desc: "Soft cake with a coconut topping.", image: "/cakes/coconut.jpg" },
  { slug: "butter", name: "Butter Cake", tag: "Classic", desc: "Simple, buttery and perfectly golden.", image: "/cakes/butter.jpg" },
];

export const treats = ["Chocolate Chip Cookies", "Cumin Cookies", "Oatmeal Cookies", "Coconut Cookies", "Brownie Bites", "Almond Florentines"];