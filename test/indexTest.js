//const expect = require("chai").expect;
const assert = require("chai").assert;
const index = require('../index.js');


describe("aws gateway function for get url geoip info", function() {
    describe("verifies whether blank url is checked", function() {
        // TODO: implement test to check the api call return is as expected
        // TODO: implement test for the async and event event.queryStringParameters && event.queryStringParameters.ipAddress
        /*it("returns api call from endpoint", function() {
            let apiUrl = 'https://freegeoip.app/json/';
            let endpoint = apiUrl + 'google.com';
            var google = index.handler();

            expect(google).to.equal("{\"ip\":\"2a00:1450:4001:824::200e\",\"country_code\":\"DE\",\"country_name\":\"Germany\",\"region_code\":\"HE\",\"region_name\":\"Hesse\",\"city\":\"Frankfurt am Main\",\"zip_code\":\"60313\",\"time_zone\":\"Europe/Berlin\",\"latitude\":50.1188,\"longitude\":8.6843,\"metro_code\":0}");
        });*/
        it("returns false when passed empty url string", function() {
           assert.equal(false, index.checkForBlankUrl(""));
        });

        it("returns true when passed a non-empty url string", function() {
            assert.equal(true, index.checkForBlankUrl("https://google.com"));
        });
    })
});