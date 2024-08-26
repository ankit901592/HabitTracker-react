import { NavLink, Outlet, Link } from "react-router-dom"; // Importing navigation components from react-router-dom

function NavBar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary p-4" // Bootstrap classes for navbar styling
        data-bs-theme="dark" // Dark theme for the navbar
      >
        <div className="container-fluid">
          {/* Logo and link to the home page */}
          <Link to="/" className="navbar-brand">
            HABIT TRACKER💪
          </Link>
          {/* Button for toggling the navbar on mobile devices */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Collapsible navbar content */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Navigation links */}
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page" end>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/WeekList" className="nav-link">
                  Week List
                </NavLink>
              </li>
            </ul>
            {/* Search form */}
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <Outlet /> {/* Render nested routes here */}
    </>
  );
}

export default NavBar;
