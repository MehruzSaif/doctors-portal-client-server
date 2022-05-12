import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../assets/icons/clock.svg';
import phone from '../../assets/icons/phone.svg';
import marker from '../../assets/icons/marker.svg';

const Info = () => {
    return (

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-7xl mx-auto px-12 mt-10'>
            <InfoCard cardTitle='Opening Hours' bgClass="bg-gradient-to-r from-secondary to-primary" img={clock}></InfoCard>
            <InfoCard cardTitle='Visit our Location' bgClass="bg-neutral" img={marker}></InfoCard>
            <InfoCard cardTitle='Contact us now' bgClass="bg-gradient-to-r from-secondary to-primary" img={phone}></InfoCard>

        </div>

    );
};

export default Info;