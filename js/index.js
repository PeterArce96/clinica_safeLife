'use strict';

import header from "./header.js";


const documentReady = () => {
    header();
}

document.addEventListener('DOMContentLoaded', documentReady);