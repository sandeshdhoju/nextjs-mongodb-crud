'use client'
import { useEffect, useState } from "react"
import { useParams } from 'next/navigation'

export default function User() {
    const params = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)

    async function getUserById(id) {
        const res = await fetch(`/api/users/${id}`);
        const data = await res.json();
        setData(data);
        setLoading(false)
    }

    useEffect(() => {
        getUserById(params.id)
    }, [params])




    return (
        <>
            {loading ? <div>Loading......</div> :
                <>
                    <div className="columns-2">
                        <div><strong>First Name:</strong></div>
                        <div>{data?.firstName}</div>
                    </div>
                    <div className="columns-2">
                        <div><strong>Last Name:</strong> </div>
                        <div>{data?.lastName}</div>
                    </div>
                    {data?.createdAt &&
                        <div className="columns-2">
                            <div><strong>Created At:</strong></div>
                            <div>{data.createdAt}</div>
                        </div>
                    }
                    {
                        data?.editedAt &&
                        <div className="columns-2">
                            <div><strong>Edited At:</strong></div>
                            <div>{data.editedAt}</div>
                        </div>
                    }
                </>
            }
        </>
    )
}