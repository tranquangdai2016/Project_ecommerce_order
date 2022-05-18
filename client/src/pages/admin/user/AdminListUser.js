import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { getListUser } from '../../../functions/admin'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const AdminListUser = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => ({ state }))

  useEffect(() => {
    loadAllusers()
  }, [])

  const loadAllusers = () => {
    setLoading(true)
    getListUser()
      .then((res) => {
        setUsers(res.data.user)
        console.log(res.data.user)
        console.log(users)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <AdminNav />
          </div>
          <div className="col-10">
            {' '}
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminListUser
