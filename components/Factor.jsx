import React from "react"

const Factor = ({factor}) => {

    return(
        
        <div className="col bg-dark text-white m-1 p-1 text-center">
            <h5 className="small">{factor.authenticator_type}</h5>
            <p className="small code">{factor.id}</p>
          {/*   {factor.oob_channel && <p>{factor.oob_channel}</p>}
            {factor.name && <p>{factor.name}</p>} */}
        </div>
    )
}

export default Factor