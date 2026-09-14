import {useMemo,useState} from 'react'
import StoreNavbar from './StoreNavbar'
import AccountSidebar from './AccountSidebar'
import {getOrders} from './ordersData'
import './OrdersPage.css'

const paths={
 search:<><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,filter:<><path d="M4 5h16l-6 7v5l-4 2v-7Z"/></>,down:<path d="m6 9 6 6 6-6"/>,chevron:<path d="m9 5 7 7-7 7"/>,
 receipt:<><rect x="5" y="3" width="14" height="18" rx="2"/><path d="m9 3 1 2 2-2 2 2 1-2M9 10h6m-6 4h4"/></>,package:<><path d="m3 7 9-4 9 4-9 4Z"/><path d="m3 7 9 4 9-4v10l-9 4-9-4V7Zm9 4v10"/></>,truck:<><path d="M3 6h11v11H3zM14 10h4l3 4v3h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></>,home:<><path d="m3 11 9-8 9 8v10h-7v-6h-4v6H3Z"/><path d="m9 12 2 2 4-4"/></>,
 pin:<><path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></>,cart:<><path d="M3 4h2l2 10h11l2-7H6M9 20h.01M17 20h.01"/></>,x:<><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6m0-6-6 6"/></>,check:<path d="m6 12 4 4 8-9"/>,
 leaf:<><path d="M20 4C11 4 5 9 5 18c9 0 15-6 15-14Z"/><path d="M5 18 20 4"/></>,heart:<path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-8a5.2 5.2 0 0 0 0-7.4Z"/>,shield:<><path d="M12 3c3 2 5 3 8 3v6c0 5-3 8-8 10-5-2-8-5-8-10V6c3 0 5-1 8-3Z"/><path d="m9 12 2 2 4-5"/></>
}
function Icon({name}){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>}
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
const go=path=>{history.pushState({},'',path);window.dispatchEvent(new PopStateEvent('popstate'));window.scrollTo({top:0})}
const tabs=['All Orders','Processing','Shipped','Delivered','Cancelled','Returned']

