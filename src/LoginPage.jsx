import {useState} from 'react'
import StoreNavbar from './StoreNavbar'

function Icon({name}){const paths={mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,lock:<><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v2"/></>,eye:<><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,eyeOff:<><path d="m3 3 18 18M10.6 6.2A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-2.1 2.7M6.2 6.2C3.6 8 2 12 2 12s4 6 10 6a9.8 9.8 0 0 0 4.1-.9M9.9 9.9a3 3 0 0 0 4.2 4.2"/></>,arrow:<><path d="M4 12h15M14 6l6 6-6 6"/></>};return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>}
function GoogleIcon(){return <span className="google-g" aria-hidden="true">G</span>}

export default function LoginPage(){
 const [showPassword,setShowPassword]=useState(false)
 const [remember,setRemember]=useState(true)
 const [notice,setNotice]=useState('')
 const submit=e=>{e.preventDefault();const identifier=e.currentTarget.elements.username.value.trim();let saved={};try{saved=JSON.parse(localStorage.getItem('meena-profile'))||{}}catch{saved={}};const next={name:saved.name||'Meena Customer',email:identifier.includes('@')?identifier:(saved.email||'customer@meenagreen.in'),phone:identifier.includes('@')?(saved.phone||''):identifier,dob:saved.dob||'12 May 2000',gender:saved.gender||'Not specified',memberSince:saved.memberSince||'September 2026'};localStorage.setItem('meena-profile',JSON.stringify(next));localStorage.setItem('meena-auth',JSON.stringify({loggedIn:true}));history.pushState({},'','/profile');window.dispatchEvent(new PopStateEvent('popstate'))}
 return <><StoreNavbar/><main className="login-page">
  <a className="login-home" href="/" aria-label="Back to Meena Green home"><img src="/meena-logo-premium.png" alt="Meena Green"/></a>
  <section className="login-card" aria-labelledby="login-title">
   <h1 id="login-title">Login</h1>
   <form onSubmit={submit}>
    <label className="login-field"><Icon name="mail"/><input name="username" type="text" required autoComplete="username" placeholder="Email or Mobile Number" aria-label="Email or mobile number"/></label>
    <label className="login-field"><Icon name="lock"/><input type={showPassword?'text':'password'} required autoComplete="current-password" placeholder="Password" aria-label="Password"/><button type="button" onClick={()=>setShowPassword(value=>!value)} aria-label={showPassword?'Hide password':'Show password'}><Icon name={showPassword?'eye':'eyeOff'}/></button></label>
    <div className="login-options"><label className="remember"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/><span><b>✓</b></span>Remember me</label><button type="button" className="login-link" onClick={()=>setNotice('Password reset service will be available soon.')}>Forgot Password?</button></div>
    <button className="login-submit" type="submit"><span>Login</span><Icon name="arrow"/></button>
   </form>
   <div className="login-or"><span/>OR<span/></div>
   <button className="google-login" onClick={()=>setNotice('Google login service will be available soon.')}><GoogleIcon/>Continue with Google</button>
   <p className="create-account">Don’t have an account? <a href="/signup">Create Account</a></p>
   <p className="login-notice" role="status">{notice}</p>
  </section>
 </main></>
}
