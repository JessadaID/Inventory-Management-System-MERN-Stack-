const logout = async () => {
  const response = await fetch('http://localhost:3000/api/users/logout', {
    method: 'POST',
    credentials: 'include',
  });
  
  const data = await response.json();
  return data;
};

export default logout;