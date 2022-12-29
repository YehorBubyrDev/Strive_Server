const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const {db} = require('./models/index');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 4000;

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

(async () => {
  await db.sequelize.sync();
})();

app.get("/", (req, res) => {
    res.send("backend is ready");
});

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  } 
};

start();





