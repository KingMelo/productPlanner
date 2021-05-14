var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kingpen2:Kestrel24!@cluster0.br9xr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;


//Product, Comment, Alert Schemas
const commentSchema = new mongoose.Schema({
    content: String, 
    timestamp: String, 
    type: Date
 });

const alertSchema = new mongoose.Schema({
    alertCountWeekly: Number, 
    alertCountDaily: Number, 
    timestamp: Date
});

const groupSchema = new mongoose.Schema({
    groupName: String
})

const productSchema = new mongoose.Schema({
    orgName: String,
    endpointCount: Number,
    endpointDeployed: Number,
    product: String,
    status: String,
    groups: [groupSchema],
    alertCounts: [alertSchema],
    comments: [commentSchema]
    
})

const Product = mongoose.model('Product', productSchema);

//Create Organization with Product
let createProduct = function(orgName, endpointCount, endpointDeployed, product, status){
    let orgProduct = {};

    
    //Name of org, product, endpointCount, Status
    orgProduct["orgName"] = orgName
    orgProduct["endpointCount"] = endpointCount
    orgProduct["endpointDeployed"] = endpointDeployed
    orgProduct["product"] = product
    orgProduct["status"] = status;
    
    //Alert Count & Log
    alertCounts = []
    orgProduct["alertCounts"] = alertCounts

    //Add comment section
    let comments = []
    orgProduct["comments"] = comments;

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
        orgProduct["groups"] = groups  


        //Define product model
        const newOrg = new Product(
            { 
                orgName: orgName, 
                endpointCount: endpointCount, 
                endpointDeployed: endpointDeployed, 
                product: product, 
                status: status,
                groups: groups,
                alertCounts: alertCounts,
                comments: comments
            }
        );

        //Add to DB
        // db.on('error', console.error.bind(console, 'connection error:'));
        // db.once('open', function() {
        //     console.log("Connected to DB")
        //     console.log("Adding new org " + orgName)
            
        //     newOrg.save(function(err, newOrg) {
        //         if (err) return console.error(err);
        //     })
        // });
        
    }
}

createProduct("organization 3",2000,1025,"XDR","tuning");
// createProduct("organization2",500,25,"XDR");

let orgProductList = []

Product.find(function (err, products) {
    if (err) return console.error(err);
    orgProductList.push(products)
})

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
  //res.send(orgProductList)
});

module.exports = router;
