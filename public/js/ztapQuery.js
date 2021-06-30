//Alert Queries
const { default: axios } = require('axios');
const https = require('axios');
let apiAuth = require("../../apiKey")

let weeklyAlert, dailyAlert, filters, product;

const options = {
    hostname: 'https://portalapi.threatanalytics.io',
    port: 443,
    path: '/api/1.5/incidents/?-Sort%20By=Incident%20Created&Incident%20Created=1week&Incident%20Status=Open&Organization=poolcorp&Product=azure_sentinel&fields=32',
    method: 'GET',
    headers: {
        'authorization': apiAuth.key,
        'x-organization': apiAuth.xOrg
    }
  };
 

let getWeeklyAlert = function(org, product){
    //Get query parameters
    let queryString = options.hostname + '/api/1.5/incidents/?-Sort%20By=Incident%20Created&Incident%20Created=1week&Incident%20Status=Open&Organization=' + org + "&Product=" + product + "&fields=32"
    
    axios.get(queryString, {
        headers: {
            'authorization': apiAuth.key,
            'x-organization': apiAuth.xOrg
        }
    })
    .then(result => {
        console.log(result.data.total + " " + "alerts in the last 7 days")
    })
    .catch(error => {
        console.log(error)
    })
    
}
getWeeklyAlert("ahernrentals", "xdr");






let getDailyAlert = function(org, product){
    //Get query parameters
    let queryString = options.hostname + '/api/1.5/incidents/?-Sort%20By=Incident%20Created&Incident%20Created=1day&Incident%20Status=Open&Organization=' + org + "&Product=" + product + "&fields=32"
    
    axios.get(queryString, {
        headers: {
            'authorization': apiAuth.key,
            'x-organization': apiAuth.xOrg
        }
    })
    .then(result => {
        console.log(result.data.total + " " + "alerts in the last 24 hours")
    })
    .catch(error => {
        console.log(error)
    })
    
}
getDailyAlert("ahernrentals", "xdr");

//Filter: https://portalapi.threatanalytics.io/api/1.5/matchers/?limit=10&ordering=created%3Adesc&page=1&product=devo&psa_id=bregal&typ=filter
let getFilters = function(prodId){
    
}

//Get Product: https://portalapi.threatanalytics.io/api/1.5/subscriptions/1633/
//Check if parent: https://portalapi.threatanalytics.io/api/1.5/organizations/966/ (parent key)
let getProduct = function(){
    //authenticate into ztap
    //Define product and org
    //
}


module.exports = getWeeklyAlert;
