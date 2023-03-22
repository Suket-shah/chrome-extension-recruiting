import React from "react";

function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="105"
            height="40"
            viewBox="0 0 105 40"
        >
            <defs>
                <clipPath id="clip-Custom_Size_1">
                    <path d="M0 0H105V40H0z"></path>
                </clipPath>
            </defs>
            <g clipPath="url(#clip-Custom_Size_1)" data-name="Custom Size – 1">
                <g fill="#0077b5" data-name="Path 1">
                    <path d="M0 0h61.341v24H0z" transform="translate(.329 8)"></path>
                    <path
                        fill="rgba(112,112,112,0)"
                        d="M1 1v22h59.34V1H1M0 0h61.34v24H0V0z"
                        transform="translate(.329 8)"
                    ></path>
                </g>
                <text
                    fill="#fff"
                    fontFamily="AdobeClean-Light, Adobe Clean"
                    fontSize="20"
                    fontWeight="300"
                    transform="translate(2 27)"
                >
                    <tspan x="0" y="0">
                        Recruit
                    </tspan>
                </text>
                <text
                    fill="#0077b5"
                    fontFamily="AdobeClean-Bold, Adobe Clean"
                    fontSize="20"
                    fontWeight="700"
                    transform="translate(63 27)"
                >
                    <tspan x="0" y="0">
                        GPT
                    </tspan>
                </text>
            </g>
        </svg>
    );
}

export default Icon;
