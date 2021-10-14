let Services = require('../../../services');



const createRenterProfile = async (req, res) => { 

    let renterProfileData = req.body.renterProfileData;
    let errorMessage = "Could not create renter profile\n";
    let flag = true;

    //make sure the user is already in the system
    await Services.userService.getUserWithUserId(renterProfileData.userId).then(existingUser => {
        if (existingUser == null){
            errorMessage += "userId is not associated with a user document."
            flag = false;
        }
    })

    //make sure that user doesn't already have a renter profile, in which case they should be updating and not creating
    await Services.renterProfileService.getRenterProfileWithUserId(renterProfileData.userId).then(existingRenterProfile => {
        if (existingRenterProfile != null){
            errorMessage += "userId is associated with a renter profile";
            flag = false;
        }
    })


    if (flag){
        Services.renterProfileService.createRenterProfile(renterProfileData).then(newRenterProfile => {
            if (newRenterProfile.userId){
                res.status(200).send();
            } else {
                res.status(400).send(errorMessage)
            }
        })
    } else {
        res.status(400).send(errorMessage);   
    }


    
}

const getRenterProfile = (req, res) => {
    let operator = req.body.operator;
    let query = req.body.query;

    switch(operator){
        case "userId":
            Services.renterProfileService.getRenterProfileWithUserId(query).then(renterProfile => {
                if (renterProfile){
                    res.status(200).send(renterProfile);
                }
                else {
                    res.status(400).send();
                } 
            })
        break;

        case "criteria":
            Services.renterProfileService.getRenterProfilesMatchingCriteria(query).then(renterProfiles => {
                if (renterProfiles){
                    if (renterProfiles.length == 0){
                        res.status(204).send();
                    } else {
                        res.status(200).send(renterProfiles);
                    }
                }
                else {
                    res.status(400).send();
                } 
            })
        break;
    }
   
    
    
}


const updateRenterProfile = (req, res) => { 
    let updatedRenterProfileData = req.body.updatedRenterProfileData;

    
    Services.renterProfileService.updateRenterProfile(updatedRenterProfileData).then(updateSuccess => {
        if (updateSuccess){
            res.status(200).send();

        } else {
            res.status(400).send();

        }
    });
}





module.exports = {createRenterProfile, getRenterProfile, updateRenterProfile}