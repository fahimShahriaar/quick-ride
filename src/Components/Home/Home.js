import React from 'react';
import Header from '../Header/Header';
import './Home.css';
import bike from '../../images/bike.png';
import bus from '../../images/bus.png';
import car from '../../images/car.png';
import train from '../../images/train.png';
import { Link } from 'react-router-dom';

const Home = () => {
    
    return (
        <div className="home">
            <Header></Header>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-3">
                        <div className="bg-white px-5 pt-5 pb-3 text-center rounded shadow m-2">
                            <img src={bike} alt="" />
                            <Link to={`/destination/`} style={{textDecoration: 'none'}}><button className="d-block mx-auto mt-5 w-75 btn btn-info text-white">Bike</button></Link>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-3">
                        <div className="bg-white px-5 pt-5 pb-3 text-center rounded shadow m-2">
                            <img src={bus} alt="" />
                            <Link to={`/destination/`} style={{textDecoration: 'none'}}><button className="d-block mx-auto mt-5 w-75 btn btn-info text-white">Bus</button></Link>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-3">
                        <div className="bg-white px-5 pt-5 pb-3 text-center rounded shadow m-2">
                            <img src={car} alt="" />
                            <Link to={`/destination/`} style={{textDecoration: 'none'}}><button className="d-block mx-auto mt-5 w-75 btn btn-info text-white">Car</button></Link>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-3">
                        <div className="bg-white px-5 pt-5 pb-3 text-center rounded shadow m-2">
                            <img src={train} alt="" />
                            <Link to={`/destination/`} style={{textDecoration: 'none'}}><button className="d-block mx-auto mt-5 w-75 btn btn-info text-white">Train</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;