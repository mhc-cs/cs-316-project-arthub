const functions = require("firebase-functions");
const axios = require("axios");


exports.createChatEngineUser = functions.auth.user().onCreate((user) => {
  const fullName = user.firstName + " " + user.lastName;
  axios.post(
      "https://api.chatengine.io/users/",
      {
        username: user.fullName,
        secret: user.uid,
        email: user.email,
        first_name: user.displayName,

      },
      {
        headers: {
          "Private-Key": "9786ae66-06c2-4cf0-9898-d93dfee24c39",
        },
      },
  );
});

exports.deleteChatEngineUser = functions.auth.user().onDelete((user) => {
  axios.delete("https://api.chatengine.io/users/me/", {
    headers: {
      "Project-ID": "a50b188a-cb5f-4ff8-960d-60c8a6cf7ffe",
      // "User-Name": user.firstName + " " + user.lastName,
      "User-Name": user.email,
      "User-Secret": user.uid,
    },
  });
});


