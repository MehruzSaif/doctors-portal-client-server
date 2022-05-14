import React from 'react';
import { format } from 'date-fns';

const BookingModal = ({ date, treatment, setTreatment }) => {
    const { _id, name, slots } = treatment;

    const handleBooking = e => {
        e.preventDefault();
        const slot = e.target.slot.value;
        console.log(_id, slot, name);

        // To close the modal
        setTreatment(null);
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">

                    <label for="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2 text-white">✕</label>

                    <h3 className="font-bold text-lg text-secondary text-center">{name}</h3>

                    <form onSubmit={handleBooking} className='mt-5 grid grid-cols-1 gap-3 justify-items-center'>
                        <input type="text" disabled value={format(date, 'PP')} className="input input-bordered w-full max-w" />

                        <select name='slot' className="select select-bordered w-full max-w">
                            {
                                slots.map(slot => <option value={slot}>{slot}</option>)
                            }
                            
                        </select>

                        <input type="text" name='' placeholder="Your Name" className="input input-bordered w-full max-w" />
                        <input type="email" placeholder="Email" className="input input-bordered w-full max-w" />
                        <input type="phone" placeholder="Phone No." className="input input-bordered w-full max-w" />
                        <input type="submit" value='Submit' className="btn btn-accent text-white w-full max-w" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BookingModal;