import {useEffect,useMemo,useRef,useState} from 'react'
import StoreNavbar from './StoreNavbar'
import AccountSidebar from './AccountSidebar'
import './HelpSupportPage.css'

const paths={headset:<><path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H5a1 1 0 0 1-1-1v-5Zm16 0h-3v6h2a1 1 0 0 0 1-1v-5Z"/><path d="M17 20c0 1-1 2-3 2"/></>,agent:<><circle cx="12" cy="10" r="5"/><path d="M8 9c2-1 3-2 4-4 1 2 2 3 4 4M9 12h.01M15 12h.01M10 15c1.3.8 2.7.8 4 0M4 13V9a8 8 0 0 1 16 0v4M4 13H2v5h4m14-5h2v5h-4M8 21h8"/></>,search:<><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,truck:<><path d="M3 6h11v11H3zM14 10h4l3 4v3h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></>,box:<><path d="m4 7 8-4 8 4-8 4Z"/><path d="M4 7v10l8 4 8-4V7m-8 4v10"/></>,card:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/></>,user:<><circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,leaf:<><path d="M20 4C11 4 5 9 5 18c9 0 15-6 15-14Z"/><path d="M5 18 20 4"/></>,pin:<><path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></>,chevron:<path d="m9 5 7 7-7 7"/>,down:<path d="m6 9 6 6 6-6"/>,back:<path d="m15 18-6-6 6-6"/>,more:<><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></>,paperclip:<path d="m21.4 11.6-8.5 8.5a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 1 1-2.8-2.8l8.5-8.5"/>,smile:<><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></>,send:<path d="m22 2-7 20-4-9-9-4ZM22 2 11 13"/>,check:<path d="m4 12 4 4L20 5"/>,chat:<><path d="M4 5h16v11H9l-5 4Z"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/></>,chatFilled:<><path d="M3.5 4.5h13v9H9l-4.5 3.2v-3.2h-1Z" fill="currentColor" stroke="none"/><path d="M9 15h7l3.5 2.5V9.2h-1.4" stroke="currentColor" strokeWidth="2.2"/><circle cx="7.3" cy="9" r="1" fill="white" stroke="none"/><circle cx="10" cy="9" r="1" fill="white" stroke="none"/><circle cx="12.7" cy="9" r="1" fill="white" stroke="none"/></>,mailFilled:<><rect x="3" y="5" width="18" height="14" rx="2.5" fill="currentColor" stroke="none"/><path d="m5 8 7 5 7-5" stroke="white" strokeWidth="2"/></>,phoneFilled:<path d="M6.5 3h3l1.5 5-2 1.5a16 16 0 0 0 5.5 5.5l1.5-2 5 1.5v3c0 2-1.6 3.6-3.6 3.5C9.8 20.4 3.6 14.2 3.1 6.6 3 4.6 4.5 3 6.5 3Z" fill="currentColor" stroke="none"/>,whatsapp:<><circle cx="12" cy="12" r="9.5" fill="currentColor" stroke="white" strokeWidth="1.5"/><path d="M8.2 7.5c.5-.5 1.1-.2 1.4.3l1 2-1.1 1c.8 1.6 2 2.8 3.6 3.6l1-1.2 2.1 1c.6.3.8.9.4 1.4-.8 1-2 1.5-3.2 1.1-3.2-1-5.7-3.5-6.7-6.7-.4-1.2.2-2.4 1.5-3.5Z" fill="white" stroke="none"/><path d="m6.1 18.3.8-2.4" stroke="white" strokeWidth="1.5"/></>,bolt:<path d="m13 2-8 12h6l-1 8 9-13h-6Z" fill="currentColor" stroke="none"/>,mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,phone:<path d="M6.5 3h3l1.5 5-2 1.5a16 16 0 0 0 5.5 5.5l1.5-2 5 1.5v3c0 2-1.6 3.6-3.6 3.5C9.8 20.4 3.6 14.2 3.1 6.6 3 4.6 4.5 3 6.5 3Z"/>,clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,heart:<path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-8a5.2 5.2 0 0 0 0-7.4Z"/>,shield:<><path d="M12 2.5c3 2.5 5.5 3.5 8.5 4v6.2c0 4.7-3.7 7.5-8.5 9.2-4.8-1.7-8.5-4.5-8.5-9.2V6.5c3-.5 5.5-1.5 8.5-4Z"/><path d="m8.5 12.3 2.2 2.2 4.8-5"/></>}
paths.bag=<><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>
function Icon({name}){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>}
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
const topics=[
 ['bag','green','My Orders','Track order, cancellation, return & refund','order track cancellation return refund'],
 ['box','blue','Returns & Refunds','Learn about our return and refund policy','return refund policy'],
 ['card','red','Payments & Offers','Payment methods, failed payments, offers','payment methods failed offers'],
 ['truck','green','Shipping & Delivery','Delivery time, shipping charges, track order','shipping delivery charges track'],
 ['leaf','green','Products & Quality','Product information, ingredients, shelf life','product quality ingredients shelf life'],
 ['user','purple','Account & Profile','Edit profile, addresses, account settings','account profile addresses settings']
]
const topicAnswers={
 'My Orders':'Opening your orders so you can track, cancel or request help with an order.',
 'Returns & Refunds':'Eligible unopened products can be reported for return. Start a chat and share your order number for assistance.',
 'Payments & Offers':'We accept UPI, cards, net banking and supported wallets. Failed payments are usually reversed automatically.',
 'Shipping & Delivery':'Most orders arrive within 3–7 working days. Delivery time and charges depend on your PIN code.',
 'Products & Quality':'Our makhana is carefully selected and hygienically processed without artificial colours or flavours.',
 'Account & Profile':'Opening your profile where you can edit personal details and saved addresses.'
}
function PromiseStrip(){return <footer className="support-promises" aria-label="Meena Green quality promises"><div className="support-brand"><img src="/meena-logo-premium.png" alt="Meena Green"/></div>{[['leaf','100% Natural Ingredients','No artificial colors & flavors'],['heart','Hygienically Processed','Clean & safe production'],['shield','Authentic Taste','Pure & premium quality'],['truck','Pan India Delivery','Fast & reliable shipping']].map(([icon,title,text])=><div key={title}><i><Icon name={icon}/></i><span><b>{title}</b><small>{text}</small></span></div>)}</footer>}

const starterMessages=[
 {id:1,from:'agent',text:'👋 Hi there!\nWelcome to Meena Green Support.\n\nHow can we help you today?',time:'10:24 AM'},
 {id:2,from:'user',text:'Hi, I want to know about delivery time to Purnea, Bihar.',time:'10:25 AM'},
 {id:3,from:'agent',text:'Sure! 😊\nWe deliver to Purnea, Bihar within 2–4 working days. You will receive tracking details once your order is shipped.\n\nIs there anything else I can help you with?',time:'10:26 AM'}
]
const quickReplies={
 'Track My Order':'You can see live delivery updates in My Orders. Tap “Open My Orders” below to continue.',
 'Return & Refund':'Returns are available for eligible unopened products. Share your order number and our team will guide you.',
 'Payment Options':'We accept UPI, cards, net banking and supported wallets at checkout.',
 'Delivery Time':'Most orders arrive in 3–7 working days. Purnea deliveries usually take 2–4 working days.',
 'Talk to Human':'A support specialist has been notified and will join this chat shortly.'
}
const currentTime=()=>new Intl.DateTimeFormat('en-IN',{hour:'numeric',minute:'2-digit'}).format(new Date())

function SupportChat({onBack,wishlistCount,notificationCount}){
 const [messages,setMessages]=useState(()=>read('meena-support-chat',starterMessages))
 const [message,setMessage]=useState(''),[emojiOpen,setEmojiOpen]=useState(false),[menuOpen,setMenuOpen]=useState(false),[typing,setTyping]=useState(false)
 const fileInput=useRef(null),bottom=useRef(null)
 useEffect(()=>{localStorage.setItem('meena-support-chat',JSON.stringify(messages));bottom.current?.scrollIntoView({behavior:'smooth'})},[messages,typing])
 const send=(text=message,reply='Thanks for your message. Our support team has received it and will get back to you in a few minutes.')=>{
  const clean=text.trim();if(!clean)return
  setMessages(items=>[...items,{id:Date.now(),from:'user',text:clean,time:currentTime()}]);setMessage('');setEmojiOpen(false);setTyping(true)
  window.setTimeout(()=>{setTyping(false);setMessages(items=>[...items,{id:Date.now()+1,from:'agent',text:reply,time:currentTime()}])},650)
 }
 const attach=e=>{const file=e.target.files?.[0];if(file){send(`📎 ${file.name}`,'Your attachment has been received. A support specialist will review it shortly.');e.target.value=''}}
 const reset=()=>{setMessages(starterMessages);setMenuOpen(false)}
 return <><StoreNavbar wishlistCount={wishlistCount}/><main className="support-chat-page"><div className="support-chat-shell"><AccountSidebar active="Help & Support" wishlistCount={wishlistCount} notificationCount={notificationCount}/><section className="chat-workspace" aria-label="Chat with Meena Green Support">
  <article className="chat-panel"><header className="chat-panel-header"><button onClick={onBack} aria-label="Back to Help and Support"><Icon name="back"/></button><i><Icon name="headset"/></i><div><h1>Meena Green Support <span aria-label="Verified"><Icon name="shield"/></span></h1><p><b>Online</b> · Usually replies within a few minutes</p></div><button className="chat-more" onClick={()=>setMenuOpen(value=>!value)} aria-label="Chat options" aria-expanded={menuOpen}><Icon name="more"/></button>{menuOpen&&<div className="chat-menu"><button onClick={reset}>Clear conversation</button><button onClick={onBack}>End chat</button></div>}</header>
  <div className="chat-messages" aria-live="polite"><div className="chat-day">Today</div>{messages.map(item=><div className={`chat-row ${item.from}`} key={item.id}>{item.from==='agent'&&<i><Icon name="headset"/></i>}<div className="chat-bubble"><p>{item.text}</p><small>{item.time}{item.from==='user'&&<span><Icon name="check"/><Icon name="check"/></span>}</small></div></div>)}{typing&&<div className="chat-row agent"><i><Icon name="headset"/></i><div className="chat-typing" aria-label="Support agent is typing"><span/><span/><span/></div></div>}<div ref={bottom}/></div>
  <div className="chat-quick-actions">{Object.keys(quickReplies).map(label=><button key={label} onClick={()=>send(label,quickReplies[label])}>{label}</button>)}</div>
  <form className="chat-composer" onSubmit={e=>{e.preventDefault();send()}}><button type="button" onClick={()=>fileInput.current?.click()} aria-label="Attach a file"><Icon name="paperclip"/></button><input ref={fileInput} type="file" onChange={attach} hidden/><label><input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Type your message here..." aria-label="Chat message"/><button type="button" onClick={()=>setEmojiOpen(value=>!value)} aria-label="Choose an emoji"><Icon name="smile"/></button>{emojiOpen&&<span className="chat-emojis">{['😊','👍','🙏','❤️'].map(emoji=><button type="button" key={emoji} onClick={()=>{setMessage(value=>value+emoji);setEmojiOpen(false)}}>{emoji}</button>)}</span>}</label><button className="chat-send" aria-label="Send message" disabled={!message.trim()}><Icon name="send"/></button></form>
  </article>
  <aside className="chat-info"><header><div><h2>Chat Support</h2><p>We're here to help you!</p></div><span><b/>Online</span></header><div className="chat-instant"><i><Icon name="headset"/></i><div><b>Get instant help</b><p>Our team usually replies within a few minutes.</p></div></div><section><h3><Icon name="clock"/>Support Hours</h3><p><span>Mon – Sat</span><b>9:00 AM – 8:00 PM</b></p><p><span>Sunday</span><b>10:00 AM – 6:00 PM</b></p></section><section><h3>You can also reach us via</h3><a href="tel:+919876543210"><i className="green"><Icon name="phone"/></i><span><b>Call Us</b><small>+91 98765 43210</small></span><Icon name="chevron"/></a><a href="mailto:support@meenagreen.in"><i className="red"><Icon name="mail"/></i><span><b>Email Us</b><small>support@meenagreen.in</small></span><Icon name="chevron"/></a><a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"><i className="whatsapp"><Icon name="chat"/></i><span><b>Chat on WhatsApp</b><small>+91 98765 43210</small></span><Icon name="chevron"/></a></section><div className="chat-care"><h3>We're Always Here<br/>For You</h3><p>Your queries, our priority.<br/>Happy to serve you! ❤️</p><Icon name="leaf"/></div></aside>
 </section></div></main><PromiseStrip/></>
}

export default function HelpSupportPage(){
 const wishlist=read('meena-wishlist',[]),notifications=read('meena-notifications',[])
 const notificationCount=Array.isArray(notifications)?notifications.filter(item=>item.unread).length:0
 const [query,setQuery]=useState(''),[notice,setNotice]=useState(''),[chatOpen,setChatOpen]=useState(false)
 useEffect(()=>{if(chatOpen)requestAnimationFrame(()=>window.scrollTo({top:0}))},[chatOpen])
 const visibleTopics=useMemo(()=>{const term=query.trim().toLowerCase();return term?topics.filter(topic=>topic.slice(1).join(' ').toLowerCase().includes(term)):topics},[query])
 const submit=e=>{e.preventDefault();setNotice(query.trim()?`${visibleTopics.length} helpful topic${visibleTopics.length===1?'':'s'} found.`:'Type a topic to search for help.')}
 const openTopic=title=>{if(title==='My Orders'||title==='Account & Profile'){const target=title==='My Orders'?'/orders':'/profile';history.pushState({},'',target);window.dispatchEvent(new PopStateEvent('popstate'));window.scrollTo({top:0})}else setNotice(topicAnswers[title])}
 if(chatOpen)return <SupportChat onBack={()=>setChatOpen(false)} wishlistCount={wishlist.length} notificationCount={notificationCount}/>
 return <><StoreNavbar wishlistCount={wishlist.length}/><main className="support-page"><div className="support-shell"><AccountSidebar active="Help & Support" wishlistCount={wishlist.length} notificationCount={notificationCount}/><section className="support-content">
  <header className="support-v2-heading"><span><Icon name="headset"/></span><div><h1>Help &amp; Support</h1><p>Find answers to your questions or get help with your orders.</p></div></header>
  <form className="support-v2-search" onSubmit={submit}><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search for help topics (e.g., order, return, payment, delivery...)" aria-label="Search help topics"/>{query&&<button type="button" onClick={()=>setQuery('')} aria-label="Clear search">×</button>}</form>
  <article className="support-v2-topics"><header><h2>Help Topics</h2><p>Choose a topic to find the best solution</p></header><div>{visibleTopics.map(([icon,tone,title,text])=><button key={title} onClick={()=>openTopic(title)}><i className={tone}><Icon name={icon}/></i><span><b>{title}</b><small>{text}</small></span><Icon name="chevron"/></button>)}</div>{!visibleTopics.length&&<div className="support-v2-empty"><Icon name="search"/><b>No matching help topic</b><p>Try searching for order, return, payment or delivery.</p><button onClick={()=>setQuery('')}>Show all topics</button></div>}</article>
  <article className="support-v2-cta"><div><h2>Still need help?</h2><p>Can't find what you're looking for? Chat with our support team.</p></div><div><button onClick={()=>setChatOpen(true)}><Icon name="chat"/>Start Chat <Icon name="chevron"/></button><small><span/>Available 24/7</small></div></article>
 </section></div></main><PromiseStrip/>{notice&&<div className="support-toast" role="status"><Icon name="headset"/><span>{notice}</span><button onClick={()=>setNotice('')} aria-label="Dismiss message">×</button></div>}</>
}
