import React from "react";

const corner = ({color = "#D9D9D9"}) => {return<>
<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5_2)">
<path d="M0 0H6C6 0 2.95122 0.508338 1.66667 1.56522C0.0768712 2.87323 0 6 0 6V0Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_5_2">
<rect width="6" height="6" fill="white"/>
</clipPath>
</defs>
</svg>

</>}

export default corner