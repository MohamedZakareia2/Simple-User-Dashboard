import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function UserDetails() {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = useState(null)

  useEffect(()=>{
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(res=>res.json())
        .then(data=>setUser(data))
        .catch(err=>console.error(err))
    }
  }, [id])

  if(!user) return <p>Loading...</p>

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Company: {user.company.name}</p>
      <p>Website: {user.website}</p>
    </div>
  )
}
