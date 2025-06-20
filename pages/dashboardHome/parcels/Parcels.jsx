import React from 'react';
import style from './Parcels.module.scss'
import { IoIosArrowBack } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import ExpargoMenu from '../../loginPage/sections/expargoMenu/ExpargoMenu';

const Parcele = () => {
  return (
    <div className={style.parcels}>
      <ExpargoMenu/>
      <div className={style.container}>
            <h3><IoIosArrowBack />Bağlamalarım <IoInformationCircleOutline /></h3>
      </div>
    </div>
  );
}

export default Parcele;
