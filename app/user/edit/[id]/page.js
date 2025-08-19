'use client'
import { useEffect, useState } from "react"
import { useRouter, useParams } from 'next/navigation'

export default function EditUser() {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: ""
    })

    async function getUserById(id) {
        const res = await fetch(`/api/users/${id}`);
        const data = await res.json();
        setLoading(false);
        setFormData(data);
    }

    useEffect(() => {
        getUserById(params.id)
    }, [params])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await fetch(`/api/users/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if(result.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            {loading ? <div>Loading......</div> :
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="columns-2">
                            <div><strong>First Name:</strong></div>
                            <input
                                name="firstName"
                                value={formData?.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="columns-2">
                            <div><strong>Last Name:</strong> </div>
                            <input
                                name="lastName"
                                value={formData?.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="primaryButton">Save</button>
                    </form>
                </>
            }
        </>
    )
}