import {useMemo,useState} from 'react'
import StoreNavbar from './StoreNavbar'
import Footer from './Footer'

const extraProducts=[
 {name:'Meena Classic',type:'Plain Makhana',price:155,image:'/makhana-classic-red.jpg'},
 {name:'Premium Select',type:'Premium Makhana',price:210,image:'/makhana-premium-yellow.png'},
 {name:'Perfect Gold',type:'Premium Makhana',price:195,image:'/makhana-perfect-yellow.png'},
 {name:'Perfect Purple',type:'Roasted Makhana',price:205,image:'/makhana-perfect-purple.png'},
]

function saved(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function Icon({name,className='h-6 w-6'}){const paths={heart:'M20.8 5.5a5.1 5.1 0 0 0-7.2 0L12 7.1l-1.6-1.6a5.1 5.1 0 1 0-7.2 7.2L12 21l8.8-8.3a5.1 5.1 0 0 0 0-7.2Z',box:'m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 9 9-4M12 12 3 8m9 4v10',trash:'M4 7h16M9 7V4h6v3m-9 0 1 14h10l1-14M10 11v6m4-6v6',cart:'M3 4h2l2 10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l2-7H6m4 13h.01M17 20h.01',leaf:'M20 4C11 4 5 9 5 18c9 0 15-5 15-14ZM5 18 20 4',shield:'M12 3c3 3 6 4 9 4v6c0 5-4 8-9 10-5-2-9-5-9-10V7c3 0 6-1 9-4Z',truck:'M3 7h11v10H3zm11 4h4l3 3v3h-7M7 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'};return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]}/></svg>}

