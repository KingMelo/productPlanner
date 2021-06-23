//Alert Queries
const https = require('https');
let apiAuth = require("../../apiKey")

let weeklyAlert, dailyAlert, filters, product;

const options = {
    hostname: 'portalapi.threatanalytics.io',
    port: 443,
    path: '/api/1.5/matchers/?limit=10&ordering=created%3Adesc&page=1&product=devo&psa_id=bregal&typ=filter',
    method: 'GET',
    headers: {
        'authorization': apiAuth.key,
        'x-organization': apiAuth.xOrg
    }
  };
 

//Last Week https://portalapi.threatanalytics.io/api/1.5/matchers/?limit=10&ordering=created%3Adesc&page=1&product=devo&psa_id=bregal&typ=filter
let getWeeklyAlert = function(total){
    https.get(options,(res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', function(data) {
        let jsonObj = JSON.parse(data);
        let jsonStr = JSON.stringify(jsonObj);
        console.log(jsonStr);
        
    });

    }).on('error', (e) => {
        console.error(e);
    });

    
    
}







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
