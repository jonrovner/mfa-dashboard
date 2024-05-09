import React from 'react';

const Device = ({factors}) => {

    const factor = factors.find(f => f.name)
     
    return (
      <> 
    {factor && factor.name && <div className="hero my-2 text-center">
        <h6 className="text-center"> Enrolled Device {factor.name}</h6>
        
      </div>
    }
    </>
    );
}




export default Device;
