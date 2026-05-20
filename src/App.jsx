import React, { useEffect, useMemo, useState } from "react";

const CONFIG = {
  booking: "https://nefioletovo.clients.site/",
  whatsapp: "https://wa.me/79XXXXXXXXX",
  telegram: "https://t.me/username",
  maps: "https://yandex.ru/maps/-/CHX1J8~Q",
  phone: "+7 (000) 000-00-00",
};

const services = [
  {
    title: "Маникюр",
    tag: "руки",
    price: "от 3 500 ₽",
    text: "Аккуратная обработка, покрытие, укрепление и дизайн под ваш стиль.",
    emoji: "✨",
  },
  {
    title: "Педикюр",
    tag: "ноги",
    price: "от 3 000 ₽",
    text: "Комфортный уход, гладкость стоп, стойкое покрытие и ощущение лёгкости.",
    emoji: "🦶",
  },
  {
    title: "SMART-педикюр",
    tag: "premium",
    price: "от 4 000 ₽",
    text: "Современная обработка стоп для тех, кто хочет чистый и аккуратный результат.",
    emoji: "💎",
  },
  {
    title: "Руки + ноги",
    tag: "комплекс",
    price: "по записи",
    text: "Для занятых клиентов: закрываем маникюр и педикюр за один визит.",
    emoji: "⚡",
  },
  {
    title: "Мужской уход",
    tag: "без покрытия",
    price: "по прайсу",
    text: "Аккуратно, спокойно, без лишнего и без ощущения, что вы не на своём месте.",
    emoji: "🖤",
  },
  {
    title: "VIP у Милы",
    tag: "15 лет опыта",
    price: "VIP",
    text: "Запись к основателю студии и главному мастеру Миле Марченковой.",
    emoji: "👑",
  },
];

const benefits = [
  ["⚡", "Скорость без потери качества", "Мы ценим ваше время и умеем работать быстро без ощущения конвейера."],
  ["🧼", "Стерильность и чистота", "Инструменты, расходники и рабочее место должны вызывать спокойствие."],
  ["💜", "Фиолетовая атмосфера", "Студия с характером, которую запоминают после первого визита."],
  ["👑", "Мила Марченкова", "15 лет опыта, скоростной маникюр и педикюр высокого уровня."],
];

const reviews = [
  ["Анна", "Очень красиво, быстро и аккуратно. Студия не похожа на обычный кабинет."],
  ["Екатерина", "Понравилась атмосфера и качество. Видно, что здесь действительно не всё равно."],
  ["Мария", "Уютно, чисто, спокойно. Маникюр держится отлично, вернусь снова."],
];

function scrollToId(id) {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CursorShadow() {
  const [position, setPosition] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div
      className="cursor-shadow"
      style={{ transform: `translate(${position.x - 240}px, ${position.y - 240}px)` }}
    />
  );
}

function Button({ children, href = CONFIG.booking, onClick, variant = "primary" }) {
  if (onClick) {
    return (
      <button className={`btn ${variant}`} onClick={onClick}>
        <span>{children}</span>
        <b>→</b>
      </button>
    );
  }
  return (
    <a className={`btn ${variant}`} href={href}>
      <span>{children}</span>
      <b>→</b>
    </a>
  );
}

