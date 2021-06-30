//Alert Queries
const { default: axios } = require('axios');
const https = require('axios');
let apiAuth = require("../../apiKey")

let weeklyAlert, dailyAlert, filters, product;

const options = {
    hostname: 'https://portalapi.threatanalytics.io',
    port: 443,
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




//Get Product: https://portalapi.threatanalytics.io/api/1.5/subscriptions/1633/
//Check if parent: https://portalapi.threatanalytics.io/api/1.5/organizations/966/ (parent key)
let getProduct = function(productNumber){
    
    //Get psaid and name

    //Get product status
    let queryString = options.hostname + '/api/1.5/subscriptions/' + productNumber + '/'
    axios.get(queryString, {
        headers: {
            'authorization': apiAuth.key,
            'x-organization': apiAuth.xOrg
        }
    })
    .then(result => {
        console.log(result.data)
        console.log("Org Name:" + " " + result.data.organization.name)
        console.log("Psaid:" + " " + result.data.organization.psa_id)
        console.log("Product Identifier:" + " " + result.data.name)
        console.log("Product Name:" + " " + result.data.name_label)
        console.log("ZTAP ID:" + " " + result.data.id)
        console.log("Deployment Status:" + " " + result.data.status)
        console.log("Install Date:" + " " + result.data.install_date)
        console.log("Purchased Volume:" + " " + result.data.license.purchased)
        console.log("Deployed:" + " " + result.data.license.verified)    
        
        getDailyAlert(result.data.organization.psa_id, result.data.name)
    })
    .catch(error => {
        console.log(error)
    }) 

    
    
}
getProduct(1220);

module.exports = getWeeklyAlert;
