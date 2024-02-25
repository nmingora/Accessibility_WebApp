//INDEX MONGO! this is for the user forum!


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGODB_URI || "mongodb+srv://madisonjlo88:Backtuck1@cluster0.corysq5.mongodb.net/userForum?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use('/api/posts', require('./routes/posts'));

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


































