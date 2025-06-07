import React, { useEffect, useState } from 'react'

import {db, collection, getDocs} from '../services/firebase'

import CategoryCard from '../components/categoryCard';
export const Categories = () => {
    const [categories,setCategories]= useState([]);

    useEffect(()=>{
      const fetchCategories=async()=>{
        try{
          const querySnapshot = await getDocs(collection(db, 'categories'));

          
          const categorisData=querySnapshot.docs.map(doc=>(
            {
              id:doc.id,
              ...doc.data()
            }
            
          ));
          setCategories(categorisData);
       
        }
        catch(error){
          console.error('could not fetch categories',error);
        }
      }
      fetchCategories();
    },[])
  return (
    <div>
      
      <div className='lg:m-6 '>
          <h2 className='text-center text-4xl font-medium text-cyan-950 m-6'>Choose a category to unleash your knowledge!</h2>
          <div className='flex lg:flex-row flex-col gap-4 items-center '>
              {categories&&categories.length>0&&categories.map(category=>(
                <CategoryCard key={category.id} id={category.id} name={category.name} description={category.description} />
              ))}
          </div>
      </div>
    </div>
  )
}
