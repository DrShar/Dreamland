//Server template credit to Alessio Bonti - found at: https://github.com/alexbonti/deakin-crowds/blob/master/server.js
var dbConnection = require('./services/database/dbConnection')
var express = require("express");
var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// let dbConnection = require('./dbConnection.js');

let http = require('http').createServer(app);
let io = require('socket.io')(http);

var sockets = require('./util/sockets');
sockets.connect(io);




var port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(__dirname + '/public'));


let userRoute = require('./routes/users/user');
let propertyRoute = require('./routes/users/landlord/property');
let renterProfileRoute = require('./routes/users/renter/renterProfile');
let applicationRoute = require('./routes/transactions/application');
let applicationRequirementSorter = require ('./routes/transactions/applicationRequirementSorter');


app.use('/user', userRoute);
app.use('/property', propertyRoute);
app.use('/renter_profile', renterProfileRoute);
app.use('/application', applicationRoute)
app.use('/filter/application_requirements', applicationRequirementSorter);



const test = () => {
  
  Service = require('./services');
  db = require('./services/database')
  try {
    Service.userService.getMultipleUsersWithPersonalInfoQuery({}).then( async users => {
      users.forEach (async user => {
          let id = user._id.toString();          
          await Service.userService.deleteUserWithUserId(id);
      })
    })
  } 
  catch{}

  try{
    Service.renterProfileService.getRenterProfilesMatchingCriteria({}).then( async rps => {
      rps.forEach(async rp => {
        let id = rp._id.toString();
        await db.renterProfileDocConnection.deleteRenterProfileWithId(id);
      })
    })
  
  }
  catch{}
    
  return true;

}

