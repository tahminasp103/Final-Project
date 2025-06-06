import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from '../../../../redux/reducers/BranchSlice';

const ServiceArea = () => {
  const dispatch = useDispatch();
  const { branches, loading, error } = useSelector((state) => state.branches);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div>
      <h2>Xidmət şəbəkəsi</h2>
      <ul>
        {branches.map((branch) => (
          <li key={branch._id}>
            <h3>{branch.name}</h3>
            <p>{branch.address}</p>
            <p>{branch.phone}</p>
            <p>{branch.hours}</p>
            <a href={branch.link} target="_blank" rel="noopener noreferrer">
              Xəritədə göstər
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceArea;
