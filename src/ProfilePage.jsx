import {useRef,useState} from 'react'
import StoreNavbar from './StoreNavbar'
import AccountSidebar from './AccountSidebar'
import './ProfilePage.css'

const paths={
 user:<><circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
 mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
 phone:<path d="M6.5 3h3l1.5 5-2 1.5a16 16 0 0 0 5.5 5.5l1.5-2 5 1.5v3c0 2-1.6 3.6-3.6 3.5C9.8 20.4 3.6 14.2 3.1 6.6 3 4.6 4.5 3 6.5 3Z"/>,
 calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4m8-4v4M3 10h18"/></>,
 pin:<><path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></>,
 edit:<><path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"/><path d="m14 7 3 3"/></>,
 camera:<><path d="M5 8h3l1.5-2h5L16 8h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"/><circle cx="12" cy="14" r="3"/></>,
 check:<path d="m5 12 4 4L19 6"/>,chevron:<path d="m9 5 7 7-7 7"/>,
 lock:<><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
 device:<><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 19h6"/></>,
 trash:<><path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6"/></>,
 monitor:<><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></>
}
function Icon({name}){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>}
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
const write=(key,value)=>localStorage.setItem(key,JSON.stringify(value))
const defaults={name:'Meena Customer',email:'customer@meenagreen.in',phone:'+91 98765 43210',dob:'12 May 2000',gender:'Not specified',memberSince:'September 2026'}

