import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../../redux/reducers/authApiSlice';
import { setCredentials } from '../../../../redux/reducers/authSlice';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import ExpargoMenu from '../expargoMenu/ExpargoMenu';
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
      const response = await login({ email, password }).unwrap();
      const { token, user } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setCredentials({ user, token }));

      navigate("/dashboardHome");
    } catch (err) {
      console.error("Login error:", err?.data?.message || err.message);
    }
  };

  return (
    <div className={style.loginUser}>
      <ExpargoMenu />
      <div className={style.loginUserContainer}>
        <h3 onClick={() => navigate('/login')}><IoIosArrowBack /> Daxil ol</h3>
        <div className={style.container}>
          <div className={style.img}>
            <img src="https://dash.expargo.com/assets/img/expargo_circle.svg" alt="" />
          </div>
          <h2>Daxil ol</h2>
          <div className={style.loginForm}>
            <div className={style.inp}>
              <label>E-mail | Müştəri kodu</label>
              <input
                type="text"
                placeholder="email və ya müştəri kodunuz"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className={style.inp}>
              <label>Şifrə</label>
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <MdOutlineRemoveRedEye onClick={() => setShowPwd(prev => !prev)} />
            </div>
            <p>Şifrənin bərpası</p>
            <button className={style.btn1} onClick={handleLogin} disabled={isLoading}>
              {isLoading ? 'Gözləyin...' : 'DAXİL OL'}
            </button>
            <button className={style.btn2} onClick={() => navigate('/signup')}>
              QEYDİYYAT
            </button>
            <button onClick={() => navigate('/admin/login')}>Admin</button>
            {error && <p style={{ color: 'red' }}>Login səhvdir</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
