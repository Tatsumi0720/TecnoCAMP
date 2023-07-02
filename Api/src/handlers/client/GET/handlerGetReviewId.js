const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY_SECRET } = process.env;
const getUser = require("../../../controllers/admin/GET/getUser");
const getReviewId = require("../../../controllers/client/GET/getReviewsId");

const handlerGetReviewId = async (req, res) => {
    const { productId } = req.query

    const decoToken = await jwt.verify(req.token, KEY_SECRET);

    //2) Traer usuario y verificar si tiene rol Admin
    const user = await getUser(decoToken.sub);

    if (user.rol !== "client") {
        return res
            .status(404)
            .json({ message: "No cuenta con permisos para realizar la peticion" });
    }

    try {
        const reviewId = await getReviewId(productId);
        res.status(200).json(reviewId);
    } catch (error) {
        res.status(202).json({ error: error.message });
    }
}

module.exports = handlerGetReviewId;