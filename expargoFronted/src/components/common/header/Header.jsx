import React, { useEffect, useState } from 'react';
import style from './Header.module.scss';
import { MdClose } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from '../../../redux/reducers/CurrencySlice';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LuMenu } from "react-icons/lu";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
    const [showHeaderTop, setShowHeaderTop] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleCurrencyChange = (currency) => {
        dispatch(setCurrency(currency));
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsOpen(false); 
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  const headerBoxClass = `
  ${style.headerBox} 
  ${
    location.pathname === '/' && !scrolled && showHeaderTop
      ? style.transparentBg
      : style.activeBg
  }
`;

    const toggleDrawer = () => {
        setIsOpen(prev => !prev);
    };
      useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsOpen(false); 
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    return (
        <div className={style.header}>
            {showHeaderTop && (
                <div className={style.headerTop}>
                    <div className={style.container}>
                        <div className={style.install}>
                            <h3>Mobil tətbiqi yükləyin</h3>
                            <a href="https://apps.apple.com/tr/app/expargo-s%C9%99rf%C9%99li-kargo/id1542055522" target="_blank" rel="noopener noreferrer">
                                <img src="https://www.vadi.az/front/assets/images/logos/app/playstore.svg" alt="Play Store" />
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.expargo.courier" target="_blank" rel="noopener noreferrer">
                                <img src="https://www.vadi.az/front/assets/images/logos/app/appstore.svg" alt="App Store" />
                            </a>
                        </div>
                        <div className={style.money}>
                            <span onClick={() => handleCurrencyChange('AZN')} className={selectedCurrency === 'AZN' ? style.active : ''}>AZN</span>
                            <span onClick={() => handleCurrencyChange('USD')} className={selectedCurrency === 'USD' ? style.active : ''}>USD</span>
                            <MdClose onClick={() => setShowHeaderTop(false)} />
                        </div>
                    </div>
                </div>
            )}
            <div className={headerBoxClass}>
                <div className={style.container}>
                    <button className={style.menuBurger} onClick={toggleDrawer}>
                        <LuMenu />
                    </button>
                    <img src="https://expargo.com/assets/img/expargo_logo.png" alt="Logo" />
                    <div className={style.navBar}>
                        <ul>
                            <li><a onClick={() => handleNavigation('/')} className={location.pathname === '/' ? style.active : ''}>Əsas Səhifə</a></li>
                            <li><a onClick={() => handleNavigation('/tarifler')} className={location.pathname === '/tarifler' ? style.active : ''}>Tariflər</a></li>
                            <li><a onClick={() => handleNavigation('/shebekeler')} className={location.pathname === '/shebekeler' ? style.active : ''}>Xidmət Şəbəkəsi</a></li>
                            <li><a onClick={() => handleNavigation('/xeberler')} className={location.pathname === '/xeberler' ? style.active : ''}>Xəbərlər</a></li>
                            <li><a onClick={() => handleNavigation('/magazalar')} className={location.pathname === '/magazalar' ? style.active : ''}>Mağazalar</a></li>
                            <li><a onClick={() => handleNavigation('/elaqe')} className={location.pathname === '/elaqe' ? style.active : ''}>Əlaqə</a></li>
                            <li><a onClick={() => handleNavigation('/faq')} className={location.pathname === '/faq' ? style.active : ''}>FAQ</a></li>
                            <li><a onClick={() => handleNavigation('/commercial')} className={location.pathname === '/korporativ' ? style.active : ''}>Korporativ</a></li>
                        </ul>
                    </div>
                    <button
  onClick={() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/dashboardHome');
    } else {
      navigate('/login');
    }
  }}
>
  <FaUser /> <a href=""><span>Daxil Ol</span></a> 
</button>

                </div>
            </div>
           <Drawer
  open={isOpen}
  onClose={() => {}}
  direction='left'
  className={style.drawer}
>
  <div className={style.menu}>
    <div className={style.img}>
    <img src="https://expargo.com/assets/img/expargo_logo.png" alt="Logo" />
     <div className={style.close} onClick={toggleDrawer} ><MdClose/></div> 

    </div>

    <ul>
      <li><a onClick={() => handleNavigation('/')} className={location.pathname === '/' ? style.active : ''}>Əsas Səhifə</a></li>
      <li><a onClick={() => handleNavigation('/tarifler')} className={location.pathname === '/tarifler' ? style.active : ''}>Tariflər</a></li>
      <li><a onClick={() => handleNavigation('/shebekeler')} className={location.pathname === '/shebekeler' ? style.active : ''}>Xidmət Şəbəkəsi</a></li>
      <li><a onClick={() => handleNavigation('/xeberler')} className={location.pathname === '/xeberler' ? style.active : ''}>Xəbərlər</a></li>
      <li><a onClick={() => handleNavigation('/magazalar')} className={location.pathname === '/magazalar' ? style.active : ''}>Mağazalar</a></li>
      <li><a onClick={() => handleNavigation('/elaqe')} className={location.pathname === '/elaqe' ? style.active : ''}>Əlaqə</a></li>
      <li><a onClick={() => handleNavigation('/faq')} className={location.pathname === '/faq' ? style.active : ''}>FAQ</a></li>
      <div className={style.line}></div>
      <li><a onClick={() => handleNavigation('/korporativ')} className={location.pathname === '/korporativ' ? style.active : ''}>Korporativ</a></li>
      <li><a onClick={() => handleNavigation('/qrupaj')} className={location.pathname === '/qrupaj' ? style.active : ''}>Beynəlxalq Qrupaj</a></li>
      <div className={style.line}></div>
    </ul>
  <button ><FaUser /> Daxil Ol</button>
  </div>
</Drawer>
        </div>
    );
};

export default Header;
