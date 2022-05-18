import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { getListUser } from '../../../functions/admin'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const AdminListUser = () => {
  const [users, setUsers] = (useState = [])
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => ({ state }))

  useEffect(() => {
    loadAllusers()
  }, [])

  const loadAllusers = () => {
    setLoading(true)
    getListUser()
      .then((res) => {
        console.log(res.data)
        setUsers(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  return (
    <>
      <div className="container-fluid">
        <div>
          <AdminNav />
        </div>
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Địa chỉ</th>
            </tr>
          </thead>
          <tbody>
            {users.map((c) => {
              return (
                <tr key={c._id}>
                  <td>{c.username}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.address}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminListUser
