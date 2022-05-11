import React from 'react';
import doctor from '../../assets/images/doctor.png';

const MakeAppointment = () => {
    return (
        <section>
            <div>
                <img src={doctor} alt="" />
            </div>

            <div>
                <h3 className='text-xl text-primary'>Appointment</h3>
                <h2>Make an Appointment Today</h2>
            </div>
        </section>
    );
};

export default MakeAppointment;