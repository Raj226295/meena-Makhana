import {useMemo,useState} from 'react'
import StoreNavbar from './StoreNavbar'
import './OrdersPage.css'

const paths={
 user:<><circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
 bag:<><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
 pin:<><path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></>,
 heart:<path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-8a5.2 5.2 0 0 0 0-7.4Z"/>,
 card:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></>,
 bell:<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
 headset:<><path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H4Zm16 0h-3v6h3Z"/></>,
 settings:<><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2"/></>,
 logout:<><path d="M10 17l5-5-5-5M15 12H3M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5"/></>,
 package:<><path d="m3 7 9-4 9 4-9 4-9-4Z"/><path d="m3 7 9 4 9-4v10l-9 4-9-4V7Zm9 4v10"/></>,
 search:<><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
 calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4m8-4v4M3 10h18"/></>,
 check:<path d="m7 12 3 3 7-7"/>,truck:<><path d="M3 6h11v11H3zM14 10h4l3 4v3h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></>,
 cart:<><path d="M3 4h2l2 10h11l2-7H6M9 20h.01M17 20h.01"/></>,arrow:<path d="M5 12h14m-5-5 5 5-5 5"/>,clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></>,x:<><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6m0-6-6 6"/></>,leaf:<><path d="M20 4C11 4 5 9 5 18c9 0 15-6 15-14Z"/><path d="M5 18 20 4"/></>,shield:<><path d="M12 3c3 2 5 3 8 3v6c0 5-3 8-8 10-5-2-8-5-8-10V6c3 0 5-1 8-3Z"/><path d="m9 12 2 2 4-5"/></>
}
function Icon({name,className=''}){return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>}
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
const go=path=>{history.pushState({},'',path);window.dispatchEvent(new PopStateEvent('popstate'));window.scrollTo({top:0,behavior:'smooth'})}
const demoOrders=[
 {id:'MG123456',date:'12 May 2025, 10:30 AM',amount:756,payment:'UPI',status:'Delivered',items:[['Meena Premium','/meena-premium-cutout.png'],['Perfect-2','/perfect-two-cutout.png'],['Makhana Classic','/makhana-classic-red.jpg']],more:1,stages:4,dates:['12 May, 10:30 AM','12 May, 02:15 PM','13 May, 09:20 AM','15 May, 11:45 AM']},
 {id:'MG123455',date:'05 May 2025, 04:20 PM',amount:190,payment:'Cash on Delivery',status:'Shipped',items:[['Perfect Premium','/perfect-premium-cutout.png']],stages:2,dates:['05 May, 04:20 PM','06 May, 11:00 AM','06 May, 06:30 PM','','']},
 {id:'MG123454',date:'28 Apr 2025, 11:10 AM',amount:345,payment:'Online (Card)',status:'Processing',items:[['Meena Classic','/makhana-classic-red.jpg'],['Perfect Gold','/makhana-perfect-yellow.png']],stages:0,dates:['28 Apr, 11:10 AM','','','','']},
 {id:'MG123453',date:'15 Apr 2025, 09:15 AM',amount:220,payment:'UPI',status:'Cancelled',items:[['Perfect-2','/perfect-two-cutout.png']],stages:0,dates:['15 Apr, 09:15 AM','15 Apr, 10:00 AM']}
]
const menu=[['user','My Profile','/profile'],['bag','My Orders','/orders'],['pin','Saved Addresses','/addresses'],['heart','Wishlist','/profile/wishlist'],['card','Payment Methods','/profile#payment-methods'],['bell','Notifications','#'],['headset','Help & Support','/contact'],['settings','Settings','/profile']]
const stageNames=['Order Placed','Packed','Shipped','Out for Delivery','Delivered']

