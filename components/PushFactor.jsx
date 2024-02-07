import React, {useState} from "react";

 const PushFactor = ({factor, deleteFactor}) => {

    return (
        <div className="card mx-2 mb-2 p-2">
            <h6 className="card-title text-dark text-center">Push notification is enabled</h6>
            <div className="btn btn-primary" onClick={()=>{
                const { id, authenticator_type} = factor
                deleteFactor(id, authenticator_type, null)
                }}>request push to delete</div>
        </div>
    )
 }

 export default PushFactor