app.post('/test/:api', async (req, res) => {
    let Controller, Service, db;
    let api = req.params.api;
    switch(api){
      case "cleanDB":
        await test();
        res.send('Complete');
      break;
      case 'user1':
          Controller = require('./controllers/users/userController');
          req.body = {
            firstName: "",
            lastName: "Simpson",
            email: "eatmy@shorts.com",
            postcode: 3000
          };
  
          Controller.createUser(req, res);
        break;
  
        case 'user2':
          Controller = require('./controllers/users/userController');
          req.body = {
            firstName: "Bart",
            lastName: "",
            email: "eatmy@shorts.com",
            postcode: 3000
          };
  
          Controller.createUser(req, res);
        break;
  
        case 'user3':
          Controller = require('./controllers/users/userController');
          req.body = {
            firstName: "Bart",
            lastName: "Simpson",
            email: "eatmy@shorts.com",
            postcode: ""
          };
  
          Controller.createUser(req, res);
        break;
  
        case 'user4':
          Controller = require('./controllers/users/userController');
          req.body = {
            firstName: "Bart",
            lastName: "Simpson",
            email: "",
            postcode: 3000
          };
  
          Controller.createUser(req, res);
        break;
  
        case 'user5':
          Controller = require('./controllers/users/userController');
          Service = require('./services/users/userService');

         
          req.body = {
            firstName: "Bart",
            lastName: "Simpson",
            email: "eatmy@shorts.com",
            postcode: 3000
          };
  
          Controller.createUser(req, res);
        break;

        case 'user6':
          Controller = require('./controllers/users/userController');
         

          req.body = {
            firstName: "Bart",
            lastName: "Simpson",
            email: "eatmy@shorts.com",
            postcode: 3000
          };
  
          Controller.createUser(req, res);
        break;

        case 'rp1':
          Controller = require('./controllers/users/renter/renterProfileController');
          req.body = {
            "renterProfileData": {
             "userId": "a bad user id",
             "employment": {
                 "employer": "self-employed",
                 "lengthOfEmployment": "2 months",
                 "position": "", 
                 "monthlyIncome": 1000
             },
             "personalReferences": [
                 {
                     "name": "Alma Forsyth",
                     "contactNumber": 10000000,
                     "email": "y@hoo.com",
                     "relationship": "Cocaine Dealer"
                 }
             ],
             "professionalReferences": [
                 {
                     "name": "Pablo Escobar",
                     "contactNumber": 1800000000,
                     "email": "stickylover@live.com.au",
                     "relationship": "Confidant"
                 }
             ],
             "pets": [
                 {
                     "species": "dog",
                     "breed": "spoodle",
                     "size": "medium",
                     "age": 8
                 },
                 {
                     "species": "dog",
                     "breed": "pound special",
                     "size": "medium",
                     "age": 10
                 }
             ], 
             "children": 2,
             "rentalHistory": [
                 {
                     "address": "90 the avenue, parkville 3052",
                     "landlordName": "Jessica Alba",
                     "landlordEmail": "Parasite420@gmail.com",
                     "landlordContactNumber": 666,
                     "lengthOfTenancy": 1,
                     "bondConditions": {"bondReturned": true, "reasonBondWitheld": "", "amountWitheld": 0},
                     "evicted": false,
                     "rentalAgreementBroken": false
                 }
             ],
             "smoker": false,
             "preferredMoveInDate": "2022.02.02",
             "committedOfCrime": false}
         }

         Controller.createRenterProfile(req, res)


        break;

        case 'rp2':
          Controller = require('./controllers/users/renter/renterProfileController');
          Service = require('./services/users/userService');
          let userId = await Service.getUserWithPersonalInfoQuery({email: "evilbart@live.com"});
          userId = userId._id;
          req.body = {
            "renterProfileData": {
             "userId": userId,
             "employment": {
                 "employer": "self-employed",
                 "lengthOfEmployment": "2 months",
                 "position": "", 
                 "monthlyIncome": 1000
             },
             "personalReferences": [
                 {
                     "name": "Alma Forsyth",
                     "contactNumber": 10000000,
                     "email": "y@hoo.com",
                     "relationship": "Cocaine Dealer"
                 }
             ],
             "professionalReferences": [
                 {
                     "name": "Pablo Escobar",
                     "contactNumber": 1800000000,
                     "email": "stickylover@live.com.au",
                     "relationship": "Confidant"
                 }
             ],
             "pets": [
                 {
                     "species": "dog",
                     "breed": "spoodle",
                     "size": "medium",
                     "age": 8
                 },
                 {
                     "species": "dog",
                     "breed": "pound special",
                     "size": "medium",
                     "age": 10
                 }
             ], 
             "children": 2,
             "rentalHistory": [
                 {
                     "address": "90 the avenue, parkville 3052",
                     "landlordName": "Jessica Alba",
                     "landlordEmail": "Parasite420@gmail.com",
                     "landlordContactNumber": 666,
                     "lengthOfTenancy": 1,
                     "bondConditions": {"bondReturned": true, "reasonBondWitheld": "", "amountWitheld": 0},
                     "evicted": false,
                     "rentalAgreementBroken": false
                 }
             ],
             "smoker": false,
             "preferredMoveInDate": "2022.02.02",
             "committedOfCrime": false}
         }

         Controller.createRenterProfile(req, res)


        break;

        
      }
  });
  
  
  app.get('/test/:api', async (req, res) => {
    let Controller; 
    let api = req.params.api;
    let userId = "";
    switch(api){
      
      case 'user1':
        Controller = require('./controllers/users/userController');
        req.body = {
          operator: "",
          query:""
        };
  
        Controller.getUser(req, res);
      break;
  
      case 'user2':
        Controller = require('./controllers/users/userController');
        req.body = {
          operator: "userId",
          query:"false id"
        };
  
        Controller.getUser(req, res);
      break;
  
      case 'user3':
        Controller = require('./controllers/users/userController');
        let Service = require('./services/users/userService');
  
        // try {
        //   let lisa = await (Service.getUserWithPersonalInfoQuery({firstName: "Lisa"}));
        //   await Service.deleteUserWithUserId(lisa._id);
        // } catch{

        // }
        userId = await Service.createUser({firstName: "Lisa", lastName: "Simpson", postcode: 1000, email: "lisa's email"});

        req.body = {
          operator: "userId",
          query: userId
        };
  
        Controller.getUser(req, res);
      break;
  
      case 'user4':
        Controller = require('./controllers/users/userController');
  
        req.body = {
          operator: "userId",
          query: "a bad userId"
        };
  
        Controller.getUser(req, res);
      break;
  
      case 'user5':
        Controller = require('./controllers/users/userController');
  
        req.body = {
          operator: "personalInfoQuery",
          query: {firstName: "Lisa"}
        };
  
        Controller.getUser(req, res);
      break;
  
      case 'user6':
        Controller = require('./controllers/users/userController');
  
        req.body = {
          operator: "personalInfoQuery",
          query: {firstName: "Moe"}
        };
  
        Controller.getUser(req, res);
      break;
  
      case 'user7':
        Controller = require('./controllers/users/userController');
  
        req.body = {
          operator: "multipleUsers",
          query: {firstName: "Moe"}
        };
  
        Controller.getUser(req, res);
      break;
  
      
      case 'user8':
        Controller = require('./controllers/users/userController');
  
        req.body = {
          operator: "multipleUsers",
          query: {}
        };
  
        Controller.getUser(req, res);
      break;
  
       
      }
  });
  
  app.delete('/test/:api', async (req, res) => {
    let Controller; 
    let api = req.params.api;
  
    switch(api){
      case "user1":
        Controller = require('./controllers/users/userController');
        req.body = {userId: 'a bad id'};
        Controller.deleteUser(req, res);
      break;

      case "user2":
        Controller = require('./controllers/users/userController');
        let db = require('./services/database/userDocConnection');

        let temp = await db.insertUser({
          firstName: "Moe",
          lastName: "Sizlak",
          postcode: 3150,
          email: "moest@vaern.com"
        });

        req.body = {userId: temp._id};
        Controller.deleteUser(req, res);
      break;

      case "user3": 
        Controller = require('./controllers/users/userController');
        Controller.deleteUser(req, res);
      break;
    }
  
  });

app.put('/test/:api', async (req, res) => {
  let Controller, Service;
  let api = req.params.api;

  switch(api){
    case "user1":
      Controller = require('./controllers/users/userController')
      req.body = {
        userUpdated: {
        _id: "a bad id",
        firstName: "Homer"
        }
      };
      Controller.updateUser(req, res);
    break;

    case "user2":
      Controller = require('./controllers/users/userController');
      Service = require('./services/users/userService')
      
      let bartsUserId = await Service.getUserWithPersonalInfoQuery({firstName: "Bart", lastName: "Simpson"});
      bartsUserId = bartsUserId._id.toString();

      req.body = {
        userUpdate: {
        _id: bartsUserId,
        firstName: "Evil Bart",
        email: "evilbart@live.com"

        }
      };
      Controller.updateUser(req, res);
    break;
  }
})

http.listen(port,()=>{
  console.log("Listening on port ", port);
});