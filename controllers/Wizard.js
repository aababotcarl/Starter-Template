const db = require('../models');
const Template = db.Template;
const Product = db.Product;
const FileUpload = db.FileUpload;
const User = db.User;
var dbFile='';
var guid='';
var cmd='';
var args='';
const stripeconfig = require('../config/stripeconfig.json');
const stripeSecretKey = stripeconfig.STRIPE_SECRET_KEY;
const stripePublishKey = stripeconfig.STRIPE_PUB_KEY;
var stripe = require('stripe')("sk_test_8rK2xXnFgnkVJX9yRZ3VVVwW");
const uuidv1 = require('uuid/v1');
const util = require('util');
const path = require('path');
const formidable = require('formidable');
const exec = util.promisify(require('child_process').exec);
var guid = uuidv1();
var cmd, args='';
var templateId=0;
var amount=0;
var dbFile;

  //create page for entity
  exports.GetStarted = (req, res) => {
    Template.findAll().then((list) => {res.render('Wizard/index.ejs', {result: list});});
  };

  //upload file as a new function
  exports.BuildApp = async (req, res) => {
    //let's generate a guid so we can track our users' experience
     this.guid = uuidv1();
    var templateId = '';
    var stripeToken='';
    var dbFile='';
    var amount=0;
    var downloadApp=guid;
    var form = new formidable.IncomingForm(),
    fields = [];
   //parse the form
   form.parse(req, function(err, name, field, fiels){

   })
   .on('field', function(field, value){
     console.log(field, value);
     fields.push([field, value]);
   })
   .on('fileBegin', (name, file)=> {
     file.path = '/home/carl/aababot/Files/Uploads/' + file.name;
   })
   .on('end', function(){
     /*===============================================================
      Set all the variables we need to make this a smooth process 
      ===============================================================*/
      this.downloadApp = uuidv1();
      this.dbFile = fields[0][1];
      this.stripeToken = fields[1][1];
      this.templateId = fields[2][1];
      this.amount = fields[3][1];

     /* ================================================================
        1) Have user pay for the app they're generating using Stripe SDK
        2) Grab the script we're going to run
        3) Run script then shoot it back to the Download page
     ===================================================================*/

      // 1) Have user pay for the app they're generating using the Stripe SDK
       if(this.stripeToken && this.amount){
        var charge = stripe.charges.create({
          amount: this.amount,
           currency: 'usd',
           source: this.stripeToken
         }, function(err, charge){
           if(err){
             console.log('Received and error charging card ' + err);
           }
           console.log('Charged the customer successfully.');
         }); 
      } 

      // 2) Grab the script we're going to run by seeing which template we're generating by the customers' selection
      // and set args command 
      this.args = this.dbFile + ' ' + this.downloadApp;
      this.templateId = parseInt(this.templateId);

      if(this.templateId == 1 || this.templateId == '1'){
        console.log('this is true this is true this is true');
        this.cmd = 'sh /home/carl/aababot/Files/bash/webapi.sh ' + this.args;
        console.log(this.cmd);
      }
        
       
      if(this.templateId == 2 || this.templateId == '2'){
        console.log('this is true this is true this is true');
        this.cmd = 'sh /home/carl/aababot/Files/bash/webapp.sh ' + this.args;
        console.log(this.cmd);
      }
        
      if(this.templateId == 3 || this.templateId == '3'){
        console.log('this is true this is true this true');
        this.cmd = 'sh /home/carl/aababot/Files/bash/webpack.sh ' +this.args;
        console.log(this.cmd);
      }
      console.log('Our command is the following ' +this.cmd);

     // 3) execute our script for the customer
     const exec = require('child_process').exec;
     console.log('running command now ' +this.cmd);
          var yourscript = exec(this.cmd,
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });  
    
     if(this.downloadApp){
      res.render('Wizard/Download.ejs', {downloadApp: this.downloadApp});
    }
   })
  
   
   console.log('We are done.');
  };

  exports.DownloadApp = async function(req, res) {
    var id = req.downloadApp;
    var filePath = '/home/carl/aababot/public/Downloads/';
    var filename=id+'.zip';
    res.download(filePath, filename);
  }
  

  //run the script
 function runScript(command) {
    try{
    exec(command);
    }
    catch(err){
      console.log(err.toString());
    }
    
  }