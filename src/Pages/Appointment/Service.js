import React from 'react';

const service = ({ service, setTreatment }) => {

    const { name, slots } = service;

    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <div className="card-body text-center font-bold">
                <h2 className="card-title text-secondary mb-5 justify-center">{name}</h2>
                <p>
                    {
                        slots.length > 0
                        ? <span>{slots[0]}</span>
                        : <span className='text-red-500'>No Slot Available. Try Another day</span>
                    }
                </p>

                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <div className="card-actions justify-center">

                    <label for="booking-modal"
                    disabled={slots.length === 0} 
                    onClick={() => setTreatment(service)} 
                    className="btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary mt-5">Book Appointment</label>
                    
                </div>
            </div>
        </div>
    );
};

export default service;