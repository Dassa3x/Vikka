import { CSSProperties, FormEvent, KeyboardEvent as ReactKeyboardEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import handoffPusher from "./assets/handoff-pusher.png";
import handoffReceiver from "./assets/handoff-receiver.png";
import handoffCarton from "./assets/handoff-carton.png";

type Page = "home" | "browse" | "detail" | "auth" | "dashboard" | "post" | "admin" | "info";
type ListingType = "Rent" | "Sell" | "Exchange" | "Donate";
type AuthMode = "register" | "login" | "forgot" | "sent";
type BrowseState = { tab: string; query: string; empty: boolean; category: string };
type RouteState = {
  vikka: true;
  index: number;
  page: Page;
  listingId?: number;
  authMode?: AuthMode;
  dashboardSection?: string;
  adminSection?: string;
  infoTitle?: string;
  browse?: BrowseState;
};

const defaultBrowse: BrowseState = { tab: "All", query: "", empty: false, category: "All categories" };

function demoFeedback(message: string) {
  window.dispatchEvent(new CustomEvent("vikka:feedback", { detail: message }));
}

const photos = {
  desk: "https://images.unsplash.com/photo-1542317854-f9596ae570f7?auto=format&fit=crop&w=1200&q=85",
  camera: "https://images.unsplash.com/photo-1630583206477-f232a811f672?auto=format&fit=crop&w=1200&q=85",
  lens: "https://images.unsplash.com/photo-1594807929862-aa3a564c92c3?auto=format&fit=crop&w=1200&q=85",
  tech: "https://images.unsplash.com/photo-1776919017122-8140e279c889?auto=format&fit=crop&w=1200&q=85",
  calculator: "https://images.unsplash.com/photo-1761546571631-a4d61b55cd2f?auto=format&fit=crop&w=1200&q=85",
  headphones: "https://images.unsplash.com/photo-1607102291356-76abe1f5fdae?auto=format&fit=crop&w=1200&q=85",
  laptop: "https://images.unsplash.com/photo-1646911996830-187b66019a2d?auto=format&fit=crop&w=1200&q=85",
};

const listings = [
  { id: 1, type: "Rent" as ListingType, category: "Cameras", title: "Canon EOS 80D camera kit", price: "Rs. 750 / day", condition: "Excellent", location: "CINEC Campus", rating: "4.9", image: photos.camera },
  { id: 2, type: "Sell" as ListingType, category: "Calculators", title: "Casio scientific calculator", price: "Rs. 4,500", condition: "Like new", location: "Malabe", rating: "4.8", image: photos.tech },
  { id: 3, type: "Exchange" as ListingType, category: "Electronics", title: "Noise-cancelling headphones", price: "Looking for: Mini projector", condition: "Good", location: "CINEC Hostel", rating: "4.7", image: photos.headphones },
  { id: 4, type: "Donate" as ListingType, category: "Books & Notes", title: "First-year engineering notes", price: "Free", condition: "Good", location: "Kaduwela", rating: "5.0", image: photos.desk },
  { id: 5, type: "Sell" as ListingType, category: "Electronics", title: "Aluminium laptop stand", price: "Rs. 3,200 · Negotiable", condition: "Excellent", location: "Millennium City", rating: "4.6", image: photos.laptop },
  { id: 6, type: "Rent" as ListingType, category: "Cameras", title: "50mm portrait lens", price: "Rs. 500 / day", condition: "Excellent", location: "Malabe", rating: "4.9", image: photos.lens },
];

const Icon = ({ name, size = 20 }: { name: string; size?: number }) => {
  const paths: Record<string, ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    shield: <><path d="M12 3 5 6v5c0 4.5 2.8 8.1 7 10 4.2-1.9 7-5.5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    heart: <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    upload: <><path d="M12 16V4m0 0L7 9m5-5 5 5" /><path d="M5 15v5h14v-5" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
    electronics: <path d="M13 2 5 14h7l-1 8 8-12h-7l1-8Z" />,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" /><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" /></>,
    calculator: <><rect x="5" y="2.5" width="14" height="19" rx="2" /><path d="M8 6h8v4H8zM8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" /></>,
    camera: <><path d="M4 7h4l1.5-2h5L16 7h4v12H4V7Z" /><circle cx="12" cy="13" r="3.5" /></>,
    sports: <><circle cx="12" cy="12" r="9" /><path d="m8.5 4.8 1.2 3.7L6.5 11l-3.3-.4M15.5 4.8l-1.2 3.7 3.2 2.5 3.3-.4M9.7 8.5h4.6l1.5 4.4-3.8 2.7-3.8-2.7 1.5-4.4ZM12 15.6V21M5.1 17.8l3.1-4.9M18.9 17.8l-3.1-4.9" /></>,
    art: <><path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" /><path d="m13.8 7.7 2.5 2.5M4 20l3-3" /></>,
    furniture: <><path d="M6 12V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6M4 11v7h16v-7M7 18v3M17 18v3M4 14h16" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.arrow}</svg>;
};

function Button({ children, variant = "primary", onClick, type = "button", disabled = false, className = "" }: {
  children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean; className?: string;
}) {
  const fallback = type === "button" ? () => demoFeedback("This prototype action is ready for backend integration.") : undefined;
  return <button className={`btn btn-${variant} ${className}`} onClick={onClick ?? fallback} type={type} disabled={disabled}>{children}</button>;
}

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: string }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Brand({ onClick }: { onClick: () => void }) {
  return <button className="brand" onClick={onClick} aria-label="Vikka.lk home"><span className="brand-mark"><span /></span><strong>Vikka</strong><b>.lk</b></button>;
}

function Header({ navigate, openBrowse, loggedIn }: { navigate: (p: Page, state?: Partial<RouteState>) => void; openBrowse: (tab?: string, category?: string) => void; loggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const categoriesButtonRef = useRef<HTMLButtonElement>(null);
  const navItems = [["Rent", "Rent"], ["Buy", "Buy"], ["Exchange", "Exchange"], ["Donate", "Donate"]];
  const categories = [
    ["Electronics", "electronics"],
    ["Books & Notes", "book"],
    ["Calculators", "calculator"],
    ["Cameras", "camera"],
    ["Sports Equipment", "sports"],
    ["Art & Design", "art"],
    ["Furniture", "furniture"],
    ["Other", "grid"],
  ];
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!categoriesRef.current?.contains(event.target as Node)) setCategoriesOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);
  const openCategoriesFromKeyboard = () => {
    setCategoriesOpen(true);
    window.setTimeout(() => categoriesRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus(), 0);
  };
  const handleCategoryKeys = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(categoriesRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? []);
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === "Escape") {
      event.preventDefault();
      setCategoriesOpen(false);
      categoriesButtonRef.current?.focus();
    } else if (event.key === "ArrowDown" && items.length) {
      event.preventDefault();
      items[(current + 1) % items.length].focus();
    } else if (event.key === "ArrowUp" && items.length) {
      event.preventDefault();
      items[(current - 1 + items.length) % items.length].focus();
    }
  };
  return <header className="site-header">
    <div className="nav-wrap">
      <Brand onClick={() => navigate("home")} />
      <nav className={open ? "main-nav open" : "main-nav"} aria-label="Primary">
        <div className="nav-categories" ref={categoriesRef} onKeyDown={handleCategoryKeys}>
          <button ref={categoriesButtonRef} className={`categories-trigger ${categoriesOpen ? "active" : ""}`} aria-expanded={categoriesOpen} aria-controls="categories-menu" onClick={() => setCategoriesOpen(!categoriesOpen)} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); openCategoriesFromKeyboard(); } }}>Categories <span aria-hidden="true">⌄</span></button>
          <div id="categories-menu" className={`categories-menu ${categoriesOpen ? "open" : ""}`} role="menu" aria-label="Categories">
            {categories.map(([category, icon]) => <button role="menuitem" key={category} onClick={() => { openBrowse("All", category); setCategoriesOpen(false); setOpen(false); }}><span className="nav-category-icon"><Icon name={icon} size={18} /></span><span>{category}</span></button>)}
          </div>
        </div>
        {navItems.map(([item, tab]) => <button key={item} onClick={() => { openBrowse(tab); setOpen(false); }}>{item}</button>)}
        <button onClick={() => { navigate("home"); setOpen(false); window.setTimeout(() => document.querySelector("#how")?.scrollIntoView(), 0); }}>How It Works</button>
      </nav>
      <div className="nav-actions">
        <Button variant="ghost" className="icon-btn" onClick={() => openBrowse()}><Icon name="search" /><span className="sr-only">Search</span></Button>
        {loggedIn ? <Button variant="ghost" onClick={() => navigate("dashboard", { dashboardSection: "Overview" })}><Icon name="user" /> Nethmi</Button> : <Button variant="ghost" onClick={() => navigate("auth", { authMode: "login" })}>Log in</Button>}
        <Button onClick={() => loggedIn ? navigate("post") : navigate("auth", { authMode: "register" })}><Icon name="plus" /> Post an item</Button>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open}><Icon name={open ? "close" : "menu"} /><span className="sr-only">Menu</span></button>
      </div>
    </div>
  </header>;
}

