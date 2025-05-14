import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {getDoc,collection,db,doc} from '../services/firebase.js'

const Quiz = () => {
    const {id}=useParams();
    const [questions,setQuestions]=useState([])
    useEffect(()=>{
        const fetchQuestions=async()=>{
            try{
            const categoryDocRef= doc(db,'categories',id)
            const questionsSubcollectionRef=collection(categoryDocRef,'questions')
            const querySnapshot= await getDoc(doc(db,'categories'),id);
            const questionsData=querySnapshot.docs.map(doc=>(
                {
                    id:doc.id,
                    ...doc.data()
                }
            ))
            console.log('questions:'.questionsData)
            setQuestions(questionsData);
        }
            catch(error){
                console.error('could not fetch questions data',error);
            }
        }
        fetchQuestions();
    },[])
  return (
    <div>your id:{id}</div>
  )
}

export default Quiz;