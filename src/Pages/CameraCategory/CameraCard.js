import React from 'react';
import { Link } from 'react-router-dom';

const CameraCard = ({ camera }) => {
    const {name,id}=camera;

    return (
        <div>
            <select className="select select-ghost w-full max-w-xs">
            <option>{name}</option>
            
        </select>
        <Link to={`/cameraOptions/${id}`}><button className='btn btn-dark mt-8 ml-24'>Sell All</button></Link>
        </div>
        
    );
};

export default CameraCard;