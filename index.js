// index.js
'use strict';

const https = require('https');

var ipApi = "https://freegeoip.app/json/";

/* this is the code running in the AWS Lambda */

/* wanted to use this library but went with included packages for backend
var whois = require('whois')

export function lookupWhois(inputString) {
    var returnData = whois.lookup(inputString, function(err, data) {
        console.log(data)
    })
    return returnData;
}
 */

exports.handler = async (event) => {
    let ipAddress = "";
    //let domainFileHash = '';
    let url = "";

    if (event.queryStringParameters && event.queryStringParameters.ipAddress) {
        console.log("Received ipAddress: " + event.queryStringParameters.ipAddress);
        ipAddress = event.queryStringParameters.ipAddress;
    }

    // currently unused but wanted to leave the functionality for later use potentially
    /*if (event.body) {
        let body = JSON.parse(event.body)
        if (body.domainFileHash) {
            console.log("Received domainFileHash: " + body.domainFileHash);
            domainFileHash = body.domainFileHash;
        }

    }*/

    if (ipAddress) {
        url = ipApi + ipAddress;
    } /*else if (domainFileHash) {
        url = ipApi + domainFileHash;
    }*/

    if (!checkForBlankUrl(url)) {
        console.log("url is not set. no endpoint to perform against.");
        throw new Error("no url provided, please correct and try again.")
    }

    return httprequest(url).then((data) => {
        const response = {
            statusCode: 200,
            // this is here due to frontend object necessity, eventually this will not be needed
            body: JSON.stringify({"businesses": [data]}),
        };
        return response;
    });
};

function httprequest(url) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET'
        };
        const req = https.request(url, options, (res) => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', (e) => {
            reject(e.message);
        });
        // send the request
        req.end();
    });
}

const checkForBlankUrl = function(url) {
    return Boolean(url);
}

module.exports = { checkForBlankUrl };