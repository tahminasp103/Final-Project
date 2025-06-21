import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../../../redux/reducers/NewsSlice';
import { useNavigate } from 'react-router-dom';
import style from './News.module.scss';

const News = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { newsList, loading, error } = useSelector(state => state.news);

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  // Sağ ox üçün funksiyam
  const handleNext = () => {
    if (startIndex + 3 < newsList.length) {
      setStartIndex(startIndex + 1);
    }
  };

  // Sol ox üçün funksiyam
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  // Slider-da göstəriləcək 3 xəbər
  const visibleNews = newsList.slice(startIndex, startIndex + 3);

  return (
    <div className={style.news}>
      <div className={style.container}>
        <h1>Xəbərlər</h1>
        {loading && <p>Yüklənir...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className={`${style.arrow} ${style.arrowLeft}`} onClick={handlePrev} style={{visibility: startIndex === 0 ? 'hidden' : 'visible'}}>
          &#8592;
        </div>
        <div className={`${style.arrow} ${style.arrowRight}`} onClick={handleNext} style={{visibility: startIndex + 3 >= newsList.length ? 'hidden' : 'visible'}}>
          &#8594;
        </div>
        <div className={style.grid}>
          {visibleNews.map(news => (
            <div
              key={news._id}
              className={style.newsCard}
              onClick={() => navigate(`/news/${news._id}`)}
            >
              {news.image && (
                <img
                  src={news.image}
                  alt={news.title}
                  className={style.newsImage}
                />
              )}
              <h2>{news.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
