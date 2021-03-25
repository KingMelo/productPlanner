import { orgName,endpointCount,endpointDeployed,product,orgProduct,alertCountWeekly, alertCountDaily, alertCounts } from './products.js';

let createXDRProduct = function(){
    //Name of org, product, endpointCount
    orgProduct["orgName"] = orgName
    orgProduct["endpointCount"] = endpointCount
    orgProduct["endpointDeployed"] = endpointDeployed
    orgProduct["product"] = product
    
    //Status
    let status = "Tuning";
    orgProduct["status"] = status;

    //BIOC 
    let bioc = "Not Applied"
    orgProduct["bioc"] = bioc;
    
    //Alert Count
    alertCountWeekly = 100
    alertCountDaily = 24
    alertTimestamp = "3-10-2021"
    
    //Log of alert counts
    alertCounts = [
        {
        "alertCountWeekly":alertCountWeekly, 
        "alertCountDaily": alertCountDaily, 
        "timestamp":alertTimestamp
        }
    ]
    orgProduct["alertCounts"] = alertCounts
    
    
    
    //Create function for adding groups
    let groups = [];
    groups.push({"groupName":"Group1","policy":"Phase1"});
    groups.push({"groupName":"Group2","policy":"Phase2"});
    
    //Add all groups as a property to orgProduct
    orgProduct["groups"] = groups;
    }

    export {createXDRProduct};