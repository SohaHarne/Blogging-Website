import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './dashboard.css'; // Make sure to create this CSS file later!

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the user data from the navigation state safely
  const user = location.state?.user;

  // Handle logout action
  const handleLogout = () => {
    alert("Logged out successfully");
    navigate('/'); // Send back to registration/login
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation Placeholder */}
      <aside className="sidebar">
        <h3>Blogging App</h3>
        <ul>
          <li className='active'>Dashboard</li>

  <li onClick={() => navigate('/myblogs')}>
    My Blogs
  </li>

  <li onClick={() => navigate('/create')}>
    Create Post
  </li>

  

  <li onClick={() => navigate('/search')}>
    Search
  </li>

  <li onClick={() => navigate('/explore')}>
    Explore
  </li>

  <li onClick={() => navigate('/account')}>
    Account
  </li>
  
</ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      {/* Main Panel content */}
      <main className="main-content">
        <header className="dashboard-header">
          {/* Greets user dynamically by name, defaults to 'Blogger' if missing */}
          <h2>Welcome back, {user ? user.name : 'Blogger'}!</h2>
          <p>{user?.email}</p>
        </header>

        <section className="dashboard-stats">
          <div className="card">
            <h4>Total Posts</h4>
            <p>0</p>
          </div>
          <div className="card">
            <h4>Drafts</h4>
            <p>0</p>
          </div>
        </section>

        <section className="quick-action">
          <h3>Ready to share your thoughts?</h3>
          <button onClick={() => navigate('/create')}>Write your first blog post</button>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;