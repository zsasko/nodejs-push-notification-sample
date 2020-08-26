const PushDevice = require("../models/index")["PushDevice"];
const { body, check, validationResult } = require("express-validator");
const gcm = require("node-gcm");

module.exports = {
  getHomePage: (req, res) => {
    res.render("index.ejs", {
      user: req.user,
    });
  },

  sendMessage: [
    [
      check("message")
        .isLength({ min: 2 })
        .withMessage("Message must be at least 2 chars long."),
    ],
    async (req, res, next) => {
      const errors = validationResult(req);
      //
      if (!errors.isEmpty()) {
        return res.status(422).send({ success: false, errors: errors.array() });
      }
      //
      let message = req.body.message;

      const androidDeviceTokens = await PushDevice.findAll({
        attributes: ["token"],
        where: {
          platform: "android",
        },
      });
      const tokensArray = androidDeviceTokens.map((u) => u.get("token"));

      // Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
      var sender = new gcm.Sender(process.env.FCM_SERVER_KEY);

      // Prepare a message to be sent
      var gcmMessage = new gcm.Message();
      gcmMessage.addNotification("title", "You have received push notification!");
      gcmMessage.addNotification("body", message);

      // Actually send the message
      sender.send(gcmMessage, { registrationTokens: tokensArray }, function (
        err,
        response
      ) {
        if (err) console.error(err);
        else console.log(response);
      });

      return res.status(201).send({ success: true });
    },
  ],

  sendToken: [
    [
      check("uuid")
        .isLength({ min: 2 })
        .withMessage("UUID must be at least 2 chars long."),
      check("token")
        .isLength({ min: 2 })
        .withMessage("Token must be at least 2 chars long."),
      check("platform").isIn(["android", "ios"]),
    ],
    async (req, res, next) => {
      const errors = validationResult(req);
      //
      if (!errors.isEmpty()) {
        return res.status(422).send({ success: false, errors: errors.array() });
      }
      //
      let uuid = req.body.uuid;
      let token = req.body.token;
      let platform = req.body.platform;
      //
      const whereQuery = {
        uuid: uuid,
        platform: platform,
      };
      try {
        // creates 'push device' if it doesn't exist
        await PushDevice.findOrCreate({
          where: whereQuery,
        });
        // update token
        await PushDevice.update({ token: token }, { where: whereQuery });
        return res.status(201).send({ success: true });
      } catch (error) {
        console.log(error);
      }
      return res.status(500).send({ success: false });
    },
  ],
};
