import React, { useState } from 'react';
import { useParams } from 'react-router';
import Header from '../Header/Header';
import map from '../../images/Map.png';
import bikeImg from '../../images/bike.png';
import busImg from '../../images/bus.png';
import carImg from '../../images/car.png';
import trainImg from '../../images/train.png';
import peopleIcon from '../../images/peopleicon.png';
import Gmap from '../Gmap/Gmap';

const Destination = () => {
    const { ride } = useParams();
    let thumb = 'bike';
    if (ride === 'bike') {
        thumb = bikeImg;
    }
    else if (ride === 'bus') {
        thumb = busImg;
    }
    else if (ride === 'car') {
        thumb = carImg;
    }
    else if (ride === 'train') {
        thumb = trainImg;
    }
    console.log(ride);

    const [dest, setDest] = useState({ pickFrom: '', pickTo: '' });
    const [isDestConfirm, setIsDestConfirm] = useState(false);

    const handleBlur = (e) => {
        console.log(e.target.name, e.target.value);
        const newDest = { ...dest };
        newDest[e.target.name] = e.target.value;
        setDest(newDest);
    }

    const handleSubmit = (event) => {
        console.log('form submitted');
        setIsDestConfirm(true);
        event.preventDefault();
    }

    console.log(dest);
    return (
        <div className="container">
            <Header />
            <hr />
            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <div className="bg-light p-3 rounded">
                        {isDestConfirm ? <div className="bg-light">
                            <div style={{ borderLeft: '2px solid black', paddingLeft: '10px' }}>
                                <h4>{dest.pickFrom}</h4>
                                <h4 className="mt-4">{dest.pickTo}</h4>
                            </div>
                            <div className="bg-white rounded my-3 p-3">
                                <img src={thumb} style={{ height: '35px' }} className="me-3" alt="" />
                                {ride}
                                <img src={peopleIcon} style={{ height: '20px' }} className="ms-3" alt="" />
                                <span>4</span>
                                <span className="float-end">$64</span>
                            </div>
                            <div className="bg-white rounded my-3 p-3">
                                <img src={thumb} style={{ height: '35px' }} className="me-3" alt="" />
                                {ride}
                                <img src={peopleIcon} style={{ height: '20px' }} className="ms-3" alt="" />
                                <span>4</span>
                                <span className="float-end">$64</span>
                            </div>
                            <div className="bg-white rounded my-3 p-3">
                                <img src={thumb} style={{ height: '35px' }} className="me-3" alt="" />
                                {ride}
                                <img src={peopleIcon} style={{ height: '20px' }} className="ms-3" alt="" />
                                <span>4</span>
                                <span className="float-end">$64</span>
                            </div>
                        </div>
                            :
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="pickFrom">Pick From</label>
                                <input type="text" onBlur={handleBlur} name="pickFrom" id="pickFrom" className="form-control mb-3" required />
                                <label htmlFor="pickTo">Pick To</label>
                                <input type="text" onBlur={handleBlur} name="pickTo" id="pickTo" className="form-control" />
                                <input type="submit" value="Search" className="my-3 py-1 w-100 d-inline-block  bg-danger text-white" required />
                            </form>
                        }
                    </div>
                </div>
                <div className="col-sm-12 col-md-8">
                    <div style={{ height: '400px' }} className="border">
                        {/* <Gmap /> */}
                        <img src={map} style={{width: '100%', height: '400px'}} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Destination;