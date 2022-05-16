import React from 'react';
import { format } from 'date-fns';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';

const BookingModal = ({ date, treatment, setTreatment, refetch }) => {
    const { _id, name, slots } = treatment;
    const [user, loading, error] = useAuthState(auth);

    const formattedDate = format(date, 'PP');

    const handleBooking = event => {
        event.preventDefault();
        const slot = event.target.slot.value;

        const booking = {
            treatmentId: _id,
            treatment: name,
            date: formattedDate,
            slot,
            patient: user.email,
            patientName: user.displayName,
            phone: event.target.phone.value
        }

        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                
                if(data.success) {
                    toast(`Appointment is set, ${formattedDate} at ${slot}`)
                }
                else {
                    toast.error(`You already have an appointment, ${data.booking?.date} at ${data.booking?.slot}`)
                }
                refetch();
                // to close the modal
                setTreatment(null);
            });
    }


    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">

                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2 text-white">✕</label>

                    <h3 className="font-bold text-lg text-secondary text-center">{name}</h3>

                    <form onSubmit={handleBooking} className='mt-5 grid grid-cols-1 gap-3 justify-items-center'>
                        <input type="text" disabled value={format(date, 'PP')} className="input input-bordered w-full max-w" />

                        <select name="slot" className="select select-bordered w-full max-w">
                            {
                                slots.map((slot, index) => <option
                                    key={index}
                                    value={slot}
                                >{slot}</option>)
                            }

                        </select>

                        <input type="text" name="name" disabled value={user?.displayName || ''} className="input input-bordered w-full max-w" />
                        <input type="email" name="email" disabled value={user?.email || ''} className="input input-bordered w-full max-w" />
                        <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full max-w" />
                        <input type="submit" value="Submit" className="btn btn-accent text-white w-full max-w" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BookingModal;


