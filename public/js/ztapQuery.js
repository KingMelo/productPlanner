//Alert Queries
const { default: axios } = require('axios');

const { response } = require('express');
let apiAuth = require("../../apiKey")




const options = {
    hostname: 'https://portalapi.threatanalytics.io',
    port: 443,
    method: 'GET',
    headers: {
        'authorization': apiAuth.key,
        'x-organization': apiAuth.xOrg
    }
  }; 

  async function getProduct(productNumber){
    
  
    let queryString = options.hostname + '/api/1.5/subscriptions/' + productNumber + '/'
    const promise = axios.get(queryString, {
        headers: {
            'authorization': apiAuth.key,
            'x-organization': apiAuth.xOrg
        }
    })

    const dataPromise = promise.then((response) => response.data)

    return dataPromise

}
   
//Get Parent
function getParent(orgId){
    let queryString = options.hostname + '/api/1.5/organizations/' + orgId + '/'
    axios.get(queryString, {
        headers: {
            'authorization': apiAuth.key,
            'x-organization': apiAuth.xOrg
        }
    }).then(result => {
        obj['parentName'] =  data.parent.name
        obj['parentId'] =  data.parent.psa_id
        // console.log("Parent Name: " + parentName)
        // console.log("Parent psaid: " + parentNameId)      
        
    })
} 


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
        
        console.log( data.total + " " + "alerts in the last 7 days")
    })
    .catch(error => {
        console.log(error)
    })    
}

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
        obj['dailyAlerts'] =  data.total
        console.log( data.total + " " + "alerts in the last 24 hours")
    })
    .catch(error => {
        console.log(error)
    })    
}







exports.getProduct = getProduct;
//exports.getDailyAlert = getDailyAlert;
//exports.getWeeklyAlert = getWeeklyAlert;
