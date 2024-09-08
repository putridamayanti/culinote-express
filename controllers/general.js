const cloudinary = require('cloudinary').v2;
const {DeleteFile} = require("../utils/helper");

exports.Upload = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path , {
        folder:'culinote',
        resource_type: 'auto',
        use_filename: true
    });

    if (result.secure_url) {
        DeleteFile(req.file.path);
    }

    return res.status(200).send({data: result.secure_url})
}