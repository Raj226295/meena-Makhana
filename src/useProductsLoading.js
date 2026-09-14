import {useEffect,useMemo,useState} from 'react'

export default function useProductsLoading(products){
 const key=useMemo(()=>products.map(product=>product.image).join('|'),[products])
 const [loadedKey,setLoadedKey]=useState('')
 useEffect(()=>{
  let active=true
  const images=products.map(product=>new Promise(resolve=>{
   const image=new Image()
   image.onload=image.onerror=resolve
   image.src=product.image
  }))
  Promise.all(images).then(()=>{if(active)setLoadedKey(key)})
  return()=>{active=false}
 },[key,products])
 return loadedKey!==key
}
