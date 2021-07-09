var express = require('express');
var router = express.Router();
var ztap = require('../public/js/ztapQuery');
let apiAuth = require("../apiKey")


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://' + apiAuth.dbUser + ':' + apiAuth.password + '@cluster0.br9xr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
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
            deployed: data.license.verified,
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


//Get weekly and daily alert count
function saveCounts(org, prod){

    alertObj = {}

    ztap.getWeeklyAlert(org, prod)
    .then(data => {
        alertObj['weekly'] = data.total;            
    })
    .catch(err => console.log(err))
    
    
    ztap.getDailyAlert(org, prod)
    .then(data => {
        alertObj['daily'] = data.total; 
    })
    .catch(err => console.log(err))

    let delayInMilliseconds = 3000;
    setTimeout(function(){
        console.log(alertObj) 
    }, delayInMilliseconds) 
}

//Search Document for psaid and product



//Save alert counts to docs

    

    
   

/* GET home page. */

router.get('/', function(req, res, next) {
    Product.find({}, function(err, products){
        res.render('index', { 
            title: 'Product Planner', 
            products: products,
      
        });
        
    })

    console.log(Product.findOne({psa_id: 'ahernrentals'}).exec());
    
    
});


module.exports = router;
