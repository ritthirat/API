require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const port = process.env.PORT || 3007;
const swaggerDocument = require("./swagger.json");

const app = express();


app.use(cors());
app.use(helmet())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs" , require("swagger-ui-express").serve, require("swagger-ui-express").setup(swaggerDocument));
app.use("/auth", require('./routes/auth'));
app.use("/user", require('./routes/user'));

app.listen(port, () => {
	console.log(`Express server listening on port ${port}`);
	console.log(`Local   : http://localhost:${port}`);
	console.log(`Network : http://0.0.0.0:${port}`);
});