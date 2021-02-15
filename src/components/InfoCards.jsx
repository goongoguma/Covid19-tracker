import React, { useRef, useEffect, useState } from 'react';
import Modal from './Modal';

function InfoCards({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const { confirmed, deaths, recovered, lastUpdate } = data || {};
  const confirmedRef = useRef(null);
  const deathRef = useRef(null);
  const recoveredRef = useRef(null);
  const speed = 20;
  const date = new Date(lastUpdate);
  const dateString = 
    date.getUTCFullYear() + "/" +
    ("0" + (date.getUTCMonth()+1)).slice(-2) + "/" +
    ("0" + date.getUTCDate()).slice(-2) + " " +
    ("0" + date.getUTCHours()).slice(-2) + ":" +
    ("0" + date.getUTCMinutes()).slice(-2) + ":" +
    ("0" + date.getUTCSeconds()).slice(-2);

  useEffect(() => {
    if (data?.error) {
      setIsOpen(true)
      confirmedRef.current.textContent = 0;
      deathRef.current.textContent = 0;
      recoveredRef.current.textContent = 0;
      return
    };

    [confirmedRef, deathRef, recoveredRef].forEach(counter => {
      const updateCount = () => {
        const target = +counter.current.getAttribute('data-target');
        const count = +counter.current.textContent;
        const inc = target / speed;

        if (count < target) {        
          counter.current.textContent = Math.ceil(count+inc);
          setTimeout(updateCount, 20);
        } else {
          counter.current.textContent = target;
        }
      };
      updateCount();
    });
  }, [data]);

  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} text={"No Result found in Database"} />
      <div className='info-cards-wrapper'>
        <section className='info-card'>
          <div className="card" style={{ background: "#ce8296" }}>
            <p><i className="fas fa-lungs-virus" /> Confirmed</p>
            <i className="fas fa-users" style={{display: 'inherit', position: 'absolute', bottom: '37%', left: '24%'}} />
            <div className='counter' ref={confirmedRef} data-target={confirmed?.value ?? 0}>0</div>
          </div>
        </section>
        <section className='info-card'>
          <div className="card" style={{ background: "#008080" }}>
            <p><i className="fas fa-heartbeat" />Recovered</p>
            <i className="fas fa-users" style={{display: 'inherit', position: 'absolute', bottom: '37%', left: '24%'}} />
            <div className='counter' ref={recoveredRef} data-target={recovered?.value ?? 0}>0</div>
          </div>
        </section>
        <section className='info-card'>
          <div className="card" style={{ background: "#7d7d7d" }}>
            <p><i className="fas fa-skull" />Deaths</p>
            <i className="fas fa-users" style={{display: 'inherit', position: 'absolute', bottom: '37%', left: '27%'}} />
            <div className='counter' ref={deathRef} data-target={deaths?.value ?? 0}>0</div>
          </div>
        </section>
      </div>
      <p className="update-text">Last Update: { dateString.includes('NaN') ? "" : dateString }</p>
    </>
  )
}

export default InfoCards
