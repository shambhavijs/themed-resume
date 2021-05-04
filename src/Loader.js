import React from 'react';
import './loader.css';

function Loader() {
    return(
        <div className="loading-div">
            <img src="/Spinner.svg" alt="loader"/>
        </div>
    );
}

export default Loader;