function VideoCover({ label = "VIOLET VIDEO", title = "Не Фиолетово", compact = false }) {
  return (
    <div className={`video-cover ${compact ? "compact" : ""}`}>
      <div className="video-layer one" />
      <div className="video-layer two" />
      <div className="video-layer three" />
      <div className="video-noise" />
      <div className="video-content">
        <div className="video-label">{label}</div>
        <div className="video-title">{title}</div>
        {!compact && <p>Генеративная видео-обложка. Можно заменить на реальный MP4/WebM.</p>}
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    ["Услуги", "services"],
    ["Почему мы", "benefits"],
    ["Мила", "mila"],
    ["Галерея", "gallery"],
    ["Обучение", "academy"],
    ["Контакты", "contacts"],
  ];

  return (
    <header className="header">
      <button className="brand" onClick={() => scrollToId("top")}>
        <span className="brand-mark">✦</span>
        <span>
          <strong>Не Фиолетово</strong>
          <small>speed nail studio</small>
        </span>
      </button>

      <nav className="desktop-nav">
        {nav.map(([name, id]) => (
          <button key={id} onClick={() => scrollToId(id)}>{name}</button>
        ))}
      </nav>

      <div className="header-actions">
        <a className="ghost-link" href={CONFIG.whatsapp}>WhatsApp</a>
        <Button>Записаться</Button>
      </div>

      <button className="menu-button" onClick={() => setOpen(true)}>☰</button>

      {open && (
        <div className="mobile-backdrop" onClick={() => setOpen(false)}>
          <div className="mobile-menu" onClick={(event) => event.stopPropagation()}>
            <div className="mobile-top">
              <strong>Меню</strong>
              <button onClick={() => setOpen(false)}>×</button>
            </div>
            {nav.map(([name, id]) => (
              <button
                key={id}
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => scrollToId(id), 80);
                }}
              >
                {name}
              </button>
            ))}
            <Button>Записаться онлайн</Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ openBookingModal }) {
  return (
    <section id="top" className="hero section-dark">
      <div className="hero-bg" />
      <div className="container hero-grid">
        <div className="hero-copy reveal">
          <div className="pill">★ Рейтинг 5.0 · Лобачевского 118 к4 · Аминьевская</div>
          <h1>
            Маникюр, который <span>невозможно не заметить</span>
          </h1>
          <p>
            «Не Фиолетово» — фиолетовая студия скоростного маникюра и педикюра в Москве. Быстро, чисто, красиво и по стандарту Милы Марченковой.
          </p>
          <div className="hero-buttons">
            <Button onClick={openBookingModal}>Записаться онлайн</Button>
            <Button variant="secondary" onClick={() => scrollToId("services")}>Выбрать услугу</Button>
            <Button variant="dark" href={CONFIG.maps}>Построить маршрут</Button>
          </div>
          <div className="stats">
            <div><b>15 лет</b><small>опыт Милы</small></div>
            <div><b>4+ года</b><small>работает студия</small></div>
            <div><b>5.0</b><small>рейтинг</small></div>
            <div><b>7 дней</b><small>гарантия</small></div>
          </div>
        </div>

        <div className="hero-visual reveal delay">
          <VideoCover label="VIOLET EXPERIENCE" title="Не Фиолетово" />
          <div className="floating-card gift-card">
            <b>Первый визит</b>
            <span>подарок к услуге</span>
          </div>
          <div className="floating-card rating-card">
            <b>5.0 ★</b>
            <span>клиенты возвращаются</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ openServiceModal }) {
  return (
    <section id="services" className="section light">
      <div className="container">
        <div className="section-head reveal">
          <span>услуги</span>
          <h2>Не прайс. Сценарии красоты.</h2>
          <p>Клиент должен быстро понять, что выбрать: маникюр, педикюр, комплекс, мужской уход или запись к Миле.</p>
        </div>

        <div className="service-grid">
          {services.map((service, index) => (
            <button className="service-card reveal" key={service.title} onClick={() => openServiceModal(service)}>
              <div className="service-video">
                <VideoCover label={service.tag} title={service.emoji} compact />
              </div>
              <div className="service-body">
                <div className="service-row">
                  <h3>{service.title}</h3>
                  <strong>{service.price}</strong>
                </div>
                <p>{service.text}</p>
                <span>Подробнее и записаться →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section id="benefits" className="section section-dark benefits-section">
      <div className="container">
        <div className="section-head reveal white">
          <span>почему мы</span>
          <h2>Здесь не всё равно</h2>
          <p>Сайт продаёт не только услугу. Он продаёт чувство: быстро, красиво, чисто, уверенно и с заботой.</p>
        </div>

        <div className="benefit-grid">
          {benefits.map(([emoji, title, text]) => (
            <div className="benefit-card reveal" key={title}>
              <div className="benefit-emoji">{emoji}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mila() {
  return (
    <section id="mila" className="section light mila-section">
      <div className="container two-col">
        <div className="mila-photo reveal">
          <VideoCover label="FOUNDER VIDEO" title="Мила" />
        </div>
        <div className="mila-copy reveal delay">
          <span className="mini-label">основатель</span>
          <h2>Мила Марченкова — лицо качества и скорости</h2>
          <p>
            Мила — основатель «Не Фиолетово», главный мастер и будущий наставник. 15 лет опыта, скоростной маникюр и педикюр высокого уровня, собственный подход к качеству и сервису.
          </p>
          <div className="mila-points">
            <div><b>15 лет</b><small>опыта</small></div>
            <div><b>VIP</b><small>запись</small></div>
            <div><b>Метод</b><small>обучения</small></div>
          </div>
          <div className="hero-buttons">
            <Button>Записаться к Миле</Button>
            <Button variant="secondary" onClick={() => scrollToId("academy")}>Обучение мастеров</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState(null);
  const items = ["Маникюр", "Педикюр", "До / После", "Интерьер", "Стерильность", "Мила в работе"];

  return (
    <section id="gallery" className="section light">
      <div className="container">
        <div className="section-head reveal">
          <span>галерея</span>
          <h2>Обложки, которые выглядят как видео</h2>
          <p>Здесь можно поставить реальные короткие MP4/WebM: работы, интерьер, процесс, стерилизация, вход в студию.</p>
        </div>

        <div className="gallery-grid">
          {items.map((item) => (
            <button className="gallery-card reveal" key={item} onClick={() => setActive(item)}>
              <VideoCover label="VIDEO COVER" title={item} compact />
            </button>
          ))}
        </div>
      </div>

      {active && (
        <Modal title={active} onClose={() => setActive(null)}>
          <VideoCover label="FULLSCREEN VIDEO" title={active} />
          <p className="modal-text">Сюда ставим реальное видео или фото: результат, процесс, интерьер или стерилизацию.</p>
          <Button>Записаться после просмотра</Button>
        </Modal>
      )}
    </section>
  );
}

function Academy() {
  return (
    <section id="academy" className="section academy section-dark">
      <div className="container two-col">
        <div className="academy-copy reveal">
          <span className="mini-label white-label">школа Милы</span>
          <h2>Обучение мастеров как отдельный продукт бренда</h2>
          <p>
            Для мастеров, которые хотят работать быстрее, чище, увереннее и дороже. Сайт сразу собирает заявки на диагностику, мастер-класс и наставничество.
          </p>
          <div className="academy-list">
            <div>✓ Диагностика скорости</div>
            <div>✓ Скоростной маникюр</div>
            <div>✓ Разбор ошибок</div>
            <div>✓ Наставничество</div>
          </div>
        </div>

        <div className="lead-form reveal delay">
          <h3>Заявка на диагностику</h3>
          <p>Заполните форму, и мы свяжемся для консультации по обучению.</p>
          <input placeholder="Имя" />
          <input placeholder="Телефон / Telegram" />
          <input placeholder="Опыт работы" />
          <textarea placeholder="Что хотите улучшить?" />
          <button>Отправить заявку</button>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section light reviews-section">
      <div className="container">
        <div className="section-head reveal">
          <span>отзывы</span>
          <h2>Отзывы должны продавать доверие</h2>
          <p>Собираем отзывы со словами: быстро, чисто, красиво, фиолетово, Мила, рядом, Аминьевская.</p>
        </div>
        <div className="reviews-grid">
          {reviews.map(([name, text]) => (
            <div className="review-card reveal" key={name}>
              <div className="stars">★★★★★</div>
              <p>“{text}”</p>
              <b>{name}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section id="contacts" className="section contacts light">
      <div className="container two-col">
        <div className="contact-card reveal">
          <span className="mini-label">контакты</span>
          <h2>Первый визит должен быть без стресса</h2>
          <p>Москва, ул. Лобачевского, 118 к4. Рядом с метро Аминьевская. Добавьте реальные фото входа, лифта и двери студии.</p>
          <div className="contact-buttons">
            <Button href={CONFIG.maps}>Построить маршрут</Button>
            <Button variant="secondary" href={CONFIG.whatsapp}>Написать</Button>
          </div>
        </div>
        <div className="contact-video reveal delay">
          <VideoCover label="ROUTE VIDEO" title="Как нас найти" />
        </div>
      </div>
    </section>
  );
}

function FloatingPopup() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="floating-popup">
      <button className="popup-close" onClick={() => setShow(false)}>×</button>
      <div className="popup-icon">🎁</div>
      <div>
        <b>Первый визит с подарком</b>
        <p>Запишитесь онлайн и получите приятный бонус к услуге.</p>
        <a href={CONFIG.booking}>Хочу подарок</a>
      </div>
    </div>
  );
}

function ExitPopup() {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const onMouseLeave = (event) => {
      if (event.clientY <= 0 && !closed) setShow(true);
    };
    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, [closed]);

  if (!show) return null;

  return (
    <Modal title="Перед уходом — подарок" onClose={() => { setShow(false); setClosed(true); }}>
      <p className="modal-text">Оставьте заявку сейчас и получите подарок к первому визиту в «Не Фиолетово».</p>
      <div className="modal-actions">
        <Button>Записаться онлайн</Button>
        <Button variant="secondary" href={CONFIG.whatsapp}>Написать в WhatsApp</Button>
      </div>
    </Modal>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}

function BookingModal({ open, onClose }) {
  if (!open) return null;
  return (
    <Modal title="Записаться в Не Фиолетово" onClose={onClose}>
      <p className="modal-text">Выберите удобный способ записи. Основная кнопка ведёт на онлайн-запись, вторая — в WhatsApp.</p>
      <div className="modal-actions">
        <Button>Онлайн-запись</Button>
        <Button variant="secondary" href={CONFIG.whatsapp}>WhatsApp</Button>
      </div>
    </Modal>
  );
}

function ServiceModal({ service, onClose }) {
  if (!service) return null;
  return (
    <Modal title={service.title} onClose={onClose}>
      <VideoCover label={service.tag} title={service.emoji} compact />
      <p className="modal-text">{service.text}</p>
      <p className="modal-price">{service.price}</p>
      <div className="modal-actions">
        <Button>Записаться</Button>
        <Button variant="secondary" href={CONFIG.whatsapp}>Задать вопрос</Button>
      </div>
    </Modal>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <b>Не Фиолетово</b>
          <p>Фиолетовая студия скоростного маникюра и педикюра</p>
        </div>
        <span>Москва, Лобачевского 118 к4</span>
      </div>
    </footer>
  );
}

export default function NefioletovoWowSalesLanding() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -70px 0px" }
    );

    elements.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 80}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <style>{styles}</style>
      <CursorShadow />
      <Header />
      <Hero openBookingModal={() => setBookingOpen(true)} />
      <Services openServiceModal={setActiveService} />
      <Benefits />
      <Mila />
      <Gallery />
      <Reviews />
      <Academy />
      <Contacts />
      <Footer />
      <FloatingPopup />
      <ExitPopup />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
      <a className="fixed-booking" href={CONFIG.booking}>Записаться</a>
    </main>
  );
}

const styles = `
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #0b0011; color: #190022; }
  button, a, input, textarea { font: inherit; }
  button { cursor: pointer; }
  a { text-decoration: none; }
  main { overflow-x: hidden; }

  .cursor-shadow {
    position: fixed;
    width: 480px;
    height: 480px;
    border-radius: 999px;
    pointer-events: none;
    z-index: 1;
    background: radial-gradient(circle, rgba(217, 70, 239, 0.22), rgba(124, 58, 237, 0.09), transparent 68%);
    filter: blur(18px);
    transition: transform 0.08s linear;
    mix-blend-mode: screen;
  }

  .container { width: min(1180px, calc(100% - 32px)); margin: 0 auto; position: relative; z-index: 2; }
  .section { padding: 110px 0; position: relative; overflow: hidden; }
  .light { background: linear-gradient(135deg, #fff 0%, #faf5ff 45%, #fdf2f8 100%); }
  .section-dark { background: #0b0011; color: #fff; }

  .header {
    position: fixed; top: 0; left: 0; right: 0; height: 76px; z-index: 50;
    display: flex; align-items: center; justify-content: space-between; gap: 20px;
    padding: 0 max(16px, calc((100vw - 1180px) / 2));
    background: rgba(14, 0, 22, 0.72);
    border-bottom: 1px solid rgba(255,255,255,0.12);
    backdrop-filter: blur(20px);
  }
  .brand { display: flex; align-items: center; gap: 12px; border: 0; background: transparent; color: #fff; }
  .brand-mark { width: 46px; height: 46px; display: grid; place-items: center; border-radius: 18px; color: #2b0039; background: #fff; box-shadow: 0 18px 50px rgba(217,70,239,.25); }
  .brand strong { display: block; font-size: 13px; letter-spacing: .18em; text-transform: uppercase; }
  .brand small { display: block; margin-top: 3px; color: rgba(255,255,255,.55); font-weight: 700; }
  .desktop-nav { display: flex; align-items: center; gap: 24px; }
  .desktop-nav button { border: 0; background: transparent; color: rgba(255,255,255,.68); font-weight: 800; font-size: 14px; }
  .desktop-nav button:hover { color: #fff; }
  .header-actions { display: flex; align-items: center; gap: 10px; }
  .ghost-link { color: #fff; border: 1px solid rgba(255,255,255,.16); padding: 10px 16px; border-radius: 999px; background: rgba(255,255,255,.08); font-weight: 900; font-size: 14px; }
  .menu-button { display: none; width: 46px; height: 46px; border-radius: 999px; border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.08); color: #fff; font-size: 22px; }

  .mobile-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.52); z-index: 80; }
  .mobile-menu { margin-left: auto; width: 320px; height: 100%; padding: 24px; background: #120018; color: #fff; display: flex; flex-direction: column; gap: 12px; }
  .mobile-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .mobile-top button { width: 40px; height: 40px; border-radius: 999px; border: 0; background: rgba(255,255,255,.1); color: #fff; font-size: 24px; }
  .mobile-menu > button { text-align: left; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.08); color: #fff; border-radius: 20px; padding: 16px; font-weight: 900; }

  .btn { border: 0; min-height: 48px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; border-radius: 999px; padding: 14px 22px; font-weight: 950; transition: .25s ease; white-space: nowrap; }
  .btn:hover { transform: translateY(-4px); }
  .btn.primary { background: #fff; color: #25002f; box-shadow: 0 22px 60px rgba(217,70,239,.25); }
  .btn.secondary { background: #7c1cff; color: #fff; box-shadow: 0 22px 60px rgba(124,28,255,.24); }
  .btn.dark { background: rgba(255,255,255,.1); color: #fff; border: 1px solid rgba(255,255,255,.16); backdrop-filter: blur(12px); }

  .hero { min-height: 100vh; padding-top: 128px; padding-bottom: 80px; position: relative; overflow: hidden; }
  .hero-bg::before, .hero-bg::after { content: ""; position: absolute; border-radius: 999px; filter: blur(90px); opacity: .55; }
  .hero-bg::before { width: 560px; height: 560px; left: -220px; top: -140px; background: #d946ef; }
  .hero-bg::after { width: 620px; height: 620px; right: -240px; top: 100px; background: #7c3aed; }
  .hero-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 56px; align-items: center; }
  .pill { display: inline-flex; padding: 10px 16px; border-radius: 999px; border: 1px solid rgba(255,255,255,.13); background: rgba(255,255,255,.08); color: rgba(255,255,255,.84); font-weight: 900; font-size: 14px; backdrop-filter: blur(14px); }
  .hero h1 { margin: 28px 0 0; font-size: clamp(54px, 8vw, 112px); line-height: .88; letter-spacing: -.07em; color: #fff; }
  .hero h1 span { display: inline-block; background: linear-gradient(90deg, #fff, #f5c7ff, #a78bfa); -webkit-background-clip: text; color: transparent; }
  .hero p { max-width: 650px; margin: 28px 0 0; color: rgba(255,255,255,.68); font-size: 20px; line-height: 1.75; font-weight: 600; }
  .hero-buttons { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 34px; }
  .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 40px; max-width: 720px; }
  .stats div { border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.08); border-radius: 24px; padding: 18px; backdrop-filter: blur(16px); }
  .stats b { display: block; color: #fff; font-size: 26px; letter-spacing: -.04em; }
  .stats small { color: rgba(255,255,255,.48); font-weight: 900; text-transform: uppercase; font-size: 11px; letter-spacing: .12em; }

  .hero-visual { position: relative; }
  .floating-card { position: absolute; z-index: 5; padding: 16px 18px; border-radius: 22px; background: rgba(255,255,255,.86); color: #27002f; box-shadow: 0 24px 70px rgba(0,0,0,.18); backdrop-filter: blur(16px); animation: floaty 4.8s ease-in-out infinite; }
  .floating-card b { display: block; font-size: 18px; }
  .floating-card span { display: block; font-size: 12px; color: #7c1cff; font-weight: 900; margin-top: 3px; }
  .gift-card { right: -10px; top: 34px; }
  .rating-card { left: -14px; bottom: 36px; animation-delay: 1s; }

  @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }

  .video-cover { position: relative; min-height: 560px; border-radius: 42px; overflow: hidden; background: #300039; box-shadow: 0 34px 100px rgba(56,0,72,.3); border: 1px solid rgba(255,255,255,.16); }
  .video-cover.compact { min-height: 200px; border-radius: 26px; box-shadow: none; }
  .video-layer { position: absolute; inset: -20%; border-radius: 40%; filter: blur(10px); opacity: .82; }
  .video-layer.one { background: radial-gradient(circle at 20% 30%, #fff 0 3%, transparent 18%), radial-gradient(circle at 40% 50%, #f0abfc, transparent 35%), radial-gradient(circle at 70% 60%, #7c3aed, transparent 38%); animation: videoOne 8s ease-in-out infinite alternate; }
  .video-layer.two { background: radial-gradient(circle at 80% 20%, #f9a8d4, transparent 28%), radial-gradient(circle at 35% 75%, #c084fc, transparent 32%); mix-blend-mode: screen; animation: videoTwo 9s ease-in-out infinite alternate; }
  .video-layer.three { background: linear-gradient(130deg, rgba(18,0,24,.75), transparent, rgba(255,255,255,.18)); animation: videoThree 7s ease-in-out infinite alternate; }
  .video-noise { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,.18) 1px, transparent 1px); background-size: 18px 18px; opacity: .12; }
  .video-content { position: absolute; inset: 0; z-index: 3; padding: 34px; display: flex; flex-direction: column; justify-content: space-between; color: #fff; }
  .video-label { width: fit-content; border-radius: 999px; padding: 9px 14px; background: rgba(255,255,255,.18); backdrop-filter: blur(12px); font-weight: 950; font-size: 12px; letter-spacing: .18em; text-transform: uppercase; }
  .video-title { font-size: clamp(34px, 5vw, 70px); font-weight: 1000; line-height: .9; letter-spacing: -.06em; text-shadow: 0 20px 60px rgba(0,0,0,.22); }
  .video-cover.compact .video-content { padding: 20px; }
  .video-cover.compact .video-title { font-size: 30px; }
  .video-content p { margin: 16px 0 0; max-width: 360px; color: rgba(255,255,255,.78); font-weight: 700; line-height: 1.6; }

  @keyframes videoOne { from { transform: translate(-4%, -2%) rotate(0deg) scale(1); } to { transform: translate(5%, 3%) rotate(12deg) scale(1.08); } }
  @keyframes videoTwo { from { transform: translate(5%, -5%) rotate(0deg) scale(1.05); } to { transform: translate(-5%, 6%) rotate(-10deg) scale(1.15); } }
  @keyframes videoThree { from { transform: translateX(-6%) rotate(0deg); } to { transform: translateX(7%) rotate(8deg); } }

  .section-head { max-width: 760px; margin: 0 auto 56px; text-align: center; }
  .section-head span, .mini-label { display: inline-flex; width: fit-content; border-radius: 999px; padding: 9px 14px; background: #f3e8ff; color: #6d28d9; font-weight: 950; font-size: 12px; letter-spacing: .18em; text-transform: uppercase; }
  .section-head.white span, .white-label { background: rgba(255,255,255,.13); color: #fff; }
  .section-head h2, .mila-copy h2, .academy-copy h2, .contact-card h2 { margin: 18px 0 0; color: #25002f; font-size: clamp(34px, 5vw, 60px); line-height: .96; letter-spacing: -.05em; font-weight: 1000; }
  .section-head.white h2, .academy-copy h2 { color: #fff; }
  .section-head p, .mila-copy p, .academy-copy p, .contact-card p { margin: 20px 0 0; color: #6b5b73; font-size: 18px; line-height: 1.75; font-weight: 600; }
  .section-head.white p, .academy-copy p { color: rgba(255,255,255,.72); }

  .service-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .service-card { text-align: left; border: 1px solid #f0ddff; background: #fff; border-radius: 34px; padding: 12px; box-shadow: 0 24px 70px rgba(69, 0, 91, .08); transition: .25s ease; }
  .service-card:hover { transform: translateY(-8px); box-shadow: 0 32px 90px rgba(124,28,255,.13); }
  .service-video .video-cover { min-height: 210px; }
  .service-body { padding: 20px 8px 8px; }
  .service-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .service-row h3 { margin: 0; color: #25002f; font-size: 26px; letter-spacing: -.04em; }
  .service-row strong { white-space: nowrap; border-radius: 999px; padding: 7px 10px; background: #f3e8ff; color: #6d28d9; font-size: 13px; }
  .service-body p { color: #6b5b73; line-height: 1.6; font-weight: 600; }
  .service-body span { color: #7c1cff; font-weight: 950; }

  .benefits-section { background: radial-gradient(circle at 20% 20%, rgba(217,70,239,.25), transparent 32%), radial-gradient(circle at 85% 75%, rgba(124,58,237,.24), transparent 28%), #0b0011; }
  .benefit-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .benefit-card { border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.08); border-radius: 34px; padding: 26px; backdrop-filter: blur(16px); }
  .benefit-emoji { font-size: 34px; }
  .benefit-card h3 { color: #fff; font-size: 23px; line-height: 1.05; margin: 22px 0 0; }
  .benefit-card p { color: rgba(255,255,255,.66); line-height: 1.65; font-weight: 600; }

  .two-col { display: grid; grid-template-columns: .95fr 1.05fr; gap: 56px; align-items: center; }
  .mila-photo .video-cover, .contact-video .video-cover { min-height: 540px; }
  .mila-points { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 28px 0 0; }
  .mila-points div { background: #fff; border: 1px solid #f0ddff; border-radius: 24px; padding: 18px; box-shadow: 0 18px 60px rgba(69,0,91,.07); }
  .mila-points b { display: block; color: #25002f; font-size: 24px; }
  .mila-points small { color: #7c1cff; font-weight: 950; text-transform: uppercase; letter-spacing: .12em; font-size: 11px; }

  .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .gallery-card { border: 0; background: transparent; padding: 0; text-align: left; transition: .25s ease; }
  .gallery-card:hover { transform: translateY(-8px); }
  .gallery-card .video-cover { min-height: 260px; }

  .academy { background: radial-gradient(circle at 70% 20%, rgba(217,70,239,.25), transparent 32%), linear-gradient(135deg, #160020, #3b0764, #86198f); }
  .academy-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 28px; }
  .academy-list div { border: 1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.1); border-radius: 20px; padding: 16px; color: #fff; font-weight: 900; }
  .lead-form { background: #fff; color: #25002f; border-radius: 34px; padding: 28px; box-shadow: 0 32px 100px rgba(0,0,0,.18); }
  .lead-form h3 { margin: 0; font-size: 30px; letter-spacing: -.04em; }
  .lead-form p { color: #6b5b73; line-height: 1.6; font-weight: 600; }
  .lead-form input, .lead-form textarea { width: 100%; margin-top: 12px; border: 1px solid #ead7ff; background: #faf5ff; border-radius: 18px; padding: 14px 16px; outline: none; color: #25002f; }
  .lead-form textarea { min-height: 110px; resize: vertical; }
  .lead-form button { width: 100%; margin-top: 14px; border: 0; border-radius: 999px; padding: 15px 18px; background: #7c1cff; color: #fff; font-weight: 950; }

  .reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .review-card { background: #fff; border: 1px solid #f0ddff; border-radius: 30px; padding: 26px; box-shadow: 0 22px 70px rgba(69,0,91,.08); }
  .stars { color: #d946ef; letter-spacing: 2px; }
  .review-card p { color: #5f5068; line-height: 1.7; font-weight: 600; }
  .review-card b { color: #25002f; }

  .contact-card { border-radius: 34px; padding: 36px; background: #fff; border: 1px solid #f0ddff; box-shadow: 0 24px 80px rgba(69,0,91,.08); }
  .contact-buttons { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }

  .footer { padding: 40px 0; background: #0b0011; color: #fff; }
  .footer-inner { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
  .footer b { text-transform: uppercase; letter-spacing: .18em; }
  .footer p, .footer span { color: rgba(255,255,255,.52); font-weight: 600; }

  .floating-popup { position: fixed; right: 24px; bottom: 24px; z-index: 70; width: min(420px, calc(100vw - 32px)); display: flex; gap: 14px; padding: 18px; border-radius: 28px; background: rgba(255,255,255,.92); color: #25002f; box-shadow: 0 28px 90px rgba(69,0,91,.18); backdrop-filter: blur(16px); border: 1px solid #f0ddff; animation: popupIn .35s ease-out; }
  .popup-close { position: absolute; right: 14px; top: 12px; width: 30px; height: 30px; border: 0; border-radius: 999px; background: #faf5ff; color: #25002f; font-size: 20px; }
  .popup-icon { flex: 0 0 auto; width: 54px; height: 54px; display: grid; place-items: center; border-radius: 20px; background: linear-gradient(135deg, #7c1cff, #d946ef); font-size: 24px; }
  .floating-popup b { display: block; padding-right: 36px; }
  .floating-popup p { margin: 6px 0 10px; color: #6b5b73; line-height: 1.45; font-weight: 600; }
  .floating-popup a { color: #7c1cff; font-weight: 950; }

  @keyframes popupIn { from { opacity: 0; transform: translateY(18px) scale(.96); } to { opacity: 1; transform: translateY(0) scale(1); } }

  .modal-backdrop { position: fixed; inset: 0; z-index: 90; display: grid; place-items: center; padding: 18px; background: rgba(15,0,22,.72); backdrop-filter: blur(14px); }
  .modal-card { position: relative; width: min(720px, 100%); max-height: calc(100vh - 36px); overflow: auto; border-radius: 34px; padding: 26px; background: #fff; color: #25002f; box-shadow: 0 34px 120px rgba(0,0,0,.35); }
  .modal-close { position: absolute; right: 18px; top: 18px; width: 38px; height: 38px; border: 0; border-radius: 999px; background: #faf5ff; color: #25002f; font-size: 24px; }
  .modal-card h3 { margin: 0 46px 20px 0; font-size: 34px; letter-spacing: -.05em; }
  .modal-card .video-cover { min-height: 290px; margin-bottom: 18px; }
  .modal-text { color: #6b5b73; line-height: 1.7; font-weight: 600; }
  .modal-price { font-size: 24px; font-weight: 1000; color: #7c1cff; }
  .modal-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 18px; }

  .fixed-booking { position: fixed; right: 24px; bottom: 24px; z-index: 65; display: none; padding: 14px 20px; border-radius: 999px; background: #7c1cff; color: #fff; font-weight: 950; box-shadow: 0 22px 70px rgba(124,28,255,.28); }

  .reveal {
    opacity: 0;
    transform: translateY(34px) scale(.985);
    filter: blur(10px);
    transition: opacity .75s ease, transform .75s cubic-bezier(.22,1,.36,1), filter .75s ease;
    transition-delay: var(--reveal-delay, 0ms);
  }
  .reveal.is-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
  .reveal.delay { transition-delay: calc(var(--reveal-delay, 0ms) + 120ms); }

  .reveal .benefit-emoji,
  .reveal .brand-mark,
  .reveal .video-label,
  .reveal .service-row strong,
  .reveal .stars,
  .reveal .mini-label,
  .reveal .popup-icon {
    transform: scale(.72) rotate(-8deg);
    opacity: 0;
    transition: transform .65s cubic-bezier(.18,1.25,.35,1), opacity .45s ease;
    transition-delay: calc(var(--reveal-delay, 0ms) + 170ms);
  }
  .reveal.is-visible .benefit-emoji,
  .reveal.is-visible .brand-mark,
  .reveal.is-visible .video-label,
  .reveal.is-visible .service-row strong,
  .reveal.is-visible .stars,
  .reveal.is-visible .mini-label,
  .reveal.is-visible .popup-icon {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }

  .reveal h1,
  .reveal h2,
  .reveal h3,
  .reveal p,
  .reveal .btn,
  .reveal .stats div,
  .reveal .mila-points div,
  .reveal .academy-list div {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity .65s ease, transform .65s cubic-bezier(.22,1,.36,1);
  }
  .reveal.is-visible h1,
  .reveal.is-visible h2,
  .reveal.is-visible h3,
  .reveal.is-visible p,
  .reveal.is-visible .btn,
  .reveal.is-visible .stats div,
  .reveal.is-visible .mila-points div,
  .reveal.is-visible .academy-list div {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal.is-visible h1 { transition-delay: calc(var(--reveal-delay, 0ms) + 80ms); }
  .reveal.is-visible h2, .reveal.is-visible h3 { transition-delay: calc(var(--reveal-delay, 0ms) + 120ms); }
  .reveal.is-visible p { transition-delay: calc(var(--reveal-delay, 0ms) + 180ms); }
  .reveal.is-visible .btn { transition-delay: calc(var(--reveal-delay, 0ms) + 230ms); }
  .reveal.is-visible .stats div:nth-child(1),
  .reveal.is-visible .mila-points div:nth-child(1),
  .reveal.is-visible .academy-list div:nth-child(1) { transition-delay: calc(var(--reveal-delay, 0ms) + 120ms); }
  .reveal.is-visible .stats div:nth-child(2),
  .reveal.is-visible .mila-points div:nth-child(2),
  .reveal.is-visible .academy-list div:nth-child(2) { transition-delay: calc(var(--reveal-delay, 0ms) + 200ms); }
  .reveal.is-visible .stats div:nth-child(3),
  .reveal.is-visible .mila-points div:nth-child(3),
  .reveal.is-visible .academy-list div:nth-child(3) { transition-delay: calc(var(--reveal-delay, 0ms) + 280ms); }
  .reveal.is-visible .stats div:nth-child(4),
  .reveal.is-visible .academy-list div:nth-child(4) { transition-delay: calc(var(--reveal-delay, 0ms) + 360ms); }

  .service-card.reveal.is-visible,
  .benefit-card.reveal.is-visible,
  .gallery-card.reveal.is-visible,
  .review-card.reveal.is-visible {
    animation: cardPop .78s cubic-bezier(.18,1.25,.35,1) both;
    animation-delay: var(--reveal-delay, 0ms);
  }

  @keyframes cardPop {
    0% { transform: translateY(34px) scale(.94); }
    60% { transform: translateY(-7px) scale(1.015); }
    100% { transform: translateY(0) scale(1); }
  }

  .service-card:hover .video-cover,
  .gallery-card:hover .video-cover,
  .benefit-card:hover .benefit-emoji {
    transform: scale(1.035) rotate(.5deg);
  }
  .video-cover,
  .benefit-emoji {
    transition: transform .35s ease;
  }

  @media (max-width: 1020px) {
    .desktop-nav, .header-actions { display: none; }
    .menu-button { display: block; }
    .hero-grid, .two-col { grid-template-columns: 1fr; }
    .service-grid, .benefit-grid, .gallery-grid, .reviews-grid { grid-template-columns: repeat(2, 1fr); }
    .hero h1 { font-size: clamp(52px, 12vw, 92px); }
  }

  @media (max-width: 680px) {
    /* MOBILE FIX: на телефоне отключаем лишние всплывания и делаем меню читаемым */
    .reveal,
    .reveal.is-visible,
    .reveal h1,
    .reveal h2,
    .reveal h3,
    .reveal p,
    .reveal .btn,
    .reveal .stats div,
    .reveal .mila-points div,
    .reveal .academy-list div,
    .reveal .benefit-emoji,
    .reveal .brand-mark,
    .reveal .video-label,
    .reveal .service-row strong,
    .reveal .stars,
    .reveal .mini-label,
    .reveal .popup-icon {
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
      animation: none !important;
      transition: none !important;
      transition-delay: 0ms !important;
    }

    .service-card.reveal.is-visible,
    .benefit-card.reveal.is-visible,
    .gallery-card.reveal.is-visible,
    .review-card.reveal.is-visible {
      animation: none !important;
      transform: none !important;
    }

    .service-card:hover,
    .benefit-card:hover,
    .gallery-card:hover,
    .review-card:hover,
    .btn:hover,
    .gallery-card:hover .video-cover,
    .service-card:hover .video-cover,
    .benefit-card:hover .benefit-emoji {
      transform: none !important;
    }

    .mobile-backdrop {
      background: rgba(15, 0, 22, 0.82) !important;
      backdrop-filter: none !important;
    }

    .mobile-menu {
      background: #16001f !important;
      color: #fff !important;
      box-shadow: -24px 0 80px rgba(0,0,0,.45) !important;
    }

    .mobile-menu > button {
      background: #fff !important;
      color: #25002f !important;
      border: 0 !important;
    }

    .mobile-top button {
      background: rgba(255,255,255,.16) !important;
      color: #fff !important;
    }
    body { background: #fff; }
    .container { width: min(100% - 22px, 1180px); }
    .section { padding: 66px 0; }

    .header { height: 64px; padding-left: 12px; padding-right: 12px; }
    .brand { gap: 9px; }
    .brand-mark { width: 40px; height: 40px; border-radius: 15px; }
    .brand strong { font-size: 11px; letter-spacing: .14em; }
    .brand small { font-size: 10px; }
    .menu-button { width: 42px; height: 42px; font-size: 20px; }
    .mobile-menu { width: min(88vw, 330px); }

    .hero { min-height: auto; padding-top: 92px; padding-bottom: 48px; }
    .hero-grid { gap: 28px; }
    .pill { font-size: 11px; line-height: 1.4; padding: 9px 12px; }
    .hero h1 { font-size: clamp(43px, 14vw, 64px); line-height: .92; letter-spacing: -.055em; margin-top: 22px; }
    .hero p { font-size: 15.5px; line-height: 1.62; margin-top: 20px; }
    .hero-buttons { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 24px; }
    .btn { width: 100%; min-height: 50px; padding: 14px 18px; }

    .stats { grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 24px; }
    .stats div { border-radius: 20px; padding: 14px; }
    .stats b { font-size: 22px; }
    .stats small { font-size: 10px; }

    .hero-visual { margin-top: 4px; }
    .video-cover { min-height: 320px; border-radius: 28px; }
    .video-cover.compact { min-height: 150px; border-radius: 22px; }
    .video-content { padding: 22px; }
    .video-label { font-size: 10px; letter-spacing: .13em; padding: 8px 11px; }
    .video-title { font-size: 38px; line-height: .95; }
    .video-content p { font-size: 13px; line-height: 1.55; }
    .floating-card { display: none; }

    .section-head { margin-bottom: 34px; }
    .section-head span, .mini-label { font-size: 10px; letter-spacing: .14em; padding: 8px 11px; }
    .section-head h2, .mila-copy h2, .academy-copy h2, .contact-card h2 { font-size: clamp(31px, 9vw, 42px); line-height: 1; }
    .section-head p, .mila-copy p, .academy-copy p, .contact-card p { font-size: 15.5px; line-height: 1.65; }

    .service-grid, .benefit-grid, .gallery-grid, .reviews-grid, .mila-points, .academy-list { grid-template-columns: 1fr; }
    .service-card { border-radius: 28px; padding: 10px; }
    .service-video .video-cover { min-height: 145px; }
    .service-body { padding: 16px 6px 6px; }
    .service-row { align-items: center; }
    .service-row h3 { font-size: 23px; }
    .service-row strong {
      opacity: 1 !important;
      transform: none !important;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 92px;
      padding: 8px 10px;
      border-radius: 999px;
      background: #f3e8ff;
      color: #6d28d9;
      font-size: 12px;
      line-height: 1.1;
      text-align: center;
      box-shadow: none;
    }
    .service-body p { font-size: 14px; margin-bottom: 12px; }

    .service-video .video-cover.compact .video-title,
    .gallery-card .video-cover.compact .video-title {
      font-size: 26px;
      transform: none !important;
    }

    .service-video .video-cover.compact .video-label,
    .gallery-card .video-cover.compact .video-label {
      display: none;
    }

    .benefit-card { border-radius: 26px; padding: 22px; }
    .benefit-emoji { font-size: 28px; }
    .benefit-card h3 { font-size: 21px; }

    .two-col { gap: 30px; }
    .mila-photo .video-cover, .contact-video .video-cover { min-height: 330px; }
    .mila-points div { border-radius: 20px; padding: 15px; }

    .gallery-card .video-cover { min-height: 180px; }
    .lead-form, .contact-card { border-radius: 28px; padding: 22px; }
    .lead-form h3 { font-size: 26px; }
    .contact-buttons { display: grid; grid-template-columns: 1fr; }

    .review-card { border-radius: 26px; padding: 22px; }
    .footer-inner { align-items: flex-start; flex-direction: column; }

    .floating-popup { left: 11px; right: 11px; bottom: 78px; width: auto; padding: 14px; border-radius: 24px; }
    .floating-popup b { font-size: 14px; padding-right: 34px; }
    .floating-popup p { font-size: 12.5px; margin: 4px 0 8px; }
    .popup-icon { width: 46px; height: 46px; border-radius: 16px; font-size: 20px; }
    .popup-close { right: 10px; top: 10px; }

    .modal-card { border-radius: 28px; padding: 20px; }
    .modal-card h3 { font-size: 27px; margin-right: 40px; }
    .modal-card .video-cover { min-height: 210px; }
    .modal-actions { display: grid; grid-template-columns: 1fr; }

    .fixed-booking {
      display: flex;
      left: 12px;
      right: 12px;
      bottom: 12px;
      justify-content: center;
      border-radius: 20px;
      padding: 15px 18px;
      background: linear-gradient(135deg, #7c1cff, #d946ef);
      box-shadow: 0 18px 50px rgba(124,28,255,.32);
    }
    .cursor-shadow { display: none; }
  }
`;
