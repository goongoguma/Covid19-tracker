import React, { useState } from 'react';
import { useQuery } from 'react-query';
import InfoCards from './InfoCards';
import InfoChart from './InfoChart';

function Container() {
  const [country, setCountry] = useState("");
  const { isLoading, error, data, refetch } = useQuery('countryData', 
    () => fetch(`https://covid19.mathdro.id/api/countries/${country}`).then(res => res.json()),
    { enabled: false, refetchOnWindowFocus: false }
  );

  if (isLoading) {
    return 'Loading...'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <i className="fas fa-globe-americas" style={{marginRight: "10px", fontSize: "20px"}} />
          <input value={country} onChange={e => setCountry(e.target.value)} placeholder='Search Country'/>
        </form>
        <InfoCards data={data} />
        <InfoChart data={data} />
      </div>
    </>
  );
};

export default Container
