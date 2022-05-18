import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrimaryButton = ({children}) => {

    const navigate = useNavigate();

    return (
        <button 
            className="btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary"
            onClick={() => navigate('/appointment')}
            >{children}
        </button>
    );
};

export default PrimaryButton;