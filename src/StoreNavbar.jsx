import {useState} from 'react'

const ribbonStartedAt=Date.now()
let ribbonDelay='0ms'
function rememberRibbonPhase(){ribbonDelay=`-${(Date.now()-ribbonStartedAt)%19000}ms`}
function navigateTo(url){rememberRibbonPhase();history.pushState({},'',url);window.dispatchEvent(new PopStateEvent('popstate'));window.scrollTo({top:0,behavior:'smooth'})}

function SearchIcon(){return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>}
function ActionIcon({name}){const icons={profile:<><circle cx="12" cy="7" r="4"/><path d="M4.5 21v-1.5a7.5 7.5 0 0 1 15 0V21"/></>,wishlist:<path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-8a5.2 5.2 0 0 0 0-7.4Z"/>,cart:<><path d="M3 4h2.2l2 10.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6"/><circle cx="9.5" cy="20" r="1"/><circle cx="17.5" cy="20" r="1"/></>};return <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>}
function RibbonIcon({name}){const icons={leaf:<><path d="M20 4C12 4 6 9 6 17c8 0 14-5 14-13Z"/><path d="M6 17 20 4"/></>,badge:<><path d="m12 2 2.5 2.2 3.3-.1.7 3.2 2.5 2.2-1.5 2.9.7 3.2-3.1 1-1.5 2.9-3.2-.9-3.1 1-1.5-2.9-3.2-.9.7-3.2-1.5-2.9 2.5-2.2.7-3.2 3.3.1L12 2Z"/><path d="m8.8 12 2 2 4.4-4.4"/></>,truck:<><path d="M3 8h10v8H3zM13 11h4l3 3v2h-7zM6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3 5h6M1 11h4"/></>,heart:<path d="M20.8 5.5a5.1 5.1 0 0 0-7.2 0L12 7.1l-1.6-1.6a5.1 5.1 0 1 0-7.2 7.2L12 21l8.8-8.3a5.1 5.1 0 0 0 0-7.2Z"/>};return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>}

const ribbonItems=[
 ['leaf','Authentic Taste'],
 ['badge','Premium Quality'],
 ['truck','Delivering Happiness Across India'],
 ['leaf','100% Natural']
]
function BenefitsRibbon(){
 const renderItems=prefix=>ribbonItems.map(([icon,title])=><div className="benefit-item" key={`${prefix}-${title}`}><RibbonIcon name={icon}/><b>{title}</b><span className="benefit-dot" aria-hidden="true">•</span></div>)
 return <div className="benefits-ribbon" aria-label="Meena Green benefits">
  <div className="benefit-marquee" style={{animationDelay:ribbonDelay}}>
   <div className="benefit-group">{renderItems('primary')}</div>
   <div className="benefit-group" aria-hidden="true">{renderItems('duplicate')}</div>
  </div>
 </div>
}

export default function StoreNavbar({active='home',query='',onQueryChange,onProfile,onWishlist,onCart,wishlistCount=0,cartCount=0}){
 const [menuOpen,setMenuOpen]=useState(false)
 const submitSearch=e=>{
  e.preventDefault()
  const term=(onQueryChange?query:e.currentTarget.elements.search.value).trim()
  navigateTo(term?`/products?search=${encodeURIComponent(term)}`:'/products')
 }
 const links=[['home','/','Home'],['products','/products','Products'],['about','/about','About Us'],['contact','/contact','Contact']]
 return <div className="store-header-space">
  <div className="store-header-shell">
   <BenefitsRibbon/>
   <header className="store-navbar">
   <a className="store-logo" href="/" aria-label="Meena Green home"><img src="/meena-logo-premium.png" alt="Meena Green"/></a>
   <button className="store-menu" type="button" onClick={()=>setMenuOpen(open=>!open)} aria-expanded={menuOpen} aria-controls="store-navigation" aria-label={menuOpen?'Close navigation':'Open navigation'}><span/><span/><span/></button>
   <nav id="store-navigation" className={menuOpen?'open':''} aria-label="Main navigation">{links.map(([id,href,label])=><a key={id} href={href} onClick={rememberRibbonPhase} className={active===id?'active':''} aria-current={active===id?'page':undefined}>{label}</a>)}</nav>
   <form className="store-search" role="search" onSubmit={submitSearch}><SearchIcon/><input name="search" value={onQueryChange?query:undefined} defaultValue={onQueryChange?undefined:query} onChange={onQueryChange?e=>onQueryChange(e.target.value):undefined} placeholder="Search for makhana, flavors, or products..." aria-label="Search products"/><button className="search-submit" type="submit" aria-label="Submit search"><SearchIcon/></button></form>
   <div className="store-actions">
    <button type="button" onClick={onProfile||(()=>navigateTo(localStorage.getItem('meena-auth')?'/profile':'/login'))} aria-label="Account"><ActionIcon name="profile"/><span>Account</span></button>
    <button type="button" onClick={onWishlist||(()=>navigateTo('/wishlist'))} aria-label={`Wishlist ${wishlistCount}`}><span className="action-art"><ActionIcon name="wishlist"/><i>{wishlistCount}</i></span><span>Wishlist</span></button>
    <button type="button" onClick={onCart||(()=>navigateTo('/cart'))} aria-label={`Cart ${cartCount}`}><span className="action-art"><ActionIcon name="cart"/><i>{cartCount}</i></span><span>Cart</span></button>
   </div>
   </header>
  </div>
 </div>
}
