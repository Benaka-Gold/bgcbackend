// app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/utils/swagger');
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./src/database/index")
const errorHandler = require('./src/middleware/errorHandler');
const authRoutes = require('./src/routes/authRoutes');
const session = require('express-session');
const passport = require('./src/config/passportConfig')
require('dotenv').config();
const userRoutes = require('./src/routes/userRoutes')
const leadRoutes = require('./src/routes/leadRoutes')
const teamTypeRoutes = require('./src/routes/teamTypeRoutes')
const teamRoutes = require('./src/routes/teamRoutes')

connectDB()
app.use(bodyParser.json());
app.use(cors())
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);
app.use(passport.initialize());
app.use('/', authRoutes);
app.use('/api/v1',userRoutes);
app.use('/api/v1',leadRoutes);
app.use('/api/v1',teamTypeRoutes);
app.use('/api/v1',teamRoutes);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