function ListingCard({ item, onOpen }: { item: typeof listings[number]; onOpen: (item: typeof listings[number]) => void }) {
  const [saved, setSaved] = useState(false);
  return <article className="listing-card">
    <div className="card-image-wrap">
      <button className="card-image-link" onClick={() => onOpen(item)} aria-label={`View ${item.title}`}>
        <img src={item.image} alt={item.title} className="card-image" />
      </button>
      <Badge tone={item.type.toLowerCase()}>{item.type}</Badge>
      <button className={`save-btn ${saved ? "saved" : ""}`} onClick={() => setSaved(!saved)} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}><Icon name="heart" /></button>
    </div>
    <button className="card-copy" onClick={() => onOpen(item)}>
      <div className="card-top"><span>{item.condition}</span><span><Icon name="pin" size={15} />{item.location}</span></div>
      <h3>{item.title}</h3>
      <p className="price">{item.price}</p>
      <div className="owner-line"><span className="avatar avatar-sm">KD</span><span>Kasun D.</span><span className="rating">★ {item.rating}</span></div>
    </button>
  </article>;
}

function Home({ navigate, openBrowse, openItem }: { navigate: (p: Page, state?: Partial<RouteState>) => void; openBrowse: (tab?: string, category?: string) => void; openItem: (i: typeof listings[number]) => void }) {
  const waysRef = useRef<HTMLElement>(null);
  const [waysVisible, setWaysVisible] = useState(false);
  useEffect(() => {
    const section = waysRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setWaysVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.18 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  const ways = [
    { name: "Rent", tab: "Rent", icon: "calendar", copy: "Borrow what you need", className: "way-rent" },
    { name: "Buy", tab: "Buy", icon: "grid", copy: "Find it for less", className: "way-buy" },
    { name: "Exchange", tab: "Exchange", icon: "arrow", copy: "Trade with students", className: "way-exchange" },
    { name: "Donate", tab: "Donate", icon: "heart", copy: "Pass it forward", className: "way-donate" },
  ];
  return <main>
    <section className="hero section">
      <div className="hero-copy reveal">
        <Badge tone="verified"><Icon name="shield" size={14} /> Built for verified CINEC students</Badge>
        <h1>Good things deserve a <em>second story.</em></h1>
        <p>Rent, buy, exchange or share what you need—within a campus community you can trust.</p>
        <form className="hero-search" onSubmit={(e) => { e.preventDefault(); openBrowse(); }}>
          <Icon name="search" /><input aria-label="Search items" placeholder="Search cameras, calculators, books and more" /><Button type="submit">Search</Button>
        </form>
        <div className="hero-actions"><Button onClick={() => openBrowse()}>Browse items <Icon name="arrow" /></Button><Button variant="secondary" onClick={() => navigate("auth", { authMode: "register" })}>Post an item</Button></div>
        <div className="trust-row"><span><Icon name="check" /> Campus verified</span><span><Icon name="check" /> No hidden fees</span><span><Icon name="check" /> Contact stays private</span></div>
      </div>
      <div className="hero-collage reveal delay">
        <div className="collage-float collage-main-wrap">
          <img src={photos.camera} alt="Camera available to rent" className="collage-main" />
        </div>
        
        <div className="collage-float collage-small-wrap top">
          <img src={photos.headphones} alt="Headphones available to exchange" className="collage-small" />
        </div>
        <div className="collage-float collage-small-wrap bottom">
          <img src={photos.laptop} alt="Laptop stand for sale" className="collage-small" />
        </div>
       
      </div>
    </section>

    <section className="handoff" aria-label="Discover more. Own less. Make it last. Pass it on.">
      <div className="handoff-scene" aria-hidden="true">
        <span className="handoff-ambient-shadow pusher-shadow" />
        <img className="handoff-figure handoff-pusher" src={handoffPusher} alt="" draggable={false} />

        <div className="handoff-track">
          <div className="handoff-carton">
            <span className="handoff-carton-shadow" />
            <div className="handoff-carton-body">
              <img src={handoffCarton} alt="" draggable={false} />
              <div className="handoff-box-labels">
                <span className="handoff-box-copy copy-discover"><small>VIKKA.LK</small><strong>DISCOVER<br />MORE</strong></span>
                <span className="handoff-box-copy copy-own"><small>VIKKA.LK</small><strong>OWN<br />LESS</strong></span>
                <span className="handoff-box-copy copy-last"><small>VIKKA.LK</small><strong>MAKE IT<br />LAST</strong></span>
                <span className="handoff-box-copy copy-pass"><small>VIKKA.LK</small><strong>PASS IT<br />ON</strong></span>
              </div>
            </div>
          </div>
        </div>

        <span className="handoff-ambient-shadow receiver-shadow" />
        <img className="handoff-figure handoff-receiver" src={handoffReceiver} alt="" draggable={false} />
        <div className="handoff-celebrate"><span /><span /><span /></div>
      </div>
      <p className="sr-only">Discover more. Own less. Make it last. Pass it on.</p>
    </section>

    <section ref={waysRef} className={`section quick-section ${waysVisible ? "is-visible" : ""}`}>
      <div className="section-heading"><div><span className="eyebrow">Choose your way</span><h2>More useful. Less wasteful.</h2></div><p>One trusted place for every kind of campus exchange.</p></div>
      <div className="way-grid">
        {ways.map((way, index) => <button className={`way-card ${way.className}`} style={{ "--way-index": index } as CSSProperties} key={way.name} onClick={() => openBrowse(way.tab)}>
          <span className="way-icon"><Icon name={way.icon} /></span>
          <span className="way-copy"><strong>{way.name}</strong><small>{way.copy}</small></span>
          <span className="way-arrow"><Icon name="arrow" /></span>
        </button>)}
      </div>
    </section>

    <section className="section">
      <div className="section-heading"><div><span className="eyebrow">Fresh on campus</span><h2>Worth a closer look</h2></div><Button variant="ghost" onClick={() => openBrowse()}>See all listings <Icon name="arrow" /></Button></div>
      <div className="listing-grid">{listings.slice(0, 4).map((item) => <ListingCard item={item} key={item.id} onOpen={openItem} />)}</div>
    </section>

    <section className="trust-band">
      <div className="section trust-inner">
        <div><Badge tone="light">Trust is part of the design</Badge><h2>Your details aren’t part of the listing.</h2><p>Only verified student accounts can make requests. Phone numbers are revealed only after a request is accepted—never before.</p><Button variant="secondary" onClick={() => navigate("info", { infoTitle: "Safety on Vikka.lk" })}>Read our safety guide</Button></div>
        <div className="trust-points">{[
          ["shield", "Verified CINEC accounts", "Student email verification keeps the community campus-only."],
          ["check", "Admin-approved listings", "Every new listing is reviewed before it appears publicly."],
          ["star", "Ratings after real exchanges", "Build trust through completed campus transactions."],
          ["user", "Private by default", "Registration numbers and phone numbers are never public."],
        ].map(([icon, title, copy]) => <div key={title}><span><Icon name={icon} /></span><section><strong>{title}</strong><p>{copy}</p></section></div>)}</div>
      </div>
    </section>

    <section className="section how-section" id="how"><div className="section-heading"><div><span className="eyebrow">Simple from start to finish</span><h2>How Vikka works</h2></div></div>
      <div className="steps">{["Find or post an item", "Send or review a request", "Connect after acceptance", "Complete and leave a rating"].map((s, i) => <div key={s}><span>{i + 1}</span><strong>{s}</strong><p>{["Browse approved listings or create one of your own.", "Choose dates, guarantees, or send a short message.", "Contact details stay hidden until both sides agree.", "Confirm the handover and help the community build trust."][i]}</p></div>)}</div>
    </section>
  </main>;
}

function Browse({ openItem, state, setState }: { openItem: (i: typeof listings[number]) => void; state: BrowseState; setState: (state: BrowseState) => void }) {
  const { tab, query, empty, category } = state;
  const [filtersOpen, setFiltersOpen] = useState(false);
  const update = (next: Partial<BrowseState>) => setState({ ...state, ...next });
  const shown = listings.filter((l) => (tab === "All" || l.type === tab || (tab === "Buy" && l.type === "Sell")) && (category === "All categories" || l.category === category) && l.title.toLowerCase().includes(query.toLowerCase()));
  return <main className="browse-page">
    <div className="browse-head section">
      <Badge tone="neutral">CINEC marketplace</Badge><h1>Find something useful</h1><p>Browse verified listings from students around campus.</p>
      <div className="wide-search"><Icon name="search" /><input value={query} onChange={(e) => update({ query: e.target.value })} placeholder="Search by item, category or keyword" /><Button onClick={() => update({ empty: query.toLowerCase() === "drone" })}>Search</Button></div>
      <div className="tabs" role="tablist">{["All", "Rent", "Buy", "Exchange", "Donate"].map((t) => <button role="tab" aria-selected={tab === t} className={tab === t ? "active" : ""} onClick={() => update({ tab: t, empty: false })} key={t}>{t}</button>)}</div>
      {category !== "All categories" && <div className="active-category" role="status"><span>Category</span><strong>{category}</strong><button onClick={() => update({ category: "All categories" })} aria-label={`Clear ${category} category filter`}><Icon name="close" size={15} /></button></div>}
    </div>
    <div className="browse-layout section">
      <aside className={`filters ${filtersOpen ? "open" : ""}`}><div className="filter-title"><strong>Filters</strong><button onClick={() => setFiltersOpen(false)}><Icon name="close" /></button></div>
        <label>Category<select value={category} onChange={(e) => update({ category: e.target.value })}><option>All categories</option><option>Electronics</option><option>Books & Notes</option><option>Cameras</option><option>Sports Equipment</option><option>Art & Design</option><option>Furniture</option><option>Other</option></select></label>
        <fieldset><legend>Price range</legend><div className="price-fields"><input placeholder="Min" aria-label="Minimum price" /><span>—</span><input placeholder="Max" aria-label="Maximum price" /></div></fieldset>
        <fieldset><legend>Condition</legend>{["New", "Like new", "Good", "Fair"].map((x) => <label className="check-row" key={x}><input type="checkbox" />{x}</label>)}</fieldset>
        <fieldset><legend>Rental availability</legend><label>From<input type="date" /></label><label>Until<input type="date" /></label></fieldset>
        <Button className="full" onClick={() => setFiltersOpen(false)}>Apply filters</Button><Button variant="ghost" className="full" onClick={() => setState(defaultBrowse)}>Clear all</Button>
      </aside>
      <section className="results"><div className="results-bar"><div><strong>{empty ? 0 : shown.length} listings</strong><span> near CINEC Campus</span></div><div><Button variant="secondary" className="mobile-filter" onClick={() => setFiltersOpen(true)}>Filters</Button><select aria-label="Sort listings"><option>Newest first</option><option>Price: low to high</option><option>Price: high to low</option></select><button className="view-btn" onClick={()=>demoFeedback("Grid view is active.")}><Icon name="grid" /><span className="sr-only">Grid view</span></button></div></div>
        {empty || shown.length === 0 ? <div className="empty-state"><span><Icon name="search" size={30} /></span><h2>No listings found</h2><p>Try a broader search or clear a few filters. New items are added every day.</p><Button onClick={() => update({ empty: false, query: "" })}>Clear search</Button></div> :
        <><div className="listing-grid three">{shown.map((item) => <ListingCard item={item} key={item.id} onOpen={openItem} />)}</div><Button variant="secondary" className="load-more" onClick={() => demoFeedback("All available prototype listings are already shown.")}>Load more listings</Button></>}
      </section>
    </div>
  </main>;
}

function Detail({ item, onRequest, guestAction, goBack, navigate }: { item: typeof listings[number]; onRequest: () => void; guestAction: () => void; goBack: () => void; navigate: (p: Page, state?: Partial<RouteState>) => void }) {
  const [photo, setPhoto] = useState(0);
  const gallery = [item.image, item.type === "Rent" ? photos.lens : photos.desk, photos.tech];
  return <main className="detail-page section">
    <button className="back-link" onClick={goBack}><span>←</span> Back</button>
    <div className="detail-layout">
      <section className="gallery"><div className="main-photo"><img src={gallery[photo]} alt={`${item.title}, view ${photo + 1}`} /><button className="expand-btn" onClick={() => window.open(gallery[photo], "_blank")}>View full size</button></div><div className="thumbs">{gallery.map((p, i) => <button className={photo === i ? "active" : ""} onClick={() => setPhoto(i)} key={p}><img src={p} alt={`Select view ${i + 1}`} /></button>)}</div></section>
      <section className="detail-copy">
        <div className="detail-badges"><Badge tone={item.type.toLowerCase()}>{item.type}</Badge><Badge tone="verified"><Icon name="check" size={12} /> Admin approved</Badge></div>
        <h1>{item.title}</h1><p className="detail-price">{item.price}</p>
        <div className="detail-meta"><span><small>Condition</small><strong>{item.condition}</strong></span><span><small>Category</small><strong>{item.type === "Rent" ? "Cameras" : "Electronics"}</strong></span><span><small>Location</small><strong>{item.location}</strong></span></div>
        <div className="description"><h2>About this item</h2><p>{item.type === "Rent" ? "Reliable camera kit in excellent condition, ideal for student projects and campus events. Includes an 18–135mm lens, battery, charger and padded carry bag." : "Carefully used and fully working. Available for collection near campus. You are welcome to inspect it before confirming the exchange."}</p></div>
        {item.type === "Rent" && <div className="availability"><Icon name="calendar" /><div><strong>Available this week</strong><p>Minimum 1 day · Maximum 14 days</p></div></div>}
        <div className="owner-card"><span className="avatar avatar-lg">KD</span><div><strong>Kasun Dissanayake</strong><span><Badge tone="verified"><Icon name="check" size={12} /> Verified CINEC student</Badge></span><p>★ 4.9 · 12 reviews · 8 completed exchanges</p></div><Button variant="ghost" onClick={() => navigate("info", { infoTitle: "Kasun’s student profile" })}>View profile</Button></div>
        <div className="privacy-note"><Icon name="shield" /><p><strong>Contact details stay private.</strong> Phone numbers are shown to both people only after the owner accepts a request.</p></div>
        <div className="detail-actions"><Button onClick={onRequest}>{item.type === "Rent" ? "Request to rent" : item.type === "Sell" ? "Request to buy" : item.type === "Exchange" ? "Make exchange offer" : "Request donation"} <Icon name="arrow" /></Button><Button variant="secondary" onClick={guestAction}><Icon name="heart" /> Save</Button></div>
        <button className="report-link" onClick={() => navigate("info", { infoTitle: "Report this listing" })}>Report this listing</button>
      </section>
    </div>
  </main>;
}

function Modal({ children, onClose, wide = false }: { children: ReactNode; onClose: () => void; wide?: boolean }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><div className={`modal ${wide ? "modal-wide" : ""}`} role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" /></button>{children}</div></div>;
}

function RentalFlow({ item, close }: { item: typeof listings[number]; close: () => void }) {
  const [step, setStep] = useState(1);
  const guarantees = ["Show CINEC Student ID at handover", "Verified CINEC student guarantor", "Sign a physical handover acknowledgement"];
  const [guarantee, setGuarantee] = useState("");
  const titles = ["Choose rental dates", "Select a guarantee", "Review your request", "Request sent", "Owner response", "Complete rental", "Rate your experience"];
  return <Modal onClose={close} wide>
    <div className="flow-head"><Badge tone="rent">Rental demo flow</Badge><span>Step {Math.min(step, 7)} of 7</span><h2>{titles[step - 1]}</h2><div className="progress"><span style={{ width: `${step / 7 * 100}%` }} /></div></div>
    {step === 1 && <div className="calendar-layout">
      <div><div className="item-mini"><img src={item.image} alt="" /><div><strong>{item.title}</strong><span>Rs. 750 per day</span></div></div><div className="fake-calendar"><div className="cal-head"><button onClick={()=>demoFeedback("Previous month loaded.")}>←</button><strong>October 2026</strong><button onClick={()=>demoFeedback("Next month loaded.")}>→</button></div><div className="week">{["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=><b key={d}>{d}</b>)}</div><div className="days">{Array.from({length:35},(_,i)=> <button key={i} onClick={()=>demoFeedback("Rental dates updated.")} disabled={i<3 || (i>17&&i<21)} className={i===12||i===14?"selected":i===13?"between":""}>{i<3?"":i-2}</button>)}</div><div className="cal-legend"><span><i /> Selected dates</span><span><i className="blocked" /> Unavailable</span></div></div></div>
      <div className="booking-summary"><label>Pickup date<input type="text" value="10 Oct 2026" readOnly /></label><label>Return date<input type="text" value="12 Oct 2026" readOnly /></label><div className="cost-row"><span>Rs. 750 × 2 rental days</span><strong>Rs. 1,500</strong></div><div className="cost-row total"><span>Estimated total</span><strong>Rs. 1,500</strong></div><p className="helper">Same-day rentals have a minimum one-day charge. Confirmed bookings block dates; pending requests do not.</p><Button className="full" onClick={() => setStep(2)}>Continue to guarantee <Icon name="arrow" /></Button></div>
    </div>}
    {step === 2 && <div className="flow-body"><p className="lead">Select at least one option you’re willing to provide at handover.</p><div className="choice-list">{guarantees.map((g) => <label className={guarantee === g ? "choice active" : "choice"} key={g}><input type="radio" name="guarantee" checked={guarantee === g} onChange={() => setGuarantee(g)} /><span><strong>{g}</strong><small>Visual confirmation at handover only</small></span></label>)}</div><div className="safety-alert"><Icon name="shield" /><p><strong>Protect your identity documents</strong> Original government identity documents must not be retained, copied, photographed, or uploaded through Vikka.lk.</p></div><Button className="full" disabled={!guarantee} onClick={() => setStep(3)}>Review request</Button></div>}
    {step === 3 && <div className="flow-body"><SummaryRows rows={[["Item", item.title],["Dates","10–12 October 2026"],["Rental period","2 days"],["Guarantee",guarantee],["Estimated total","Rs. 1,500"]]} /><div className="no-payment"><strong>No payment is collected here.</strong><p>Vikka.lk does not process payments. Payment arrangements are made directly between users.</p></div><Button className="full" onClick={() => setStep(4)}>Submit rental request</Button></div>}
    {step === 4 && <Success icon="check" title="Request sent to Kasun" copy="We’ll notify you when the owner responds. This request does not block the selected dates yet."><p className="deadline">Cancellation available until 14 October, 3:42 PM</p><Button onClick={() => setStep(5)}>Demo owner acceptance</Button></Success>}
    {step === 5 && <Success icon="shield" title="Kasun accepted your request" copy="The confirmed booking now blocks these dates. Contact details are visible to both of you."><div className="contact-card"><span><small>Owner contact</small><strong>077 ••• ••42</strong></span><span><small>Your contact shared</small><strong>071 ••• ••18</strong></span></div><Button onClick={() => setStep(6)}>Continue to return day</Button></Success>}
    {step === 6 && <div className="flow-body"><Badge tone="warning">Return due today</Badge><h3>Ready to return the camera?</h3><p className="lead">Both people must confirm before the transaction is completed. If there’s no response within 48 hours, it is flagged for admin review.</p><SummaryRows rows={[["Return","Today before 6:00 PM"],["Handover","CINEC Campus main entrance"],["Status","Owner confirmation pending"]]} /><Button className="full" onClick={() => setStep(7)}>Mark as returned</Button><Button variant="ghost" className="full">Report a problem</Button></div>}
    {step === 7 && <Rating onDone={close} title="How was renting from Kasun?" />}
  </Modal>;
}

function SaleFlow({ item, close }: { item: typeof listings[number]; close: () => void }) {
  const [step, setStep] = useState(1);
  return <Modal onClose={close}>
    <div className="flow-head"><Badge tone="sell">Purchase demo flow</Badge><span>Step {step} of 5</span><h2>{["Request to buy", "Seller response", "Arrange collection", "Confirm purchase", "Rate the seller"][step - 1]}</h2><div className="progress"><span style={{ width: `${step / 5 * 100}%` }} /></div></div>
    {step === 1 && <div className="flow-body"><div className="item-mini"><img src={item.image} alt="" /><div><strong>{item.title}</strong><span>{item.price}</span></div></div><label>Message to seller<textarea defaultValue="Hi, is this still available? I can collect from campus after lectures on Thursday." /></label><div className="no-payment"><strong>Pay directly to the seller</strong><p>Vikka.lk does not process payments or provide delivery.</p></div><Button className="full" onClick={() => setStep(2)}>Send purchase request</Button></div>}
    {step === 2 && <Success icon="check" title="Seller accepted your request" copy="Contact details are now visible to both of you."><div className="contact-card"><span><small>Seller</small><strong>077 ••• ••42</strong></span><span><small>Status</small><strong>Reserved for you</strong></span></div><Button onClick={() => setStep(3)}>Arrange collection</Button></Success>}
    {step === 3 && <div className="flow-body"><Badge tone="warning">Reserved</Badge><h3>Meet safely on campus</h3><p className="lead">Inspect the item before making payment directly to the seller.</p><SummaryRows rows={[["Collection","CINEC Campus library entrance"],["Seller","Kasun Dissanayake"],["Price","Rs. 4,500"],["Payment","Arrange directly"]]} /><Button className="full" onClick={() => setStep(4)}>Seller marks item sold</Button></div>}
    {step === 4 && <Success icon="check" title="Item marked as sold" copy="Confirm only after you’ve received and inspected the item."><Button onClick={() => setStep(5)}>I received the item</Button></Success>}
    {step === 5 && <Rating onDone={close} title="How was buying from Kasun?" />}
  </Modal>;
}

function SummaryRows({ rows }: { rows: string[][] }) {
  return <div className="summary-rows">{rows.map(([a,b]) => <div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div>;
}

function Success({ icon, title, copy, children }: { icon: string; title: string; copy: string; children?: ReactNode }) {
  return <div className="success-state"><span className="success-icon"><Icon name={icon} size={30} /></span><h3>{title}</h3><p>{copy}</p>{children}</div>;
}

function Rating({ title, onDone }: { title: string; onDone: () => void }) {
  const [rating, setRating] = useState(0); const [done, setDone] = useState(false);
  if (done) return <Success icon="check" title="Review submitted" copy="Thanks for helping students trade with confidence."><Button onClick={onDone}>Done</Button></Success>;
  return <div className="flow-body rating-form"><h3>{title}</h3><p>Your review will be linked to this completed transaction.</p><div className="stars" aria-label="Rating">{[1,2,3,4,5].map(n=><button className={rating>=n?"active":""} key={n} onClick={()=>setRating(n)} aria-label={`${n} stars`}>★</button>)}</div><label>Short review (optional)<textarea placeholder="What went well?" /></label><Button className="full" disabled={!rating} onClick={()=>setDone(true)}>Submit review</Button></div>;
}

function AuthFlow({ done, mode, setMode, goBack, onHome }: { done: () => void; mode: AuthMode; setMode: (mode: AuthMode) => void; goBack: () => void; onHome: () => void }) {
  const [step, setStep] = useState(1); const [error, setError] = useState("");
  const submitEmail = (e: FormEvent) => { e.preventDefault(); const value = (new FormData(e.currentTarget as HTMLFormElement).get("email") as string); if (!value.endsWith("@student.cinec.edu")) setError("Use your CINEC student email ending in @student.cinec.edu"); else { setError(""); setStep(2); } };
  const authPanel = mode === "login" ? <><span className="step-label">Welcome back</span><h2>Log in to Vikka</h2><p>New to the marketplace? <button className="text-link" onClick={()=>setMode("register")}>Create an account</button></p><div className="form-stack"><label>Student email or registration number<input placeholder="Email or registration number"/></label><label>Password<input type="password" placeholder="Your password"/></label><div className="form-between"><label className="check-row"><input type="checkbox"/>Remember me</label><button className="text-link" onClick={()=>setMode("forgot")}>Forgot password?</button></div><Button className="full" onClick={done}>Log in</Button><div className="form-note"><Icon name="shield"/><span>Only verified CINEC student accounts can send requests or post items.</span></div></div></>
    : mode === "forgot" ? <><span className="step-label">Account recovery</span><h2>Reset your password</h2><p>Enter your verified student or recovery email. We’ll send a secure reset link.</p><div className="form-stack"><label>Email address<input placeholder="name@student.cinec.edu"/></label><Button className="full" onClick={()=>setMode("sent")}>Send reset link</Button><Button variant="ghost" className="full" onClick={()=>setMode("login")}>Back to log in</Button></div></>
    : mode === "sent" ? <Success icon="check" title="Check your email" copy="If the address matches an active account, a password reset link has been sent."><Button onClick={()=>setMode("login")}>Return to log in</Button></Success>
    : null;
  return <main className="auth-page"><div className="auth-art"><Brand onClick={onHome} /><div><Badge tone="light">Verified campus community</Badge><h1>Start your next campus exchange.</h1><p>Useful things, trusted people, and a little less waste.</p></div><div className="auth-photo"><img src={photos.desk} alt="Student study essentials" /></div></div><div className="auth-panel">
    <button className="back-link auth-back" onClick={goBack}>← Back</button>
    {authPanel || <>{step === 1 && <><span className="step-label">Registration · 1 of 3</span><h2>Create your student account</h2><p>Already a member? <button className="text-link" onClick={()=>setMode("login")}>Log in</button></p><form onSubmit={submitEmail} className="form-stack"><label>Full name<input required placeholder="Your full name" /></label><label>Student registration number<input required placeholder="CINEC registration number" /></label><label>CINEC student email<input name="email" required placeholder="name@student.cinec.edu" aria-invalid={!!error} />{error && <small className="error-text">{error}</small>}</label><div className="split-fields"><label>Password<input required type="password" placeholder="At least 8 characters" /></label><label>Confirm password<input required type="password" placeholder="Repeat password" /></label></div><small className="password-guide">Use 8+ characters with an uppercase letter, number and symbol.</small><label className="check-row"><input type="checkbox" required />I agree to the Terms and Privacy Policy.</label><Button type="submit" className="full">Continue to verification <Icon name="arrow" /></Button></form><div className="form-note"><Icon name="shield" /><span>Your registration number is unique and visible only to authorised admins.</span></div></>}
    {step === 2 && <div className="verification"><span className="mail-icon">@</span><span className="step-label">Registration · 2 of 3</span><h2>Check your student email</h2><p>We sent a six-digit code to <strong>nethmi@student.cinec.edu</strong></p><div className="code-inputs">{[0,1,2,3,4,5].map((x)=><input key={x} maxLength={1} defaultValue={x<5?String([4,8,2,1,9][x]):""} aria-label={`Digit ${x+1}`} />)}</div><Button className="full" onClick={()=>setStep(3)}>Verify email</Button><p className="resend">Resend code in 00:24</p></div>}
    {step === 3 && <><span className="step-label">Registration · 3 of 3</span><h2>Finish your profile</h2><p>Only your general area is shown publicly.</p><div className="form-stack"><label>Current area<select><option>Malabe</option><option>Kaduwela</option><option>CINEC Hostel</option><option>Millennium City</option></select></label><label>Contact number<input placeholder="07X XXX XXXX" /><small>Hidden until a request is accepted.</small></label><label>Optional profile picture<div className="upload-zone"><Icon name="upload" /><span><strong>Choose a photo</strong> or drag it here</span></div></label><Button className="full" onClick={done}>Complete profile</Button></div></>}</>}
  </div></main>;
}

const dashboardNav = ["Overview", "My Listings", "Requests Sent", "Requests Received", "Rental Bookings", "Purchases", "Exchange Offers", "Donation Requests", "Wishlist", "Reviews", "Notifications", "Account Settings"];

function Dashboard({ section, navigate, onSection, onPost }: { section: string; navigate: (p: Page, state?: Partial<RouteState>) => void; onSection: (section: string) => void; onPost: () => void }) {
  const [notice, setNotice] = useState("");
  return <main className="portal"><aside className="portal-side"><Brand onClick={()=>navigate("home")} /><div className="portal-profile"><span className="avatar">NS</span><div><strong>Nethmi Silva</strong><small>Verified student</small></div></div><nav>{dashboardNav.map(n=><button className={section===n?"active":""} onClick={()=>onSection(n)} key={n}><Icon name={n==="Notifications"?"bell":n==="Wishlist"?"heart":n==="Overview"?"grid":"arrow"} />{n}{n==="Notifications"&&<b>3</b>}</button>)}</nav><Button variant="ghost" onClick={()=>navigate("home")}>← Back to marketplace</Button></aside>
    <section className="portal-main"><div className="portal-top"><div><span className="eyebrow">Student workspace</span><h1>{section}</h1></div><Button onClick={onPost}><Icon name="plus"/> Post an item</Button></div>
      {notice && <div className="toast-inline"><Icon name="check"/>{notice}</div>}
      {section==="Overview" ? <Overview setListing={onPost} setSection={onSection} /> : section==="Notifications" ? <Notifications /> : section==="My Listings" ? <MyListings /> : section==="Account Settings" ? <AccountSettings /> : <RequestSection name={section} onAction={(x)=>setNotice(x)} />}
    </section>
  </main>;
}

function Overview({ setListing, setSection }: { setListing:()=>void; setSection:(v:string)=>void }) {
  return <><div className="welcome-card"><div><Badge tone="light">Good afternoon, Nethmi</Badge><h2>Ready to give something a second story?</h2><p>Your profile is verified. You can request items or post a listing for the campus community.</p><Button variant="secondary" onClick={setListing}>Create a listing</Button></div><img src={photos.headphones} alt="Campus marketplace items" /></div>
  <div className="stat-grid">{[["Active listings","3","+1 this month"],["Pending requests","2","Needs attention"],["Upcoming returns","1","Due on Friday"],["Unread notifications","3","View updates"]].map(([a,b,c])=><button key={a} onClick={()=>a.includes("notification")&&setSection("Notifications")}><span>{a}</span><strong>{b}</strong><small>{c}</small></button>)}</div>
  <div className="dashboard-columns"><section className="panel"><div className="panel-title"><h2>Recent activity</h2><button onClick={()=>setSection("Notifications")}>View all</button></div>{[["New rental request","Canon EOS camera · 10–12 Oct","12 min ago"],["Listing approved","Aluminium laptop stand","Yesterday"],["Return reminder","Tripod is due this Friday","2 days ago"]].map(x=><div className="activity" key={x[0]}><span><Icon name="bell"/></span><div><strong>{x[0]}</strong><p>{x[1]}</p></div><small>{x[2]}</small></div>)}</section><section className="panel"><div className="panel-title"><h2>Upcoming</h2></div><div className="upcoming"><Badge tone="warning">Return due</Badge><span>Friday, 16 October</span><h3>Manfrotto travel tripod</h3><p>Return to Amaya near CINEC Campus</p><Button variant="secondary" onClick={()=>setSection("Rental Bookings")}>View booking</Button></div></section></div></>;
}

function Notifications() {
  return <section className="panel notification-list"><div className="panel-title"><h2>Recent updates</h2><button onClick={()=>demoFeedback("All notifications marked as read.")}>Mark all as read</button></div>{[
    ["Listing approved","Your laptop stand is now visible in the marketplace.","2 min ago","success"],
    ["Rental request accepted","Kasun accepted your camera request. Contact details are now available.","1 hour ago","info"],
    ["Return due tomorrow","Remember to return the travel tripod by 6:00 PM.","Yesterday","warning"],
    ["Report update","Admin reviewed your report and marked it resolved.","3 days ago","neutral"],
  ].map(([a,b,c,t])=><div className="notification" key={a}><span className={`notice-dot ${t}`} /><div><strong>{a}</strong><p>{b}</p><small>{c} · Email notification also sent</small></div></div>)}</section>;
}

function MyListings() {
  const [filter,setFilter]=useState("All");
  const rows=listings.slice(0,3).map((listing,index)=>({listing,status:index===0?"Pending":index===1?"Published":"Draft"})).filter(row=>filter==="All"||row.status===filter);
  return <section className="panel"><div className="panel-title"><h2>Your listings</h2><div className="tabs compact">{["All","Published","Pending"].map(item=><button className={filter===item?"active":""} onClick={()=>setFilter(item)} key={item}>{item}</button>)}</div></div>{rows.map(({listing:l,status},i)=><div className="manage-row" key={l.id}><img src={l.image} alt="" /><div><strong>{l.title}</strong><span>{l.price} · {l.location}</span></div><Badge tone={status==="Pending"?"warning":status==="Published"?"success":"neutral"}>{status==="Pending"?"Changes pending review":status}</Badge><Button variant="ghost" onClick={()=>demoFeedback(`${l.title} opened for editing.`)}>Manage</Button></div>)}</section>;
}

function AccountSettings() {
  return <div className="dashboard-columns"><section className="panel form-stack"><h2>Profile & privacy</h2><label>Full name<input defaultValue="Nethmi Silva" /></label><label>Current area<select><option>Malabe</option></select></label><label>Contact number<input defaultValue="071 ••• ••18" /><small>Shared only when a request is accepted.</small></label><label>Recovery email (optional)<input placeholder="Add a verified personal email" /></label><Button>Save changes</Button></section><section className="panel"><h2>Public profile preview</h2><div className="profile-preview"><span className="avatar avatar-lg">NS</span><h3>Nethmi Silva</h3><Badge tone="verified"><Icon name="check" size={12}/> Verified CINEC student</Badge><p>Malabe · ★ 4.8 (6 reviews)</p><p>5 completed transactions · Member since 2025</p></div><div className="privacy-note"><Icon name="shield"/><p>Your registration number, phone number, recovery email and sensitive details are never public.</p></div></section></div>;
}

function RequestSection({ name, onAction }: { name:string; onAction:(s:string)=>void }) {
  const emptyNames = ["Exchange Offers","Donation Requests","Wishlist"];
  if(emptyNames.includes(name)) return <div className="empty-state panel"><span><Icon name={name==="Wishlist"?"heart":"arrow"} size={30}/></span><h2>No {name.toLowerCase()} yet</h2><p>When you interact with a listing, it will appear here.</p></div>;
  return <section className="panel"><div className="panel-title"><h2>{name}</h2><select><option>All statuses</option><option>Pending</option><option>Completed</option></select></div><div className="request-card"><img src={photos.camera} alt="Canon camera"/><div><Badge tone="warning">{name==="Reviews"?"Awaiting review":"Pending"}</Badge><h3>Canon EOS 80D camera kit</h3><p>10–12 October · 2 days · Rs. 1,500</p><small>Contact details hidden until acceptance</small></div><div className="request-actions"><Button onClick={()=>onAction(name==="Requests Received"?"Request accepted — contact details are now visible.":"Action saved in this prototype.")}>{name==="Requests Received"?"Accept":"View details"}</Button><Button variant="ghost">{name==="Requests Received"?"Reject":"Cancel request"}</Button></div></div><div className="status-strip">{["Pending","Accepted","Active","Return Due","Completed"].map((x,i)=><span className={i===0?"active":""} key={x}><i>{i+1}</i>{x}</span>)}</div></section>;
}

function ListingWizard({ close }: { close:()=>void }) {
  const [step,setStep]=useState(1); const [type,setType]=useState<ListingType>("Rent"); const [guarantees,setGuarantees]=useState(["Show CINEC Student ID at handover","Sign a physical handover acknowledgement"]); const [submitted,setSubmitted]=useState(false);
  if(submitted) return <main className="wizard-page"><div className="wizard-shell"><Success icon="check" title="Your listing is awaiting admin approval" copy="We’ll send an in-app and email notification after an admin reviews it. It is not public yet."><Badge tone="warning">Pending approval</Badge><Button onClick={close}>Return to dashboard</Button></Success></div></main>;
  return <main className="wizard-page"><div className="wizard-top"><Brand onClick={close}/><button className="back-link" onClick={close}>← Back to dashboard</button><button onClick={close}>Save draft & exit</button></div><div className="wizard-shell"><div className="wizard-head"><span className="step-label">New listing · Step {step} of 5</span><h1>{["What would you like to do?","Tell us about the item","Add clear photos","Set listing details","Review your listing"][step-1]}</h1><div className="wizard-progress">{[1,2,3,4,5].map(n=><span className={step>=n?"active":""} key={n}><i>{step>n?<Icon name="check" size={14}/>:n}</i><b>{["Type","Details","Photos","Options","Review"][n-1]}</b></span>)}</div></div>
    {step===1&&<div className="type-grid">{(["Rent","Sell","Exchange","Donate"] as ListingType[]).map((t,i)=><button className={type===t?"active":""} onClick={()=>setType(t)} key={t}><span><Icon name={["calendar","grid","arrow","heart"][i]}/></span><strong>{t}</strong><small>{["Earn by lending it for a set time","Pass it on for a fair price","Trade it for something useful","Give it to someone who needs it"][i]}</small></button>)}</div>}
    {step===2&&<div className="form-card form-stack"><label>Listing title<input defaultValue="Canon EOS 80D camera kit" /></label><div className="split-fields"><label>Category<select><option>Cameras</option><option>Electronics</option></select></label><label>Condition<select><option>Excellent</option><option>Good</option></select></label></div><label>Description<textarea defaultValue="Reliable camera kit, ideal for student projects and campus events. Includes lens, battery, charger and padded carry bag." /></label><label>General location<select><option>CINEC Campus</option><option>Malabe</option></select><small>Never enter a permanent address or live GPS location.</small></label></div>}
    {step===3&&<div className="form-card"><div className="upload-zone large"><Icon name="upload" size={30}/><strong>Drag up to three images here</strong><span>JPG or PNG, up to 8 MB each</span><Button variant="secondary" onClick={()=>demoFeedback("Image picker opened in the prototype.")}>Choose images</Button></div><div className="image-previews"><div className="cover"><img src={photos.camera} alt="Camera preview"/><Badge tone="verified">Cover</Badge><button onClick={()=>demoFeedback("Choose a replacement image.")}>Replace</button></div><button className="placeholder" onClick={()=>demoFeedback("Add a second image.")}>+ Add image</button><button className="placeholder" onClick={()=>demoFeedback("Add a third image.")}>+ Add image</button></div><p className="helper">Tip: photograph the actual item in good light. Drag images to reorder.</p></div>}
    {step===4&&<div className="form-card form-stack"><div className="split-fields"><label>Daily price (Rs.)<input defaultValue="750" /></label><label>Minimum rental period<select><option>1 day</option><option>2 days</option></select></label></div><label>Maximum rental period (optional)<select><option>14 days</option><option>7 days</option></select></label><fieldset><legend>Guarantee options</legend><p className="helper">Renters must agree to at least one option.</p>{guarantees.map((g,i)=><div className="guarantee-row" key={i}><input value={g} onChange={(e)=>setGuarantees(guarantees.map((x,j)=>j===i?e.target.value:x))}/><button onClick={()=>setGuarantees(guarantees.filter((_,j)=>j!==i))}>Remove</button></div>)}<Button variant="secondary" onClick={()=>setGuarantees([...guarantees,""])}><Icon name="plus"/> Add guarantee option</Button></fieldset><div className="safety-alert"><Icon name="shield"/><p>Options requiring identity uploads, copies, photos, or retention of original documents will be rejected.</p></div></div>}
    {step===5&&<div className="review-layout"><ListingCard item={{...listings[0],type}} onOpen={()=>{}}/><div className="form-card"><h2>Ready for review</h2><SummaryRows rows={[["Type",type],["Category","Cameras"],["Location","CINEC Campus"],["Daily price","Rs. 750"],["Images","1 of 3"],["Guarantees",String(guarantees.length)]]}/><div className="no-payment"><strong>Admin approval required</strong><p>Your listing will not be public until it passes the prohibited-item and safety review.</p></div><label className="check-row"><input type="checkbox" defaultChecked/>I confirm this item follows the Terms and Prohibited Items policy.</label></div></div>}
    <div className="wizard-actions"><Button variant="secondary" onClick={()=>step===1?close():setStep(step-1)}>Back</Button><Button onClick={()=>step===5?setSubmitted(true):setStep(step+1)}>{step===5?"Submit for approval":"Continue"} <Icon name="arrow"/></Button></div></div></main>;
}

const adminNav=["Dashboard","Listing Approval","User Management","Reports & Disputes","Prohibited Items","Audit Log"];
function Admin({ navigate, section, onSection }: { navigate:(p:Page, state?:Partial<RouteState>)=>void; section:string; onSection:(section:string)=>void }) {
  const [review,setReview]=useState(false); const [decision,setDecision]=useState(""); const [reason,setReason]=useState("");
  if(review) return <main className="admin-review"><div className="admin-review-top"><button onClick={()=>setReview(false)}>← Back to approval queue</button><div><Badge tone="warning">Pending approval</Badge><span>Submitted 18 minutes ago</span></div></div><div className="admin-review-grid"><section><h1>Canon EOS 80D camera kit</h1><div className="review-images"><img src={photos.camera} alt="Submitted camera"/><img src={photos.lens} alt="Submitted lens"/></div><div className="panel"><h2>Listing details</h2><SummaryRows rows={[["Listing type","Rent"],["Category","Cameras"],["Condition","Excellent"],["Location","CINEC Campus"],["Daily price","Rs. 750"],["Rental duration","1–14 days"]]}/><h3>Description</h3><p>Reliable camera kit in excellent condition, ideal for student projects and campus events. Includes lens, battery, charger and padded carry bag.</p></div><div className="panel"><h2>Custom guarantee options</h2>{["Show CINEC Student ID at handover","Sign a physical handover acknowledgement"].map(x=><div className="safe-option" key={x}><Icon name="check"/><span>{x}</span><Badge tone="success">Safety check passed</Badge></div>)}</div></section><aside><div className="panel sticky"><h2>Review checklist</h2>{["Images show the actual item","Item is not prohibited","Description matches images","Price appears reasonable","Guarantees are privacy-safe"].map(x=><label className="check-row" key={x}><input type="checkbox" defaultChecked/>{x}</label>)}<hr/><h3>Owner</h3><div className="owner-card compact"><span className="avatar">KD</span><div><strong>Kasun Dissanayake</strong><Badge tone="verified">Verified</Badge><p>4.9 rating · 8 transactions</p><small>Registration: CINEC/••••/1842 · Admin only</small></div></div>{decision==="reject"&&<label>Mandatory reason<textarea value={reason} onChange={e=>setReason(e.target.value)} placeholder="Explain what must be changed"/></label>}<Button className="full" onClick={()=>setDecision("approved")}><Icon name="check"/> Approve listing</Button><Button variant="secondary" className="full" onClick={()=>setDecision("changes")}>Request changes</Button><Button variant="danger" className="full" onClick={()=>decision==="reject"&&reason?setDecision("rejected"):setDecision("reject")}>Reject listing</Button>{decision&&decision!=="reject"&&<div className="toast-inline"><Icon name="check"/>Listing {decision}. User notification and email queued.</div>}</div></aside></div></main>;
  return <main className="portal admin"><aside className="portal-side"><Brand onClick={()=>navigate("home")}/><Badge tone="neutral">Admin portal · Demo</Badge><nav>{adminNav.map(n=><button className={section===n?"active":""} onClick={()=>onSection(n)} key={n}><Icon name={n==="Dashboard"?"grid":n==="Audit Log"?"calendar":"shield"}/>{n}</button>)}</nav><Button variant="ghost" onClick={()=>navigate("home")}>← Public marketplace</Button></aside><section className="portal-main"><div className="portal-top"><div><span className="eyebrow">Vikka operations</span><h1>{section}</h1></div><span className="admin-user"><span className="avatar">AM</span> Admin M.</span></div>{section==="Dashboard"?<AdminDashboard onReview={()=>setReview(true)}/>:<AdminSection name={section} onReview={()=>setReview(true)}/>}</section></main>;
}

function AdminDashboard({onReview}:{onReview:()=>void}) {
  return <><div className="stat-grid admin-stats">{[["Awaiting approval","12","4 today"],["Active users","2,418","+38 this month"],["Open reports","7","2 high priority"],["Open disputes","3","Oldest: 26h"],["Overdue rentals","5","Needs review"],["Cancellation flags","2","Admin warning only"]].map(([a,b,c])=><div key={a}><span>{a}</span><strong>{b}</strong><small>{c}</small></div>)}</div><div className="dashboard-columns wide-left"><section className="panel"><div className="panel-title"><h2>Listing approval queue</h2><button onClick={onReview}>View all</button></div>{listings.slice(0,4).map((l,i)=><button className="approval-row" onClick={onReview} key={l.id}><img src={l.image} alt=""/><div><strong>{l.title}</strong><span>{l.type} · {i*12+6} min ago</span></div><Badge tone={i===0?"warning":"neutral"}>{i===0?"Safety check":"Pending"}</Badge><Icon name="arrow"/></button>)}</section><section className="panel risk-panel"><div className="panel-title"><h2>Needs attention</h2></div>{[["Overdue rental","Tripod · 3 days overdue","warning"],["Frequent cancellations","User U-2048 · 6 in 90 days","danger"],["Recently suspended","Listing L-819 · counterfeit concern","neutral"]].map(([a,b,t])=><div key={a}><Badge tone={t}>{a}</Badge><p>{b}</p><button onClick={()=>demoFeedback(`${a} opened for admin review.`)}>Review case →</button></div>)}</section></div></>;
}

function AdminSection({name,onReview}:{name:string;onReview:()=>void}) {
  if(name==="Listing Approval") return <section className="panel"><div className="panel-title"><h2>12 pending listings</h2><div><select><option>All types</option></select></div></div>{listings.map(l=><button className="approval-row" onClick={onReview} key={l.id}><img src={l.image} alt=""/><div><strong>{l.title}</strong><span>{l.type} · by verified user U-1842</span></div><Badge tone="warning">Pending</Badge><Icon name="arrow"/></button>)}</section>;
  const rows:Record<string,string[][]>={
    "User Management":[["U-1842 · Kasun D.","Verified · 4.9 rating","8 transactions"],["U-2048 · User R.","Frequent cancellation flag","6 cancellations / 90 days"],["U-2211 · Amaya P.","Suspended","2 open reports"]],
    "Reports & Disputes":[["R-104 · Misleading listing","Reported listing L-882","Open · High"],["D-041 · Return confirmation","Rental B-220","Admin review"],["R-098 · Inappropriate review","Review RV-510","Investigating"]],
    "Prohibited Items":[["Illegal drugs, weapons, stolen goods","Core prohibited list","Active"],["Student IDs, bank cards, fake documents","Identity & financial","Active"],["Alcohol, tobacco, dangerous chemicals","Restricted goods","Active"],["Prescription medicine, counterfeit products","Safety & authenticity","Active"]],
    "Audit Log":[["Admin M. · Suspended listing","Target L-819","Today, 10:42 · Counterfeit concern"],["Admin S. · Approved listing","Target L-804","Yesterday, 16:20"],["Admin M. · Warning issued","Target U-2048","Yesterday, 14:05 · Frequent cancellations"]]
  };
  return <section className="panel"><div className="panel-title"><h2>{name}</h2><div><input placeholder="Search records"/><Button variant="secondary">Filter</Button></div></div><div className="admin-table">{(rows[name]||[]).map((r,i)=><div key={i}><strong>{r[0]}</strong><span>{r[1]}</span><Badge tone={r[2].includes("Active")?"success":r[2].includes("High")||r[2].includes("Suspended")?"danger":"neutral"}>{r[2]}</Badge><Button variant="ghost">Review</Button></div>)}</div>{name==="User Management"&&<p className="helper">Registration numbers are admin-only. Passwords are never available to admins. Frequent-cancellation flags do not automatically ban users.</p>}</section>;
}

function InfoPage({ title, goBack, navigate }: { title:string; goBack:()=>void; navigate:(p:Page, state?:Partial<RouteState>)=>void }) {
  const content: Record<string, [string,string[]]> = {
    "Safety on Vikka.lk": ["Meet safely, protect your information, and inspect every item before completing an exchange.", ["Meet in a busy campus location.", "Never hand over original identity documents.", "Contact details appear only after a request is accepted."]],
    "Privacy": ["Your student registration number, phone number, recovery email, and sensitive details are never shown publicly.", ["We use general areas, not permanent addresses.", "Vikka.lk does not request live GPS locations.", "Identity-document images are not accepted."]],
    "Terms": ["Use Vikka.lk respectfully and only for genuine campus transactions.", ["Listings require admin approval.", "Users arrange payment and collection directly.", "Prohibited or misleading listings may be removed."]],
    "Prohibited items": ["Some items cannot be listed in the campus marketplace.", ["Weapons, illegal drugs, and stolen goods", "Student IDs, bank cards, and fake documents", "Prescription medicine, alcohol, tobacco, and counterfeit products"]],
    "Help centre": ["Find help with listings, requests, returns, and account access.", ["Requests and contact privacy", "Listing approval and edits", "Returns, reports, and reviews"]],
    "Contact": ["Need help with this prototype?", ["Use the in-app report path for transaction issues.", "Account and listing notifications are sent in-app and by email.", "No SMS or push notifications are used."]],
    "Report this listing": ["Tell the moderation team what is wrong with this listing.", ["Misleading description", "Prohibited or unsafe item", "Duplicate, unavailable, or suspicious listing"]],
    "Kasun’s student profile": ["A privacy-safe summary of this verified marketplace member.", ["★ 4.9 from 12 reviews", "8 completed campus exchanges", "Member since September 2025"]],
  };
  const [intro, bullets] = content[title] ?? ["This Vikka.lk information page is connected and ready for production content.", ["Clear campus guidance", "Privacy-first behavior", "Support for verified students"]];
  return <main className="info-page section"><button className="back-link" onClick={goBack}>← Back</button><Badge tone="verified">Vikka.lk guide</Badge><h1>{title}</h1><p className="info-lead">{intro}</p><section className="panel info-panel">{bullets.map((item)=><div key={item}><Icon name="check"/><span>{item}</span></div>)}</section>{title==="Report this listing"&&<div className="form-card form-stack"><label>Reason<select><option>Select a reason</option>{bullets.map(x=><option key={x}>{x}</option>)}</select></label><label>Short description<textarea placeholder="Add helpful context for the admin team"/></label><Button onClick={()=>demoFeedback("Report submitted. You can track it from your dashboard.")}>Submit report</Button></div>}<Button variant="secondary" onClick={()=>navigate("home")}>Return home</Button></main>;
}

function Footer({navigate,openBrowse}:{navigate:(p:Page,state?:Partial<RouteState>)=>void;openBrowse:(tab?:string)=>void}) {
  return <footer><div className="section footer-grid"><div><Brand onClick={()=>navigate("home")}/><p>Rent. Sell. Exchange. Share.<br/>A trusted marketplace for campus life.</p></div><div><strong>Marketplace</strong>{["Browse","Rent","Buy","Exchange","Donate"].map(x=><button onClick={()=>openBrowse(x==="Browse"?"All":x)} key={x}>{x}</button>)}</div><div><strong>Support</strong>{["How it works","Safety","Help centre","Contact"].map(x=><button onClick={()=>x==="How it works"?(navigate("home"),window.setTimeout(()=>document.querySelector("#how")?.scrollIntoView(),0)):navigate("info",{infoTitle:x==="Safety"?"Safety on Vikka.lk":x})} key={x}>{x}</button>)}</div><div><strong>Legal</strong>{["Terms","Privacy","Prohibited items"].map(x=><button onClick={()=>navigate("info",{infoTitle:x})} key={x}>{x}</button>)}</div></div><div className="footer-bottom section"><span>© 2026 Vikka.lk · Interactive prototype</span><button onClick={()=>navigate("admin",{adminSection:"Dashboard"})}>Admin demo</button></div></footer>;
}

export default function App() {
  const initialRoute: RouteState = window.history.state?.vikka ? window.history.state : { vikka:true, index:0, page:"home", browse:defaultBrowse };
  const [route,setRoute]=useState<RouteState>(initialRoute); const [browseState,setBrowseState]=useState<BrowseState>(initialRoute.browse ?? defaultBrowse); const [flow,setFlow]=useState<"rental"|"sale"|null>(null); const [loggedIn,setLoggedIn]=useState(false); const [signIn,setSignIn]=useState(false); const [feedback,setFeedback]=useState("");
  const page=route.page; const selected=listings.find(item=>item.id===route.listingId) ?? listings[0];
  const navigate=useCallback((nextPage:Page, state:Partial<RouteState>={})=>{
    const next:RouteState={...route,...state,vikka:true,index:route.index+1,page:nextPage,browse:state.browse ?? browseState};
    window.history.pushState(next,"",`#/${nextPage}`);
    setRoute(next);
    window.scrollTo(0,0);
  },[route,browseState]);
  const goBack=useCallback((fallback:Page="home")=>route.index>0?window.history.back():navigate(fallback),[route.index,navigate]);
  useEffect(()=>{
    window.history.replaceState({...route,browse:browseState},"",`#/${route.page}`);
  },[route,browseState]);
  useEffect(()=>{
    const onPop=(event:PopStateEvent)=>{const next:RouteState=event.state?.vikka?event.state:{vikka:true,index:0,page:"home",browse:defaultBrowse};setRoute(next);setBrowseState(next.browse??defaultBrowse);setFlow(null);setSignIn(false);};
    const onFeedback=(event:Event)=>{setFeedback((event as CustomEvent<string>).detail);window.setTimeout(()=>setFeedback(""),2600);};
    window.addEventListener("popstate",onPop); window.addEventListener("vikka:feedback",onFeedback);
    return()=>{window.removeEventListener("popstate",onPop);window.removeEventListener("vikka:feedback",onFeedback);};
  },[]);
  const openBrowse=(tab="All",category?:string)=>{const next={...browseState,tab:tab==="Buy"?"Buy":tab,category:category??browseState.category,empty:false};setBrowseState(next);navigate("browse",{browse:next});};
  const openItem=(item:typeof listings[number])=>navigate("detail",{listingId:item.id});
  const protectedAction=()=> loggedIn ? setFlow(selected.type==="Rent"?"rental":"sale") : setSignIn(true);
  let pageContent:ReactNode;
  if(page==="home")pageContent=<Home navigate={navigate} openBrowse={openBrowse} openItem={openItem}/>;
  else if(page==="browse")pageContent=<Browse openItem={openItem} state={browseState} setState={setBrowseState}/>;
  else if(page==="detail")pageContent=<Detail item={selected} onRequest={protectedAction} guestAction={()=>loggedIn?demoFeedback("Item saved to your wishlist."):setSignIn(true)} goBack={()=>goBack("browse")} navigate={navigate}/>;
  else if(page==="auth")pageContent=<AuthFlow mode={route.authMode??"register"} setMode={(authMode)=>navigate("auth",{authMode})} goBack={()=>goBack("home")} onHome={()=>navigate("home")} done={()=>{setLoggedIn(true);navigate("dashboard",{dashboardSection:"Overview"})}}/>;
  else if(page==="dashboard")pageContent=<Dashboard section={route.dashboardSection??"Overview"} navigate={navigate} onSection={(dashboardSection)=>navigate("dashboard",{dashboardSection})} onPost={()=>navigate("post")}/>;
  else if(page==="post")pageContent=<ListingWizard close={()=>goBack("dashboard")}/>;
  else if(page==="admin")pageContent=<Admin navigate={navigate} section={route.adminSection??"Dashboard"} onSection={(adminSection)=>navigate("admin",{adminSection})}/>;
  else pageContent=<InfoPage title={route.infoTitle??"About Vikka.lk"} goBack={()=>goBack("home")} navigate={navigate}/>;
  const standalone=page==="auth"||page==="dashboard"||page==="post"||page==="admin";
  return <div className="app">
    {!standalone&&<Header navigate={navigate} openBrowse={openBrowse} loggedIn={loggedIn}/>}
    {pageContent}
    {!standalone&&<Footer navigate={navigate} openBrowse={openBrowse}/>}
    {feedback&&<div className="global-toast" role="status"><Icon name="check"/>{feedback}</div>}
    {signIn&&<Modal onClose={()=>setSignIn(false)}><div className="signin-dialog"><span><Icon name="shield" size={30}/></span><h2>Sign in to continue</h2><p>Log in with your verified CINEC student account to continue.</p><Button className="full" onClick={()=>{setSignIn(false);navigate("auth",{authMode:"register"})}}>Create student account</Button><Button variant="secondary" className="full" onClick={()=>{setSignIn(false);navigate("auth",{authMode:"login"})}}>Log in</Button><small>Guests can browse listings, prices and general locations, but cannot send requests, save items or post listings.</small></div></Modal>}
    {flow==="rental"&&<RentalFlow item={selected} close={()=>setFlow(null)}/>}
    {flow==="sale"&&<SaleFlow item={selected} close={()=>setFlow(null)}/>}
  </div>;
}
