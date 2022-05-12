import React from 'react';

const Service = ({service}) => {
    return (
        <div className="card ld:max-w-lg bg-base-100 shadow-xl animated">
            <figure className="px-10 pt-10 animated">
                <img src={service.img} alt="" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{service.name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                
            </div>
        </div>
    );
};

export default Service;