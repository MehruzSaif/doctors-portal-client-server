import chair from '../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import bg from '../../assets/images/bg.png';

const AppointmentBanner = ({date, setDate}) => {


    return (
        <div className="hero min-h-screen"
        style={{
            background: `url(${bg})`
        }}
        className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="rounded-lg shadow-2xl max-w animated" alt='Dentist Chair' />
                <div>
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                    
                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;