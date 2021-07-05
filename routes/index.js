var express = require('express');
var router = express.Router();
var ztap = require('../public/js/ztapQuery');
let apiAuth = require("../apiKey")

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kingpen2:' + apiAuth.password + '@cluster0.br9xr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
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
    productId: String,
    status: String,
    psa_id: String,
    licenseStart: String,
    alertCount: Number,
    groups: [groupSchema],
    alertCounts: [alertSchema],
    comments: [commentSchema]
    
})

const Product = mongoose.model('Product', productSchema);



ztap.getProduct(2376)
    .then(data => {
        let obj = {
            orgName: data.organization.name,
            orgId: data.organization.id,
            psaId: data.organization.psa_id,
            productId: data.name,
            productName: data.name_label,
            status: data.status,
            ztapId: data.id,            
            installDate: data.install_date,
            licenseCount: data.license.purchased,
            deployed: data.license.verified
        }

        //Save Product to db
        const newOrg = new Product(
            { 
                orgName: obj.orgName, 
                psa_id: obj.psaId,
                endpointCount: obj.licenseCount, 
                endpointDeployed: obj.deployed, 
                productId: obj.productId, 
                product: obj.productName,
                status: obj.status,
                
                
                // groups: groups,
                // alertCounts: alertCounts,
                // comments: comments
            }
        );
        
        console.log(obj)
        

        //Add to DB
        // db.on('error', console.error.bind(console, 'connection error:'));
        // db.once('open', function() {
        //     console.log("Connected to DB")
        //     console.log("Adding new org " + newOrg)
            
        //     newOrg.save(function(err, newOrg) {
        //         if (err) return console.error(err);
        //     })
        // });

    })
    .catch(err => console.log(err))





/* GET home page. */

router.get('/', function(req, res, next) {
    Product.find({}, function(err, products){
        res.render('index', { 
            title: 'Product Planner', 
            products: products,
      
        });
    })
});


module.exports = router;
