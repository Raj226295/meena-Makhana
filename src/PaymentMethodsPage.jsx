import {useState} from 'react'
import StoreNavbar from './StoreNavbar'
import AccountSidebar from './AccountSidebar'
import './PaymentMethodsPage.css'

const shapes={
 card:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/></>,
 shield:<><path d="M12 2.5c3 2.5 5.5 3.5 8.5 4v6.2c0 4.7-3.7 7.5-8.5 9.2-4.8-1.7-8.5-4.5-8.5-9.2V6.5c3-.5 5.5-1.5 8.5-4Z"/><path d="m8.5 12.3 2.2 2.2 4.8-5"/></>,
 check:<path d="m5 12 4 4L19 6"/>,
 bank:<><path d="m3 9 9-5 9 5M5 10h14M6 18h12M4 21h16M8 10v8m4-8v8m4-8v8"/></>,
 wallet:<><path d="M4 7a3 3 0 0 1 3-3h11v4H7a3 3 0 0 0 0 6h14v6H7a3 3 0 0 1-3-3Z"/><path d="M16 10h5v4h-5a2 2 0 1 1 0-4Z"/></>,
 qr:<><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM15 14h2v2h-2zm3 0h2v6h-3m-3-3h3v3h-3z"/></>,
 calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4m8-4v4M3 10h18"/></>,
 more:<><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></>,
 trash:<><path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6"/></>,
 arrow:<path d="M5 12h14m-5-5 5 5-5 5"/>,
 headset:<><path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H5a1 1 0 0 1-1-1v-5Zm16 0h-3v6h2a1 1 0 0 0 1-1v-5Z"/><path d="M17 20c0 1-1 2-3 2"/></>,
 leaf:<><path d="M20 4C11 4 5 9 5 18c9 0 15-6 15-14Z"/><path d="M5 18 20 4"/></>,
 heart:<path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-8a5.2 5.2 0 0 0 0-7.4Z"/>,
 truck:<><path d="M3 6h11v11H3zM14 10h4l3 4v3h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></>
}
function Icon({name}){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[name]}</svg>}
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
const starterMethods=[
 {id:'upi',kind:'upi',title:'UPI',detail:'customer@okupi',meta:'Linked on 12 May 2025',isDefault:true},
 {id:'card',kind:'visa',title:'HDFC Bank Debit Card',detail:'•••• •••• •••• 4321',meta:'Expires 12/28  ·  Meena Customer',isDefault:false},
 {id:'wallet',kind:'paytm',title:'Paytm Wallet',detail:'customer@paytm',meta:'Linked on 18 Apr 2025',isDefault:false}
]
const choices=[
 ['upi','qr','UPI','Pay instantly using any UPI app'],['card','card','Credit / Debit Card','Visa, Mastercard, RuPay & more'],['bank','bank','Net Banking','All major banks supported'],['wallet','wallet','Wallet','Paytm, Amazon Pay & more'],['emi','calendar','EMI / BNPL','Easy EMIs on selected cards']
]
function MethodMark({kind}){return <span className={`payment-method-mark ${kind}`}>{kind==='visa'?<b>VISA</b>:kind==='paytm'?<b><i>pay</i>tm</b>:<b>UPI<span>↗</span></b>}</span>}
function PromiseStrip(){return <footer className="payment-promises" aria-label="Meena Green quality promises"><div className="payment-promise-brand"><img src="/meena-logo-premium.png" alt="Meena Green"/><span>Goodness from Nature</span></div>{[['leaf','100% Natural','No artificial colors & flavors'],['heart','Hygienically Processed','Clean & safe production'],['shield','Authentic Taste','Pure & premium quality'],['truck','Pan India Delivery','Fast & reliable shipping']].map(([icon,title,text])=><div className="payment-promise" key={title}><i><Icon name={icon}/></i><span><b>{title}</b><small>{text}</small></span></div>)}</footer>}

