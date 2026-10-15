
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://fakestoreapi.com/products";

const STORAGE = {
  products: "style-room-products",
  cart: "style-room-cart",
  favorites: "style-room-favorites",
  reviews: "style-room-reviews",
};

const categories = [
  { value: "Баары", KG: "Баары", RU: "Все", EN: "All" },
  { value: "men's clothing", KG: "Эркектердин кийими", RU: "Мужская одежда", EN: "Men's clothing" },
  { value: "women's clothing", KG: "Аялдардын кийими", RU: "Женская одежда", EN: "Women's clothing" },
  { value: "jewelery", KG: "Зер буюмдар", RU: "Украшения", EN: "Jewelry" },
  { value: "electronics", KG: "Электроника", RU: "Электроника", EN: "Electronics" },
];

const words = {
  KG: {
    home: "Башкы бет", products: "Товарлар", cart: "Себет",
    about: "Биз жөнүндө", collection: "ЖАҢЫ КОЛЛЕКЦИЯ",
    find: "Өз стилиңди тап.", description: "Кийим, бут кийим жана башка товарлар.",
    shop: "Соода баштоо →", popular: "Популярдуу товарлар",
    search: "🔍 Товар издөө...", loading: "Товарлар жүктөлүүдө...",
    error: "Товарлар жүктөлгөн жок. Интернетти текшер.",
    retry: "Кайра аракет кылуу", details: "Толук маалымат",
    add: "+ Себетке", notFound: "Товар табылган жок.",
    favorites: "Жактырган товарлар ♡", noFavorites: "Азырынча товар жок.",
    count: "Товарлардын саны", total: "Жалпы сумма",
    clearCart: "Себетти тазалоо", emptyCart: "Себетиң бош.",
    slogan: "Стилиң — сенин өзгөчөлүгүң.",
    aboutText: "Товарларды карап, өзүңө жакканын танда.",
    rights: "Бардык укуктар корголгон.", login: "Кирүү",
    logout: "Чыгуу", register: "Катталуу", name: "Атың",
    email: "Email", password: "Сырсөз", admin: "Админ панель",
    addProduct: "Жаңы товар кошуу", editProduct: "Товарды өзгөртүү",
    title: "Товардын аталышы", price: "Баасы ($)",
    category: "Категория", image: "Сүрөттүн URL дареги",
    descriptionField: "Товардын сүрөттөмөсү",
    save: "Сактоо", cancel: "Жокко чыгаруу",
    inventory: "Товарларды башкаруу", edit: "Өзгөртүү",
    delete: "Өчүрүү", adminHint: "Товар кошуу, өзгөртүү же өчүрүү",
    required: "Бардык талааларды толтур.",
    invalidPrice: "Баасы нөлдөн чоң болушу керек.",
    added: "Товар кошулду!", updated: "Товар өзгөртүлдү!",
    deleted: "Товар өчүрүлдү.", rating: "Рейтинг",
    remove: "Өчүрүү", yourChoice: "СЕНИН ТАНДООҢ",
    welcome: "Кош келиң", namePlaceholder: "Атыңды жаз",
    passwordPlaceholder: "Кеминде 6 белги",
    createAccount: "Аккаунтуңду түз.", enterAccount: "Аккаунтуңа кир.",
    hasAccount: "Аккаунтуң барбы?", noAccount: "Аккаунтуң жокпу?",
    fillName: "Атыңды жаз.", fillFields: "Email жана сырсөздү толтур.",
    shortPassword: "Сырсөз кеминде 6 белгиден турушу керек.",
    registered: "Катталдың!", loggedIn: "Кирүү ийгиликтүү болду!",
    reviews: "Кардарлардын пикирлери", noReviews: "Азырынча пикир жок.",
    writeReview: "Пикир калтыруу", yourRating: "Сенин бааң",
    yourReview: "Сенин пикириң", reviewPlaceholder: "Товар жөнүндө оюңду жаз...",
    submitReview: "Пикирди жарыялоо", reviewRequired: "Баа берип, пикириңди жаз.",
    reviewSaved: "Пикириң сакталды!", average: "Орточо баа",
    reviewCount: "пикир", reviewer: "Кардар",
  },
  RU: {
    home: "Главная", products: "Товары", cart: "Корзина",
    about: "О нас", collection: "НОВАЯ КОЛЛЕКЦИЯ",
    find: "Найди свой стиль.", description: "Одежда, обувь и другие товары.",
    shop: "Начать покупки →", popular: "Популярные товары",
    search: "🔍 Поиск товаров...", loading: "Загрузка товаров...",
    error: "Не удалось загрузить товары.", retry: "Попробовать снова",
    details: "Подробнее", add: "+ В корзину", notFound: "Товары не найдены.",
    favorites: "Избранное ♡", noFavorites: "Пока нет избранного.",
    count: "Количество товаров", total: "Общая сумма",
    clearCart: "Очистить корзину", emptyCart: "Корзина пуста.",
    slogan: "Твой стиль — твоя индивидуальность.",
    aboutText: "Просматривай товары и выбирай понравившиеся.",
    rights: "Все права защищены.", login: "Войти",
    logout: "Выйти", register: "Регистрация", name: "Имя",
    email: "Email", password: "Пароль", admin: "Админ-панель",
    addProduct: "Добавить товар", editProduct: "Изменить товар",
    title: "Название товара", price: "Цена ($)",
    category: "Категория", image: "URL изображения",
    descriptionField: "Описание товара", save: "Сохранить",
    cancel: "Отмена", inventory: "Управление товарами",
    edit: "Изменить", delete: "Удалить",
    adminHint: "Добавляй, изменяй и удаляй товары",
    required: "Заполни все поля.", invalidPrice: "Цена должна быть больше нуля.",
    added: "Товар добавлен!", updated: "Товар изменён!",
    deleted: "Товар удалён.", rating: "Рейтинг",
    remove: "Удалить", yourChoice: "ТВОЙ ВЫБОР",
    welcome: "Добро пожаловать", namePlaceholder: "Введите имя",
    passwordPlaceholder: "Минимум 6 символов",
    createAccount: "Создай аккаунт.", enterAccount: "Войди в аккаунт.",
    hasAccount: "Уже есть аккаунт?", noAccount: "Нет аккаунта?",
    fillName: "Введите имя.", fillFields: "Заполни email и пароль.",
    shortPassword: "Пароль должен содержать минимум 6 символов.",
    registered: "Регистрация завершена!", loggedIn: "Вход выполнен!",
    reviews: "Отзывы покупателей", noReviews: "Пока нет отзывов.",
    writeReview: "Оставить отзыв", yourRating: "Твоя оценка",
    yourReview: "Твой отзыв", reviewPlaceholder: "Напиши своё мнение о товаре...",
    submitReview: "Опубликовать отзыв", reviewRequired: "Поставь оценку и напиши отзыв.",
    reviewSaved: "Отзыв сохранён!", average: "Средняя оценка",
    reviewCount: "отзывов", reviewer: "Покупатель",
  },
  EN: {
    home: "Home", products: "Products", cart: "Cart",
    about: "About us", collection: "NEW COLLECTION",
    find: "Find your style.", description: "Clothing, shoes and more.",
    shop: "Start shopping →", popular: "Popular products",
    search: "🔍 Search products...", loading: "Loading products...",
    error: "Could not load products.", retry: "Try again",
    details: "View details", add: "+ Add to cart",
    notFound: "No products found.", favorites: "Favorites ♡",
    noFavorites: "No favorites yet.", count: "Number of products",
    total: "Total amount", clearCart: "Clear cart",
    emptyCart: "Your cart is empty.", slogan: "Your style — your identity.",
    aboutText: "Browse products and choose your favorites.",
    rights: "All rights reserved.", login: "Log in",
    logout: "Log out", register: "Sign up", name: "Name",
    email: "Email", password: "Password", admin: "Admin panel",
    addProduct: "Add product", editProduct: "Edit product",
    title: "Product name", price: "Price ($)", category: "Category",
    image: "Image URL", descriptionField: "Product description",
    save: "Save", cancel: "Cancel", inventory: "Manage products",
    edit: "Edit", delete: "Delete",
    adminHint: "Add, edit or delete products",
    required: "Fill in all fields.",
    invalidPrice: "Price must be greater than zero.",
    added: "Product added!", updated: "Product updated!",
    deleted: "Product deleted.", rating: "Rating", remove: "Remove",
    yourChoice: "YOUR CHOICE", welcome: "Welcome",
    namePlaceholder: "Enter your name",
    passwordPlaceholder: "At least 6 characters",
    createAccount: "Create your account.", enterAccount: "Log in.",
    hasAccount: "Already have an account?", noAccount: "No account?",
    fillName: "Enter your name.", fillFields: "Enter email and password.",
    shortPassword: "Password needs at least 6 characters.",
    registered: "Registration successful!", loggedIn: "Login successful!",
    reviews: "Customer reviews", noReviews: "No reviews yet.",
    writeReview: "Write a review", yourRating: "Your rating",
    yourReview: "Your review", reviewPlaceholder: "Write what you think about this product...",
    submitReview: "Post review", reviewRequired: "Choose a rating and write a review.",
    reviewSaved: "Your review was saved!", average: "Average rating",
    reviewCount: "reviews", reviewer: "Customer",
  },
};

