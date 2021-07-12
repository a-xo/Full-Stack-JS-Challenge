// Initial refactoring before separating the logic to controllers and services:

exports.inviteUser = (req, res) => {

  const invitationBody = req.body;
  const shopId = req.params.shopId;
  const authUrl =
    "https://url.to.auth.system.com/invitation";
  let iResponse, cUser;

  
    const shopFoundResponse = function (shopFindErr, shop) {
      if (shopFindErr || !shop) {
        return res
          .status(500)
          .send(
            shopFindErr || { message: "No shop found" }
          );
      }
      if (shop.invitations.indexOf(iResponse.body.invitationId) && shop.users.indexOf(cUser._id) === -1) { 
          shop.users.push(cUser); // add this user
        } else {
          // if user is already in shop.users then set response message to 'user already exists'
        }
  
      shop.save();
    }
    
    const userUpdateResponse = function (userUpdateErr, createdUser) {  // handle response from Mongoose signature (err, data unit)
        cUser = createdUser;
        Shop.findById(shopId).exec(shopFoundResponse);
      }
    
    const handleAuthResponse = function (superagentErr, invitationResponse) {
      iResponse = invitationResponse;
        if (invitationResponse.status === 201) {
          User.findOneAndUpdate(
            {
              authId: invitationResponse.body.authId, // filter
            },
            {
              authId: invitationResponse.body.authId, // update
              email: invitationBody.email,
            },
            {
              upsert: true, // props
              new: true,
            },
            userUpdateResponse // handle response
          );
        } else if (invitationResponse.status === 200) {
            res.status(400).json({
            error: true,
            message: "User already invited to this shop",
          });
          return;
        }
        res.json(invitationResponse);
      }
  
    superagent
      .post(authUrl) // get response from this pass to next line
      .send(invitationBody) 
      .end(handleAuthResponse);
  };