let express = require("express");
let app = express();

app.listen(3000, () => console.log("Éxito en puerto 3000"));

app.use(express.static("./public"));
app.set("view engine", "ejs");

let rutasMain = require("./routes/main.js");
let rutasUser = require("./routes/user.js");

app.use("/", rutasMain);
app.use("/user", rutasUser);