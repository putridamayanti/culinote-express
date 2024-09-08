const OpenAI = require('openai');
const {v2: cloudinary} = require("cloudinary");
const {DeleteFile} = require("../utils/helper");

const openai = new OpenAI();

exports.SearchRecipeByImages = async (req, res) => {
    const images = [];
    for (const e of req.files) {
        const result = await cloudinary.uploader.upload(e.path , {
            folder:'culinote',
            resource_type: 'auto',
            use_filename: true
        });

        if (!result.secure_url) {
            return res.status(400).send({data: 'Failed to upload'})
        }

        if (result.secure_url) {
            await DeleteFile(e.path);
        }

        images.push(result.secure_url);
    }

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "Generate recipe" },
                    ...images.map((item) => ({
                        type: "image_url",
                        image_url: {
                            "url": item,
                        },
                    }))
                ],
            },
        ],
    });

    return res.status(200).send({data: response})
}