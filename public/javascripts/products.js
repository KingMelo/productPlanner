let orgName, endpointCount, endpointDeployed, product, alertCountWeekly, alertCountDaily, alertCounts;
let status = ["hold", "tuning", "production"]
let orgProduct = {};

orgName = "Organization1"
endpointCount = 2000
endpointDeployed = 1025
product = "XDR"

let createXDRProduct = function(){
    //Name of org, product, endpointCount
    orgProduct["orgName"] = orgName
    orgProduct["endpointCount"] = endpointCount
    orgProduct["endpointDeployed"] = endpointDeployed
    orgProduct["product"] = product
    
    //Status
    orgProduct["status"] = status[1];
    
    //Alert Count
    alertCountWeekly = 100
    alertCountDaily = 24
    let alertTimestamp = "3-10-2021"
    
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

    //Add comment section
    createCommentSection();
    }


let createCommentSection = function() {
    //Create comment object
    let comment = [
        {
            "content":"",
            "timestamp":"",
            "type": ""
        }
    ]
    orgProduct["comments"] = comment;
}


if (product == "XDR"){
    createXDRProduct();
}

orgProduct["alertCounts"].unshift({"alertCountWeekly":50, "alertCountDaily":12, "timestamp":"3-13-2021"})

console.log(orgProduct);


export {orgName,endpointCount,endpointDeployed,product,orgProduct,alertCountWeekly, alertCountDaily, alertCounts};