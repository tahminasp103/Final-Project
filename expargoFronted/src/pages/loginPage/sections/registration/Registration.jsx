import React from 'react';
import style from './Registration.module.scss'
const Registration = () => {
  return (
    <div className={style.registration}>
        <h3>Qeydiyyat</h3>
        <div className={style.container}>
            <div className={style.img}><img src="https://dash.expargo.com/assets/img/expargo_circle.svg" alt="" /></div>
            <h2>Qeydiyyat</h2>
        </div>
        <div className={style.registrationForm}>
            <div className={style.inp}>
                <label htmlFor="">Ad</label>
                <input type="text" placeholder='İngilis dili ilə' />
            </div>
            <div className={style.inp}>
                <label htmlFor="">Soyad</label>
                <input type="text" placeholder='ingilis dili ilə' />
            </div>
            <div className={style.inp}>
                <label htmlFor="">E-mail</label>
                <input type="text" placeholder='sizin"email.com' />
            </div>
            <div className={style.kod}>
                <label htmlFor="">Kod</label>
                <select name="" id="">
                    <option value="">10</option>
                    <option value="">50</option>
                    <option value="">51</option>
                    <option value="">55</option>
                    <option value="">60</option>
                    <option value="">70</option>
                    <option value="">77</option>
                    <option value="">99</option>
                    <div className="btn">
                        <button>Bağla</button>
                        <button>Təsdiqlə</button>
                    </div>
                </select>
            </div>
            <div className={style.inp}>
                <label htmlFor="Telefon №"></label>
                <input type="text" placeholder='000-00-00' />
            </div>
            <div className={style.inp}>
                <label htmlFor="">Fin kod</label>
                <input type="text"  placeholder='0000000' />
            </div>
            <select name="" id="">
                <option value="">Gənclik Filialı</option>
<option value="">28 May Filialı</option>
<option value="">Xırdalan Filialı</option>
<option value="">Nərimanov Filialı</option>
<option value="">İçərişəhər Filialı</option>
<option value="">Q.Qarayev Filialı</option>
<option value="">Əhmədli Filialı</option>
<option value="">Əcəmi Filialı</option>
<option value="">20 Yanvar Filialı</option>
<option value="">Sədərək Filialı</option>
<option value="">Neftçilər Filialı</option>
<option value="">Azadlıq Filialı</option>
<option value="">Gəncə Filialı</option>
<option value="">Sumqayıt Filialı</option>
<option value="">Bakıxanov Filialı</option>
<option value="">İnşaatçılar Filialı</option>
<option value="">Metro 8 Noyabr T/M</option>
<option value="">Həzi Aslanov Filialı</option>
<option value="">Əmircan T/M</option>
<option value="">Badamdar T/M</option>
<option value="">Binə Qəsəbəsi T/M</option>
<option value="">Buzovna T/M</option>
<option value="">Bayıl T/M</option>
<option value="">Masazır - T/M</option>
<option value="">Şüvəlan T/M</option>
<option value="">Hövsan - T/M</option>
<option value="">Yeni Günəşli T/M</option>
<option value="">Zabrat T/M</option>
<option value="">Yeni Ramana - T/M</option>
<option value="">H.Zeynalabdin T/M</option>
<option value="">9-cu Mikrorayon T/M</option>
<option value="">Xırdalan - AAAF Park T/M</option>
<option value="">Qaraçuxur T/M</option>
<option value="">Pirallahı T/M</option>
<option value="">Məmmədli T/M</option>
<option value="">Sabunçu T/M</option>
<option value="">Binəqədi T/M</option>
<option value="">Lənkəran Filialı</option>
<option value="">Lökbatan T/M</option>
<option value="">Mehdiabad T/M</option>
<option value="">NZS T/M</option>
<option value="">Keşlə T/M</option>
<option value="">Yeni Suraxanı - T/M</option>
<option value="">Gəncə prospekti T/M</option>
<option value="">Qəbələ - T/M</option>
<option value="">Şəki - T/M</option>
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
            <div className={style.inp}>
                <label htmlFor="">Şifrə</label>
                <input type="text" />
            </div>
            <div className={style.inp}>
                <label htmlFor="">Şifrənnin təkrarı</label>
                <input type="text" />
            </div>

        </div>
      
    </div>
  );
}

export default Registration;
