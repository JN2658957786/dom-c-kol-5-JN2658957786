import React from "react";

const Svg = ({ color = "#D9D9D9" }) => {

    return <>
        <svg width="55" height="40" viewBox="0 0 55 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="55" height="40" fill="none" />
            <g clip-path="url(#clip0_0_1)">
                <path d="M9.75955 3.57953C10.3253 1.46815 12.2387 0 14.4246 0V0C17.6002 0 19.9116 3.01227 19.0896 6.07968L10.9592 36.4205C10.3934 38.5319 8.48006 40 6.29418 40V40C3.11855 40 0.807195 36.9877 1.62917 33.9203L9.75955 3.57953Z"
                    fill={color} />
                <path d="M25.1671 4.44698C25.87 1.82393 28.247 0 30.9626 0L38.5393 0C42.4845 0 45.356 3.74226 44.3348 7.55302L36.8317 35.553C36.1288 38.1761 33.7517 40 31.0361 40H23.4595C19.5143 40 16.6428 36.2577 17.664 32.447L25.1671 4.44698Z"
                    fill={color} />
                <path d="M50.3881 3.62221C50.9607 1.48565 52.8968 0 55.1088 0V0V40H48.4595C44.5143 40 41.6428 36.2577 42.664 32.447L50.3881 3.62221Z"
                    fill={color} />
            </g>
            <defs>
                <clipPath id="clip0_0_1">
                    <rect width="55" height="40" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </>
}

export default Svg