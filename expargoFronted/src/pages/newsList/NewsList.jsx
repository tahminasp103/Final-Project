// components/admin/NewsList.jsx
import React from 'react';

const NewsList = ({ newsList, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Xəbərlər Siyahısı</h2>
      <ul>
        {newsList.map((news) => (
          <li key={news._id}>
            <h3>{news.title}</h3>
            <p>{news.content}</p>
            <button onClick={() => onEdit(news)}>Redaktə</button>
            <button onClick={() => onDelete(news._id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
