import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import LoginSwitcher from './components/LoginSwitcher';
import AdminAssignmentForm from './components/AdminAssignmentForm';
import AdminAssignmentList from './components/AdminAssignmentList';
import AssignmentSubmitPage from './components/AssignmentSubmitPage';
import StudentAssignmentForm from './components/StudentAssignmentForm';

function App() {
  const [assignments, setAssignments] = useState([]);

  const addAssignment = (newAssignment) => {
    setAssignments([...assignments, { ...newAssignment, status: 'Unsubmitted' }]);
  };

  const updateAssignmentStatus = (id, newStatus) => {
    setAssignments(assignments.map((a, index) =>
      index === id ? { ...a, status: newStatus } : a
    ));
  };
  // build an authenticated web application 
  //  using expressjs where users can login to using a username
  // their session will be maintained across routes using cokkies and 
  // express session middleware the app 
  // should display a personalized message to logged in users 
  // and alow them to log out destroying the session

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSwitcher />} />
        <Route
          path="/admin/assignments"
          element={<AdminAssignmentForm onAdd={addAssignment} />}
        />
        <Route
          path="/assignments"
          element={<AdminAssignmentList assignments={assignments} />}
        />
        <Route
          path="/student/assignments"
          element={<StudentAssignmentForm assignments={assignments} />}
        />
        <Route
          path="/submit/:id"
          element={
            <AssignmentSubmitPage
              assignments={assignments}
              onUpdateStatus={updateAssignmentStatus}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
