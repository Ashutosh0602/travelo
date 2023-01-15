const userM = require("../modals/user");
const viewM = require("../modals/userPhoto");

exports.traveller = async (req, res) => {
  console.log(req.params);
  const travUser = await userM
    .findOne({
      id: req.params["travellerId"],
    })
    .select("-_id");

  const trav_gallery = await viewM
    .findOne({ userID: req.params["travellerId"] })
    .select("-_id");

  return res.status(200).json({
    status: "success",
    data: travUser,
    gallery: trav_gallery,
  });
};
