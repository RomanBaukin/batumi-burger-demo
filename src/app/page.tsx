import Image from "next/image";
import {
  ArrowUpRight,
  Flame,
  Waves,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import Shop from "@/components/shop";

const questions = [
  [
    "Это настоящая бургерная?",
    "Пока только в нашем воображении. ЖАР — демонстрационный проект для портфолио. Название, меню и история вымышлены; изображения созданы с помощью ИИ.",
  ],
  [
    "Можно оформить заказ?",
    "Можно собрать корзину и пройти демонстрацию оформления. Заказ никуда не отправляется, оплата и персональные данные не запрашиваются.",
  ],
  [
    "Есть что-нибудь без мяса?",
    "Да, «Зелёный свет»: котлета из фасоли и чечевицы, авокадо, томат и зелень. Полный состав демоблюд есть в карточках меню.",
  ],
  [
    "Насколько острый «Огонь внутри»?",
    "В нашей концепции это бургер с халапеньо и острым соусом. Если хочется спокойнее, начни с «Того самого» или «Хруста и точки».",
  ],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#menu">
        Перейти к меню
      </a>
      <main>
        <Shop />
        <section
          className="approach section-wrap"
          id="about"
          aria-labelledby="approach-title"
        >
          <div className="section-top">
            <p className="eyebrow">02 / ДЕЛО В ДЕТАЛЯХ</p>
            <Flame size={24} />
          </div>
          <div className="approach-grid">
            <div>
              <h2 id="approach-title">
                ВСЁ ПРОСТО.
                <br />
                <span>ВСЁ ПО ДЕЛУ.</span>
              </h2>
              <p className="approach-intro">
                Хорошему бургеру не нужен повод.
                <br />
                Нужны хорошие ингредиенты и жар.
              </p>
              <div className="principles">
                <div>
                  <span>01</span>
                  <section>
                    <h3>Корочка решает</h3>
                    <p>
                      Прижимаем котлету к раскалённой поверхности. Получаем тот
                      самый хруст снаружи и сочность внутри.
                    </p>
                  </section>
                </div>
                <div>
                  <span>02</span>
                  <section>
                    <h3>Булочка держит удар</h3>
                    <p>
                      Мягкая бриошь, слегка поджаренная изнутри. Весь сок
                      остаётся там, где ему место.
                    </p>
                  </section>
                </div>
                <div>
                  <span>03</span>
                  <section>
                    <h3>Соус собирает всё</h3>
                    <p>
                      Добавляет характер, а не прячет вкус. От спокойной
                      классики до заметного огня.
                    </p>
                  </section>
                </div>
              </div>
            </div>
            <div className="approach-photo">
              <Image
                src="/images/bbq.webp"
                alt="Поджаренная говядина, чеддер и мягкая булочка крупным планом"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              <div className="photo-label">
                ПРОСТЫЕ ВЕЩИ.
                <br />
                СИЛЬНОЕ ВПЕЧАТЛЕНИЕ.<span>ИСКУССТВО ХОРОШЕГО БУРГЕРА</span>
              </div>
            </div>
          </div>
        </section>
        <section className="story section-wrap" aria-labelledby="story-title">
          <div className="story-icon">
            <Waves size={64} weight="thin" />
          </div>
          <p className="eyebrow">ПРИДУМАНО ДЛЯ БАТУМИ</p>
          <h2 id="story-title">
            СОЛЬ В ВОЗДУХЕ.
            <br />
            <span>ЖАР НА КУХНЕ.</span>
          </h2>
          <p>
            Мы придумали место, в которое хочется зайти после моря.
            <br className="desktop-break" /> С друзьями, с голодом, без особого
            повода.
            <br className="desktop-break" /> За бургером, который запомнится
            дольше заката.
          </p>
          <span className="story-coordinate">
            БАТУМИ, ГРУЗИЯ <span>✳</span> УВИДИМСЯ В ВООБРАЖЕНИИ
          </span>
        </section>
        <section
          className="delivery section-wrap"
          id="delivery"
          aria-labelledby="delivery-title"
        >
          <div className="delivery-grid">
            <div>
              <p className="eyebrow">03 / ТВОЙ ВЕЧЕР, ТВОИ ПРАВИЛА</p>
              <h2 id="delivery-title">
                ПЛАН НА ВЕЧЕР?
                <br />
                <span>УЖЕ ЕСТЬ.</span>
              </h2>
              <p>
                Выбирай любимое, добавляй что-нибудь хрустящее
                <br className="desktop-break" /> и собирай компанию. С меню мы
                поможем.
              </p>
              <a href="#menu" className="button primary">
                Собрать свой заказ <ArrowUpRight size={21} />
              </a>
            </div>
            <div className="delivery-note">
              <span className="delivery-number">
                ЖАР
                <br />С СОБОЙ<span>↗</span>
              </span>
              <div>
                <h3>Доставка в этой версии — демо</h3>
                <p>
                  Можно собрать заказ и посмотреть итоговую сумму. Курьера не
                  вызываем, адрес не запрашиваем.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="faq section-wrap" aria-labelledby="faq-title">
          <div>
            <p className="eyebrow">04 / ЕСТЬ ВОПРОС?</p>
            <h2 id="faq-title">
              ПАРА СЛОВ
              <br />
              <span>ПЕРЕД ЗАКАЗОМ.</span>
            </h2>
          </div>
          <div className="faq-list">
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="footer section-wrap">
        <div className="footer-top">
          <a className="brand footer-brand" href="#home">
            ЖАР<span className="brand-spark">✳</span>
          </a>
          <p>
            БУРГЕРЫ У ЧЁРНОГО МОРЯ.
            <br />С ХАРАКТЕРОМ. С АППЕТИТОМ.
          </p>
          <a href="#menu">
            К меню <ArrowRight size={22} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ЖАР · Батуми</span>
          <span className="demo-label">ДЕМОПРОЕКТ · ЗАКАЗЫ НЕ ПРИНИМАЮТСЯ</span>
          <a
            href="https://github.com/RomanBaukin"
            target="_blank"
            rel="noopener noreferrer"
          >
            Сайт: Роман Баукин <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </>
  );
}
