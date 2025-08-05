const express = require("express");
const app = express();
const path = require("path");
const userRoutes = require("./routers/user");
const adminRoutes = require("./routers/admin");
const authRoutes = require("./routers/auth");
const sequelize = require("./utility/database");
const dbConfig = require("./utility/dbConfig"); // Burada PostgreSQL bağlantı objesi var
const Settings = require("./models/settings");
const Featured = require("./models/featured");
const Announcements = require("./models/announcements");
const Sections = require("./models/sections");
const Contacts = require("./models/contacts");
const Administor = require("./models/administor");
const bcrypt = require("bcrypt");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session); // PostgreSQL session store





app.set("view engine" , "ejs");
app.set("views", path.join(__dirname,"views"));

// PostgreSQL session store
const sessionStore = new pgSession({
  conObject: {
    user: dbConfig.user,
    password: dbConfig.password,
    host: dbConfig.host,
    port: dbConfig.port || 5432,
    database: dbConfig.database,
    ssl: {
      rejectUnauthorized: false, // Render için gerekli olabilir
    },
  },
});

app.use(session({
  secret: "gizlisifrexx1",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
}));


app.use((req,res,next) =>{
    if(!req.session.user){
        return next();
    };

    User.findByPk(req.session.user.id)
    .then(user =>{
        req.user = user;
        next();
    })
    .catch(err =>{
        console.log(err);
    })
})

app.use((req, res, next) => {
  //res.locals.isAuthenticated = req.cookies.isAuthenticated === "true";
  res.locals.isAuthenticated = req.session.isAuthenticated || false;
  next();
});

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded( { extended : true }));
app.use(express.json());
app.use(userRoutes);
app.use("/admin",adminRoutes);
app.use(authRoutes);


app.use((req,res,next) =>{
    res.status(404);
    res.render("error/404", {
        title : "Not Found Page",
        path : "/404"
    })
})

sequelize
    .authenticate()
        .then(()=>{
            console.log("veri tabanı bağlantısı sağlandı.")
        })
        .catch((error) =>{
            console.log(error);
        })


sequelize.sync()
  .then(async () => {
    const adminCount = await Administor.count();

    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await Administor.create({
        name: "admin",
        password: hashedPassword
      });
      console.log("Varsayılan admin oluşturuldu: admin / admin123");
    } else {
      console.log("Admin zaten mevcut.");}
    })
    .catch(error=>{
        console.log(error)
    })

app.listen(3000,() =>{
    console.log("Listening 3000 port.")
})
