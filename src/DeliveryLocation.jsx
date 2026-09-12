import {useEffect,useRef,useState} from 'react'
import './DeliveryLocation.css'

function saved(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function Pin(){return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 22S4 15 4 9a8 8 0 0 1 16 0c0 6-8 13-8 13Z"/><circle cx="12" cy="9" r="2.5"/></svg>}
export default function DeliveryLocation(){
 const [open,setOpen]=useState(false),[current,setCurrent]=useState(()=>saved('meena-location','Purnea, Bihar'))
 const [recent,setRecent]=useState(()=>saved('meena-recent-locations',[])),[addresses,setAddresses]=useState(()=>saved('meena-addresses',[]))
 const [input,setInput]=useState(''),[status,setStatus]=useState(''),[locating,setLocating]=useState(false),[manage,setManage]=useState(false)
 const [address,setAddress]=useState(''),[label,setLabel]=useState('Home'),[editing,setEditing]=useState(null)
 const root=useRef(null),trigger=useRef(null),field=useRef(null),request=useRef(0)
 useEffect(()=>{try{localStorage.setItem('meena-location',JSON.stringify(current));localStorage.setItem('meena-recent-locations',JSON.stringify(recent));localStorage.setItem('meena-addresses',JSON.stringify(addresses))}catch{/* Keep controls usable when browser storage is unavailable. */}},[current,recent,addresses])
 useEffect(()=>{
  if(!open)return
  const outside=e=>{if(!root.current?.contains(e.target))setOpen(false)}
  const key=e=>{if(e.key==='Escape'){setOpen(false);trigger.current?.focus()}}
  document.addEventListener('pointerdown',outside);document.addEventListener('keydown',key)
  return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',key)}
 },[open])
 useEffect(()=>()=>{request.current++},[])
 const choose=value=>{setCurrent(value);setRecent(items=>[value,...items.filter(x=>x!==value)].slice(0,5));setStatus('Location saved. Delivery availability is not yet connected; contact us to confirm coverage.')}
 const check=e=>{e.preventDefault();const value=input.trim();if(!(/^[1-9]\d{5}$/.test(value)||(/^[\p{L}][\p{L}\s,.'-]{1,79}$/u.test(value)))){setStatus('Enter a valid 6-digit PIN code or city name.');field.current?.focus();return}request.current++;setLocating(false);choose(value)}
 const gps=()=>{
  if(!navigator.geolocation){setStatus('Location access is unavailable. Please enter your PIN code or city.');return}
  const token=++request.current;setLocating(true);setStatus('Waiting for your browser’s location permission…')
  navigator.geolocation.getCurrentPosition(position=>{if(token!==request.current)return;setLocating(false);choose(`GPS: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);setStatus('GPS location selected. Enter a PIN code or city to identify your delivery area. Delivery coverage still needs confirmation.')},error=>{if(token!==request.current)return;setLocating(false);setStatus(error.code===1?'Location permission denied. Enter your PIN code or city instead.':'Could not detect your location. Please try again or enter a PIN code.')},{timeout:12000,maximumAge:60000})
 }
 return <div className="delivery-control" ref={root} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false)}}>
  <button ref={trigger} className="delivery" aria-label="Change delivery location" aria-expanded={open} aria-controls="delivery-popup" onClick={()=>setOpen(v=>!v)}><Pin/><span className="delivery-summary"><small>Deliver to</small><strong title={current}>{current}</strong></span><span className="delivery-chevron" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></span></button>
  <div id="delivery-popup" className={'delivery-popup '+(open?'is-open':'')} inert={!open} aria-hidden={!open}>
   <div className="location-current"><span className="location-circle"><Pin/></span><div><b>Delivering to</b><p>{current}</p></div><button onClick={()=>{setManage(false);field.current?.focus()}}>Change</button></div>
   <button className="gps-button" onClick={gps} disabled={locating}><span className="gps-symbol">◎</span><span><b>{locating?'Detecting location…':'Use My Current Location'}</b><small>Detect your current location</small></span><span aria-hidden="true">›</span></button>
   <div className="location-divider"><span>OR</span></div>
   <form onSubmit={check}><label htmlFor="delivery-query">Enter PIN Code or City</label><div className="location-input"><Pin/><input ref={field} id="delivery-query" value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter 6 digit PIN code or city name" maxLength={80} autoComplete="off"/></div><button className="check-delivery" type="submit">Check Delivery <span aria-hidden="true">→</span></button></form>
   {status&&<p className="location-status" role="status">{status}</p>}
   <div className="recent-heading"><b>Recent Locations</b>{recent.length>0&&<button onClick={()=>setRecent([])}>Clear All</button>}</div>
   {recent.length? <ul className="recent-locations">{recent.map(item=><li key={item}><button onClick={()=>choose(item)}><Pin/><span>{item}</span>{current===item&&<span className="location-selected" aria-label="Selected">✓</span>}</button></li>)}</ul>:<p className="location-empty">Your recently selected locations will appear here.</p>}
   <button className="manage-addresses" aria-expanded={manage} onClick={()=>setManage(v=>!v)}><span className="gps-symbol">⌂</span><span><b>Manage Addresses</b><small>View, edit or add new addresses</small></span><span aria-hidden="true">{manage?'⌃':'›'}</span></button>
   {manage&&<div className="address-manager"><p>Addresses are saved on this device.</p>{addresses.map((item,index)=><div className="saved-address" key={index}><button onClick={()=>choose(item.address)}><b>{item.label}</b><span>{item.address}</span></button><button aria-label={'Edit '+item.label} onClick={()=>{setLabel(item.label);setAddress(item.address);setEditing(index)}}>Edit</button><button aria-label={'Remove '+item.label} onClick={()=>setAddresses(items=>items.filter((_,i)=>i!==index))}>✕</button></div>)}<form onSubmit={e=>{e.preventDefault();if(!address.trim()||!label.trim())return;setAddresses(items=>editing===null?[...items,{label:label.trim(),address:address.trim()}]:items.map((item,i)=>i===editing?{label:label.trim(),address:address.trim()}:item));setEditing(null);setAddress('')}}><label htmlFor="address-label">Address label</label><input id="address-label" value={label} onChange={e=>setLabel(e.target.value)} required maxLength={30}/><label htmlFor="address-details">Full address with PIN code</label><textarea id="address-details" value={address} onChange={e=>setAddress(e.target.value)} required maxLength={300}/><button className="check-delivery">Save Address</button></form></div>}
  </div>
 </div>
}
