import React from 'react';
import style from './Profile.module.scss';
import { CiUser } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import ExpargoMenu from '../../loginPage/sections/expargoMenu/ExpargoMenu';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className={style.profile}>
      <ExpargoMenu />
      <div className={style.container}>
        <div className={style.user}>
          <CiUser />
          <h2>{user?.name} {user?.surname}</h2>
        </div>

        <div className={style.inp}>
          <span>ID:{user.customId}</span>
          <h5>Xarici ünvanlarda istifadə etmək zəruridir.</h5>
        </div>
        <div className={style.inp}><h5>Cari filial</h5><IoIosArrowForward /></div>
        <div
          className={style.inp}
          onClick={() => navigate('/profile/details')}
        >
          <h2>Şəxsi məlumatlar</h2>
          <IoIosArrowForward />
        </div>
        <div className={style.inp}  onClick={() => navigate('/profile/password')} ><h2>Şifrə  dəyişikliyi</h2><IoIosArrowForward /></div>
        <div className={style.inp}  onClick={() => navigate('/profile/payments-all')} ><h2>Ödənişlər</h2><IoIosArrowForward /></div>
        <div className={style.inp}><h2>Xidmət tarixçəsi</h2><IoIosArrowForward /></div>
        <div className={style.inp}><h2>Hesabı sil</h2><IoIosArrowForward /></div>
        <div className={style.inp}><h2>Çıxış et</h2><IoIosArrowForward /></div>
      </div>
    </div>
  );
}

export default Profile;
