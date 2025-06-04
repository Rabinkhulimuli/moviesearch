import { useContext, useEffect, useState } from "react"
import MovieCard, { type movieType } from "./movielist/MovieCard"
import { MovieContext } from "./moviecontext/MovieContext"


export default function FavouriteList() {
    const [saveData,setSaveData]= useState([])
    const{isFavourite}= useContext(MovieContext)
    
    useEffect(()=> {  
    const data= localStorage.getItem("fav")
        setSaveData(data?JSON.parse(data):[])
        console.log("fav effect running")
        
    },[isFavourite])
   
    

    console.log("fav local data",saveData)
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-between">
        {saveData.length>0? saveData.map((eh:movieType)=> {
            return <div key={eh.imdbID} > <MovieCard movieData={eh} activeFav={`${eh.imdbID}`} /> </div>
        }): <div>favourite list is empty </div>}

    </div>
  )
}
