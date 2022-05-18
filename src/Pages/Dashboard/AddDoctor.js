import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const AddDoctor = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json()))

    const onSubmit = async data => {
        console.log('data', data);
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-2xl mb-10'>Add a new doctor</h2>

            <div className='flex justify-center items-center'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center font-bold">Add Doctor's Information Here</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>

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



                            <div className="form-control w-full max-w-xs mb-10">
                                <label className="label">
                                    <span className="label-text">Specialization</span>
                                </label>

                                <select {...register('specialty')} class="select w-full max-w-xs">
                                    {
                                        services.map(service => <option
                                            key={service._id}
                                            value={service.name}
                                        >{service.name}</option>)
                                    }
                                </select>
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