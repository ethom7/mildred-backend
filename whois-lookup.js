'use strict';

var whois = require('whois')
// this is a function for future reference
export function lookupWhois(inputString) {
    var returnData = whois.lookup(inputString, function(err, data) {
        console.log(data)
    })
    return returnData;
}


