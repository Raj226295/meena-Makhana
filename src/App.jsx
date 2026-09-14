import Footer from './Footer'
import ProductsPage from './ProductsPage'
import StoreNavbar from './StoreNavbar'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import ContactPage from './ContactPage'
import AboutPage from './AboutPage'
import WishlistPage from './WishlistPage'
import CartPage from './CartPage'
import ProfilePage from './ProfilePage'
import SavedAddressesPage from './SavedAddressesPage'
import AccountWishlistPage from './AccountWishlistPage'
import OrdersPage from './OrdersPage'
import PaymentMethodsPage from './PaymentMethodsPage'
import ProductCardSkeleton from './ProductCardSkeleton'
import useProductsLoading from './useProductsLoading'
import { useEffect, useRef, useState } from 'react'

const products = [
  { name:'Meena Premium', type:'Plain Makhana', price:180, image:'/meena-premium-cutout.png' },
  { name:'Perfect Premium', type:'Plain Makhana', price:190, image:'/perfect-premium-cutout.png' },
  { name:'Perfect-2', type:'Premium Makhana', price:190, image:'/perfect-two-cutout.png' },
  { name:'Sandesh Organic', type:'Organic Makhana', price:170, image:'/sandesh-cutout.png' },
]
const iconPaths={share:'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 10.5l6.8-4M8.6 13.5l6.8 4',heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',home:'M3 11.5 12 4l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z',pin:'M12 22s7-6 7-13A7 7 0 0 0 5 9c0 7 7 13 7 13Zm0-10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z',search:'m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z',user:'M20 21a8 8 0 0 0-16 0m12-13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',cart:'M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6m4 13h.01M17 20h.01',menu:'M4 7h16M4 12h16M4 17h16',chevron:'m8 10 4 4 4-4'}
function Icon({name,size=24}){return <svg className="ui-icon" width={size} height={size} viewBox="0 0 24 24" fill={name==='home'?'currentColor':'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[name]}/></svg>}
function TrustIcon({name}){
 return <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 {name==='natural'&&<><path d="M23 39C9 37 5 27 6 17c12 0 20 7 17 22ZM25 35C23 20 32 12 43 10c1 15-5 24-18 25Z" fill="currentColor" stroke="none"/><path d="M23 42V32m1 1 11-14M21 33 12 24" stroke="#1a6643" strokeWidth="2"/></>}
 {name==='shield'&&<><path d="M24 5c6 5 11 7 17 7v12c0 10-8 16-17 20C15 40 7 34 7 24V12c6 0 11-2 17-7Z"/><path d="M24 17v14m-7-7h14" strokeWidth="5"/></>}
 {name==='preservatives'&&<><path d="M16 6h13m-10 0v13L8 37a3 3 0 0 0 3 5h17M26 6v13l4 7M15 28h11"/><circle cx="34" cy="33" r="10" fill="#06492e"/><path d="m27 26 14 14M21 2l-3-2m7 2 3-2"/></>}
 {name==='truck'&&<><path d="M9 12h23v23H11M32 21h7l6 9v5h-5m-10 0H20M35 23v7h9M5 18h13M2 24h12M6 30h6"/><circle cx="16" cy="36" r="5"/><circle cx="36" cy="36" r="5"/></>}
 </svg>
}

function OccasionIcon({name}){
 const paths={
  home:<><path d="M4 11.5 12 5l8 6.5V20H4Z"/><path d="M9.5 20v-5h5v5"/></>,
  work:<><rect x="5" y="5" width="14" height="14" rx="1.5"/><rect x="8" y="8" width="8" height="8" rx=".5"/></>,
  travel:<><path d="m3 12 8.5-2.4V5.5c0-1 .5-2.5 1.5-2.5s1.5 1.5 1.5 2.5v3.3l5.5-1.5c1.2-.3 2 .4 2 1.2 0 .6-.4 1.1-1 1.4l-6.5 3.3v4.4l2 1.5v1l-3.5-.8-3.5.8v-1l2-1.5v-3.4L3 13.5Z"/></>,
  fitness:<path d="M20.8 5.5a5.1 5.1 0 0 0-7.2 0L12 7.1l-1.6-1.6a5.1 5.1 0 1 0-7.2 7.2L12 21l8.8-8.3a5.1 5.1 0 0 0 0-7.2Z"/>,
  kids:<><circle cx="12" cy="12" r="8"/><circle cx="9" cy="10" r=".7" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r=".7" fill="currentColor" stroke="none"/><path d="M8.5 14c1.8 2 5.2 2 7 0M12 4v2M5.5 7.5l1.4 1M18.5 7.5l-1.4 1"/></>
 }
 return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function ProductCard({product,liked,onLike,onAdd,section}){
 const [feedback,setFeedback]=useState('')
 const id='product-'+product.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')
 const share=async()=>{
  const url=new URL(window.location.href);url.hash=id
  try{await navigator.clipboard.writeText(url.href);setFeedback('Product link copied')}
  catch{setFeedback('Copy this product link: '+url.href)}
 }
 const add=()=>{onAdd();setFeedback(product.name+' added to cart')}
 return <article className="product-card" id={section==='range'?id:undefined}>
  <div className="product-ribbon">PREMIUM</div>
  <div className="product-tools"><button className="share-product" onClick={share} aria-label={'Copy share link for '+product.name}><Icon name="share" size={20}/></button><button className={'heart '+(liked?'liked':'')} onClick={onLike} aria-label={(liked?'Remove from wishlist: ':'Add to wishlist: ')+product.name} aria-pressed={liked}><Icon name="heart" size={21}/></button></div>
  <img src={product.image} alt={product.name} loading="lazy"/>
  <div className="product-title-row"><h3>{product.name}</h3><button className="quick-cart" onClick={add} aria-label={'Add '+product.name+' to cart'}><Icon name="cart" size={25}/></button></div>
  <div className="product-weight"><select aria-label={'Pack size for '+product.name} defaultValue="250"><option value="250">250g</option></select><Icon name="chevron" size={19}/></div>
  <strong className="product-price">₹{product.price}</strong><p className="product-unit-price">₹{product.price} for 250g</p>
  <button className="buy-now" onClick={add}><Icon name="cart" size={21}/><span>BUY NOW</span></button>
  <div className="product-feedback" role="status">{feedback}</div>
 </article>
}

function readSaved(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function App(){
 const [path,setPath]=useState(window.location.pathname)
 const cleanPath=path.replace(/\/+$/,'')
 const isProductsPage=cleanPath==='/products'
 const isLoginPage=cleanPath==='/login'
 const isSignupPage=cleanPath==='/signup'
 const isContactPage=cleanPath==='/contact'
 const isAboutPage=cleanPath==='/about'
 const isWishlistPage=cleanPath==='/wishlist'
 const isCartPage=cleanPath==='/cart'
 const isProfilePage=cleanPath==='/profile'
 const isAddressesPage=cleanPath==='/addresses'
 const isAccountWishlistPage=cleanPath==='/profile/wishlist'
 const isOrdersPage=cleanPath==='/orders'
 const isPaymentsPage=cleanPath==='/payments'
 const [cartItems,setCartItems]=useState(()=>readSaved('meena-cart',{})),[liked,setLiked]=useState(()=>readSaved('meena-wishlist',[]))
 const [panel,setPanel]=useState(null)
 const [profile,setProfile]=useState(()=>readSaved('meena-profile',{name:'',email:''}))
 const [profileSaved,setProfileSaved]=useState(false)
 const panelRef=useRef(null),lastTrigger=useRef(null)
 const cart=Object.values(cartItems).reduce((sum,n)=>sum+n,0)
 const total=products.reduce((sum,p)=>sum+p.price*(cartItems[p.name]||0),0)
 const _openPanel=(name,event)=>{lastTrigger.current=event?.currentTarget;setPanel(name)}
 const closePanel=()=>{setPanel(null);lastTrigger.current?.focus()}
 const addToCart=name=>setCartItems(items=>({...items,[name]:(items[name]||0)+1}))
 const changeQuantity=(name,delta)=>setCartItems(items=>{const next={...items};next[name]=Math.max(0,(next[name]||0)+delta);if(!next[name])delete next[name];return next})
 useEffect(()=>{localStorage.setItem('meena-cart',JSON.stringify(cartItems))},[cartItems])
 useEffect(()=>{localStorage.setItem('meena-wishlist',JSON.stringify(liked))},[liked])
 useEffect(()=>{
  const updatePath=()=>setPath(window.location.pathname)
  const navigate=e=>{
   const link=e.target.closest?.('a[href]')
   if(!link||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||link.target)return
   const url=new URL(link.href,window.location.href)
   if(url.origin!==window.location.origin)return
   e.preventDefault();history.pushState({},'',url);setPath(url.pathname)
   requestAnimationFrame(()=>url.hash?document.querySelector(url.hash)?.scrollIntoView({behavior:'smooth'}):window.scrollTo({top:0,behavior:'smooth'}))
  }
  window.addEventListener('popstate',updatePath);document.addEventListener('click',navigate)
  return()=>{window.removeEventListener('popstate',updatePath);document.removeEventListener('click',navigate)}
 },[])
 useEffect(()=>{
  if(!panel)return
  const dialog=panelRef.current;dialog.showModal()
  return()=>dialog.close()
 },[panel])
 const productsLoading=useProductsLoading(products)
 const toggle=(name)=>setLiked(x=>x.includes(name)?x.filter(v=>v!==name):[...x,name])
 if(isLoginPage)return <LoginPage/>
 if(isSignupPage)return <><StoreNavbar/><SignupPage/></>
 if(isContactPage)return <><StoreNavbar active="contact"/><ContactPage/><Footer/></>
 if(isAboutPage)return <><StoreNavbar active="about"/><AboutPage/><Footer/></>
 if(isWishlistPage)return <WishlistPage products={products}/>
 if(isCartPage)return <CartPage products={products}/>
 if(isProfilePage)return <ProfilePage/>
 if(isAddressesPage)return <SavedAddressesPage/>
 if(isAccountWishlistPage)return <AccountWishlistPage products={products}/>
 if(isOrdersPage)return <OrdersPage/>
 if(isPaymentsPage)return <PaymentMethodsPage/>
 if(isProductsPage)return <ProductsPage products={products}/>
 return <>
  <StoreNavbar active="home" wishlistCount={liked.length} cartCount={cart} onProfile={()=>{history.pushState({},'','/login');window.dispatchEvent(new PopStateEvent('popstate'))}}/>
  {panel&&<dialog ref={panelRef} className="shop-dialog" aria-labelledby="shop-panel-title" onCancel={e=>{e.preventDefault();closePanel()}} onClick={e=>{if(e.target===e.currentTarget)closePanel()}}><div className="shop-panel"><header><h2 id="shop-panel-title">{panel==='cart'?'Your Cart':panel==='wishlist'?'Your Wishlist':'Your Profile'}</h2><button onClick={closePanel} aria-label="Close panel">✕</button></header>
  {panel==='profile'?<form onSubmit={e=>{e.preventDefault();localStorage.setItem('meena-profile',JSON.stringify(profile));setProfileSaved(true)}}><p>Save your details on this device for your next visit.</p><label>Name<input autoComplete="name" value={profile.name} required onChange={e=>{setProfile({...profile,name:e.target.value});setProfileSaved(false)}}/></label><label>Email<input type="email" autoComplete="email" value={profile.email} required onChange={e=>{setProfile({...profile,email:e.target.value});setProfileSaved(false)}}/></label><button className="panel-primary" type="submit">Save Profile</button><p role="status">{profileSaved?'Profile saved on this device.':''}</p></form>:<>
  <div className="panel-products">{products.filter(p=>panel==='cart'?cartItems[p.name]>0:liked.includes(p.name)).map(p=><article key={p.name}><img src={p.image} alt={p.name}/><div><h3>{p.name}</h3><p>250g · ₹{p.price}</p>{panel==='cart'?<div className="quantity"><button aria-label={'Decrease '+p.name} onClick={()=>changeQuantity(p.name,-1)}>−</button><span aria-live="polite">{cartItems[p.name]}</span><button aria-label={'Increase '+p.name} onClick={()=>changeQuantity(p.name,1)}>+</button></div>:<button className="panel-primary" onClick={()=>addToCart(p.name)}>Add to Cart{cartItems[p.name]?` (${cartItems[p.name]})`:''}</button>}</div><button className="remove-item" aria-label={'Remove '+p.name} onClick={()=>panel==='cart'?setCartItems(items=>{const next={...items};delete next[p.name];return next}):toggle(p.name)}>✕</button></article>)}</div>
  {(panel==='cart'?cart===0:liked.length===0)&&<div className="panel-empty"><Icon name={panel==='cart'?'cart':'heart'} size={40}/><p>{panel==='cart'?'Your cart is empty.':'Save your favourites using the heart on any product.'}</p><button className="panel-primary" onClick={()=>{closePanel();document.getElementById('products')?.scrollIntoView()}}>Explore Products</button></div>}
  {panel==='cart'&&cart>0&&<div className="panel-total"><span>Subtotal ({cart} items)</span><strong>₹{total}</strong><p>Online checkout is not available yet.</p></div>}
  </>}
  </div></dialog>}
  <main>
   <section className="reference-hero" id="home" aria-label="From our farms to your home"><img src="/hero-farms-banner.png" width="1600" height="750" fetchPriority="high" alt="Meena Green — Nature’s Superfood. From Our Farms to Your Home. Pure Makhana, grown with care, packed with health. Supporting farmers, building a healthier tomorrow."/><a className="hero-shop-link" href="#about" aria-label="Explore our farms"/></section>
   <section className="brand-intro"><div className="brand-leaf"><img className="h-[72px] w-[72px] object-contain sm:h-[88px] sm:w-[88px]" src="/home-botanical-leaf-icon.png" alt="" aria-hidden="true"/></div><h1>MEENA GREEN</h1><h3>A HEALTHIER TOMORROW</h3><p>At Meena Green, we bring you the finest Makhana (Fox Nuts) sourced from the fertile fields of Bihar.<br/>Our mission is to deliver pure, natural and high-quality products to make your snacking healthier and happier.</p><div className="quality-strip">{[['quality-natural.png','Pure & Natural'],['quality-selected.png','Carefully Selected'],['quality-hygiene.png','Hygienically Processed'],['quality-families.png','Loved by Families']].map(([icon,label])=><div key={label}><img src={'/'+icon} alt="" width="52" height="52"/><span><b>{label}</b></span></div>)}</div></section>
   <section className="products section" id="products"><div className="section-heading"><span>🌿</span><div><h2>Our Makhana Range</h2><p>TRADITIONAL GOODNESS, MODERN NUTRITION</p></div><span>🌿</span></div><div className="cards" aria-busy={productsLoading}>{productsLoading?products.map(product=><ProductCardSkeleton key={product.name}/>):products.map(p=><ProductCard key={p.name} product={p} section="range" liked={liked.includes(p.name)} onLike={()=>toggle(p.name)} onAdd={()=>addToCart(p.name)}/>)}</div></section>
   <section className="nature"><div className="snack-message"><h2>SNACK HEALTHY<br/>LIVE BETTER</h2><div className="snack-occasions">{[['home','At Home'],['work','At Work'],['travel','While Traveling'],['fitness','For Fitness'],['kids','For Kids']].map(([icon,label])=><span key={label}><b><OccasionIcon name={icon}/></b>{label}</span>)}</div></div><blockquote>Small Snacks<br/>Big Happiness</blockquote></section>
   <section className="about" id="about"><div><h2>ABOUT MEENA GREEN</h2><h3>ROOTED IN BIHAR, GROWN FOR A HEALTHIER INDIA</h3><p>Meena Green is committed to bringing the authentic taste and health benefits of Bihar’s premium Makhana to every household. We work closely with local farmers, ensure quality processing and deliver natural snacks that you can trust.</p><a href="#contact">Discover Our Story　→</a></div><div className="about-visual"><img className="farmer-artwork" src="/farmer-from-our-farms.png" alt="Farmer holding freshly harvested makhana — From Our Farms to Your Home" width="1536" height="1024" loading="lazy"/></div></section>
   <section className="modes mode-artwork" id="modes" aria-label="Retail and wholesale shopping"><a className="mode-card retail-card" href="#products" aria-label="Retail mode — Shop Now"><img src="/retail-mode-banner.png" alt="Retail Mode. For individual customers. Packaged products, best for home use, great taste and quality. Shop Now." width="1742" height="903" loading="lazy"/></a><a className="mode-card wholesale-card" href="#contact" aria-label="Wholesale mode — Enquire Now"><img src="/wholesale-mode-banner.png" alt="Wholesale Mode. For businesses and resellers. Bulk packaging, best for business, competitive prices. Enquire Now." width="1796" height="876" loading="lazy"/></a></section>
   <section className="bestsellers"><div className="section-heading"><div><h2>Our Bestsellers</h2><p>Loved by Families, Chosen for Good Health</p></div></div><div className="cards" aria-busy={productsLoading}>{productsLoading?products.map(product=><ProductCardSkeleton key={product.name}/>):products.map(p=><ProductCard key={p.name} product={p} section="bestsellers" liked={liked.includes(p.name)} onLike={()=>toggle(p.name)} onAdd={()=>addToCart(p.name)}/>)}</div></section>
   <section className="heritage"><div><span>❦</span><h2>AUTHENTIC TASTE<br/>SINCE GENERATIONS</h2><p>From the fields of Bihar to your home, Meena Green brings you the true essence of purity, health and tradition.</p></div><blockquote>Bihar ka Makhana<br/>Desh ki Shaan</blockquote></section>
   <section className="final-strip trust-strip" aria-label="Our quality promises">{[
    ['natural','100% Natural','No artificial colors & flavours'],
    ['shield','Hygienically Processed','Clean & safe production'],
    ['preservatives','No Added Preservatives','Pure and healthy'],
    ['truck','Pan India Delivery','Fast & reliable shipping']
   ].map(([icon,title,description])=><div className="trust-item" key={icon}><div className="trust-icon"><TrustIcon name={icon}/></div><div className="trust-copy"><b>{title}</b><small>{description}</small></div></div>)}</section>
  </main>
  <Footer/>
 </>
}
export default App