export default function OrdersPage(){
 const [orders,setOrders]=useState(()=>read('meena-order-history',demoOrders));const [query,setQuery]=useState(''),[status,setStatus]=useState('All Orders'),[open,setOpen]=useState(null),[cart,setCart]=useState(()=>read('meena-cart',{}));const wishlist=read('meena-wishlist',[])
 const filtered=useMemo(()=>orders.filter(order=>(status==='All Orders'||order.status===status)&&(`${order.id} ${order.items.map(x=>x[0]).join(' ')}`.toLowerCase().includes(query.toLowerCase()))),[orders,query,status])
 const persist=next=>{setOrders(next);localStorage.setItem('meena-order-history',JSON.stringify(next))}
 const cancel=id=>persist(orders.map(order=>order.id===id?{...order,status:'Cancelled'}:order))
 const buyAgain=order=>{const next={...cart};order.items.forEach(([name])=>{next[name]=(next[name]||0)+1});setCart(next);localStorage.setItem('meena-cart',JSON.stringify(next))}
 const cartCount=Object.values(cart).reduce((sum,value)=>sum+value,0)
 const logout=()=>{localStorage.removeItem('meena-auth');go('/login')}
 return <><StoreNavbar active="account" wishlistCount={wishlist.length} cartCount={cartCount}/><main className="orders-page"><div className="orders-shell">
  <aside className="orders-sidebar"><header><h1>My Account</h1><p>Manage your profile, orders and more</p></header><nav aria-label="Account menu">{menu.map(([icon,label,href])=><a key={label} href={href} className={label==='My Orders'?'active':''} onClick={event=>{if(href==='#')event.preventDefault()}}><Icon name={icon}/><span>{label}</span>{label==='Wishlist'&&wishlist.length>0&&<b>{wishlist.length}</b>}{label==='My Orders'&&<i>›</i>}</a>)}</nav><button className="orders-logout" onClick={logout}><Icon name="logout"/>Logout</button><div className="orders-promo"><h2>Healthy<br/>Snacking<br/>Happier You</h2><p>Pure makhana for a healthier, brighter tomorrow.</p><button onClick={()=>go('/products')}>Shop Now <Icon name="arrow"/></button><img src="/wishlist-hero-banner.png" alt="Bowl of premium makhana"/></div></aside>
  <section className="orders-content"><header className="orders-heading"><div className="orders-title"><span><Icon name="package"/></span><div><h1>My Orders</h1><p>Track your orders, view details and reorder your favorites.</p></div></div><div className="orders-tools"><label><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search your orders..." aria-label="Search orders"/></label><label className="orders-select"><Icon name="calendar"/><select value={status} onChange={e=>setStatus(e.target.value)} aria-label="Filter orders by status">{['All Orders','Processing','Shipped','Delivered','Cancelled'].map(item=><option key={item}>{item}</option>)}</select></label></div></header>
   <div className="orders-tabs" role="group" aria-label="Order status filters">{[['All Orders',12],['Processing',2],['Shipped',4],['Delivered',5],['Cancelled',1]].map(([label,count])=><button key={label} className={status===label?'active':''} onClick={()=>setStatus(label)}>{label} <span>({count})</span></button>)}</div>
   <div className="orders-list">{filtered.map(order=><OrderCard key={order.id} order={order} expanded={open===order.id} onToggle={()=>setOpen(open===order.id?null:order.id)} onCancel={()=>cancel(order.id)} onBuy={()=>buyAgain(order)}/>)}{!filtered.length&&<div className="orders-empty"><Icon name="package"/><h2>No matching orders</h2><p>Try a different order number, product name or status.</p><button onClick={()=>{setQuery('');setStatus('All Orders')}}>Show all orders</button></div>}</div>
  </section></div></main><PromiseStrip/></>
}

function OrderCard({order,expanded,onToggle,onCancel,onBuy}){
 const cancelled=order.status==='Cancelled';const statusIcon=cancelled?'x':order.status==='Processing'?'clock':order.status==='Shipped'?'truck':'check'
 return <article className="order-card"><header><div className="order-number"><span><Icon name="package"/></span><div><h2>Order #{order.id}</h2><p>Placed on {order.date}</p></div></div><dl><div><dt>Total Amount</dt><dd>₹{order.amount}</dd></div><div><dt>Payment Method</dt><dd>{order.payment}</dd></div></dl><span className={`order-status ${order.status.toLowerCase()}`}><Icon name={statusIcon}/>{order.status}</span><button className="order-outline" onClick={onToggle}>View Details <span>›</span></button></header>
  <div className="order-body"><div className="order-products"><div className="order-images">{order.items.slice(0,3).map(([name,image])=><img key={name} src={image} alt=""/>)}{order.more&&<span>+{order.more}</span>}</div><div><h3>{order.items.length+(order.more||0)} {order.items.length+(order.more||0)===1?'Item':'Items'}</h3><p>{order.items.map(x=>x[0]).join(', ')}{order.more?' & more':''}</p></div></div><Timeline order={order}/>{cancelled||order.status==='Delivered'?<button className="order-primary" onClick={onBuy}><Icon name="cart"/>Buy Again</button>:order.status==='Processing'?<button className="order-danger" onClick={onCancel}><Icon name="x"/>Cancel Order</button>:<button className="order-primary" onClick={onToggle}><Icon name="truck"/>Track Order</button>}</div>
  {expanded&&<div className="order-details"><div><b>Delivery Address</b><p>85 P, Maranga, Purnia, Bihar 854301</p></div><div><b>Items in this order</b><p>{order.items.map(x=>x[0]).join(' · ')}</p></div><div><b>Order support</b><button onClick={()=>go('/contact')}>Get help <span>→</span></button></div></div>}
 </article>
}
function Timeline({order}){if(order.status==='Cancelled')return <div className="order-timeline cancelled-line"><div className="timeline-step done"><i><Icon name="check"/></i><b>Order Placed</b><small>{order.dates[0]}</small></div><div className="timeline-step cancelled-step"><i><Icon name="x"/></i><b>Cancelled</b><small>{order.dates[1]}</small></div></div>;return <div className="order-timeline">{stageNames.map((name,index)=>{const done=index<=order.stages;return <div className={`timeline-step ${done?'done':''}`} key={name}><i>{done?<Icon name="check"/>:index===2?<Icon name="truck"/>:''}</i><b>{name}</b><small>{order.dates[index]||'Pending'}</small></div>})}</div>}
function PromiseStrip(){return <section className="orders-promises" aria-label="Our quality promises">{[['leaf','100% Natural Ingredients','No artificial colors & flavors'],['heart','Hygienically Processed','Clean & safe production'],['shield','Authentic Taste','Pure & premium quality'],['truck','Pan India Delivery','Fast & reliable shipping']].map(([icon,title,sub])=><div key={title}><span><Icon name={icon}/></span><p><b>{title}</b><small>{sub}</small></p></div>)}</section>}