export default function ProfilePage(){
 const initial={...defaults,...read('meena-profile',{})}
 const [profile,setProfile]=useState(initial),[draft,setDraft]=useState(initial),[photo,setPhoto]=useState(()=>localStorage.getItem('meena-profile-photo')||'')
 const [dialog,setDialog]=useState(null),[notice,setNotice]=useState(''),[passwords,setPasswords]=useState({current:'',next:'',confirm:''})
 const fileInput=useRef(null),wishlist=read('meena-wishlist',[]),notifications=read('meena-notifications',[])
 const notificationCount=Array.isArray(notifications)?notifications.filter(item=>item.unread).length:0
 const initials=(profile.name||defaults.name).split(/\s+/).slice(0,2).map(word=>word[0]).join('').toUpperCase()
 const toast=text=>{setNotice(text);window.setTimeout(()=>setNotice(''),2400)}
 const openEdit=()=>{setDraft({...profile});setDialog('edit')}
 const saveProfile=e=>{e.preventDefault();const next={...defaults,...draft};write('meena-profile',next);setProfile(next);setDialog(null);toast('Profile updated successfully.')}
 const upload=e=>{const file=e.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{setPhoto(reader.result);localStorage.setItem('meena-profile-photo',reader.result);toast('Profile photo updated.')};reader.readAsDataURL(file);e.target.value=''}
 const changePassword=e=>{e.preventDefault();if(passwords.next.length<8){toast('New password must be at least 8 characters.');return}if(passwords.next!==passwords.confirm){toast('New passwords do not match.');return}setPasswords({current:'',next:'',confirm:''});setDialog(null);toast('Password updated successfully.')}
 const signOutDevices=()=>{setDialog(null);toast('All other devices have been signed out.')}
 const deleteAccount=()=>{['meena-auth','meena-profile','meena-profile-photo'].forEach(key=>localStorage.removeItem(key));history.pushState({},'','/login');window.dispatchEvent(new PopStateEvent('popstate'));window.scrollTo({top:0})}
 const info=[['user','Full Name',profile.name],['mail','Email Address',profile.email,'Verified'],['phone','Phone Number',profile.phone||defaults.phone,'Verified'],['calendar','Date of Birth',profile.dob],['pin','Gender',profile.gender]]
 return <><StoreNavbar active="account" wishlistCount={wishlist.length||3} cartCount={Object.values(read('meena-cart',{})).reduce((sum,count)=>sum+count,0)||4}/><main className="profile-page-v2"><div className="profile-shell-v2"><AccountSidebar active="My Profile" wishlistCount={wishlist.length||3} notificationCount={notificationCount}/><section className="profile-main-v2">
  <header className="profile-heading-v2"><div><h1>My Profile</h1><p>View and update your personal information</p></div><button onClick={openEdit}><Icon name="edit"/>Edit</button></header>
  <article className="profile-summary-v2"><div className="profile-avatar-v2"><span>{photo?<img src={photo} alt="Profile"/>:initials}</span><button onClick={()=>fileInput.current?.click()} aria-label="Change profile photo"><Icon name="camera"/></button><input ref={fileInput} type="file" accept="image/*" onChange={upload} hidden/></div><div className="profile-summary-copy"><h2>{profile.name}</h2><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={`tel:${(profile.phone||defaults.phone).replace(/\s/g,'')}`}>{profile.phone||defaults.phone}</a></div><div className="profile-verified-v2"><i><Icon name="check"/></i><span><b>Verified Account</b><small>Your account is secure</small></span></div></article>
  <article className="profile-card-v2 profile-info-v2"><h2>Personal Information</h2><div>{info.map(([icon,label,value,badge])=><button key={label} onClick={openEdit}><i><Icon name={icon}/></i><span>{label}</span><strong>{value}</strong>{badge&&<em><Icon name="check"/>{badge}</em>}<Icon name="chevron"/></button>)}</div></article>
  <article className="profile-card-v2 profile-manage-v2"><h2>Manage Account</h2><div><button onClick={()=>setDialog('password')}><i><Icon name="lock"/></i><span><b>Change Password</b><small>Keep your account secure</small></span><Icon name="chevron"/></button><button onClick={()=>setDialog('devices')}><i><Icon name="device"/></i><span><b>Manage Devices</b><small>Check and manage your logged-in devices</small></span><Icon name="chevron"/></button><button onClick={()=>setDialog('delete')}><i><Icon name="trash"/></i><span><b>Delete Account</b><small>Permanently delete your account and data</small></span><Icon name="chevron"/></button></div></article>
 </section></div></main>
 {dialog==='edit'&&<Modal title="Edit Profile" onClose={()=>setDialog(null)}><form onSubmit={saveProfile} className="profile-form-v2"><div>{[['name','Full Name','text'],['email','Email Address','email'],['phone','Phone Number','tel'],['dob','Date of Birth','text'],['gender','Gender','text']].map(([key,label,type])=><label key={key}>{label}<input required type={type} value={draft[key]||''} onChange={e=>setDraft({...draft,[key]:e.target.value})}/></label>)}</div><Actions onCancel={()=>setDialog(null)} submit="Save Changes"/></form></Modal>}
 {dialog==='password'&&<Modal title="Change Password" onClose={()=>setDialog(null)}><form onSubmit={changePassword} className="profile-form-v2"><div>{[['current','Current Password'],['next','New Password'],['confirm','Confirm New Password']].map(([key,label])=><label key={key}>{label}<input required type="password" autoComplete={key==='current'?'current-password':'new-password'} value={passwords[key]} onChange={e=>setPasswords({...passwords,[key]:e.target.value})}/></label>)}</div><Actions onCancel={()=>setDialog(null)} submit="Update Password"/></form></Modal>}
 {dialog==='devices'&&<Modal title="Manage Devices" onClose={()=>setDialog(null)}><div className="profile-device-v2"><i><Icon name="monitor"/></i><span><b>Current device</b><small>Windows · Active now</small></span><em>Current</em></div><p className="profile-modal-note">If you don't recognize another login, sign out all other devices and change your password.</p><div className="profile-modal-actions"><button onClick={()=>setDialog(null)}>Close</button><button className="primary" onClick={signOutDevices}>Sign Out Other Devices</button></div></Modal>}
 {dialog==='delete'&&<Modal title="Delete Account" onClose={()=>setDialog(null)}><div className="profile-delete-warning"><Icon name="trash"/><p>This permanently removes your saved profile and signs you out. This action cannot be undone.</p></div><div className="profile-modal-actions"><button onClick={()=>setDialog(null)}>Cancel</button><button className="danger" onClick={deleteAccount}>Delete My Account</button></div></Modal>}
 {notice&&<div className="profile-toast-v2" role="status"><Icon name="check"/>{notice}</div>}</>
}

function Modal({title,onClose,children}){return <div className="profile-modal-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)onClose()}}><section className="profile-modal-v2" role="dialog" aria-modal="true" aria-labelledby="profile-modal-title"><header><h2 id="profile-modal-title">{title}</h2><button onClick={onClose} aria-label="Close dialog">×</button></header>{children}</section></div>}
function Actions({onCancel,submit}){return <div className="profile-modal-actions"><button type="button" onClick={onCancel}>Cancel</button><button className="primary">{submit}</button></div>}
