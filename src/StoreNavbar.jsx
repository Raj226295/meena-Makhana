import {useState} from 'react'
import './StoreNavbar.css'

function SearchIcon(){return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>}
function RibbonIcon({name}){const icons={leaf:<><path d="M20 4C12 4 6 9 6 17c8 0 14-5 14-13Z"/><path d="M6 17 20 4"/></>,badge:<><path d="m12 2 2.5 2.2 3.3-.1.7 3.2 2.5 2.2-1.5 2.9.7 3.2-3.1 1-1.5 2.9-3.2-.9-3.1 1-1.5-2.9-3.2-.9.7-3.2-1.5-2.9 2.5-2.2.7-3.2 3.3.1L12 2Z"/><path d="m8.8 12 2 2 4.4-4.4"/></>,truck:<><path d="M3 8h10v8H3zM13 11h4l3 3v2h-7zM6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3 5h6M1 11h4"/></>,heart:<path d="M20.8 5.5a5.1 5.1 0 0 0-7.2 0L12 7.1l-1.6-1.6a5.1 5.1 0 1 0-7.2 7.2L12 21l8.8-8.3a5.1 5.1 0 0 0 0-7.2Z"/>};return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>}

const ribbonItems=[
 ['leaf','Authentic Taste'],
 ['badge','Premium Quality'],
 ['truck','Delivering Happiness Across India'],
 ['leaf','100% Natural'],
 ['heart','Healthy Snacking']
]

function BenefitsRibbon(){
 const track=ribbonItems.map(([icon,title])=><div className="benefit-item" key={title}><RibbonIcon name={icon}/><b>{title}</b></div>)
 return <div className="benefits-ribbon" aria-label="Meena Green benefits">
  <div className="benefit-track">{track}</div>
  <div className="benefit-track" aria-hidden="true">{track}</div>
 </div>
}

export default function StoreNavbar({active='home',query='',onQueryChange,onProfile,onWishlist,onCart,wishlistCount=0,cartCount=0}){
 const [menuOpen,setMenuOpen]=useState(false)
 const submitSearch=e=>{
  e.preventDefault()
  const term=(onQueryChange?query:e.currentTarget.elements.search.value).trim()
  window.location.href=term?`/products?search=${encodeURIComponent(term)}`:'/products'
 }
 const links=[['home','/','Home'],['products','/products','Products'],['about','/#about','About Us'],['contact','/#contact','Contact']]
 return <div className="store-header-shell">
  <BenefitsRibbon/>
  <header className="store-navbar">
   <a className="store-logo" href="/" aria-label="Meena Green home"><img src="/meena-logo-premium.png" alt="Meena Green"/></a>
   <button className="store-menu" type="button" onClick={()=>setMenuOpen(open=>!open)} aria-expanded={menuOpen} aria-controls="store-navigation" aria-label={menuOpen?'Close navigation':'Open navigation'}><span/><span/><span/></button>
   <nav id="store-navigation" className={menuOpen?'open':''} aria-label="Main navigation">{links.map(([id,href,label])=><a key={id} href={href} className={active===id?'active':''} aria-current={active===id?'page':undefined}>{label}</a>)}</nav>
   <form className="store-search" role="search" onSubmit={submitSearch}><SearchIcon/><input name="search" value={onQueryChange?query:undefined} defaultValue={onQueryChange?undefined:query} onChange={onQueryChange?e=>onQueryChange(e.target.value):undefined} placeholder="Search products..." aria-label="Search products"/></form>
   <div className="store-actions">
    <button type="button" onClick={onProfile} aria-label="Profile"><img src="/nav-profile.png" alt=""/></button>
    <button type="button" onClick={onWishlist} aria-label={`Wishlist ${wishlistCount}`}><img src="/nav-wishlist-outline.png" alt=""/><i>{wishlistCount}</i></button>
    <button type="button" onClick={onCart} aria-label={`Cart ${cartCount}`}><img src="/nav-cart.png" alt=""/><i>{cartCount}</i></button>
   </div>
  </header>
 </div>
}
