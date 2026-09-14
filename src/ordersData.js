const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}

const demoOrders=[
 {id:'MG125634',date:'12 May 2025',amount:420,payment:'UPI',status:'Delivered',name:'Premium Makhana',variant:'200g | Plain',qty:2,image:'/meena-premium-cutout.png',times:['12 May\n10:24 AM','13 May\n04:18 PM','14 May\n09:12 AM','14 May\n02:36 PM']},
 {id:'MG125633',date:'08 May 2025',amount:699,payment:'Cash on Delivery',status:'Delivered',name:'Roasted Makhana',variant:'250g | Himalayan Salt',qty:1,image:'/makhana-perfect-purple.png',times:['08 May\n11:05 AM','09 May\n02:30 PM','10 May\n08:50 AM','10 May\n01:20 PM']},
 {id:'MG125612',date:'02 May 2025',amount:280,payment:'Online (Card)',status:'Shipped',name:'Pudina Makhana',variant:'100g',qty:1,image:'/makhana-perfect-yellow.png',times:['02 May\n09:14 AM','03 May\n04:40 PM','','']},
 {id:'MG125599',date:'25 Apr 2025',amount:360,payment:'UPI',status:'Processing',name:'Peri Peri Makhana',variant:'150g',qty:2,image:'/makhana-classic-red.jpg',times:['25 Apr\n06:32 PM','','','']}
]

const productMeta={'Meena Premium':['Premium Makhana','200g | Plain',2],'Perfect-2':['Pudina Makhana','100g',1],'Perfect Premium':['Roasted Makhana','250g | Himalayan Salt',1],'Meena Classic':['Peri Peri Makhana','150g',2]}
const normalize=order=>{const first=order.items?.[0];const meta=first?productMeta[first[0]]:null;return {...order,name:order.name||meta?.[0]||first?.[0]||'Premium Makhana',variant:order.variant||meta?.[1]||'250g',qty:order.qty||meta?.[2]||1,image:order.image||first?.[1]||'/meena-premium-cutout.png',date:(order.date||'').split(',')[0],times:order.times||[(order.dates?.[0]||'').replace(',','\n'),(order.dates?.[2]||'').replace(',','\n'),(order.dates?.[3]||'').replace(',','\n'),(order.dates?.[4]||'').replace(',','\n')]}}

export const getOrders=()=>read('meena-order-history',demoOrders).map(normalize)
