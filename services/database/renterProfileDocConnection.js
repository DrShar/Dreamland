const { profile } = require("console");

const insertRenterProfile = (renterProfileData) => {
    let renterProfile = new renterProfile({renterProfileData});
       

    // save profileApp in the database
    renterProfile.save(profile).then(data => {
        if (data == null){
            return false
        }
    })
        .catch(err =>{
           if (err){
               return false;
           }
        });

    return true;
}

const deleteRenterProfile = (userId) => {
    return true;
}

const getRenterProfile = (userId) => {
    return true;
}

const updateRenterProfile = (app) => {

    return true;
}

module.exports = {insertRenterProfile, deleteRenterProfile, getRenterProfile, updateRenterProfile} 