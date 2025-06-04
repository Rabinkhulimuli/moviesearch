import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function SingleMovie() {
  const [error,setError]=useState("")
  const[loading,setLoading]=useState(false)
    const {id}= useParams()
    useEffect(()=> {
      if(!id){
        return setError("movie doesnt exist")
      }
      const getMovie=async()=> {
        try{
          setLoading(true)
          const res= await fetch(`http://www.omdbapi.com/?i=${id}&plot=full`)
          if(!res.ok){
            setError("response not found")
          }
          setLoading(false)
        }catch(err){
          console.log(err)
        }finally{
          setLoading(false)
        }
      }
      getMovie()
    },[id])
  return (
    <div>SingleMovie {error}
    <div>
      {loading&& <div>loading</div>}
    </div>
    </div>
  )
}
