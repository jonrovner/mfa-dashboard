import React from 'react';

const Device = ({factors}) => {

    const factor = factors.find(f => f.name)
     
    return ( <div className="hero my-5 text-center" data-testid="hero">
        <h5 className="text-center"> Enrolled Device</h5>
        <h2 className="mb-4" data-testid="hero-title">
         {factor.name}
        </h2>
      </div>
    );
}




export default Device;
