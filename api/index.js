import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import config from './config.js';
import loanRouter from './routers/loanRouter.js';
import userRouter from './routers/userRouter.js';


dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

const PORT = config.PORT || 5000;
const {sequelize} = config;

//sync database and start of the server

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to the database:', err.message));

  // error handling middleware 
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      message: err.message,
      error: req.app.get('env') === 'development'? err : {},
    });
  });

// routers
app.use('/api/users', userRouter);
app.use('/api/loans', loanRouter);

export default app;

