"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Bag,
  Check,
  Minus,
  Plus,
  X,
  List,
  Flame,
  Leaf,
} from "@phosphor-icons/react";
import { menu, type Category } from "@/lib/menu";
import { restoreCart, updateQuantity, cartTotal, type Cart } from "@/lib/cart";

const storageKey = "zhar-cart-v1";
const categories: { id: Category; name: string }[] = [
  { id: "burgers", name: "Бургеры" },
  { id: "sides", name: "Закуски" },
  { id: "drinks", name: "Напитки" },
];

export default function Shop() {
  const [category, setCategory] = useState<Category>("burgers");
  const [cart, setCart] = useState<Cart>({});
  const [ready, setReady] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState("");
  const [completed, setCompleted] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const total = cartTotal(cart, menu);

  useEffect(() => {
    // Hydrate after mount so the server and first browser render agree.
    let saved: Cart = {};
    try {
      saved = restoreCart(localStorage.getItem(storageKey), menu);
    } catch {
      /* Storage may be disabled. */
    }
    const timer = setTimeout(() => {
      setCart(saved);
      setReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch {
      /* The cart still works in memory. */
    }
  }, [cart, ready]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 2600);
    return () => clearTimeout(timer);
  }, [notice]);

  function change(id: string, delta: number) {
    setCart((current) => updateQuantity(current, id, delta));
  }
  function openCart() {
    setCompleted(false);
    setMobileNav(false);
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    dialog.current?.close();
    document.body.style.overflow = "";
  }

  return (
    <>
      <header className="header">
        <a className="brand" href="#home" aria-label="ЖАР — на главную">
          ЖАР<span className="brand-spark">✳</span>
        </a>
        <span className="brand-caption">
          БУРГЕРЫ У<br />
          ЧЁРНОГО МОРЯ
        </span>
        <nav
          className={mobileNav ? "nav is-open" : "nav"}
          aria-label="Главная навигация"
        >
          <a href="#menu" onClick={() => setMobileNav(false)}>
            Меню
          </a>
          <a href="#about" onClick={() => setMobileNav(false)}>
            Наш подход
          </a>
          <a href="#delivery" onClick={() => setMobileNav(false)}>
            Доставка
          </a>
        </nav>
        <span className="header-location">
          <span /> Батуми, Грузия
        </span>
        <button
          className="cart-button"
          onClick={openCart}
          aria-label={`Открыть корзину, товаров: ${count}`}
        >
          <Bag size={19} /> <span>Корзина</span>
          <b>{count}</b>
        </button>
        <button
          className="mobile-toggle icon-button"
          onClick={() => setMobileNav(!mobileNav)}
          aria-label={mobileNav ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={mobileNav}
        >
          {mobileNav ? <X size={24} /> : <List size={24} />}
        </button>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src="/images/hero.webp"
          alt="Двойной бургер с расплавленным чеддером и поджаренной говядиной"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="small-star">✳</span> БАТУМИ. МОРЕ. БУРГЕРЫ.{" "}
            <span className="demo-chip">ДЕМО</span>
          </p>
          <h1 id="hero-title">
            ГОРОД У МОРЯ.
            <br />
            БУРГЕРЫ
            <br />
            <span>С ОГНЁМ.</span>
          </h1>
          <p className="hero-description">
            Хрустящая корочка. Сочный центр.
            <br />И планы на вечер, которые стали вкуснее.
          </p>
          <a className="button primary" href="#menu">
            Смотреть меню <ArrowUpRight size={22} />
          </a>
          <div className="hero-note">
            <span className="note-line" /> Собери свой идеальный демозаказ
          </div>
        </div>
        <div className="hero-stamp">
          <Flame size={28} weight="fill" />
          <span>
            ЖАРИМ
            <br />С ХАРАКТЕРОМ
          </span>
        </div>
        <div className="hero-caption">
          <span>В ГЛАВНОЙ РОЛИ</span>
          <b>Двойной ЖАР</b>
          <span>Две котлеты. Двойной чеддер.</span>
          <strong>25 ₾</strong>
        </div>
        <a className="hero-scroll" href="#menu" aria-label="Перейти к меню">
          <ArrowDown size={18} />
        </a>
        <span className="hero-index">01 / С РАЗОГРЕВА</span>
      </section>

      <div className="ticker" aria-label="Наш подход">
        <span>ЖАРЬ. ЕШЬ. ПОВТОРИ.</span>
        <span aria-hidden="true">✳</span>
        <span>БОЛЬШЕ ВКУСА</span>
        <span aria-hidden="true">✳</span>
        <span>МЕНЬШЕ ПРАВИЛ</span>
        <span aria-hidden="true">✳</span>
        <span>СДЕЛАНО С ЖАРОМ</span>
        <span aria-hidden="true">✳</span>
      </div>

      <section
        className="menu-section section-wrap"
        id="menu"
        aria-labelledby="menu-title"
      >
        <div className="section-top">
          <p className="eyebrow">01 / МЕНЮ</p>
          <span className="section-aside">Все цены в лари · Демо-меню</span>
        </div>
        <div className="menu-heading">
          <h2 id="menu-title">
            НУ ЧТО,
            <br />
            <span>ТЕБЕ КАКОЙ?</span>
          </h2>
          <p>
            От первой любви к классике
            <br />
            до «мне, пожалуйста, поострее».
            <br />
            Найди свой ЖАР.
          </p>
        </div>
        <div className="menu-toolbar">
          <div className="category-list" aria-label="Категории меню">
            {categories.map((item) => (
              <button
                key={item.id}
                aria-pressed={category === item.id}
                className={
                  category === item.id ? "category active" : "category"
                }
                onClick={() => setCategory(item.id)}
              >
                {item.name}
                <span>
                  {menu
                    .filter((product) => product.category === item.id)
                    .length.toString()
                    .padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
          <span className="menu-hint">
            Хороший вечер начинается здесь <ArrowDown size={17} />
          </span>
        </div>
        <div className="product-grid">
          {menu
            .filter((item) => item.category === category)
            .map((item, index) => (
              <article className="product" key={item.id}>
                <div className="product-visual">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={item.id === "double" ? "double-image" : ""}
                  />
                  {item.badge && (
                    <span
                      className={`badge ${item.id === "spicy" ? "hot" : ""}`}
                    >
                      {item.id === "veggie" && <Leaf size={13} />}
                      {item.id === "spicy" && <Flame size={13} />}
                      {item.badge}
                    </span>
                  )}
                  <span className="product-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="product-title">
                  <h3>{item.name}</h3>
                  <span>{item.size}</span>
                </div>
                <p className="product-description">{item.description}</p>
                <div className="product-bottom">
                  <strong>
                    {item.price} <span>₾</span>
                  </strong>
                  <button
                    className={
                      cart[item.id] ? "add-button added" : "add-button"
                    }
                    disabled={!ready || (cart[item.id] ?? 0) >= 20}
                    onClick={() => {
                      change(item.id, 1);
                      setNotice(`${item.name} — в корзине`);
                    }}
                    aria-label={`Добавить ${item.name}`}
                  >
                    {cart[item.id] ? (
                      <>
                        В корзине: {cart[item.id]} <Plus size={18} />
                      </>
                    ) : (
                      <>
                        В корзину <Plus size={18} />
                      </>
                    )}
                  </button>
                </div>
              </article>
            ))}
        </div>
        <p className="allergen-note">
          Меню и цены придуманы для демонстрации сайта. Реальные заказы не
          принимаются.
        </p>
      </section>

      <div className={notice ? "toast visible" : "toast"} role="status">
        <Check size={18} />
        {notice}
      </div>
      {count > 0 && (
        <button className="mobile-cart" onClick={openCart}>
          <Bag size={20} /> Твой заказ · {count}
          <strong>
            {total} ₾ <ArrowUpRight size={19} />
          </strong>
        </button>
      )}

      <dialog
        ref={dialog}
        className="cart-dialog"
        onClose={() => {
          document.body.style.overflow = "";
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeCart();
        }}
        aria-labelledby="cart-title"
      >
        <div className="cart-panel">
          <div className="cart-heading">
            <div>
              <p className="eyebrow">СОБЕРЁМ ЧТО-НИБУДЬ ВКУСНОЕ</p>
              <h2 id="cart-title">
                {completed ? "ЭТО БЫЛО ВКУСНО." : "ТВОЙ ЗАКАЗ"}
              </h2>
            </div>
            <button
              className="icon-button"
              onClick={closeCart}
              aria-label="Закрыть корзину"
            >
              <X size={24} />
            </button>
          </div>
          {completed ? (
            <div className="cart-empty">
              <Check size={56} />
              <h3>Демозаказ собран!</h3>
              <p>
                Это демонстрация сайта. Заказ никуда не отправлен, деньги не
                списаны. Спасибо, что попробовал!
              </p>
              <button className="button primary" onClick={closeCart}>
                Вернуться к меню <ArrowUpRight size={20} />
              </button>
            </div>
          ) : count === 0 ? (
            <div className="cart-empty">
              <Bag size={56} weight="thin" />
              <h3>Пока без бургера?</h3>
              <p>Самое время выбрать своего фаворита.</p>
              <a className="button primary" href="#menu" onClick={closeCart}>
                Открыть меню <ArrowUpRight size={20} />
              </a>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {menu
                  .filter((item) => cart[item.id])
                  .map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.price} ₾ / шт.</p>
                        <div className="quantity">
                          <button
                            onClick={() => change(item.id, -1)}
                            aria-label={`Уменьшить ${item.name}`}
                          >
                            <Minus size={15} />
                          </button>
                          <span aria-label={`Количество ${item.name}`}>
                            {cart[item.id]}
                          </span>
                          <button
                            disabled={cart[item.id] >= 20}
                            onClick={() => change(item.id, 1)}
                            aria-label={`Увеличить ${item.name}`}
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      </div>
                      <div className="cart-item-right">
                        <strong>{item.price * cart[item.id]} ₾</strong>
                        <button
                          onClick={() =>
                            setCart((current) => {
                              const next = { ...current };
                              delete next[item.id];
                              return next;
                            })
                          }
                          aria-label={`Удалить ${item.name}`}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="cart-summary">
                <div>
                  <span>Итого</span>
                  <strong data-testid="cart-total">{total} ₾</strong>
                </div>
                <p>Демонстрация · без оплаты и доставки</p>
                <button
                  className="button primary"
                  onClick={() => {
                    setCart({});
                    setCompleted(true);
                  }}
                >
                  Оформить демозаказ <ArrowUpRight size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
