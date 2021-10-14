var schemas = require('./_schemas');
var mongoose = require('mongoose')
const renterProfileModel = mongoose.model('renter_profile', schemas.renterProfile);




const insertRenterProfile = async (renterProfileData)=>{
   
    let renterProfile = new renterProfileModel(renterProfileData);
    let savedRenterProfile = await renterProfile.save();

    return savedRenterProfile;

}

const getRenterProfileWithUserId = async (id) => {

    let renterProfile = await renterProfileModel.findOne({userId: id});
    return renterProfile;
}

const updateRenterProfile = async (updatedRenterProfileData) => {
    let flag = await renterProfileModel.findOneAndUpdate({userId: updatedRenterProfileData.userId}, updatedRenterProfileData, {new: true});
    return flag;
}

const getRenterProfilesMatchingCriteria = async (criteria) => {
   
    let renterProfiles = await renterProfileModel.find(criteria);
    return renterProfiles;
}

//THIS IS ONLY HERE FOR TESTING. IN PRODUCTION THERE IS NO MECHANISM TO DELETE RENTER PROFILE, BY DESIGN
const deleteRenterProfileWithId = async (id) => {
    await renterProfileModel.findByIdAndDelete(id);
} 

module.exports = {deleteRenterProfileWithId,insertRenterProfile, getRenterProfileWithUserId, updateRenterProfile, getRenterProfilesMatchingCriteria} 