export default function PaymentMethodsPage(){
 const wishlist=read('meena-wishlist',[])
 const [methods,setMethods]=useState(()=>read('meena-payment-methods',starterMethods))
 const [selected,setSelected]=useState('upi')
 const [openMenu,setOpenMenu]=useState(null)
 const [notice,setNotice]=useState('')
 const persist=next=>{setMethods(next);localStorage.setItem('meena-payment-methods',JSON.stringify(next))}
 const setDefault=id=>{persist(methods.map(method=>({...method,isDefault:method.id===id})));setNotice('Default payment method updated successfully.')}
 const remove=id=>{const filtered=methods.filter(method=>method.id!==id);if(filtered.length&&!filtered.some(method=>method.isDefault))filtered[0]={...filtered[0],isDefault:true};persist(filtered);setOpenMenu(null);setNotice('Payment method removed from this device.')}
 const continueSetup=()=>{const label=choices.find(item=>item[0]===selected)?.[2];setNotice(`${label} will be connected securely during checkout.`)}
 return <><StoreNavbar wishlistCount={wishlist.length}/><main className="payments-page"><div className="payments-shell"><AccountSidebar active="Payment Methods" wishlistCount={wishlist.length}/><section className="payments-content">
  <header className="payments-heading"><div className="payments-title"><span><Icon name="card"/></span><div><h1>Payment Methods</h1><p>Manage your payment methods for a faster and more secure checkout experience.</p></div></div><div className="payments-secure"><i><Icon name="shield"/></i><div><b>100% Secure Payments</b><p>Your payment information is encrypted and securely stored.</p></div></div></header>
  <article className="payments-panel saved-payment-panel"><h2>Saved Payment Methods <span>({methods.length})</span></h2><div className="saved-payment-list">{methods.map(method=><div className="saved-payment-row" key={method.id}><MethodMark kind={method.kind}/><div className="saved-payment-copy"><div><h3>{method.title}</h3>{method.isDefault&&<span>Default</span>}</div><strong>{method.detail}</strong><p>{method.meta}</p></div><div className="saved-payment-actions">{method.isDefault?<span className="default-payment-pill"><Icon name="check"/>Default Payment Method</span>:<button className="set-default-button" onClick={()=>setDefault(method.id)}>Set as Default</button>}<button className="payment-more" onClick={()=>setOpenMenu(openMenu===method.id?null:method.id)} aria-label={`${method.title} options`} aria-expanded={openMenu===method.id}><Icon name="more"/></button>{openMenu===method.id&&<div className="payment-popover"><button onClick={()=>remove(method.id)}><Icon name="trash"/>Remove method</button></div>}</div></div>)}</div>{!methods.length&&<div className="payments-empty"><Icon name="card"/><h3>No saved methods yet</h3><p>Choose a secure payment option below to get started.</p></div>}</article>
  <article className="payments-panel add-payment-panel"><header><h2>Add New Payment Method</h2><p>Choose a payment method to add to your account.</p></header><div className="payment-choice-grid">{choices.map(([id,icon,title,text])=><button key={id} className={selected===id?'selected':''} onClick={()=>setSelected(id)} aria-pressed={selected===id}><i>{id==='upi'?<b className="mini-upi">UPI↗</b>:<Icon name={icon}/>}</i>{selected===id&&<span className="choice-check"><Icon name="check"/></span>}<strong>{title}</strong><small>{text}</small></button>)}</div><div className="payment-trust"><i><Icon name="shield"/></i><div><b>Safe. Secure. Trusted.</b><p>Industry-standard encryption and trusted payment partners keep your information safe.</p></div><div className="payment-partners" aria-label="Supported payment standards"><b>PCI<span>DSS</span></b><b>Verified <span>VISA</span></b><b>Mastercard</b><b>RuPay</b><b>UPI↗</b></div></div><div className="payment-continue"><span><Icon name="shield"/>No payment details are stored before secure verification.</span><button onClick={continueSetup}>Continue Securely <Icon name="arrow"/></button></div></article>
  <div className="payment-support"><i><Icon name="headset"/></i><div><b>Need help with payments?</b><p>Our support team is here to help you 24/7.</p></div><a href="/contact">Contact Support <Icon name="arrow"/></a></div>
 </section></div></main><PromiseStrip/>{notice&&<div className="payment-toast" role="status"><Icon name="check"/><span>{notice}</span><button onClick={()=>setNotice('')} aria-label="Dismiss message">×</button></div>}</>
}
