import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../redux/reducers/AdminSlice';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.admin);

  const handleSubmit = (e) => {
    e.preventDefault();
   dispatch(loginAdmin({ email, password }))
  .unwrap()
.then((data) => {
  console.log('Login uğurlu, data:', data);

  // ✅ Token-i yadda saxla
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  navigate('/admin/panel');
})
  .catch((error) => {
    console.log('Login xəta:', error);
  });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Girişi</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Şifrə" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Giriş edilir...' : 'Daxil ol'}
      </button>
    </form>
  );
};

export default AdminLogin;
