import React, { useState } from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../../redux/reducers/authApiSlice';
import { setCredentials } from '../../../../redux/reducers/AuthSlice';
import style from './LoginUser.module.scss';

const LoginUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      navigate('/dashboardHome');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className={style.loginUser}>
      <div className={style.container}>
        <h2>Daxil ol</h2>
        <div className={style.loginForm}>
          <div className={style.inp}>
            <label>E-mail | Müştəri kodu</label>
            <input
              type="text"
              placeholder="email və ya müştəri kodunuz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={style.inp}>
            <label>Şifrə</label>
            <input
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <MdOutlineRemoveRedEye onClick={() => setShowPwd(!showPwd)} />
          </div>

          <p>Şifrənin bərpası</p>
          <button className={style.btn1} onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Gözləyin...' : 'DAXİL OL'}
          </button>
          {error && <p style={{ color: 'red' }}>Login səhvdir</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
