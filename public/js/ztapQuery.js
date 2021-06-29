//Alert Queries
const { default: axios } = require('axios');
const https = require('axios');
let apiAuth = require("../../apiKey")

let weeklyAlert, dailyAlert, filters, product;

const options = {
    hostname: 'portalapi.threatanalytics.io',
    port: 443,
    path: '/api/1.5/incidents/?-Sort%20By=Incident%20Created&Incident%20Created=1week&Incident%20Status=Open&Organization=poolcorp&Product=azure_sentinel&fields=32',
    method: 'GET',
    headers: {
        'authorization': apiAuth.key,
        'x-organization': apiAuth.xOrg
    }
  };
 

//Last Week https://portalapi.threatanalytics.io/api/1.5/incidents/?-Sort%20By=Incident%20Created&Incident%20Created=1week&Incident%20Status=Open&Organization=poolcorp&Product=azure_sentinel&fields=32
//Need to get "total" key for alert count
let getWeeklyAlert = function(){
    axios.get('https://portalapi.threatanalytics.io/api/1.5/incidents/?-Sort%20By=Incident%20Created&Incident%20Created=1week&Incident%20Status=Open&Organization=poolcorp&Product=azure_sentinel&fields=32', {
        headers: {
            'authorization': apiAuth.key,
            'x-organization': apiAuth.xOrg
        }
    })
    .then(result => {
        console.log(result.data.total)
    })
    .catch(error => {
        console.log(error)
    })
    
}
getWeeklyAlert();






//Last Day: https://portalapi.threatanalytics.io/api/1.5/incidents/?-Sort%20By=Incident%20Created&Incident%20Created=1day&Organization=Bregal%20Investments%2FSagemount&Product=devo&assigned%20escalation%20path=product%20tuning%20%28criticalstart%20mdr%29&fields=32&incident%20status=Open
let getDailyAlert = function(total){
    
}

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
