import {useState} from 'react'
import './StoreNavbar.css'

function SearchIcon(){return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>}

export default function StoreNavbar({active='home',query='',onQueryChange,onProfile,onWishlist,onCart,wishlistCount=0,cartCount=0}){
 const [menuOpen,setMenuOpen]=useState(false)
 const submitSearch=e=>{
  e.preventDefault()
  const term=(onQueryChange?query:e.currentTarget.elements.search.value).trim()
  window.location.href=term?`/products?search=${encodeURIComponent(term)}`:'/products'
 }
 const links=[['home','/','Home'],['products','/products','Products'],['about','/#about','About Us'],['contact','/#contact','Contact']]
 return <header className="store-navbar">
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
}