const emptyForm = {
  title: "",
  price: "",
  category: "women's clothing",
  image: "",
  description: "",
};

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [products, setProducts] = useState(() =>
    readStorage(STORAGE.products, null)
  );
  const [cart, setCart] = useState(() => readStorage(STORAGE.cart, []));
  const [favorites, setFavorites] = useState(() =>
    readStorage(STORAGE.favorites, [])
  );
  const [reviews, setReviews] = useState(() =>
    readStorage(STORAGE.reviews, {})
  );

  const [loading, setLoading] = useState(products === null);
  const [loadError, setLoadError] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Баары");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [language, setLanguage] = useState("KG");
  const [adminOpen, setAdminOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [adminMessage, setAdminMessage] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(true);
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  const [reviewStars, setReviewStars] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  const t = words[language];

  useEffect(() => {
    localStorage.setItem(STORAGE.cart, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE.favorites, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE.reviews, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    if (products !== null) {
      localStorage.setItem(STORAGE.products, JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (products !== null) return;

    let cancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);
        setLoadError(false);

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to load products");

        const data = await response.json();

        if (!cancelled) setProducts(data);
      } catch {
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [products]);

  const filteredProducts = (products || []).filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "Баары" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const total = cart.reduce((sum, product) => sum + Number(product.price), 0);

  function categoryName(value) {
    return categories.find((item) => item.value === value)?.[language] || value;
  }

  function getProductReviews(productId) {
    return reviews[String(productId)] || [];
  }

  function getAverageRating(productId) {
    const productReviews = getProductReviews(productId);

    if (productReviews.length === 0) return null;

    const sum = productReviews.reduce(
      (totalStars, review) => totalStars + review.stars,
      0
    );

    return (sum / productReviews.length).toFixed(1);
  }

  function addToCart(product) {
    setCart((old) => [...old, product]);
  }

  function removeFromCart(index) {
    setCart((old) => old.filter((_, i) => i !== index));
  }

  function toggleFavorite(id) {
    setFavorites((old) =>
      old.includes(id) ? old.filter((item) => item !== id) : [...old, id]
    );
  }

  function handleReviewSubmit(event) {
    event.preventDefault();

    if (!selectedProduct) return;

    if (!reviewStars || !reviewText.trim()) {
      setReviewMessage(t.reviewRequired);
      return;
    }

    const newReview = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      stars: Number(reviewStars),
      text: reviewText.trim(),
      author: user?.name || t.reviewer,
      date: new Date().toLocaleDateString(),
    };

    const productKey = String(selectedProduct.id);

    setReviews((old) => ({
      ...old,
      [productKey]: [...(old[productKey] || []), newReview],
    }));

    setReviewText("");
    setReviewStars(5);
    setReviewMessage(t.reviewSaved);
  }

  function handleProductSubmit(event) {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.price ||
      !form.image.trim() ||
      !form.description.trim()
    ) {
      setAdminMessage(t.required);
      return;
    }

    const price = Number(form.price);

    if (!Number.isFinite(price) || price <= 0) {
      setAdminMessage(t.invalidPrice);
      return;
    }

    if (editingId !== null) {
      setProducts((old) =>
        old.map((product) =>
          product.id === editingId
            ? {
                ...product,
                title: form.title.trim(),
                price,
                category: form.category,
                image: form.image.trim(),
                description: form.description.trim(),
              }
            : product
        )
      );

      setAdminMessage(t.updated);
    } else {
      const newProduct = {
        id: Date.now(),
        title: form.title.trim(),
        price,
        category: form.category,
        image: form.image.trim(),
        description: form.description.trim(),
        rating: { rate: 0, count: 0 },
      };

      setProducts((old) => [newProduct, ...(old || [])]);
      setAdminMessage(t.added);
    }

    setForm(emptyForm);
    setEditingId(null);
  }

  function startEditing(product) {
    setForm({
      title: product.title,
      price: String(product.price),
      category: product.category,
      image: product.image,
      description: product.description || "",
    });

    setEditingId(product.id);
    setAdminMessage("");

    document.getElementById("admin-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function resetAdminForm() {
    setForm(emptyForm);
    setEditingId(null);
    setAdminMessage("");
  }

  function deleteProduct(id) {
    setProducts((old) => (old || []).filter((product) => product.id !== id));
    setCart((old) => old.filter((product) => product.id !== id));
    setFavorites((old) => old.filter((favoriteId) => favoriteId !== id));

    if (selectedProduct?.id === id) setSelectedProduct(null);
    if (editingId === id) resetAdminForm();

    setAdminMessage(t.deleted);
  }

  function handleAuth(event) {
    event.preventDefault();

    if (isRegister && !fullName.trim()) {
      setAuthMessage(t.fillName);
      return;
    }

    if (!email.trim() || !password.trim()) {
      setAuthMessage(t.fillFields);
      return;
    }

    if (password.length < 6) {
      setAuthMessage(t.shortPassword);
      return;
    }

    setUser({
      name: isRegister ? fullName.trim() : email.split("@")[0],
      email: email.trim(),
    });

    setAuthMessage(isRegister ? t.registered : t.loggedIn);
    setPassword("");

    setTimeout(() => {
      setAuthOpen(false);
      setAuthMessage("");
    }, 900);
  }

  function logout() {
    setUser(null);
    setFullName("");
    setEmail("");
    setPassword("");
  }

  function openProduct(product) {
    setSelectedProduct(product);
    setReviewStars(5);
    setReviewText("");
    setReviewMessage("");
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <header className="header">
        <a className="logo" href="#home">STYLE <span>ROOM</span></a>

        <nav>
          <a href="#home">{t.home}</a>
          <a href="#products">{t.products}</a>
          <a href="#cart">{t.cart}</a>
          <a href="#about">{t.about}</a>
        </nav>

        <div className="header-actions">
          <select
            className="language-select"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            <option value="KG">KG 🇰🇬</option>
            <option value="RU">RU 🇷🇺</option>
            <option value="EN">EN 🇬🇧</option>
          </select>

          <button
            className="icon-button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Change theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <a className="header-count" href="#favorites">♡ {favorites.length}</a>
          <a className="header-count" href="#cart">🛍️ {cart.length}</a>

          <button className="auth-button" onClick={() => setAdminOpen(!adminOpen)}>
            {adminOpen ? t.products : t.admin}
          </button>

          {user ? (
            <button className="auth-button" onClick={logout}>{t.logout}</button>
          ) : (
            <button
              className="auth-button"
              onClick={() => {
                setIsRegister(true);
                setAuthMessage("");
                setAuthOpen(true);
              }}
            >
              {t.login}
            </button>
          )}
        </div>
      </header>

      {user && <div className="welcome-bar">{t.welcome}, {user.name}! 💗</div>}

      {adminOpen && (
        <section className="admin-section">
          <div className="admin-heading">
            <div>
              <p className="eyebrow">STYLE ROOM · CRUD</p>
              <h2>{t.admin}</h2>
              <p>{t.adminHint}</p>
            </div>
            <span className="admin-count">{(products || []).length} {t.products}</span>
          </div>

          <form id="admin-form" className="admin-form" onSubmit={handleProductSubmit}>
            <h3>{editingId !== null ? t.editProduct : t.addProduct}</h3>

            <label>{t.title}
              <input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                required
              />
            </label>

            <label>{t.price}
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={form.price}
                onChange={(event) => setForm({ ...form, price: event.target.value })}
                required
              />
            </label>

            <label>{t.category}
              <select
                value={form.category}
                onChange={(event) => setForm({ ...form, category: event.target.value })}
              >
                {categories.filter((item) => item.value !== "Баары").map((item) => (
                  <option key={item.value} value={item.value}>{item[language]}</option>
                ))}
              </select>
            </label>

            <label className="full-field">{t.image}
              <input
                type="url"
                value={form.image}
                onChange={(event) => setForm({ ...form, image: event.target.value })}
                placeholder="https://example.com/image.jpg"
                required
              />
            </label>

            <label className="full-field">{t.descriptionField}
              <textarea
                rows={3}
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                required
              />
            </label>

            {adminMessage && <p className="admin-message full-field">{adminMessage}</p>}

            <div className="admin-form-actions full-field">
              <button className="admin-save" type="submit">{t.save}</button>

              {editingId !== null && (
                <button className="admin-cancel" type="button" onClick={resetAdminForm}>
                  {t.cancel}
                </button>
              )}
            </div>
          </form>

          <div className="inventory">
            <h3>{t.inventory}</h3>

            {(products || []).map((product) => (
              <div className="inventory-row" key={product.id}>
                <img src={product.image} alt={product.title} />

                <div className="inventory-info">
                  <strong>{product.title}</strong>
                  <span>{Number(product.price).toFixed(2)} $</span>
                </div>

                <div className="inventory-actions">
                  <button className="edit-button" onClick={() => startEditing(product)}>
                    {t.edit}
                  </button>

                  <button className="delete-button" onClick={() => deleteProduct(product.id)}>
                    {t.delete}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <main>
        <section className="hero" id="home">
          <div className="hero-text">
            <p className="eyebrow">{t.collection} · 2026</p>
            <h1>{t.find}</h1>
            <p className="hero-description">{t.description}</p>
            <a className="shop-button" href="#products">{t.shop}</a>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000"
              alt="Fashion collection"
            />
            <div className="image-label">
              <span>YOUR STYLE</span>
              <strong>YOUR RULES.</strong>
            </div>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <p className="eyebrow">STYLE ROOM</p>
              <h2>{t.popular}</h2>
            </div>
            <p className="product-count">{filteredProducts.length} {t.products}</p>
          </div>

          <div className="filters">
            <input
              placeholder={t.search}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <div className="category-buttons">
              {categories.map((item) => (
                <button
                  key={item.value}
                  className={category === item.value ? "active" : ""}
                  onClick={() => setCategory(item.value)}
                >
                  {item[language]}
                </button>
              ))}
            </div>
          </div>

          {loading && <p className="status-message">{t.loading}</p>}

          {loadError && (
            <div className="error-message">
              <p>{t.error}</p>
              <button className="add-button" onClick={() => window.location.reload()}>
                {t.retry}
              </button>
            </div>
          )}

          {!loading && !loadError && (
            <>
              <div className="product-grid">
                {filteredProducts.map((product) => {
                  const average = getAverageRating(product.id);
                  const count = getProductReviews(product.id).length;

                  return (
                    <article className="product-card" key={product.id}>
                      <div className="product-image">
                        <img src={product.image} alt={product.title} />

                        <button
                          className={favorites.includes(product.id) ? "favorite-button selected" : "favorite-button"}
                          onClick={() => toggleFavorite(product.id)}
                          aria-label="Add to favorites"
                        >
                          {favorites.includes(product.id) ? "♥" : "♡"}
                        </button>

                        <button
                          className="details-button"
                          onClick={() => openProduct(product)}
                        >
                          {t.details}
                        </button>
                      </div>

                      <div className="product-info">
                        <p className="product-category">{categoryName(product.category)}</p>
                        <h3>{product.title}</h3>

                        <div className="card-rating">
                          <span>⭐ {average ?? product.rating?.rate ?? "—"}</span>
                          <span>({count} {t.reviewCount})</span>
                        </div>

                        <div className="product-bottom">
                          <strong>{Number(product.price).toFixed(2)} $</strong>
                          <button className="add-button" onClick={() => addToCart(product)}>
                            {t.add}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {filteredProducts.length === 0 && (
                <p className="empty-message">{t.notFound}</p>
              )}
            </>
          )}
        </section>

        <section className="favorites-section" id="favorites">
          <p className="eyebrow">{t.yourChoice}</p>
          <h2>{t.favorites}</h2>

          {favorites.length === 0 ? (
            <p>{t.noFavorites}</p>
          ) : (
            <div className="favorite-list">
              {(products || [])
                .filter((product) => favorites.includes(product.id))
                .map((product) => (
                  <button
                    className="favorite-item"
                    key={product.id}
                    onClick={() => openProduct(product)}
                  >
                    {product.title} — {Number(product.price).toFixed(2)} $
                  </button>
                ))}
            </div>
          )}
        </section>

        <section className="cart-section" id="cart">
          <div>
            <p className="eyebrow">{t.yourChoice}</p>
            <h2>🛍️ {t.cart}</h2>
            <p>{t.count}: {cart.length}</p>
            <p className="cart-total">{t.total}: {total.toFixed(2)} $</p>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <p>{t.emptyCart}</p>
            ) : (
              <>
                {cart.map((product, index) => (
                  <p key={`${product.id}-${index}`}>
                    {product.title} — {Number(product.price).toFixed(2)} $
                    <button className="remove-button" onClick={() => removeFromCart(index)}>
                      ✕
                    </button>
                  </p>
                ))}

                <button className="clear-button" onClick={() => setCart([])}>
                  {t.clearCart}
                </button>
              </>
            )}
          </div>
        </section>

        <section className="about-section" id="about">
          <p className="eyebrow">STYLE ROOM</p>
          <h2>{t.slogan}</h2>
          <p>{t.aboutText}</p>
        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="#home">STYLE <span>ROOM</span></a>
        <p>© 2026 STYLE ROOM. {t.rights}</p>
      </footer>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(event) => event.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close"
            >
              ✕
            </button>

            <img src={selectedProduct.image} alt={selectedProduct.title} />

            <div className="modal-info">
              <p className="product-category">{categoryName(selectedProduct.category)}</p>
              <h2>{selectedProduct.title}</h2>
              <p>{selectedProduct.description}</p>

              <div className="rating-summary">
                <span className="rating-stars">⭐ {getAverageRating(selectedProduct.id) ?? selectedProduct.rating?.rate ?? "—"} / 5</span>
                <span>
                  {t.average}: {getAverageRating(selectedProduct.id) ?? selectedProduct.rating?.rate ?? "—"}
                </span>
                <span>
                  {getProductReviews(selectedProduct.id).length} {t.reviewCount}
                </span>
              </div>

              <h3>{Number(selectedProduct.price).toFixed(2)} $</h3>

              <button
                className="add-button"
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                {t.add}
              </button>

              <section className="reviews-section">
                <h3>{t.reviews}</h3>

                {getProductReviews(selectedProduct.id).length === 0 ? (
                  <p className="no-reviews">{t.noReviews}</p>
                ) : (
                  <div className="reviews-list">
                    {getProductReviews(selectedProduct.id)
                      .slice()
                      .reverse()
                      .map((review) => (
                        <article className="review-card" key={review.id}>
                          <div className="review-top">
                            <strong>{review.author}</strong>
                            <span>{review.date}</span>
                          </div>
                          <p className="review-stars">
                            {"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}
                          </p>
                          <p className="review-text">{review.text}</p>
                        </article>
                      ))}
                  </div>
                )}

                <form className="review-form" onSubmit={handleReviewSubmit}>
                  <h4>{t.writeReview}</h4>

                  <label>{t.yourRating}</label>
                  <div className="star-picker" role="group" aria-label={t.yourRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={star <= reviewStars ? "star-button active" : "star-button"}
                        onClick={() => setReviewStars(star)}
                        aria-label={`${star} stars`}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  <label htmlFor="review-text">{t.yourReview}</label>
                  <textarea
                    id="review-text"
                    rows={4}
                    maxLength={500}
                    value={reviewText}
                    onChange={(event) => {
                      setReviewText(event.target.value);
                      setReviewMessage("");
                    }}
                    placeholder={t.reviewPlaceholder}
                  />

                  <p className="character-count">{reviewText.length}/500</p>

                  {reviewMessage && (
                    <p className="review-message">{reviewMessage}</p>
                  )}

                  <button className="review-submit" type="submit">
                    {t.submitReview}
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      )}

      {authOpen && (
        <div className="modal-overlay auth-overlay" onClick={() => setAuthOpen(false)}>
          <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setAuthOpen(false)}>✕</button>
            <p className="eyebrow">STYLE ROOM</p>
            <h2>{isRegister ? t.register : t.login}</h2>
            <p className="auth-description">
              {isRegister ? t.createAccount : t.enterAccount}
            </p>

            <form onSubmit={handleAuth}>
              {isRegister && (
                <label>{t.name}
                  <input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder={t.namePlaceholder}
                    required
                  />
                </label>
              )}

              <label>{t.email}
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="example@email.com"
                  required
                />
              </label>

              <label>{t.password}
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={t.passwordPlaceholder}
                  minLength={6}
                  required
                />
              </label>

              {authMessage && <p className="auth-message">{authMessage}</p>}

              <button className="auth-submit" type="submit">
                {isRegister ? t.register : t.login}
              </button>
            </form>

            <p className="auth-switch">
              {isRegister ? t.hasAccount : t.noAccount}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setAuthMessage("");
                }}
              >
                {isRegister ? t.login : t.register}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
