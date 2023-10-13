'use client'
import Image from 'next/image'
import ReactStars from 'react-stars'
import {useState, useEffect, useCallback } from 'react';

export default function Home() {
  const[data,SetData]=useState([])
/* If the category i'm selecting matches any object's category inside the array, all the objects that are matched will be stored inside the list arra.   */

  const SelectingCategory =  useCallback((categoryname)=>{
    console.log('Selected Category:', categoryname);
    const filteredlist = data.filter(lists => categoryname === lists.category);
    SetList(filteredlist);
    setChangeCategorieBg(categoryname)
  },[data])

  /* Fetching The data from the API with the  useEffect. */
  useEffect(() => {
    fetch("https://file.notion.so/f/f/f9a09310-af94-4993-bbca-d051d7b65e1d/63e6d4c9-1412-45e9-903a-f139e889bc5d/dataset.json?id=b435b37b-cba5-4374-875f-332e895a872c&table=block&spaceId=f9a09310-af94-4993-bbca-d051d7b65e1d&expirationTimestamp=1697205600000&signature=SjO14SKraEacfc-wFH7pPi0dSgVWLr_aLQzJe7BDLdE&downloadName=dataset.json")
    .then(response => response.json())
    .then(data =>
      {
        SetData(data);
        const uniquecategories = [... new Set(data.map(categoryname=>categoryname.category))]
        setCategories(uniquecategories)
      });
  }, []);

  /* Storing the Array's categories  */

  const[categories,setCategories]=useState([])
  useEffect(() => {
    SelectingCategory(categories[0]);
  }, [categories, SelectingCategory]);
  /* list is an array containing objects that are returned when filtering the array by category and checking if they match the selected category. */

  const[list,SetList]=useState([])

  /* this is for chaning the background when i'm selecting the category */

  const[changecategoriebg,setChangeCategorieBg]=useState(null)




  return (

    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1 className='text-[#484848] text-3xl'>Misawg New Arrivals</h1>
      <p className='text-[#8A8A8A] mt-[1rem]'>Stay Ahead of the Curve with Miswag's Fresh Arrivals</p>
      <div className='w-[50rem] h-[5rem] flex flex-row justify-center items-center mt-[3rem]'>
        {categories.map((categorie,index) => (
          <button key={index} onClick={()=>SelectingCategory(categorie)} className={`w-[207px] h-[56px] flex justify-center items-center rounded-[10px] ${changecategoriebg === categorie ? 'bg-[#000000]' : 'bg-[#FAFAFA]'}  ml-[1.5rem]`}>
            <h1 className={`${changecategoriebg === categorie ? 'text-white' : 'text-[#8A8A8A]' }   text-[16px] font-normal`}>{categorie}</h1>
            </button>
        ))}
      </div>
      <div className='w-[50rem] h-full grid grid-cols-3 grid-rows-3 items-center gap-5 mt-[3rem] '>

{list.map(listitems=>(
 <div key={listitems.id} className='w-[257px] h-[409px] rounded-[10px] bg-white drop-shadow-xl p-[2rem] flex flex-col  '>
  <Image src={listitems.image} width={209} height={244} alt='' />
<h1 className='text-[15px] text-[#484848]' >{listitems.title['EN']}</h1>
<div className='w-full flex flex-row justify-between items-center'>
  <h1 className='text-[#8A8A8A]'>{listitems.brand}</h1>
  <ReactStars 
count={5} 
value={listitems.rating}
size={20} 
color2={'#FCA120'}
edit={false}
 />
</div>
<h2 className='text-[#D03947] line-through mt-[0.2rem]'>{listitems.price["value"]} {listitems.price["currency"]}</h2>
<div className='w-full flex flex-row justify-between items-center  mt-[0.5rem]'>
<h2 className='text-[#484848] '>{listitems.price["original_value"]}</h2>
<div className='w-[5rem] h-full flex flex-row justify-center items-center relative '>
{listitems.colors.slice(0, 2).map((listitemscolor, index) => (
  <div
    key={index}
    className={`w-[1.6rem] h-[1.6rem] rounded-full ${index === 1 ? 'absolute z-10' : 'z-0'}`}
    style={{ backgroundColor: listitemscolor }}
  ></div>
))}
{listitems.colors.length > 2 && (
  <div className='w-[1.6rem] h-[1.6rem] rounded-full bg-[#FCFCFC] border-[0.1rem] border-[#1E1E1E42] flex justify-center items-center text-[0.8rem] z-50 '>
    +{listitems.colors.length - 2}
  </div>
)}

</div>

</div>
</div>
 
))}
  </div>


      
     
    </main>
  )
}
