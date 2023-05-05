import { useEffect, useState } from 'react'
import { getUsers, User } from './api';

import './App.css'

function App() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers('//localhost:3003');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error during fetching data:", error);
      }
    };

    fetchData();
  }, []);  // the empty array makes this run only on mount


  return (
    <>
      <h1>Pact POC</h1>
      <div className="card">
        <p>Users:</p>
        <table className='users'>
          <thead>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
          </thead>
          <tbody>
            {data.map(user => {
              return (
                <tr>
                  <td>{user.id}</td> 
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
