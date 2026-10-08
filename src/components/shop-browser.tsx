"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, type Product } from "@/lib/products";

export function ShopBrowser({ products, initialCategory = "All", initialNewOnly = false }: { products: Product[]; initialCategory?: string; initialNewOnly?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
  const [newOnly, setNewOnly] = useState(initialNewOnly);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(12000);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const results = useMemo(() => products.filter((product) => {
    const searchable = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return (category === "All" || product.category === category) && searchable.includes(query.toLowerCase()) && product.price <= maxPrice && (!newOnly || product.newArrival) && (!featuredOnly || product.featured);
  }).sort((a, b) => sort === "newest" ? Number(b.newArrival) - Number(a.newArrival) : sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : Number(b.featured) - Number(a.featured)), [products, category, query, maxPrice, newOnly, featuredOnly, sort]);

  return (
    <>
      <div className="shop-controls">
        <label className="search-field"><Search size={17} /><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" /></label>
        <div className="shop-control-actions"><button className="filter-trigger" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={15} /> Filters <span>{(category !== "All" ? 1 : 0) + Number(newOnly) + Number(featuredOnly)}</span></button><label className="sort-select"><span>Sort:</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="newest">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>
      </div>
      <div className="shop-layout">
        <aside className="shop-sidebar"><span className="filter-title">Category</span><button className={category === "All" ? "active" : ""} onClick={() => setCategory("All")}>All pieces <span>{products.length}</span></button>{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}<span>{products.filter((product) => product.category === item).length}</span></button>)}
          <div className="filter-divider" /><span className="filter-title">Refine</span><label className="check-filter"><input type="checkbox" checked={newOnly} onChange={(event) => setNewOnly(event.target.checked)} />New arrivals</label><label className="check-filter"><input type="checkbox" checked={featuredOnly} onChange={(event) => setFeaturedOnly(event.target.checked)} />Featured pieces</label><label className="price-filter">Up to KES {maxPrice.toLocaleString("en-KE")}<input type="range" min="1800" max="12000" step="200" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} /></label>
        </aside>
        <div className="shop-results"><div className="results-count">{results.length} considered {results.length === 1 ? "piece" : "pieces"}{query && <> for <strong>“{query}”</strong></>}</div>{results.length ? <div className="product-grid">{results.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><span>Nothing just yet</span><h2>We couldn’t find anything matching your search.</h2><p>Try another phrase or clear the filters to explore the collection.</p><button className="text-link" onClick={() => { setQuery(""); setCategory("All"); setNewOnly(false); setFeaturedOnly(false); setMaxPrice(12000); }}>Clear all filters <X size={14} /></button></div>}</div>
      </div>
      {filtersOpen && <div className="filter-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setFiltersOpen(false); }}><section className="filter-sheet" aria-label="Product filters"><div className="filter-sheet-head"><h2>Refine the edit</h2><button className="icon-button" aria-label="Close filters" onClick={() => setFiltersOpen(false)}><X size={20} /></button></div><span className="filter-title">Category</span><div className="filter-pills"><button className={category === "All" ? "active" : ""} onClick={() => setCategory("All")}>All</button>{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="check-filter"><input type="checkbox" checked={newOnly} onChange={(event) => setNewOnly(event.target.checked)} />New arrivals</label><label className="check-filter"><input type="checkbox" checked={featuredOnly} onChange={(event) => setFeaturedOnly(event.target.checked)} />Featured pieces</label><label className="price-filter">Up to KES {maxPrice.toLocaleString("en-KE")}<input type="range" min="1800" max="12000" step="200" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} /></label><button className="button button-dark filter-done" onClick={() => setFiltersOpen(false)}>View {results.length} pieces</button></section></div>}
    </>
  );
}