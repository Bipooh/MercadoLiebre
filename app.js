let express = require("express");
let app = express();
let session = require("express-session");
let cookieParser = require("cookie-parser");
let recordarMiddleware = require("./middleware/recordarMiddleware");

app.listen(3000, () => console.log("Éxito en puerto 3000"));

app.use(express.static("./public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({ secret: "Secreto!!!" }));
app.use(recordarMiddleware);

let rutasMain = require("./routes/main.js");
let rutasUser = require("./routes/user.js");

app.use("/", rutasMain);
app.use("/user", rutasUser);