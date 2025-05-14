import React, { useEffect, useState } from 'react'

import {db, collection, getDocs} from '../services/firebase'
import { Header } from '../components/Header';
import CategoryCard from '../components/categoryCard';
export const Categories = () => {
    const [categories,setCategories]= useState([]);

    useEffect(()=>{
      const fetchCategories=async()=>{
        try{
          const querySnapshot= await getDocs(collection(db,'categories'));
          const categorisData=querySnapshot.docs.map(doc=>(
            {
              id:doc.id,
              ...doc.data()
            }
            
          ));
          setCategories(categorisData);
          console.log('categories fetched successfully',categorisData)
        }
        catch(error){
          console.error('could not fetch categories',error);
        }
      }
      fetchCategories();
    },[])
  return (
    <div>
      <div className=''>
        <Header />
      </div>
      <div className='m-6 '>
          <h2 className='text-center text-4xl font-medium text-gray-700 m-6'>Choose a category to unleash your knowledge!</h2>
          <div className='flex lg:flex-row flex-col gap-4 items-center '>
              {categories.map(category=>(
                <CategoryCard key={category.id} id={category.id} name={category.name} description={category.description} />
              ))}
          </div>
      </div>
    </div>
  )
}
