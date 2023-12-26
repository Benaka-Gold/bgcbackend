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
const passport = require('./src/config/passportConfig')
require('dotenv').config();
const fs = require('fs');
const helmet = require('helmet')

//Routes
const userRoutes = require('./src/routes/userRoutes')
const leadRoutes = require('./src/routes/leadRoutes')
const teamTypeRoutes = require('./src/routes/teamTypeRoutes')
const teamRoutes = require('./src/routes/teamRoutes')
const employeeRoutes = require('./src/routes/employeeRoutes')
const fileRoutes = require('./src/routes/fileRoutes')
const branchRoutes = require('./src/routes/branchRoutes')
const path = require('path');
const cron = require('node-cron')
const cleanupOrphanedFiles = require('./src/utils/cleanup')
const taskRoutes = require('./src/routes/taskRoutes')
const customerRoutes = require('./src/routes/customerRoutes.js')
const ornamentRoutes = require('./src/routes/ornamentRoutes.js')
const divisionRoutes = require('./src/routes/divisionRoutes.js')
const fundRoutes = require('./src/routes/fundRoutes.js')
const goldRates = require('./src/routes/goldRateRoutes.js')
const businessRoutes = require('./src/routes/businessRoutes.js')
//End Routes

const https = require('https');
const privateKey = fs.readFileSync('../server.key', 'utf8');
const certificate = fs.readFileSync('../server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(4000, () => {
  console.log(`HTTPS Server running on port 4000`);
});

connectDB()
app.use(bodyParser.json());
app.use(cors())
// app.use(helmet())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);
app.use(passport.initialize());

//App Router
app.use('/api/v1', authRoutes);
app.use('/api/v1',userRoutes);
app.use('/api/v1',leadRoutes);
app.use('/api/v1',teamTypeRoutes);
app.use('/api/v1',teamRoutes);
app.use('/api/v1',employeeRoutes);
app.use('/api/v1',fileRoutes);
app.use('/api/v1',branchRoutes);
app.use('/api/v1',taskRoutes);
app.use('/api/v1',customerRoutes);
app.use('/api/v1',ornamentRoutes);
app.use('/api/v1',divisionRoutes);
app.use('/api/v1',fundRoutes);
app.use('/api/v1',goldRates);
app.use('/api/v1',businessRoutes);

//App Router End

cron.schedule('0 * * * *', () => {
  console.log('Running daily cleanup task');
  cleanupOrphanedFiles();
});
// app.listen(4000, () => {
//   console.log('Server is running on port 4000');
// });
