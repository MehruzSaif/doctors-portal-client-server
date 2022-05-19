import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DoctorRow from './DoctorRow';

const ManageDoctors = () => {

    const { data: doctors, isLoading } = useQuery('doctors', () => fetch('http://localhost:5000/doctor', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-2xl mb-10'>Manage Doctors: {doctors.length}</h2>

            <div class="overflow-x-auto">
                <table class="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            doctors.map((doctor, index) => <DoctorRow
                                key={doctor._key}
                                doctor={doctor}
                                index={index}
                            ></DoctorRow>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDoctors;