const mongoose = require("mongoose");

const User = require("./User");

const mongodbUrl = "";

mongoose.connect(mongodbUrl);

async function run() {
  try {
    const user = await User.findOne({
      name: "Surender",
      email: "suren@test.com",
    });

    await user.save();
    console.log(user);
    //console.log(user.namedEmail);
  } catch (e) {
    console.log(e.message);
  }
}
run();