export default function OrdersPage(){
 const [orders,setOrders]=useState(getOrders),[query,setQuery]=useState(''),[status,setStatus]=useState('All Orders'),[filterOpen,setFilterOpen]=useState(false),[expanded,setExpanded]=useState(null),[cancelId,setCancelId]=useState(null),[notice,setNotice]=useState(''),[cart,setCart]=useState(()=>read('meena-cart',{}))
 const wishlist=read('meena-wishlist',[]),notifications=read('meena-notifications',[]),notificationCount=Array.isArray(notifications)?notifications.filter(item=>item.unread).length:0
 const filtered=useMemo(()=>orders.filter(order=>(status==='All Orders'||order.status===status)&&`${order.id} ${order.name} ${order.variant}`.toLowerCase().includes(query.trim().toLowerCase())),[orders,query,status])
 const counts=useMemo(()=>Object.fromEntries(tabs.map(tab=>[tab,tab==='All Orders'?orders.length:orders.filter(order=>order.status===tab).length])),[orders])
 const toast=text=>{setNotice(text);window.setTimeout(()=>setNotice(''),2300)}
 const persist=next=>{setOrders(next);localStorage.setItem('meena-order-history',JSON.stringify(next))}
 const cancelOrder=()=>{persist(orders.map(order=>order.id===cancelId?{...order,status:'Cancelled'}:order));setCancelId(null);toast('Order cancelled successfully.')}
 const buyAgain=order=>{const next={...cart,[order.name]:(cart[order.name]||0)+order.qty};setCart(next);localStorage.setItem('meena-cart',JSON.stringify(next));toast(`${order.name} added to your cart.`)}
 const track=order=>{setExpanded(expanded===order.id?null:order.id);toast(`${order.status} · Latest tracking details shown.`)}
 const cartCount=Object.values(cart).reduce((sum,value)=>sum+value,0)
 return <><StoreNavbar active="account" wishlistCount={wishlist.length||3} cartCount={cartCount||2}/><main className="orders-page-v2"><div className="orders-shell-v2"><AccountSidebar active="My Orders" wishlistCount={wishlist.length||3} notificationCount={notificationCount}/><section className="orders-main-v2">
  <header className="orders-heading-v2"><div><h1>My Orders</h1><p>Track, return or buy again from your orders.</p></div><div className="orders-tools-v2"><label><Icon name="search"/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search your orders..." aria-label="Search your orders"/>{query&&<button onClick={()=>setQuery('')} aria-label="Clear order search">×</button>}</label><div className="orders-filter-v2"><button onClick={()=>setFilterOpen(value=>!value)} aria-expanded={filterOpen}><Icon name="filter"/>Filter<Icon name="down"/></button>{filterOpen&&<div>{tabs.map(tab=><button key={tab} className={status===tab?'active':''} onClick={()=>{setStatus(tab);setFilterOpen(false)}}>{tab}<span>{counts[tab]}</span></button>)}</div>}</div></div></header>
  <nav className="orders-tabs-v2" aria-label="Order status filters">{tabs.map(tab=><button key={tab} className={status===tab?'active':''} onClick={()=>setStatus(tab)}>{tab}{counts[tab]>0&&<span>{counts[tab]}</span>}</button>)}</nav>
  <div className="orders-list-v2">{filtered.map(order=><OrderCard key={order.id} order={order} expanded={expanded===order.id} onDetails={()=>go(`/orders/${encodeURIComponent(order.id)}`)} onTrack={()=>track(order)} onBuy={()=>buyAgain(order)} onCancel={()=>setCancelId(order.id)}/>)}{!filtered.length&&<div className="orders-empty-v2"><Icon name="package"/><h2>No matching orders</h2><p>Try another product, order number or status.</p><button onClick={()=>{setQuery('');setStatus('All Orders')}}>Show All Orders</button></div>}</div>
 </section></div></main><PromiseStrip/>
 {cancelId&&<div className="orders-modal-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)setCancelId(null)}}><section className="orders-modal-v2" role="dialog" aria-modal="true" aria-labelledby="cancel-order-title"><i><Icon name="x"/></i><h2 id="cancel-order-title">Cancel this order?</h2><p>The order will be moved to Cancelled. You can buy it again later.</p><div><button onClick={()=>setCancelId(null)}>Keep Order</button><button className="danger" onClick={cancelOrder}>Cancel Order</button></div></section></div>}
 {notice&&<div className="orders-toast-v2" role="status"><Icon name="check"/>{notice}</div>}</>
}

function OrderCard({order,expanded,onDetails,onTrack,onBuy,onCancel}){
 const stage=order.status==='Delivered'?3:order.status==='Out for Delivery'?2:order.status==='Shipped'?1:0
 const canCancel=!['Delivered','Cancelled','Returned'].includes(order.status)
 return <article className={`order-card-v2 ${order.status.toLowerCase().replaceAll(' ','-')}`}><header><p><b>Order #{order.id}</b><span/>Placed on {order.date}<span/>₹{order.amount}</p><button onClick={onDetails}>View Details <Icon name="chevron"/></button></header><div className="order-content-v2"><div className="order-product-v2"><img src={order.image} alt={order.name}/><div><h2>{order.name}</h2><p>{order.variant}</p><small>Qty: {order.qty}</small><strong>₹{order.amount}</strong></div></div><OrderTimeline order={order} stage={stage}/><div className="order-actions-v2"><button onClick={onTrack}><Icon name="pin"/>Track Order</button>{order.status==='Delivered'||order.status==='Cancelled'?<button className="primary" onClick={onBuy}><Icon name="cart"/>Buy Again</button>:canCancel&&<button className="cancel" onClick={onCancel}><Icon name="x"/>Cancel Order</button>}</div></div>{expanded&&<div className="order-details-v2"><div><b>Latest Tracking Update</b><p>{order.status} · Package status refreshed just now.</p></div><div><b>Payment</b><p>{order.payment} · ₹{order.amount}</p></div><div><b>Need help?</b><button onClick={()=>go('/support')}>Contact Support <Icon name="chevron"/></button></div></div>}</article>
}
function OrderTimeline({order,stage}){const names=['Order Placed','Shipped','Out for Delivery','Delivered'],icons=['receipt','package','truck','home'];return <div className={`order-timeline-v2 ${order.status==='Cancelled'?'cancelled':''}`} style={{'--order-progress':order.status==='Cancelled'?0:stage/3}} aria-label={`${order.status} order progress`}>{names.map((name,index)=>{const done=order.status!=='Cancelled'&&index<=stage;return <div className={done?'done':''} key={name}><i><Icon name={icons[index]}/></i><b>{name}</b><small>{order.times?.[index]||'—'}</small></div>})}</div>}
function PromiseStrip(){return <footer className="orders-promises-v2"><div className="orders-brand-v2"><img src="/meena-logo-premium.png" alt="Meena Green"/></div>{[['leaf','100% Natural Ingredients','No artificial colors & flavors'],['heart','Hygienically Processed','Clean & safe production'],['shield','Authentic Taste','Pure & premium quality'],['truck','Pan India Delivery','Fast & reliable shipping']].map(([icon,title,text])=><div key={title}><i><Icon name={icon}/></i><span><b>{title}</b><small>{text}</small></span></div>)}</footer>}
