import React, { useState } from 'react';
const API_BASE = 'http://localhost:8000'
function App() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState({});
  const [activeView, setActiveView] = useState('');
  const [nodeId, setNodeId] = useState('');

 
const fetchStudents = async () => {
  try {
    const response = await fetch(`${API_BASE}/students`);
    const data = await response.json();
    const nodeHeader = response.headers.get('X-Node-ID');
    setNodeId(nodeHeader || 'Unknown Node');
    setStudents(data);
    setSubjects([]);
    setActiveView('students');
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};

const fetchSubjects = async () => {
  try {
    const response = await fetch(`${API_BASE}/subjects`);
    const data = await response.json();
    const nodeHeader = response.headers.get('X-Node-ID');
    setNodeId(nodeHeader || 'Unknown Node');
    setSubjects(data);
    setStudents([]);
    setActiveView('subjects');
  } catch (error) {
    console.error('Error fetching subjects:', error);
  }
};

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>University Portal</h1>

      <button onClick={fetchStudents}>Students</button>
      <button onClick={fetchSubjects} style={{ marginLeft: '10px' }}>Courses</button>

      {activeView === 'students' && (
        <div style={{ marginTop: '20px' }}>
          <h2>Students List</h2>
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                <strong>{student.name}</strong> - {student.program}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeView === 'subjects' && (
        <div style={{ marginTop: '20px' }}>
          <h2>Software Engineering Curriculum</h2>
          {Object.entries(subjects).map(([year, semesters]) => (
            <div key={year}>
              <h3>{year}</h3>
              {Object.entries(semesters).map(([semester, courses]) => (
                <div key={semester} style={{ marginLeft: '1rem' }}>
                  <h4>{semester}</h4>
                  <ul>
                    {courses.map((course, idx) => (
                      <li key={idx}>
                        <strong>{course.name}</strong> ({course.code})
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
