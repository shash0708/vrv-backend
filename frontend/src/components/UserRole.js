import axios from 'axios';
import { useEffect, useState } from 'react';

const useUserRole = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/register', { withCredentials: true });
        setRole(response.data.role); // Backend sends user's role
      } catch (error) {
        console.error('Error fetching role:', error.response?.data?.message);
      }
    };

    fetchRole();
  }, []);

  return role;
};

export default useUserRole;
