import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const AddDoctor = () => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json()))

    const imgStorageKey = 'ff80d7d39744e8bbef0749f30f2f77f9';

    /**
     * 3 ways to store images
     * 1. Third party storage 
     * 2. Your own storage in your own server (file system)
     * 3. Database: MongoDB
     * 
     * YUP: to validate size. Search YUP file validation for react hook form
    */

    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
        fetch (url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(result => {
            if(result.success) {
                const img = result.data.url;
                const doctor = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    img: img
                }
                // send to your data base
                fetch('http://localhost:5000/doctor', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(inserted => {
                    if(inserted.insertedId) {
                        toast.success('Doctor added successfully');
                        reset();
                    }
                    else {
                        toast.error('Failed to add the doctor');
                    }
                })
            }
        })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-2xl mb-10 ml-3'>Add a new doctor</h2>

            <div className='flex justify-center items-center'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center font-bold">Add Doctor's Information Here</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* Name */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>

                                <input type="text"
                                    placeholder="Doctor's Name"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Name is Required'
                                        }
                                    })}
                                />

                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}

                                </label>

                            </div>

                            {/* email */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>

                                <input type="email"
                                    placeholder="Doctor's Email"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is Required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid Email'
                                        }
                                    })}
                                />

                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}

                                </label>

                            </div>


                            {/* specialty */}
                            <div className="form-control w-full max-w-xs mb-3">
                                <label className="label">
                                    <span className="label-text">Specialization</span>
                                </label>

                                <select {...register('specialty')} className="select input-bordered w-full max-w-xs">
                                    {
                                        services.map(service => <option
                                            key={service._id}
                                            value={service.name}
                                        >{service.name}</option>)
                                    }
                                </select>
                            </div>


                            {/* image */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>

                                <input type="file"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message: 'Image is Required'
                                        }
                                    })}
                                />

                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}

                                </label>

                            </div>


                            <input className='btn w-full max-w-xs' type="submit" value="Add" />
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddDoctor;