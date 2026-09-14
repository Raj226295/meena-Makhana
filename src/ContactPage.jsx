import {useState} from 'react'
import './ContactPage.css'

const paths={
 headset:'M4 14v-2a8 8 0 0 1 16 0v2M4 13h4v7H4zM16 13h4v7h-4z',
 users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-1a3 3 0 0 0 0-6m1 11a4 4 0 0 1 4 4v2',
 shield:'M12 3c3 2.4 5.8 3.3 8 3.5V12c0 5.1-3.5 8-8 9.8C7.5 20 4 17.1 4 12V6.5C6.2 6.3 9 5.4 12 3Zm-3.5 9 2.2 2.2 4.8-5',
 leaf:'M5 20C1 11 8 4 20 3c0 12-5 18-13 17m-3 3L17 8',
 phone:'M5 3h4l2 5-3 2a17 17 0 0 0 6 6l2-3 5 2v4c0 2-2 3-4 2C9 19 5 15 3 7c-1-2 0-4 2-4Z',
 mail:'M3 5h18v14H3zM3 6l9 7 9-7',
 pin:'M12 22s7-6 7-13A7 7 0 0 0 5 9c0 7 7 13 7 13Zm0-10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z',
 clock:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 3v6l4 2',
 user:'M20 21a8 8 0 0 0-16 0m12-13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
 chat:'M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-5A8 8 0 1 1 21 15Z',
 tag:'m20 13-7 7L4 11V4h7l9 9ZM8 8h.01',
 send:'m22 2-7 20-4-9-9-4 20-7Zm-11 11L22 2',
 truck:'M2 7h13v11H2zM15 11h4l3 4v3h-7M6 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4',
 card:'M2 6h20v13H2zM2 10h20M6 15h4',
 box:'m3 6 9-4 9 4v12l-9 4-9-4V6Zm0 0 9 5 9-5M12 11v11',
 return:'M9 7 4 12l5 5M4 12h10a6 6 0 0 1 6 6',
 arrow:'M5 12h14m-5-5 5 5-5 5',
 facebook:'M14 8h4V3h-4c-4 0-6 2.5-6 6v3H4v5h4v5h5v-5h4l1-5h-5V9c0-.7.3-1 1-1Z',
 instagram:'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6-1h.01',
 youtube:'M22 12s0-4-1-6c-.5-1-1.5-1.5-2.5-1.7C16.5 4 12 4 12 4s-4.5 0-6.5.3C4.5 4.5 3.5 5 3 6c-1 2-1 6-1 6s0 4 1 6c.5 1 1.5 1.5 2.5 1.7C7.5 20 12 20 12 20s4.5 0 6.5-.3c1-.2 2-.7 2.5-1.7 1-2 1-6 1-6ZM10 9l5 3-5 3V9Z',
 whatsapp:'M20 11.6a8 8 0 0 1-11.8 7L3 20l1.4-5A8 8 0 1 1 20 11.6ZM8 7.5c1 4.6 3.5 7.1 8 8'
}
function Icon({name}){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]}/></svg>}

const support=[['headset','Quick Response','Within 24 hours'],['users','Dedicated Support','For all your queries'],['shield','Customer First','Your satisfaction matters'],['leaf','Pure & Honest','Just like our products']]
const details=[
 ['phone','Call Us',<span key="call"><a href="tel:+919876543210">+91 98765 43210</a><a href="tel:+911234556789">+91 12345 56789</a></span>,'Mon – Sat, 9:00 AM – 7:00 PM'],
 ['mail','Email Us',<span key="email"><a href="mailto:care@meenagreen.in">care@meenagreen.in</a><a href="mailto:info@meenagreen.in">info@meenagreen.in</a></span>,'We usually respond within 24 hours'],
 ['pin','Our Address',<span key="address">Meena Makhana Foods Pvt. Ltd.<br/>Purnea, Bihar – 854302, India</span>,<a key="directions" className="detail-link" href="https://maps.google.com/?q=Purnea+Bihar" target="_blank" rel="noreferrer">Get Directions <Icon name="arrow"/></a>],
 ['clock','Business Hours',<span key="hours">Monday – Saturday<br/>9:00 AM – 7:00 PM</span>,'Sunday – Closed']
]
const faqs=[['truck','Order & Delivery','Track order, delivery time'],['card','Payments','Payment methods, refunds'],['box','Products','Product details, availability'],['return','Returns & Cancellation','Return policy, cancellation']]

export default function ContactPage(){
 const [notice,setNotice]=useState('')
 const submit=e=>{e.preventDefault();e.currentTarget.reset();setNotice('Thank you! Your message has been received. We’ll get back to you soon.')}
 return <main className="contact-page">
  <section className="contact-hero" aria-labelledby="contact-title">
   <img src="/contact-hero-premium-v2.png" alt="A carved wooden bowl filled with premium roasted makhana, surrounded by fresh green leaves"/>
   <div className="contact-hero-copy"><small>WE’D LOVE TO HEAR FROM YOU</small><h1 id="contact-title">Get in Touch<br/>With Meena <em>Green</em></h1><p>Have a question, suggestion, or need support?<br/>Our team is always here to help you.</p>
    <div className="support-points">{support.map(([icon,title,text])=><div key={title}><span><Icon name={icon}/></span><p><b>{title}</b><small>{text}</small></p></div>)}</div>
   </div><div className="natural-badge"><Icon name="leaf"/><b>100%</b><span>Natural</span></div><p className="hero-note">Healthy Snacking<br/>Happier You <span>♡</span></p><p className="hero-tagline">PURE SNACKS. BETTER LIVING.</p>
  </section>

  <section className="contact-details" aria-label="Contact details">{details.map(([icon,title,body,footer])=><article key={title}><span className="detail-icon"><Icon name={icon}/></span><div><h2>{title}</h2><div className="detail-body">{body}</div><div className="detail-footer">{footer}</div></div></article>)}</section>

  <div className="contact-workspace">
   <section className="message-card"><header><span><Icon name="leaf"/></span><div><h2>Send us a Message</h2><p>Fill out the form below and we’ll get back to you soon.</p></div></header><form onSubmit={submit}>
    <div className="form-row"><label>Full Name <b>*</b><span><Icon name="user"/><input required name="name" autoComplete="name" placeholder="Enter your full name"/></span></label><label>Email Address <b>*</b><span><Icon name="mail"/><input required type="email" name="email" autoComplete="email" placeholder="Enter your email"/></span></label></div>
    <div className="form-row"><label>Mobile Number <b>*</b><span><Icon name="phone"/><input required type="tel" name="phone" autoComplete="tel" placeholder="Enter your mobile number"/></span></label><label>Subject <b>*</b><span><Icon name="tag"/><select required defaultValue=""><option value="" disabled>Select a subject</option><option>Product Enquiry</option><option>Order Support</option><option>Wholesale Enquiry</option><option>Feedback</option></select></span></label></div>
    <label>Your Message <b>*</b><span className="message-box"><Icon name="chat"/><textarea required maxLength="500" placeholder="Type your message here..."/></span></label>
    <button type="submit"><Icon name="send"/><span>Send Message</span><Icon name="arrow"/></button><p className="contact-notice" role="status">{notice}</p>
   </form></section>
   <section className="location-card"><header><span><Icon name="pin"/></span><div><h2>Our Location</h2><p>You are always welcome to visit us. Find us on the map.</p></div></header><div className="map-art"><iframe title="Meena Green location in Purnea, Bihar" src="https://www.google.com/maps?q=Purnea%2C%20Bihar&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><span><b>Purnea</b><small>Bihar 854302, India</small></span></div><a href="https://maps.google.com/?q=Purnea+Bihar" target="_blank" rel="noreferrer"><Icon name="pin"/>Open in Google Maps</a></section>
  </div>

  <section className="follow-card"><div className="follow-left"><div className="follow-copy"><span><Icon name="leaf"/></span><div><h2>Follow Us</h2><p>Stay connected for the latest updates, offers and healthy snacking tips.</p></div></div><div className="contact-socials"><a className="facebook" href="#facebook" aria-label="Facebook"><i><img src="/contact-facebook-icon.png" alt=""/></i><span><strong>Facebook</strong><small>@meenagreen</small></span></a><a className="instagram" href="#instagram" aria-label="Instagram"><i><img src="/contact-instagram-icon.png" alt=""/></i><span><strong>Instagram</strong><small>@meenagreen</small></span></a><a className="youtube" href="#youtube" aria-label="YouTube"><i><img src="/contact-youtube-icon.png" alt=""/></i><span><strong>YouTube</strong><small>Meena Green</small></span></a><a className="whatsapp" href="https://wa.me/919876543210" aria-label="WhatsApp"><i><img src="/contact-whatsapp-icon.png" alt=""/></i><span><strong>WhatsApp</strong><small>Chat with us</small></span></a></div></div><div className="community"><img src="/contact-community-makhana-v2.png" alt="A wooden bowl filled with premium roasted makhana and fresh green leaves"/><div><h3>Join Our<br/>Healthy Community</h3><p>Get tips, recipes, offers and more!</p><span className="community-swoop" aria-hidden="true"/></div><Icon name="leaf"/></div></section>

  <section className="contact-faq"><small>NEED QUICK HELP?</small><h2>Common Questions</h2><p>Find answers to the most common queries.</p><div>{faqs.map(([icon,title,text])=><button type="button" key={title} onClick={()=>setNotice(`${title} support: please contact care@meenagreen.in and our team will help you.`)}><span><Icon name={icon}/></span><p><b>{title}</b><small>{text}</small></p><i>›</i></button>)}</div></section>
 </main>
}
