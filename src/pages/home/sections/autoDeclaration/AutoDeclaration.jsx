import React from 'react';
import style from './AutoDeclaration.module.scss'
import digital from '../images/digital.svg'
import gelal from '../images/gelal.svg'
import icaze from '../images/icaze.svg'
import arrow1 from '../images/arrow1.svg'
import arrow2 from '../images/arrow2.svg'
import digitalogin from  '../images/digitallogin.svg'
import { MdNotStarted } from "react-icons/md";
const AutoDeclaration = () => {
  return (
    <div className={style.autoDeclaration}>
      <div className={style.container}>
        <div className={style.text}>
          <h2>Avtobəyan Xidməti</h2>
          <p>Bağlamalarınızın Smart Customs-da avtomatik bəyan olunması üçün xidmətə elə indi qoşulun!
            Vaxtınıza qənaət edin – bağlamalarınız avtomatik bəyan olunsun!</p>
        </div>
        <div className={style.cards}>
          <div className={style.card}>
          <img src={digital} alt="digital login" />
            <h3>Digital Login ilə daxil ol</h3>
          </div>
          <img src={arrow2} alt="" />
              <div className={style.card}>
            <img src={icaze} alt="expargo-ya icaze" />
            <h3>Expargo-ya icazə ver</h3>
          </div>
          <img src={arrow1} alt="" />   
           <div className={style.card}>
            <img src={gelal} alt="gel Al menteqesi" />
            <h3>Expargo "Gəl-Al" nöqtəsi seç</h3>
          </div>

        </div>
        <div className={style.login}>
          <button><img src={digitalogin} alt="" /></button>
           <p>Düyməyə klikləyərək icazə prosesini tamamla və avtobəyana qoşul!</p>
           <a href="https://www.youtube.com/shorts/htlwBhSXin8" target='_blank'><MdNotStarted />  Video-təlimatı izlə</a>
           <div className={style.alert}>
            

           </div>
        </div>

      </div>

    </div>
  );
}

export default AutoDeclaration;
