export type Category = "burgers" | "sides" | "drinks";
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  category: Category;
  image: string;
  badge?: string;
};
export const menu: MenuItem[] = [
  {
    id: "classic",
    name: "Тот самый",
    description:
      "Говядина, чеддер, томат, салат, маринованный огурец и наш соус.",
    price: 19,
    size: "280 г",
    category: "burgers",
    image: "/images/classic.webp",
    badge: "Начни с него",
  },
  {
    id: "double",
    name: "Двойной ЖАР",
    description:
      "Две смэш-котлеты, двойной чеддер, красный лук и фирменный соус.",
    price: 25,
    size: "360 г",
    category: "burgers",
    image: "/images/hero.webp",
    badge: "Фирменный",
  },
  {
    id: "spicy",
    name: "Огонь внутри",
    description: "Говядина, чеддер, халапеньо, острый соус и немного смелости.",
    price: 23,
    size: "300 г",
    category: "burgers",
    image: "/images/spicy.webp",
    badge: "Острый",
  },
  {
    id: "chicken",
    name: "Хруст и точка",
    description: "Курица в хрустящей панировке, свежий салат и сливочный соус.",
    price: 20,
    size: "290 г",
    category: "burgers",
    image: "/images/chicken.webp",
  },
  {
    id: "mushroom",
    name: "Лесной характер",
    description: "Говядина, обжаренные шампиньоны, сыр и нежный грибной соус.",
    price: 24,
    size: "310 г",
    category: "burgers",
    image: "/images/mushroom.webp",
  },
  {
    id: "veggie",
    name: "Зелёный свет",
    description: "Котлета из фасоли и чечевицы, авокадо, томат и зелень.",
    price: 21,
    size: "280 г",
    category: "burgers",
    image: "/images/veggie.webp",
    badge: "Без мяса",
  },
  {
    id: "fries",
    name: "Картофель фри",
    description: "Тонкий, золотистый, с морской солью. Соус на твой вкус.",
    price: 7,
    size: "150 г",
    category: "sides",
    image: "/images/fries.webp",
  },
  {
    id: "rings",
    name: "Луковые кольца",
    description: "Сладкий лук в хрустящей панировке с соусом BBQ.",
    price: 9,
    size: "160 г",
    category: "sides",
    image: "/images/rings.webp",
  },
  {
    id: "wedges",
    name: "Картофель с характером",
    description: "Пряные дольки с копчёной паприкой и чесночным соусом.",
    price: 8,
    size: "180 г",
    category: "sides",
    image: "/images/wedges.webp",
  },
  {
    id: "lemonade",
    name: "Лимонад цитрус",
    description: "Лимон, апельсин, мята и много льда.",
    price: 7,
    size: "400 мл",
    category: "drinks",
    image: "/images/lemonade.webp",
  },
  {
    id: "berry",
    name: "Ягодный лимонад",
    description: "Чёрная смородина, малина и лёгкая кислинка.",
    price: 8,
    size: "400 мл",
    category: "drinks",
    image: "/images/berry.webp",
  },
  {
    id: "cola",
    name: "Кола",
    description: "Холодная классика к горячему бургеру.",
    price: 5,
    size: "330 мл",
    category: "drinks",
    image: "/images/cola.webp",
  },
];
