import express, {Application} from 'express';
import mongoose from 'mongoose';
import AuthController from './routes/auth';
import ListRoutes from './routes/list';

const app: Application = express();
const port = 8080;

mongoose.connect(
  `mongodb+srv://elvir:test@cluster0.ucllv.mongodb.net/walter-backend?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
)
.then(() => {
  console.log("Successfully connect to MongoDB");
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
})

// Middlewares
app.use(express.json())

// Routes
app.use('/api/auth', AuthController);
app.use('/api/auth', ListRoutes);

app.listen(port, () => {
  return console.log(`Server is listening on port ${port}`);
});