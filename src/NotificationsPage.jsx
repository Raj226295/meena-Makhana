import {useMemo,useState} from 'react'
import StoreNavbar from './StoreNavbar'
import AccountSidebar from './AccountSidebar'
import './NotificationsPage.css'

const paths={
 bell:<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
 truck:<><path d="M3 6h11v11H3zM14 10h4l3 4v3h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></>,
 box:<><path d="m4 7 8-4 8 4-8 4Z"/><path d="M4 7v10l8 4 8-4V7m-8 4v10"/></>,
 tag:<><path d="M20 13 12 21 3 12V4h8Z"/><circle cx="8" cy="9" r="1"/></>,
 heart:<path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-8a5.2 5.2 0 0 0 0-7.4Z"/>,
 user:<><circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
 star:<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>,
 card:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/></>,
 shield:<><path d="M12 2.5c3 2.5 5.5 3.5 8.5 4v6.2c0 4.7-3.7 7.5-8.5 9.2-4.8-1.7-8.5-4.5-8.5-9.2V6.5c3-.5 5.5-1.5 8.5-4Z"/><path d="m8.5 12.3 2.2 2.2 4.8-5"/></>,
 gift:<><path d="M3 10h18v11H3zM2 6h20v4H2zM12 6v15"/><path d="M12 6H8.5A2.5 2.5 0 1 1 11 3.5Zm0 0h3.5A2.5 2.5 0 1 0 13 3.5Z"/></>,
 check:<path d="m5 12 4 4L19 6"/>,chevron:<path d="m9 5 7 7-7 7"/>,leaf:<><path d="M20 4C11 4 5 9 5 18c9 0 15-6 15-14Z"/><path d="M5 18 20 4"/></>
}
function Icon({name}){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>}
const initialNotifications=[
 {id:1,category:'Orders',icon:'truck',tone:'green',title:'Your order is out for delivery!',message:'Order #MG123456 is out for delivery and will arrive today.',time:'2 hours ago',unread:true},
 {id:2,category:'Orders',icon:'box',tone:'blue',title:'Your order has been shipped',message:'Order #MG123456 has been shipped via Delhivery. Track your order now.',time:'1 day ago',unread:true},
 {id:3,category:'Offers',icon:'tag',tone:'red',title:'Special Offer Just for You! 🎁',message:'Get 10% OFF on your next order. Use code MEENA10 at checkout.',time:'2 days ago',unread:true},
 {id:4,category:'Offers',icon:'heart',tone:'red',title:'An item in your wishlist is back in stock!',message:'Perfect Premium Makhana (250g) is now available. Grab it before it’s gone!',time:'3 days ago',unread:false},
 {id:5,category:'Account',icon:'user',tone:'green',title:'Profile Updated Successfully',message:'Your account information has been updated.',time:'5 days ago',unread:false},
 {id:6,category:'Orders',icon:'star',tone:'orange',title:'Review Your Recent Purchase',message:'How was your experience with Meena Classic Makhana? Share your feedback!',time:'6 days ago',unread:false},
 {id:7,category:'Orders',icon:'card',tone:'blue',title:'Payment Successful',message:'Your payment of ₹756 for Order #MG123456 was successful.',time:'1 week ago',unread:false},
 {id:8,category:'Updates',icon:'bell',tone:'purple',title:"We've got something new for you!",message:'Check out our new flavors – now available on our store.',time:'1 week ago',unread:false},
 {id:9,category:'Account',icon:'shield',tone:'green',title:'Login from a new device',message:'We noticed a login from a new device. If it was you, no action is needed.',time:'1 week ago',unread:false},
 {id:10,category:'Updates',icon:'gift',tone:'red',title:'Your loyalty points just increased!',message:"You've earned 50 loyalty points with your recent purchase.",time:'2 weeks ago',unread:false},
 {id:11,category:'Offers',icon:'tag',tone:'orange',title:'Weekend Makhana Deal',message:'Save more on selected family packs this weekend.',time:'2 weeks ago',unread:false},
 {id:12,category:'Updates',icon:'leaf',tone:'green',title:'A greener delivery update',message:'Your latest order uses recyclable protective packaging.',time:'3 weeks ago',unread:false}
]
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function PromiseStrip(){return <footer className="notification-promises" aria-label="Meena Green quality promises"><div className="notification-brand"><img src="/meena-logo-premium.png" alt="Meena Green"/></div>{[['leaf','100% Natural Ingredients','No artificial colors & flavors'],['heart','Hygienically Processed','Clean & safe production'],['shield','Authentic Taste','Pure & premium quality'],['truck','Pan India Delivery','Fast & reliable shipping']].map(([icon,title,text])=><div key={title}><i><Icon name={icon}/></i><span><b>{title}</b><small>{text}</small></span></div>)}</footer>}

export default function NotificationsPage(){
 const wishlist=read('meena-wishlist',[])
 const [notifications,setNotifications]=useState(()=>read('meena-notifications',initialNotifications))
 const [filter,setFilter]=useState('All')
 const [expanded,setExpanded]=useState(null)
 const persist=next=>{setNotifications(next);localStorage.setItem('meena-notifications',JSON.stringify(next))}
 const unread=notifications.filter(item=>item.unread).length
 const counts=useMemo(()=>Object.fromEntries(['All','Orders','Offers','Account','Updates'].map(name=>[name,name==='All'?notifications.length:notifications.filter(item=>item.category===name).length])),[notifications])
 const visible=filter==='All'?notifications:notifications.filter(item=>item.category===filter)
 const open=item=>{setExpanded(expanded===item.id?null:item.id);if(item.unread)persist(notifications.map(note=>note.id===item.id?{...note,unread:false}:note))}
 return <><StoreNavbar wishlistCount={wishlist.length}/><main className="notifications-page"><div className="notifications-shell"><AccountSidebar active="Notifications" wishlistCount={wishlist.length} notificationCount={unread}/><section className="notifications-content">
  <header className="notifications-heading"><div className="notifications-title"><span><Icon name="bell"/></span><div><h1>Notifications</h1><p>Stay updated with your orders, offers, and important updates.</p></div></div><button className="mark-read" onClick={()=>persist(notifications.map(item=>({...item,unread:false})))} disabled={!unread}><Icon name="check"/>Mark all as read</button></header>
  <nav className="notification-filters" aria-label="Notification filters">{['All','Orders','Offers','Account','Updates'].map(name=><button key={name} className={filter===name?'active':''} onClick={()=>setFilter(name)} aria-pressed={filter===name}>{name} <span>({counts[name]})</span></button>)}</nav>
  <article className="notification-list" aria-live="polite">{visible.map(item=><button key={item.id} className={`notification-row ${item.unread?'unread':''} ${expanded===item.id?'expanded':''}`} onClick={()=>open(item)} aria-expanded={expanded===item.id}><span className="notification-unread-dot"/><i className={`notification-icon ${item.tone}`}><Icon name={item.icon}/></i><span className="notification-copy"><b>{item.title}</b><small>{item.message}</small>{expanded===item.id&&<em>{item.category} update · Tap again to close</em>}</span><time>{item.time}</time>{item.unread&&<span className="notification-new">New</span>}<Icon name="chevron"/></button>)}{!visible.length&&<div className="notification-empty"><i><Icon name="bell"/></i><h2>No notifications here</h2><p>New {filter.toLowerCase()} updates will appear here.</p></div>}</article>
 </section></div></main><PromiseStrip/></>
}
