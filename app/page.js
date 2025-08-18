"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      fetchUsers();
      setForm({ firstName: '', lastName: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      console.log('Item deleted successfully');
      fetchUsers();
      setForm({ firstName: '', lastName: '' });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='text-center'>

      <form onSubmit={handleSubmit}>
        <input
          className='m-1'
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />
        <input
          className='m-1'
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />
        <button className='primaryButton m-1' type="submit">Add User</button>
      </form>

      <br />
      {users &&
        <table className="table-auto border-collapse border border-white w-full">
          <thead>
            <tr>
              <th className='border border-white'>First Name</th>
              <th className='border border-white'>Last Name</th>
              <th className='border border-white'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className='border border-white'>{user.firstName}</td>
                <td className='border border-white'>{user.lastName}</td>
                <td className='border border-white'>
                  <Link href={`user/${user._id}`} className='primaryButton m-1'>View</Link>
                  <Link href={`user/edit/${user._id}`} className='primaryButton m-1'>Edit</Link>
                  <button className='secondaryButton m-1' onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}