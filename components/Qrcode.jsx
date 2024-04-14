import React from "react";
import QRCode from "react-qr-code";

function Qrcode({barcode_uri}) {
    return ( <>
    
    <QRCode value={barcode_uri}></QRCode>
    
    </> );
}

export default Qrcode;


