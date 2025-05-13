import React, { useEffect, useState } from 'react'

import {db, collection, getDocs} from '../services/firebase'
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
        }
        catch(error){
          console.error('could not fetch categories',error);
        }
      }
      fetchCategories();
    },[])
  return (
    <div>
      {categories.map(category=>(
        <h1>{category.name}</h1>
      ))}
    </div>
  )
}
