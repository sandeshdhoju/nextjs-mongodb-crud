'use client'
import { useEffect, useState } from "react"
import { useParams } from 'next/navigation'

export default function User() {
    const params = useParams();
    const [data,setData] = useState();
    const [loading, setLoading] = useState(true)

    async function getUserById(id) {
        const res = await fetch(`/api/users/${id}`);
        const data = await res.json();
        setData(data);
        setLoading(false)
    } 

    useEffect(()=>{
        getUserById(params.id)
    },[params])

    


    return(
        <div>
            {loading ? <div>Loading......</div> : 
            <>
            <div><strong>First Name:</strong> {data?.firstName}</div>
            <div><strong>Last Name:</strong> {data?.lastName}</div>
            </>}
            </div>
    )
}

