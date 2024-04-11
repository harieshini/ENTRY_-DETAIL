import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const StudentDetails = () => {
  const [barcode, setBarcode] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/student/${barcode}`);
      setStudent(response.data);
      setError(null);

      // Send search details to the server
      await axios.post('http://localhost:5000/search', {
        barcode: response.data.barcode,
        name: response.data.name,
        year: response.data.year,
        dept: response.data.dept,
        section: response.data.section
      });
    } catch (error) {
      setError('Student not found');
      setStudent(null);
    }
  };

  return (
    <div className="input-group">
      <h1>Student Details</h1>
      <input type="text" placeholder="Enter Barcode" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
      <button onClick={handleSearch} className="button primary">Search</button>
      {error && <p>{error}</p>}
      {student && (
        <div>
          <h3>Barcode :  {student.barcode}</h3>
          <h3>Name    :  {student.name}</h3>
          <h3>Year    :  {student.year}</h3>
          <h3>Dept    :  {student.dept}</h3>
          <h3>Section :  {student.section}</h3>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
