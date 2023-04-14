const profileModel = require('../profile/model')

exports.getProfile = async () => {
    const profile = await profileModel.find();
    return profile
}

exports.getProfileById = async (id) => {
    const profiles = await profileModel.findById(id)
    return profiles;
}

exports.insert = async (body) => {
    console.log(body)
    const profile = new profileModel({
        name: body.profile,
    })
    await profile.save()
}

exports.update = async (id, body) => {
    await profileModel.updateOne(id, {
        name: body.profiles_name,
        gender: body.profile_gender,
        birthday: body.profiles_birthday,
        address: body.profile_address,
        phone: body.profile_phone,
        user_id: body.user_id,
    });
}

exports.delete = async (id) => {
    await profileModel.deleteOne(id);
}