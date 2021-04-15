let orgName, endpointCount, endpointDeployed, product, alertCountWeekly, alertCountDaily, alertCounts;
let status = ["hold", "tuning", "production","playbook"]
let orgProduct = {};



let createProduct = function(orgName, endpointCount, endpointDeployed, product){
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




createProduct("organization1",2000,1025,"XDR");

//If XDR product, add policy/group name 
if (orgProduct["product"] == 'XDR'){
    let groups = []
    function addGroup(groupName, exploit, malware){
        let group = {}
        group["groupName"] = groupName
        group["exploit"] = exploit
        group["malware"] = malware
        groups.push(group)

    }
    let addNewGroup = true
    if(addNewGroup == true){
        addGroup("test group", "phase 1", "phase 2")
    } else{
        console.log("No more groups to be added")
    }
    
    // console.log(groups)

    orgProduct["groups"] = groups    
}

//If S1 product, add site and groups

//If Siem, add log sources


console.log(orgProduct);



