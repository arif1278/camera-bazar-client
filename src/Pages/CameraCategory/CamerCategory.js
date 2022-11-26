import React, { useEffect, useState } from 'react';
import CameraCard from './CameraCard';



const CamerCategory = () => {
  const [cameras, setCameras] = useState();

  useEffect(() => {
    fetch('http://localhost:5000/cameraOptions')
      .then(res => res.json())
      .then(data => setCameras(data));
  }, [])


  return (
    <div>
      <h2 className='text-center'>Category</h2>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

        {
          cameras?.map(camera => <CameraCard
            key={camera._id}
            camera={camera}
          ></CameraCard>)
        };



      </div>

    </div>
  );
};
export default CamerCategory;