import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminAssignmentForm.css';

function AdminAssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assignmentRes = await axios.get('https://studentassignmentportal.onrender.com/api/assignments');
        setAssignments(assignmentRes.data);

        // Fetch all submissions
        const submissionsRes = await axios.get('https://studentassignmentportal.onrender.com/api/submissions');
        // Group submissions by assignmentId
        const mapped = {};
        for (const sub of submissionsRes.data) {
          mapped[sub.assignmentId] = mapped[sub.assignmentId] || [];
          mapped[sub.assignmentId].push(sub);
        }
        setSubmissions(mapped);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('❌ Failed to load assignments or submissions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>⏳ Loading assignments...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="assignment-page">
      <h2>📋 Assignment List (Admin View)</h2>

      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>S.No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Created At</th>
              <th>Submissions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={assignment._id}>
                <td>{index + 1}</td>
                <td>{assignment.title}</td>
                <td>{assignment.content || assignment.description || '-'}</td>
                <td>
                  {assignment.dueDate
                    ? new Date(assignment.dueDate).toLocaleDateString()
                    : '-'}
                </td>
                <td>
                  {assignment.createdAt
                    ? new Date(assignment.createdAt).toLocaleString()
                    : '-'}
                </td>
                <td>
                  {(submissions[assignment._id] && submissions[assignment._id].length > 0) ? (
                    <table style={{ width: '100%' }}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Roll No</th>
                          <th>Answer</th>
                          <th>Submitted At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {submissions[assignment._id].map(sub => (
                          <tr key={sub._id}>
                            <td>{sub.name}</td>
                            <td>{sub.rollNo}</td>
                            <td>
                              {sub.answer
                                ? <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => alert(`📘 Answer:\n\n${sub.answer}`)}
                                  >View</button>
                                : <span style={{ color: 'gray' }}>No Answer</span>
                              }
                            </td>
                            <td>
                              {sub.submittedAt 
                                ? new Date(sub.submittedAt).toLocaleString() 
                                : '-'
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <span style={{ color: 'gray' }}>No Submissions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminAssignmentList;
