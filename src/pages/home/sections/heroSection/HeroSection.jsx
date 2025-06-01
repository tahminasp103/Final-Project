import React, { useState } from 'react';
import style from './HeroSection.module.scss';
import trendyol from '../images/trendyol.svg';
import temu from '../images/temu.svg';
import { CiLocationOn } from "react-icons/ci";
import { FaManatSign } from "react-icons/fa6";
const HeroSection = () => {
  const manatToDollarRate = 0.588; // 1 manat USD-ə bərabərdir

  // Qiymət cədvəli (Ölkə -> Məntəqə -> Qiymət AZN)
const prices = {
  'ABŞ': {
    // Yaxın məntəqələr (14.16 AZN)
    'Gənclik Filialı': 14.16,
    '28 May Filialı': 14.16,
    'Xırdalan Filialı': 14.16,
    'Nərimanov Filialı': 14.16,
    'İçərişəhər Filialı': 14.16,
    'Q.Qarayev Filialı': 14.16,
    'Əhmədli Filialı': 14.16,
    'Əcəmi Filialı': 14.16,
    '20 Yanvar Filialı': 14.16,
    'Sədərək Filialı': 14.16,
    'Neftçilər Filialı': 14.16,
    'Azadlıq Filialı': 14.16,
    'Gəncə Filialı': 14.16,
    'Sumqayıt Filialı': 14.16,
    'Bakıxanov Filialı': 14.16,
    'İnşaatçılar Filialı': 14.16,
    'Metro 8 Noyabr T/M': 14.16,

    // Uzaq məntəqələr (15.58 AZN)
    'Həzi Aslanov Filialı': 15.58,
    'Əmircan T/M': 15.58,
    'Badamdar T/M': 15.58,
    'Binə Qəsəbəsi T/M': 15.58,
    'Buzovna T/M': 15.58,
    'Bayıl T/M': 15.58,
    'Masazır - T/M': 15.58,
    'Şüvəlan T/M': 15.58,
    'Hövsan - T/M': 15.58,
    'Yeni Günəşli T/M': 15.58,
    'Zabrat T/M': 15.58,
    'Yeni Ramana - T/M': 15.58,
    'H.Zeynalabdin T/M': 15.58,
    '9-cu Mikrorayon T/M': 15.58,
    'Xırdalan - AAAF Park T/M': 15.58,
    'Qaraçuxur T/M': 15.58,
    'Pirallahı T/M': 15.58,
    'Məmmədli T/M': 15.58,
    'Sabunçu T/M': 15.58,
    'Binəqədi T/M': 15.58,
    'Lənkəran Filialı': 15.58,
    'Lökbatan T/M': 15.58,
    'Mehdiabad T/M': 15.58,
    'NZS T/M': 15.58,
    'Keşlə T/M': 15.58,
    'Yeni Suraxanı - T/M': 15.58,
    'Gəncə prospekti T/M': 15.58,
    'Qəbələ - T/M': 15.58,
    'Şəki - T/M': 15.58,
    'Xaçmaz - T/M': 15.58,
    'Qazax - T/M': 15.58,
    'Ağstafa T/M': 15.58,
    'Quba - T/M': 15.58,
    'Balakən T/M': 15.58,
    'Mingəçevir T/M': 15.58,
    'Ağdaş T/M': 15.58,
    'Astara T/M': 15.58,
    'Salyan T/M': 15.58,
    'Masallı - T/M': 15.58,
    'İsmayıllı - T/M': 15.58,
    'Tovuz T/M': 15.58,
    'Şəmkir T/M': 15.58,
    'Füzuli - T/M': 15.58,
    'Bərdə - T/M': 15.58,
    'Cəlilabad T/M': 15.58,
    'Şirvan T/M': 15.58,
    'Goranboy T/M': 15.58,
    'Gədəbəy T/M': 15.58,
    'Göyçay T/M': 15.58,
    'Qax T/M': 15.58,
    'Ağsu T/M': 15.58,
    'Beyləqan T/M': 15.58,
    'Şabran T/M': 15.58,
    'Ağdam T/M': 15.58,
    'Ağcabədi T/M': 15.58,
    'Biləsuvar T/M': 15.58,
    'Hacıqabul T/M': 15.58,
    'Göygöl (Xanlar) T/M': 15.58,
    'İmişli T/M': 15.58,
    'Kürdəmir T/M': 15.58,
    'Qobustan T/M': 15.58,
    'Qusar T/M': 15.58,
    'Naftalan T/M': 15.58,
    'Neftçala T/M': 15.58,
    'Oğuz T/M': 15.58,
    'Saatlı T/M': 15.58,
    'Samux T/M': 15.58,
    'Siyəzən T/M': 15.58,
    'Sabirabad T/M': 15.58,
    'Tərtər T/M': 15.58,
    'Ucar T/M': 15.58,
    'Yardımlı T/M': 15.58,
    'Yevlax T/M': 15.58,
    'Şamaxı T/M': 15.58,
    'Zərdab T/M': 15.58,
    'Qax (Yarmarka) T/M': 15.58,
    'Quba - Nügədi T/M': 15.58,
    'Binə - Atçılıq T/M': 15.58,
    'Metro Nizami T/M': 15.58,
    'Sahil Qəsəbəsi T/M': 15.58,
    'Montin T/M': 15.58,
    'Bakıxanov Stansiya T/M': 15.58,
  },

  'Türkiyə': {
    // Yaxın məntəqələr (6.78 AZN)
    'Gənclik Filialı': 6.78,
    '28 May Filialı': 6.78,
    'Xırdalan Filialı': 6.78,
    'Nərimanov Filialı': 6.78,
    'İçərişəhər Filialı': 6.78,
    'Q.Qarayev Filialı': 6.78,
    'Əhmədli Filialı': 6.78,
    'Əcəmi Filialı': 6.78,
    '20 Yanvar Filialı': 6.78,
    'Sədərək Filialı': 6.78,
    'Neftçilər Filialı': 6.78,
    'Azadlıq Filialı': 6.78,
    'Gəncə Filialı': 6.78,
    'Sumqayıt Filialı': 6.78,
    'Bakıxanov Filialı': 6.78,
    'İnşaatçılar Filialı': 6.78,
    'Metro 8 Noyabr T/M': 6.78,

    // Uzaq məntəqələr (7.46 AZN)
    'Həzi Aslanov Filialı': 7.46,
    'Əmircan T/M': 7.46,
    'Badamdar T/M': 7.46,
    'Binə Qəsəbəsi T/M': 7.46,
    'Buzovna T/M': 7.46,
    'Bayıl T/M': 7.46,
    'Masazır - T/M': 7.46,
    'Şüvəlan T/M': 7.46,
    'Hövsan - T/M': 7.46,
    'Yeni Günəşli T/M': 7.46,
    'Zabrat T/M': 7.46,
    'Yeni Ramana - T/M': 7.46,
    'H.Zeynalabdin T/M': 7.46,
    '9-cu Mikrorayon T/M': 7.46,
    'Xırdalan - AAAF Park T/M': 7.46,
    'Qaraçuxur T/M': 7.46,
    'Pirallahı T/M': 7.46,
    'Məmmədli T/M': 7.46,
    'Sabunçu T/M': 7.46,
    'Binəqədi T/M': 7.46,
    'Lənkəran Filialı': 7.46,
    'Lökbatan T/M': 7.46,
    'Mehdiabad T/M': 7.46,
    'NZS T/M': 7.46,
    'Keşlə T/M': 7.46,
    'Yeni Suraxanı - T/M': 7.46,
    'Gəncə prospekti T/M': 7.46,
    'Qəbələ - T/M': 7.46,
    'Şəki - T/M': 7.46,
    'Xaçmaz - T/M': 7.46,
    'Qazax - T/M': 7.46,
    'Ağstafa T/M': 7.46,
    'Quba - T/M': 7.46,
    'Balakən T/M': 7.46,
    'Mingəçevir T/M': 7.46,
    'Ağdaş T/M': 7.46,
    'Astara T/M': 7.46,
    'Salyan T/M': 7.46,
    'Masallı - T/M': 7.46,
    'İsmayıllı - T/M': 7.46,
    'Tovuz T/M': 7.46,
    'Şəmkir T/M': 7.46,
    'Füzuli - T/M': 7.46,
    'Bərdə - T/M': 7.46,
    'Cəlilabad T/M': 7.46,
    'Şirvan T/M': 7.46,
    'Goranboy T/M': 7.46,
    'Gədəbəy T/M': 7.46,
    'Göyçay T/M': 7.46,
    'Qax T/M': 7.46,
    'Ağsu T/M': 7.46,
    'Beyləqan T/M': 7.46,
    'Şabran T/M': 7.46,
    'Ağdam T/M': 7.46,
    'Ağcabədi T/M': 7.46,
    'Biləsuvar T/M': 7.46,
    'Hacıqabul T/M': 7.46,
    'Göygöl (Xanlar) T/M': 7.46,
    'İmişli T/M': 7.46,
    'Kürdəmir T/M': 7.46,
    'Qobustan T/M': 7.46,
    'Qusar T/M': 7.46,
    'Naftalan T/M': 7.46,
    'Neftçala T/M': 7.46,
    'Oğuz T/M': 7.46,
    'Saatlı T/M': 7.46,
    'Samux T/M': 7.46,
    'Siyəzən T/M': 7.46,
    'Sabirabad T/M': 7.46,
    'Tərtər T/M': 7.46,
    'Ucar T/M': 7.46,
    'Yardımlı T/M': 7.46,
    'Yevlax T/M': 7.46,
    'Şamaxı T/M': 7.46,
    'Zərdab T/M': 7.46,
    'Qax (Yarmarka) T/M': 7.46,
    'Quba - Nügədi T/M': 7.46,
    'Binə - Atçılıq T/M': 7.46,
    'Metro Nizami T/M': 7.46,
    'Sahil Qəsəbəsi T/M': 7.46,
    'Montin T/M': 7.46,
    'Bakıxanov Stansiya T/M': 7.46,
  },

  'Iğdır': {
    // Yaxın məntəqələr (5.44 AZN)
    'Gənclik Filialı': 5.44,
    '28 May Filialı': 5.44,
    'Xırdalan Filialı': 5.44,
    'Nərimanov Filialı': 5.44,
    'İçərişəhər Filialı': 5.44,
    'Q.Qarayev Filialı': 5.44,
    'Əhmədli Filialı': 5.44,
    'Əcəmi Filialı': 5.44,
    '20 Yanvar Filialı': 5.44,
    'Sədərək Filialı': 5.44,
    'Neftçilər Filialı': 5.44,
    'Azadlıq Filialı': 5.44,
    'Gəncə Filialı': 5.44,
    'Sumqayıt Filialı': 5.44,
    'Bakıxanov Filialı': 5.44,
    'İnşaatçılar Filialı': 5.44,
    'Metro 8 Noyabr T/M': 5.44,

    // Uzaq məntəqələr (5.98 AZN)
    'Həzi Aslanov Filialı': 5.98,
    'Əmircan T/M': 5.98,
    'Badamdar T/M': 5.98,
    'Binə Qəsəbəsi T/M': 5.98,
    'Buzovna T/M': 5.98,
    'Bayıl T/M': 5.98,
    'Masazır - T/M': 5.98,
    'Şüvəlan T/M': 5.98,
    'Hövsan - T/M': 5.98,
    'Yeni Günəşli T/M': 5.98,
    'Zabrat T/M': 5.98,
    'Yeni Ramana - T/M': 5.98,
    'H.Zeynalabdin T/M': 5.98,
    '9-cu Mikrorayon T/M': 5.98,
    'Xırdalan - AAAF Park T/M': 5.98,
    'Qaraçuxur T/M': 5.98,
    'Pirallahı T/M': 5.98,
    'Məmmədli T/M': 5.98,
    'Sabunçu T/M': 5.98,
    'Binəqədi T/M': 5.98,
    'Lənkəran Filialı': 5.98,
    'Lökbatan T/M': 5.98,
    'Mehdiabad T/M': 5.98,
    'NZS T/M': 5.98,
    'Keşlə T/M': 5.98,
    'Yeni Suraxanı - T/M': 5.98,
    'Gəncə prospekti T/M': 5.98,
    'Qəbələ - T/M': 5.98,
    'Şəki - T/M': 5.98,
    'Xaçmaz - T/M': 5.98,
    'Qazax - T/M': 5.98,
    'Ağstafa T/M': 5.98,
    'Quba - T/M': 5.98,
    'Balakən T/M': 5.98,
    'Mingəçevir T/M': 5.98,
    'Ağdaş T/M': 5.98,
    'Astara T/M': 5.98,
    'Salyan T/M': 5.98,
    'Masallı - T/M': 5.98,
    'İsmayıllı - T/M': 5.98,
    'Tovuz T/M': 5.98,
    'Şəmkir T/M': 5.98,
    'Füzuli - T/M': 5.98,
    'Bərdə - T/M': 5.98,
    'Cəlilabad T/M': 5.98,
    'Şirvan T/M': 5.98,
    'Goranboy T/M': 5.98,
    'Gədəbəy T/M': 5.98,
    'Göyçay T/M': 5.98,
    'Qax T/M': 5.98,
    'Ağsu T/M': 5.98,
    'Beyləqan T/M': 5.98,
    'Şabran T/M': 5.98,
    'Ağdam T/M': 5.98,
    'Ağcabədi T/M': 5.98,
    'Biləsuvar T/M': 5.98,
    'Hacıqabul T/M': 5.98,
    'Göygöl (Xanlar) T/M': 5.98,
    'İmişli T/M': 5.98,
    'Kürdəmir T/M': 5.98,
    'Qobustan T/M': 5.98,
    'Qusar T/M': 5.98,
    'Naftalan T/M': 5.98,
    'Neftçala T/M': 5.98,
    'Oğuz T/M': 5.98,
    'Saatlı T/M': 5.98,
    'Samux T/M': 5.98,
    'Siyəzən T/M': 5.98,
    'Sabirabad T/M': 5.98,
    'Tərtər T/M': 5.98,
    'Ucar T/M': 5.98,
    'Yardımlı T/M': 5.98,
    'Yevlax T/M': 5.98,
    'Şamaxı T/M': 5.98,
    'Zərdab T/M': 5.98,
    'Qax (Yarmarka) T/M': 5.98,
    'Quba - Nügədi T/M': 5.98,
    'Binə - Atçılıq T/M': 5.98,
    'Metro Nizami T/M': 5.98,
    'Sahil Qəsəbəsi T/M': 5.98,
    'Montin T/M': 5.98,
    'Bakıxanov Stansiya T/M': 5.98,
  },
};


  // State-lər
  const [country, setCountry] = useState('ABŞ');
  const [precinct, setPrecinct] = useState('Gənclik Filialı');
  const [weight, setWeight] = useState('');
  const [totalPriceManat, setTotalPriceManat] = useState(0);
  const [totalPriceDollar, setTotalPriceDollar] = useState(0);

  // Qiymət hesablama funksiyası
  const calculatePrice = (newCountry, newPrecinct, newWeight) => {
    if (!newWeight || isNaN(newWeight) || newWeight <= 0) {
      setTotalPriceManat(0);
      setTotalPriceDollar(0);
      return;
    }
    const pricePerKg = prices[newCountry]?.[newPrecinct] || 0;
    const manatTotal = pricePerKg * newWeight;
    const dollarTotal = manatTotal * manatToDollarRate;

    setTotalPriceManat(manatTotal);
    setTotalPriceDollar(dollarTotal);
  };

  // Ölkə seçimi dəyişəndə
  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    const firstPrecinct = Object.keys(prices[newCountry])[0];
    setPrecinct(firstPrecinct);
    calculatePrice(newCountry, firstPrecinct, weight);
  };

  // Məntəqə seçimi dəyişəndə
  const handlePrecinctChange = (e) => {
    const newPrecinct = e.target.value;
    setPrecinct(newPrecinct);
    calculatePrice(country, newPrecinct, weight);
  };

  // Çəki dəyişəndə
  const handleWeightChange = (e) => {
    const newWeight = e.target.value;
    setWeight(newWeight);
    calculatePrice(country, precinct, newWeight);
  };

  return (
    <div className={style.heroSection}>
      <div className={style.container}>
        <div className={style.textContainer}>
          <h1>Sürətli və Sərfəli Karqo</h1>
          <p>
            Trendyol və TEMU Gəl Al nöqtələri – Beynəlxalq və ölkədaxili çatdırılma xidmətinin ən etibarlı ünvanı. Türkiyə və Amerikadan olan sifarişlərinizi Expargo ilə rahatlıqla həyata keçirə bilərsiniz. Sərfəli qiymətlər, geniş xidmət şəbəkəsi və yüksək keyfiyyətlə Expargo həmişə sizin yanınızdadır!
          </p>
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
            <label htmlFor="country-select">Ölkə</label>
            <select id="country-select" value={country} onChange={handleCountryChange}>
              <option value="ABŞ"><CiLocationOn /> ABŞ</option>
              <option value="Türkiyə"><CiLocationOn /> Türkiyə</option>
              <option value="Iğdır"><CiLocationOn /> Iğdır</option>
            </select>
          </div>

          <div className={style.precinct}>
            <label htmlFor="precinct-select">Məntəqə</label>
            <select id="precinct-select" value={precinct} onChange={handlePrecinctChange}>
              {Object.keys(prices[country]).map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className={style.weight}>
            <label htmlFor="weight-input">Çəki (kq)</label>
            <input
              type="number"
              id="weight-input"
              min="0"
              step="0.1"
              placeholder="Çəki (kq) "
              value={weight }
              onChange={handleWeightChange}
              
            />
          </div>

        <button>
  {weight > 30 ? (
    'Maksimum çəki: 30 kq'
  ) : (
    <>
      {totalPriceDollar.toFixed(2)} $ - {totalPriceManat.toFixed(2)} <FaManatSign />
    </>
  )}
</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
