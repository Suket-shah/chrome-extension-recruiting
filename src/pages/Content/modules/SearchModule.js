import React from "react";
import queryCleaner from "../utils/QueryCleaner";
import styles from "../styles/SearchModuleStyle";

function SearchModule(props) {

    const queryRef = React.useRef();

    function executeQuery(event) {
        event.preventDefault();
        const enteredQuery = queryRef.current?.value;
        props.searchHandler(enteredQuery, false, false);
    }

    return (
        <div style={styles.searchDivStyle}>
            <form onSubmit={executeQuery}>
                <div style={styles.searchContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" version="1.1" style={styles.svgStyle}>
                        <g id="surface1">
                            <path d="M 12.0625 13.667969 C 11.882812 13.59375 11.753906 13.480469 11.628906 13.359375 C 10.308594 12.035156 8.984375 10.71875 7.671875 9.390625 C 7.523438 9.246094 7.414062 9.222656 7.222656 9.316406 C 5.234375 10.28125 2.941406 9.46875 2.058594 7.4375 C 1.453125 6.039062 1.664062 4.703125 2.632812 3.519531 C 3.351562 2.648438 4.300781 2.238281 5.433594 2.1875 C 7.152344 2.109375 8.632812 3.269531 9.113281 4.800781 C 9.421875 5.796875 9.324219 6.773438 8.847656 7.703125 C 8.78125 7.839844 8.785156 7.921875 8.890625 8.027344 C 9.710938 8.839844 10.527344 9.652344 11.34375 10.464844 C 11.878906 11 12.417969 11.53125 12.957031 12.0625 C 13.105469 12.210938 13.191406 12.402344 13.3125 12.570312 C 13.339844 12.605469 13.335938 12.675781 13.332031 12.730469 C 13.257812 13.410156 12.8125 13.871094 12.0625 13.667969 M 5.726562 9.203125 C 5.941406 9.210938 6.152344 9.164062 6.359375 9.109375 C 8.019531 8.675781 9.089844 6.917969 8.714844 5.257812 C 8.269531 3.28125 6.203125 2.214844 4.402344 2.867188 C 2.75 3.464844 1.835938 5.335938 2.40625 6.996094 C 2.8125 8.179688 4.058594 9.316406 5.726562 9.203125 Z M 5.726562 9.203125 "/>
                        </g>
                    </svg>
                    <input type="text" placeholder="EX. Google Internship AND UT" ref={queryRef} defaultValue={queryCleaner(props.searchQuery)} style={styles.searchBarStyle}/>
                </div>
                {/*<button style={styles.buttonStyle}>*/}

                {/*</button>*/}
            </form>
        </div>
    );
}

export default SearchModule;