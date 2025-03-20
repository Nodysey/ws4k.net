const express = require('express');
const path = require('path');
const fs = require('fs').promises
const app = express();
const PORT = 80;

/*function getLocalIp(){
    'use strict';

    const { networkInterfaces } = require('os');

    const nets = networkInterfaces();
    const results = {}; // Or just '{}', an empty object

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    return results["en0"][0]
}*/

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {console.log("kmar is on")});
