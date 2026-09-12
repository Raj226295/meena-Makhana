import {useMemo,useState} from 'react'
import Footer from './Footer'
import StoreNavbar from './StoreNavbar'
import './ProductsPage.css'

function saved(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function Icon({name,size=20}){const paths={search:'m21 21-4.3-4.3M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',share:'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.5 10.5l7-4M8.5 13.5l7 4',cart:'M3 4h2l2 10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l2-7H6m4 13h.01M17 20h.01',grid:'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',list:'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01',sliders:'M4 7h10M18 7h2M4 17h2M10 17h10M7 14v6M17 4v6',bag:'M6 8h12l-1 12H7L6 8Zm3 0a3 3 0 0 1 6 0',ruler:'M7 3h10v18H7V3Zm4 4h6m-3 4h3m-6 4h6',rupee:'M7 5h10M7 9h10M7 5c5 0 7 1.5 7 4s-2 4-7 4l8 6',trend:'m4 16 6-6 4 4 6-8M16 6h4v4'};return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]}/></svg>}

export default function ProductsPage({products}){
 const [query,setQuery]=useState(()=>new URLSearchParams(location.search).get('search')||''),[sort,setSort]=useState('popular'),[mode,setMode]=useState('retail'),[view,setView]=useState('grid')
 const [quantities,setQuantities]=useState({})
 const [liked,setLiked]=useState(()=>saved('meena-wishlist',[])),[cart,setCart]=useState(()=>saved('meena-cart',{})),[notice,setNotice]=useState('')
 const updateLiked=name=>setLiked(items=>{const next=items.includes(name)?items.filter(x=>x!==name):[...items,name];localStorage.setItem('meena-wishlist',JSON.stringify(next));return next})
 const add=(name,quantity=1)=>setCart(items=>{const next={...items,[name]:(items[name]||0)+quantity};localStorage.setItem('meena-cart',JSON.stringify(next));setNotice(`${name} added to cart`);return next})
 const count=Object.values(cart).reduce((sum,n)=>sum+n,0)
 const shown=useMemo(()=>{
  const filtered=products.filter(p=>(p.name+' '+p.type).toLowerCase().includes(query.toLowerCase()))
  return [...filtered].sort((a,b)=>sort==='price-low'?a.price-b.price:sort==='price-high'?b.price-a.price:a.name.localeCompare(b.name))
 },[products,query,sort])
 const share=async p=>{try{await navigator.clipboard.writeText(`${location.origin}/products#${p.name.toLowerCase().replaceAll(' ','-')}`);setNotice('Product link copied')}catch{setNotice('Could not copy the product link')}}
 return <div className="catalog-page">
  <StoreNavbar active="products" query={query} onQueryChange={setQuery} wishlistCount={liked.length} cartCount={count}/>
  <main className="catalog-main">
   <section className="catalog-toolbar" aria-label="Product filters">
    <div className="filter-heading"><span><Icon name="sliders" size={19}/></span><b>FILTER BY</b></div>
    <div className="filter-group">
     <label className="filter-control"><Icon name="bag" size={18}/><select aria-label="Product category"><option>All Products</option><option>Plain Makhana</option><option>Premium Makhana</option></select></label>
     <label className="filter-control size-filter"><Icon name="ruler" size={18}/><select aria-label="Size"><option>Size</option><option>250g</option><option>500g</option><option>1 KG</option></select></label>
     <label className="filter-control price-filter"><Icon name="rupee" size={18}/><select aria-label="Price range"><option>Price</option><option>Under ₹180</option><option>₹180–₹200</option><option>Above ₹200</option></select></label>
    </div>
    <fieldset className="mode-filter"><legend>Buying mode</legend><label><input type="radio" checked={mode==='retail'} onChange={()=>setMode('retail')}/><span></span>Retail</label><label><input type="radio" checked={mode==='wholesale'} onChange={()=>setMode('wholesale')}/><span></span>Wholesale</label></fieldset>
    <div className="toolbar-spacer"></div>
    <label className="sort-control"><small>SORT BY</small><span><Icon name="trend" size={18}/></span><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort products"><option value="popular">Popular</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option></select></label>
    <div className="view-buttons"><button className={view==='grid'?'active':''} onClick={()=>setView('grid')} aria-label="Grid view"><Icon name="grid"/></button><button className={view==='list'?'active':''} onClick={()=>setView('list')} aria-label="List view"><Icon name="list"/></button></div>
   </section>
   <p className="catalog-count">Showing {shown.length} products</p>
   <section className={'catalog-grid '+view} aria-label="Products">{shown.map(p=>{
    const minimum=mode==='wholesale'?5:1
    const quantity=Math.max(minimum,quantities[p.name]||minimum)
    const unitPrice=mode==='wholesale'?Math.round(p.price*.88):p.price
    const weight=quantity*250
    return <article className="catalog-card" key={p.name} id={p.name.toLowerCase().replaceAll(' ','-')}>
     <span className="catalog-ribbon">{mode==='wholesale'?'12% OFF':'PREMIUM'}</span>
     <div className="catalog-card-actions"><button className={liked.includes(p.name)?'liked':''} onClick={()=>updateLiked(p.name)} aria-pressed={liked.includes(p.name)} aria-label={`${liked.includes(p.name)?'Remove from':'Add to'} wishlist: ${p.name}`}><Icon name="heart"/></button><button onClick={()=>share(p)} aria-label={`Share ${p.name}`}><Icon name="share"/></button></div>
     <img className="catalog-product-image" src={p.image} alt={p.name}/>
     <div className="catalog-card-body">
      <div className="catalog-title-row"><h2>{p.name}</h2><button className="catalog-quick-cart" onClick={()=>add(p.name,quantity)} aria-label={`Add ${quantity} packs of ${p.name} to cart`}><Icon name="cart" size={25}/></button></div>
      <label className="pack-select"><select value={quantity} onChange={e=>setQuantities({...quantities,[p.name]:Number(e.target.value)})} aria-label={`Pack quantity for ${p.name}`}>
       {[...new Set([minimum,...(mode==='wholesale'?[10,15,20]:[2,5,10]),quantity])].sort((a,b)=>a-b).map(n=><option key={n} value={n}>{n} {n===1?'Pack':'Packs'}{n===minimum?' (Minimum)':''} · {n*250>=1000?`${n/4} KG`:`${n*250} G`}</option>)}
      </select><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="m5 9 7 7 7-7"/></svg></label>
      <div className="catalog-pack-info"><span>♧ &nbsp;1 Pack &nbsp;•&nbsp; 250 G</span><span>₹{unitPrice} / Pack</span></div>
      <div className="catalog-price"><strong>₹{(unitPrice*quantity).toLocaleString('en-IN')}</strong></div>
      <p className="catalog-unit-price">₹{unitPrice} × {quantity} {quantity===1?'Pack':'Packs'} · {weight>=1000?`${weight/1000} KG`:`${weight} G`}</p>
      <p className="minimum"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 9v10M3 8l9 5 9-5M7 5.8l9 5"/></svg>Minimum order: {minimum} {minimum===1?'Pack':'Packs'}</p>
      <button className="catalog-buy" onClick={()=>add(p.name,quantity)}>BUY NOW</button>
     </div>
    </article>
   })}</section>
   {!shown.length&&<div className="catalog-empty"><h2>No products found</h2><p>Try another product name.</p></div>}
  </main>
  {notice&&<div className="catalog-toast" role="status">{notice}<button onClick={()=>setNotice('')} aria-label="Dismiss">×</button></div>}
  <Footer/>
 </div>
}