export default function WishlistPage({products}){
 const allProducts=useMemo(()=>[...products,...extraProducts],[products])
 const [liked,setLiked]=useState(()=>saved('meena-wishlist',[]))
 const [cart,setCart]=useState(()=>saved('meena-cart',{}))
 const [notice,setNotice]=useState('')
 const items=allProducts.filter(product=>liked.includes(product.name))
 const recommendations=allProducts.filter(product=>!liked.includes(product.name)).slice(0,3)
 const saveLiked=next=>{setLiked(next);localStorage.setItem('meena-wishlist',JSON.stringify(next))}
 const remove=name=>{saveLiked(liked.filter(item=>item!==name));setNotice(`${name} removed from wishlist`)}
 const moveToCart=product=>{const next={...cart,[product.name]:(cart[product.name]||0)+1};setCart(next);localStorage.setItem('meena-cart',JSON.stringify(next));saveLiked(liked.filter(item=>item!==product.name));setNotice(`${product.name} moved to cart`)}
 const addRecommendation=product=>{const next={...cart,[product.name]:(cart[product.name]||0)+1};setCart(next);localStorage.setItem('meena-cart',JSON.stringify(next));setNotice(`${product.name} added to cart`)}
 const cartCount=Object.values(cart).reduce((sum,count)=>sum+count,0)
 const total=items.reduce((sum,product)=>sum+product.price,0)
 return <div className="min-h-screen bg-[#fffdf7] text-[#092f24]">
  <StoreNavbar active="" wishlistCount={items.length} cartCount={cartCount}/>
  <main>
   <section className="relative min-h-[220px] overflow-hidden border-y border-[#e5eadf] bg-[#f9f9ef] md:min-h-[315px]">
    <img className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center" src="/wishlist-hero-banner.png" alt=""/>
    <div className="relative z-10 mx-auto grid min-h-[220px] max-w-[1900px] grid-cols-1 items-center px-[clamp(24px,5vw,105px)] md:min-h-[315px] lg:grid-cols-[1fr_.72fr_.72fr]"><div className="flex items-center gap-5"><span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#eaf6e6cc] text-[#08643b] md:h-24 md:w-24"><Icon name="heart" className="h-11 w-11 md:h-14 md:w-14"/></span><div><h1 className="m-0 font-serif text-[clamp(38px,4vw,64px)] leading-none">My Wishlist</h1><p className="mb-0 mt-4 whitespace-nowrap text-[clamp(16px,1.55vw,24px)] text-[#285d4a]">Products you love, saved for later.</p></div></div><div className="hidden -rotate-3 text-center font-serif text-[clamp(25px,2.5vw,42px)] italic leading-[1.04] text-[#07563b] lg:block">Good Food<br/>Brighter Lives ♡<span className="mx-auto mt-3 block h-1 w-40 -rotate-3 rounded-full bg-[#087044]"/></div></div>
   </section>

   <div className="mx-auto max-w-[1450px] px-[clamp(16px,3.5vw,56px)] py-5">
    <section className="grid overflow-hidden rounded-xl border border-[#dfe7df] bg-white shadow-[0_6px_24px_#193c2710] sm:grid-cols-3" aria-label="Wishlist summary">
     {[['heart','Total Saved Items',items.length],['box','Available Items',items.length],['rupee','Total Est. Value',`₹${total.toLocaleString('en-IN')}`]].map(([icon,label,value],index)=><div className={`flex items-center gap-4 px-6 py-4 ${index?'border-t border-[#e1e8e1] sm:border-l sm:border-t-0':''}`} key={label}><span className={`grid h-12 w-12 place-items-center rounded-full ${icon==='rupee'?'bg-[#fff0df] text-[#dc5b17]':'bg-[#e7f5e4] text-[#08643b]'}`}>{icon==='rupee'?<b className="text-2xl">₹</b>:<Icon name={icon}/>}</span><span><small className="block text-xs text-[#68776e]">{label}</small><b className="mt-1 block text-xl">{value}</b></span></div>)}
    </section>

    {items.length?<section className="catalog-grid mt-6" aria-label="Saved products">{items.map(product=><article className="catalog-card" key={product.name}>
     <span className="catalog-ribbon">PREMIUM</span><div className="catalog-card-actions"><button onClick={()=>remove(product.name)} aria-label={`Remove ${product.name}`}><Icon name="trash" className="h-5 w-5"/></button></div>
     <img className="catalog-product-image" src={product.image} alt={product.name}/><div className="catalog-card-body"><div className="catalog-title-row"><h2>{product.name}</h2><button className="catalog-quick-cart" onClick={()=>moveToCart(product)} aria-label={`Move ${product.name} to cart`}><Icon name="cart" className="h-6 w-6"/></button></div>
     <label className="pack-select"><select defaultValue="1" aria-label={`Pack quantity for ${product.name}`}><option value="1">1 Pack (Minimum) · 250 G</option></select><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="m5 9 7 7 7-7"/></svg></label>
     <div className="catalog-pack-info"><span>♧ &nbsp;1 Pack &nbsp;•&nbsp; 250 G</span><span>₹{product.price} / Pack</span></div><div className="catalog-price"><strong>₹{product.price}</strong></div><p className="catalog-unit-price">₹{product.price} × 1 Pack · 250 G</p><p className="minimum"><Icon name="box" className="h-[18px] w-[18px]"/>Minimum order: 1 Pack</p>
     <button className="catalog-buy" onClick={()=>moveToCart(product)}><Icon name="cart" className="h-5 w-5"/>MOVE TO CART</button><a className="mt-2 flex min-h-11 items-center justify-center rounded-[13px] border border-[#d8e1da] text-sm font-semibold text-[#075c38] no-underline" href={`/products#${product.name.toLowerCase().replaceAll(' ','-')}`}>VIEW PRODUCT</a></div>
    </article>)}</section>:<section className="my-10 rounded-2xl border border-[#dfe8df] bg-white px-6 py-16 text-center"><span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#e9f6e5] text-[#087044]"><Icon name="heart" className="h-11 w-11"/></span><h2 className="mb-2 mt-5 font-serif text-3xl">Your wishlist is empty</h2><p className="text-[#607168]">Tap the heart on a product to save it here.</p><a className="mt-5 inline-flex rounded-lg bg-[#05633b] px-7 py-3 font-semibold text-white no-underline" href="/products">Explore Products</a></section>}

    {recommendations.length>0&&<section className="relative left-1/2 mt-7 w-[calc(100vw-40px)] max-w-[1680px] [transform:translateX(-50%)] rounded-[18px] border border-[#e4ebe3] bg-white px-5 py-5 shadow-[0_5px_18px_#17392308] md:min-h-[240px]"><div className="mb-5 flex items-center justify-between"><h2 className="m-0 flex items-center gap-4 font-serif text-[clamp(25px,2vw,34px)]"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#e7f5e4] text-[#087044]"><Icon name="heart" className="h-6 w-6"/></span>You may also like</h2><a className="text-sm font-semibold text-[#075c38] no-underline" href="/products">View all products →</a></div><div className="grid gap-0 md:grid-cols-3">{recommendations.map((product,index)=><article className={`flex min-h-[125px] items-center gap-5 border-t border-[#e5eae5] px-5 py-3 md:border-t-0 ${index?'md:border-l':''}`} key={product.name}><img className="h-[100px] w-[100px] shrink-0 object-contain" src={product.image} alt={product.name}/><div className="min-w-0 flex-1"><b className="block truncate text-base">{product.name}</b><small className="mt-2 block text-[#ef7818]">★ 4.8</small><strong className="mt-2 block text-2xl text-[#075d38]">₹{product.price}</strong></div><button className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-[#cadbcd] bg-white text-[#087044]" onClick={()=>addRecommendation(product)} aria-label={`Add ${product.name} to cart`}><Icon name="cart" className="h-6 w-6"/></button></article>)}</div></section>}

    <section className="relative left-1/2 mt-7 flex min-h-[145px] w-[calc(100vw-40px)] max-w-[1680px] [transform:translateX(-50%)] flex-col items-start justify-center gap-5 rounded-[18px] bg-[#fffdf8] px-8 py-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-5"><span className="grid h-[62px] w-[62px] shrink-0 place-items-center rounded-full bg-[#dff1db] text-[#087044]"><Icon name="heart" className="h-8 w-8"/></span><div><h2 className="m-0 font-serif text-[28px]">Loved a product?</h2><p className="mb-0 mt-2 text-lg text-[#5a6f64]">Items in your wishlist are saved here. Add them to cart anytime!</p></div></div><a className="rounded-xl bg-[#05683e] px-8 py-4 text-base font-semibold text-white no-underline" href="/products">Continue Shopping →</a></section>
    <section className="relative left-1/2 grid min-h-[125px] w-[calc(100vw-40px)] max-w-[1680px] [transform:translateX(-50%)] grid-cols-2 items-center gap-4 py-6 lg:grid-cols-4">{[['leaf','100% Natural Ingredients'],['heart','Made in Bihar With Love'],['shield','Secure Payments'],['truck','Fast & Reliable Delivery']].map(([icon,label],index)=><div className={`flex items-center justify-center gap-4 px-5 ${index?'border-l border-[#d7e1d8]':''}`} key={label}><span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#e4f3df] text-[#087044]"><Icon name={icon} className="h-7 w-7"/></span><b className="text-sm leading-5">{label}</b></div>)}</section>
   </div>
  </main>
  {notice&&<div className="fixed bottom-5 right-5 z-[1200] rounded-lg bg-[#075d38] px-5 py-3 text-sm text-white shadow-xl" role="status">{notice}</div>}
  <Footer/>
 </div>
}
