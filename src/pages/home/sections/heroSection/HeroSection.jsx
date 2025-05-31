import React from 'react';
import style from './HeroSection.module.scss'
import trendyol from '../images/trendyol.svg'
import temu from '../images/temu.svg'
const HeroSection = () => {
  return (
    <div className={style.heroSection}>
      <div className={style.container}>
        <div className={style.textContainer}>
           <h1>Sürətli və Sərfəli Karqo</h1>
           <p>Trendyol və TEMU Gəl Al nöqtələri – Beynəlxalq və ölkədaxili çatdırılma xidmətinin ən etibarlı ünvanı. Türkiyə və Amerikadan olan sifarişlərinizi Expargo ilə rahatlıqla həyata keçirə bilərsiniz. Sərfəli qiymətlər, geniş xidmət şəbəkəsi və yüksək keyfiyyətlə Expargo həmişə sizin yanınızdadır!</p>
           <div className={style.app}>
            <img src={trendyol} alt="trendyol" />
            <img src={temu} alt="temu" />
            <span>Rəsmi Trendyol və TEMU tərəfdaşı</span>
           </div>
           <div className={style.btn}>
            <button className={style.btn1}>Qeydiyyat</button>
            <button className={style.btn2}>Daxil Ol</button>
           </div>
        </div>
        <div className={style.calculator}>
            <h2>Kalkulyator</h2>
            <div className={style.country}>
               <label htmlFor="ölkə">Ölkə</label>
               <select name="mənətəqələr" id="">
                  <option value="">ABŞ</option>
                  <option value="">Türkiyə</option>
                  <option value="">Iğdır</option>
               </select>
            </div>
            <div className={style.precinct}>
              <label htmlFor="məntəqə">Məntəqə</label>
              <select name="məntətqələr" id="">
                <option value=""> Gənclik Filialı </option>
                <option value=""> 28 May Filialı</option>
                <option value="">Həzi Aslanov Filialı</option>
                <option value="">İçərişəhər Filialı</option>
                <option value=""> Nərimanov Filialı</option>
                <option value="">Xətai Filialı</option>
                <option value="">Metro 8 Noyabr T/M</option>
                <option value="">Əcəmi Filialı</option>
                <option value="">Əhmədli Filialı</option>
                <option value="">Elmlər - Statistika Filialı</option>
                <option value="">Sumqayıt Filialı</option>
                <option value="">Bakıxanov Filialı</option>
                <option value="">İnşaatçılar Filialı</option>
                <option value="">Xırdalan Filialı</option>
                <option value="">Albalılıq Filialı</option>
                <option value="">20 Yanvar Filialı</option>
                <option value="">Sədərək Filialı</option>
                <option value="">Neftçilər Filialı</option>
                <option value="">Azadlıq Filialı</option>
                <option value="">Gəncə Filialı</option>
                <option value="">Q.Qarayev Filialı</option>
                <option value="">Zaqatala Filialı</option>
                <option value="">Naxçıvan Filialı</option>
                <option value="">Lənkəran Filialı</option>
                <option value="">Mərdəkan - T/M</option>
                <option value="">Bayıl T/M</option>
                <option value="">Masazır - T/M</option>
                <option value="">Şüvəlan T/M</option>
                <option value="">Hövsan - T/M</option>
                <option value="">Yeni Günəşli T/M</option>
                <option value="">Badamdar T/M</option>
                <option value="">Zabrat T/M</option>
                <option value="">Əmircan T/M</option>
                <option value="">Buzovna T/M</option>
                <option value="">Yeni Ramana - T/M</option>
                <option value="">H.Zeynalabdin T/M</option>
                <option value="">9-cu Mikrorayon T/M</option>
                <option value="">Binə Qəsəbəsi T/M </option>
                <option value="">Xırdalan - AAAF Park T/M</option>
                <option value="">Qaraçuxur T/M</option>
                <option value="">Pirallahı T/M</option>
                <option value="">Məmmədli T/M</option>
                <option value="">Sabunçu T/M</option>
                <option value="">Binəqədi T/M</option>
                <option value="">Lökbatan T/M</option>
                <option value="">Mehdiabad T/M</option>
                <option value="">NZS T/M</option>
                <option value="">Keşlə T/M</option>
                <option value="">Yeni Suraxanı - T/M</option>
                <option value="">Zığ T/M</option>
                <option value="">Yeni Yaslamal T/M</option>
                <option value="">Gülüstan T/M (Gəncə)</option>
                <option value="">Müşfiqabad T/M</option>
                <option value="">Maştağa - T/M </option>
                <option value="">Gəncə prospekti T/M</option>
                <option value="">Sumqayıt 18 mkr T/M</option>
                <option value="">Qəbələ - T/M </option>
                <option value="">Şəki - T/M</option>
                <option value="">Yeni Gəncə T/M</option>
                <option value="">Xaçmaz - T/M</option>
                <option value="">Qazax - T/M</option>
                <option value="">Ağstafa T/M</option>
                <option value="">Quba - T/M</option>
                <option value="">Balakən T/M</option>
                <option value="">Mingəçevir T/M</option>
                <option value="">Ağdaş T/M</option>
                <option value="">Astara T/M</option>
                <option value="">Salyan T/M</option>
                <option value="">Masallı - T/M</option>
                <option value="">İsmayıllı - T/M</option>
                <option value="">Tovuz T/M</option>
                <option value="">Şəmkir T/M</option>
                <option value="">Füzuli - T/M</option>
                <option value="">Bərdə - T/M</option>
                <option value="">Cəlilabad T/M</option>
                <option value="">Şirvan T/M</option>
                <option value="">Goranboy T/M</option>
                <option value="">Gədəbəy T/M</option>
                <option value="">Göyçay T/M</option>
                <option value="">Qax T/M</option>
                <option value="">Ağsu T/M</option>
                <option value="">Beyləqan T/M</option>
                <option value="">Şabran T/M</option>
                <option value="">Ağdam T/M</option>
                <option value="">Ağcabədi T/M</option>
                <option value="">Biləsuvar T/M</option>
                <option value="">Hacıqabul T/M</option>
                <option value="">Göygöl (Xanlar) T/M</option>
                <option value="">İmişli T/M</option>
                <option value="">Kürdəmir T/M</option>
                <option value="">Qobustan T/M</option>
                <option value="">Qusar T/M</option>
                <option value="">Naftalan T/M</option>
                <option value="">Neftçala T/M</option>
                <option value="">Oğuz T/M</option>
                <option value="">Saatlı T/M</option>
                <option value="">Samux T/M</option>
                <option value="">Siyəzən T/M</option>
                <option value="">Sabirabad T/M</option>
                <option value="">Tərtər T/M</option>
                <option value="">Ucar T/M</option>
                <option value="">Yardımlı T/M</option>
                <option value="">Yevlax T/M</option>
                <option value="">Şamaxı T/M</option>
                <option value="">Zərdab T/M</option>
                <option value="">Qax (Yarmarka) T/M</option>
                <option value="">Quba - Nügədi T/M</option>
                <option value="">Binə - Atçılıq T/M</option>
                <option value="">Metro Nizami T/M</option>
                <option value="">Sahil Qəsəbəsi T/M</option>
                <option value="">Montin T/M</option>
                <option value="">Bakıxanov Stansiya T/M</option>
              </select>
            </div>
            <div className={style.weight}>
                 <label htmlFor="">Çəki</label>
                 <input type="text" placeholder='Çəki (kq)' />
            </div>
            <button>$0.00 - 0.00manat</button>

        </div>

      </div>
    </div>
  );
}

export default HeroSection;
