import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Instagram, Menu, X } from "lucide-react";
import { Button } from "../components/Button";
import heroImage from "../assets/editorial-hero.jpg";
import tailoredImage from "../assets/look-tailored.jpg";
import summerImage from "../assets/look-summer.jpg";
import eveningImage from "../assets/look-evening.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Style Edit — Curated Fashion & Everyday Inspiration" },
      { name: "description", content: "A curated fashion portfolio of considered outfits, timeless staples, and pieces worth discovering." },
      { property: "og:title", content: "The Style Edit — Curated Fashion & Everyday Inspiration" },
      { property: "og:description", content: "Explore considered outfits, timeless staples, and pieces worth discovering." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const looks = [
  {
    id: "01", title: "The quiet statement", category: "Essentials", subtitle: "An exercise in less, but better.", image: heroImage,
    items: ["Draped linen dress", "Minimal leather sandals", "Sculptural gold earrings"],
    searches: ["linen wrap dress", "minimal leather sandals", "gold sculptural earrings"],
  },
  {
    id: "02", title: "The modern uniform", category: "Workwear", subtitle: "Sharp lines, easy attitude.", image: tailoredImage,
    items: ["Oversized charcoal blazer", "Tailored wide-leg trousers", "Everyday white tank"],
    searches: ["oversized charcoal blazer women", "wide leg tailored trousers women", "white tank top women"],
  },
  {
    id: "03", title: "The softer side", category: "Weekends", subtitle: "Light layers for slower days.", image: summerImage,
    items: ["Butter yellow sleeveless blouse", "Fluid ivory maxi skirt", "Woven everyday tote"],
    searches: ["butter yellow sleeveless blouse", "ivory maxi skirt", "woven tote bag"],
  },
  {
    id: "04", title: "After hours", category: "Occasion", subtitle: "A little edge, effortlessly.", image: eveningImage,
    items: ["Chocolate leather jacket", "Black knit midi dress", "Tall leather boots"],
    searches: ["brown leather jacket women", "black knit midi dress", "tall leather boots women"],
  },
] as const;

type Look = (typeof looks)[number];
const filters = ["All looks", "Essentials", "Workwear", "Weekends", "Occasion"] as const;

function Index() {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All looks");
  const [selectedLook, setSelectedLook] = useState<Look | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleLooks = filter === "All looks" ? looks : looks.filter((look) => look.category === filter);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site-shell" id="home">
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="The Style Edit home">THE STYLE<span>EDIT</span><i>.</i></a>
        <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`} aria-label="Main navigation">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#looks" onClick={() => setMenuOpen(false)}>The looks</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <div className="header-actions">
          <Button onClick={() => scrollTo("looks")}>Explore the edit <ArrowUpRight size={16} strokeWidth={1.8} /></Button>
          <Button variant="icon" className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</Button>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> CURATED STYLE, CONSIDERED DAILY</div>
            <h1 id="hero-title">A more<br /><em>personal</em><br />point of view.</h1>
            <p>Thoughtful outfits, forever pieces, and a little inspiration for getting dressed every day.</p>
            <div className="hero-actions">
              <Button onClick={() => scrollTo("looks")}>Discover the looks <ArrowUpRight size={17} strokeWidth={1.8} /></Button>
              <Button variant="outline" onClick={() => scrollTo("about")}>Our point of view</Button>
            </div>
            <div className="hero-bottom"><span>STYLE NOTES / 001</span><span>Scroll to explore <ArrowDown size={13} /></span></div>
          </div>
          <div className="hero-gallery" aria-label="Featured fashion looks">
            {looks.map((look, index) => (
              <button
                key={look.id}
                type="button"
                className={`gallery-panel ${active === index ? "gallery-panel--active" : ""}`}
                onClick={() => setActive(index)}
                aria-label={`Show ${look.title}`}
                aria-pressed={active === index}
              >
                <img src={look.image} alt={`${look.title} fashion outfit`} width={1024} height={1536} loading={index === 0 ? "eager" : "lazy"} />
                <span className="gallery-label">{look.id} / {look.category}</span>
                {active === index && <span className="gallery-caption"><span className="gallery-caption-icon"><ArrowUpRight size={18} /></span><span><strong>{look.title}</strong><small>{look.subtitle}</small></span></span>}
              </button>
            ))}
            <div className="gallery-controls"><Button variant="icon" aria-label="Previous look" onClick={() => setActive((active + looks.length - 1) % looks.length)}><ChevronLeft size={18} /></Button><span>{String(active + 1).padStart(2, "0")} / 04</span><Button variant="icon" aria-label="Next look" onClick={() => setActive((active + 1) % looks.length)}><ChevronRight size={18} /></Button></div>
          </div>
          <div className="hero-side-label">AN EDIT OF THINGS WE LOVE — VOL. 01</div>
        </section>

        <section className="looks-section" id="looks" aria-labelledby="looks-title">
          <div className="section-topline"><span>01 / THE EDIT</span><span>SELECTED WITH INTENTION</span></div>
          <div className="section-heading"><div><span className="kicker">The current rotation</span><h2 id="looks-title">Looks to live in<span className="period">.</span></h2></div><p>Wear it your way. A collection of outfits built around pieces that make getting dressed feel easy.</p></div>
          <div className="filter-row" role="group" aria-label="Filter looks">
            {filters.map((item) => <Button key={item} variant="text" className={`filter-button ${filter === item ? "filter-button--active" : ""}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</Button>)}
          </div>
          <div className="looks-grid">
            {visibleLooks.map((look) => <article className="look-card" key={look.id}>
              <button className="look-image-button" onClick={() => setSelectedLook(look)} aria-label={`View ${look.title}`}>
                <img src={look.image} alt={`${look.title} outfit`} width={1024} height={1536} loading="lazy" />
                <span className="image-action"><ArrowUpRight size={19} /></span>
              </button>
              <div className="look-meta"><span>LOOK {look.id} / {look.category.toUpperCase()}</span><span>THE STYLE EDIT</span></div>
              <div className="look-title-row"><h3>{look.title}</h3><Button variant="icon" aria-label={`Explore ${look.title}`} onClick={() => setSelectedLook(look)}><ArrowUpRight size={21} strokeWidth={1.6} /></Button></div>
            </article>)}
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="about-index">02 / THE PHILOSOPHY</div>
          <div className="about-content"><span className="kicker">A note from the edit</span><h2 id="about-title">Good style isn’t about having more. It’s about finding <em>what feels like you.</em></h2><div className="about-footer"><p>The Style Edit is a space for considered fashion and everyday inspiration. We bring together versatile looks and standout finds, so you can discover pieces worth making your own.</p><Button variant="outline" onClick={() => scrollTo("looks")}>Explore the edit <ArrowUpRight size={17} /></Button></div></div>
        </section>
      </main>

      <footer className="footer"><div className="footer-main"><a href="#home" className="footer-wordmark">THE STYLE EDIT<span>.</span></a><p>Considered style, one look at a time.</p><a className="back-top" href="#home">Back to top <ArrowUpRight size={16} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} THE STYLE EDIT</span><span>Some shopping links may earn a commission when affiliate links are added.</span><span>MADE FOR GETTING DRESSED</span></div></footer>

      {selectedLook && <div className="modal-backdrop" onMouseDown={() => setSelectedLook(null)}><div className="look-modal" role="dialog" aria-modal="true" aria-label={`${selectedLook.title} details`} onMouseDown={(event) => event.stopPropagation()}><Button variant="icon" className="modal-close" aria-label="Close details" onClick={() => setSelectedLook(null)}><X size={22} /></Button><div className="modal-image"><img src={selectedLook.image} alt={`${selectedLook.title} outfit`} width={1024} height={1536} /></div><div className="modal-body"><span className="kicker">LOOK {selectedLook.id} / {selectedLook.category.toUpperCase()}</span><h2>{selectedLook.title}</h2><p>{selectedLook.subtitle}</p><div className="modal-items-heading">THE PIECES</div><div className="modal-items">{selectedLook.items.map((item, index) => <a key={item} href={`https://www.google.com/search?tbm=shop&q=${encodeURIComponent(selectedLook.searches[index])}`} target="_blank" rel="noopener noreferrer"><span><small>0{index + 1}</small>{item}</span><ArrowUpRight size={18} /></a>)}</div><p className="modal-note">Find similar pieces from retailers. These are search links, not affiliate links.</p></div></div></div>}
    </div>
  );
}