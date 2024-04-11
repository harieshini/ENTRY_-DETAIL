const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/student_details_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const StudentSchema = new mongoose.Schema({
  barcode: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: String, required: true },
  dept: { type: String, required: true },
  section: { type: String, required: true },
});

const SearchSchema = new mongoose.Schema({
  barcode: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: String, required: true },
  dept: { type: String, required: true },
  section: { type: String, required: true },
  searchedAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', StudentSchema);
const Search = mongoose.model('Search', SearchSchema);

// Endpoint to get student details by barcode number
app.get('/student/:barcode', async (req, res) => {
  try {
    const student = await Student.findOne({ barcode: req.params.barcode });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Endpoint to store search details
app.post('/search', async (req, res) => {
  try {
    const { barcode, name, year, dept, section } = req.body;
    const newSearch = new Search({ barcode, name, year, dept, section });
    await newSearch.save();
    res.status(201).json({ message: 'Search details saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
