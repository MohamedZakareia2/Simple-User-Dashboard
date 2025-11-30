import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 5

 useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err))
  }, [])


  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
  const totalPages = Math.ceil(filteredUsers.length / perPage)
  const currentUsers = filteredUsers.slice((page-1)*perPage, page*perPage)

  return (
    <div className="dashboard-container">
      <input 
        className="search" 
        placeholder="Search by name" 
        value={search} 
        onChange={(e)=>setSearch(e.target.value)} 
      />
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Company</th><th>View</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(u=>(
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.company.name}</td>
              <td><a className="view-button" href={`/user/${u.id}`}>View</a></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Previous</button>
        <button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  )
}
