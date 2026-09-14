function Bar({className=''}){
 return <span className={`block rounded-full bg-[#dfe8dc] ${className}`}/>
}

export default function ProductCardSkeleton({variant='home'}){
 if(variant==='catalog')return <article aria-hidden="true" className="flex min-w-0 animate-pulse flex-col overflow-hidden rounded-[18px] border border-[#edf0e9] bg-white shadow-[0_8px_28px_#27452f0f]">
  <div className="h-[220px] w-full bg-[#e7eee4]"/>
  <div className="flex flex-1 flex-col px-[14px] pb-[14px] pt-[6px]">
   <Bar className="mb-[10px] mt-2 h-5 w-3/5"/>
   <div className="h-11 rounded-[9px] bg-[#e7eee4]"/>
   <div className="mt-2 h-9 rounded-[9px] bg-[#eee5f3]"/>
   <Bar className="mb-2 mt-[14px] h-7 w-2/5"/>
   <Bar className="mb-[14px] h-3 w-3/5"/>
   <Bar className="mb-[11px] h-7 w-1/2 rounded-[8px] bg-[#f3e8da]"/>
   <div className="mt-auto h-12 rounded-[13px] bg-[#dfe8dc]"/>
  </div>
 </article>

 return <article aria-hidden="true" className="relative flex animate-pulse flex-col overflow-hidden rounded-[24px] border border-[#fff9e055] bg-transparent px-5 pb-[18px] pt-16 shadow-[0_8px_22px_#1639230b] max-[500px]:rounded-[18px] max-[500px]:px-3 max-[500px]:pb-[14px] max-[500px]:pt-[58px]">
  <div className="mb-2 h-[280px] w-full rounded-[18px] bg-[#e3eadf] max-[500px]:h-[190px]"/>
  <Bar className="mb-[14px] mt-2 h-5 w-3/5 max-[500px]:h-[17px]"/>
  <div className="h-11 rounded-[10px] bg-[#e3eadf]"/>
  <Bar className="mb-2 mt-4 h-7 w-2/5"/>
  <Bar className="mb-[14px] h-3 w-3/5"/>
  <div className="mt-auto h-12 rounded-[13px] bg-[#d9e4d5]"/>
 </article>
}
