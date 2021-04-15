import React from 'react';
import { useParams } from 'react-router';
import Header from '../Header/Header';
import map from '../../images/Map.png';

const Destination = () => {
    const { ride } = useParams();
    console.log(ride);
    const handleSubmit = (event) => {
        console.log('form submitted');
        event.preventDefault();
    }
    return (
        <div className="container">
            <Header />
            <hr />
            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <div className="bg-light p-3 rounded">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="pickFrom">Pick From</label>
                            <input type="text" id="pickFrom" className="form-control mb-3" />
                            <label htmlFor="pickTo">Pick To</label>
                            <input type="text" id="pickTo" className="form-control" />
                            <input type="submit" value="Search" className="my-3 py-1 w-100 d-inline-block  bg-danger text-white" />
                        </form>
                    </div>
                </div>
                <div className="col-sm-12 col-md-8">
                    <div style={{ height: '400px' }} className="border">
                        <img src={map} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Destination;