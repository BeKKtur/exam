import {NavLink} from "react-router-dom";

const Appbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
                <div className="container-fluid">
                    <h2 className="navbar-brand">My Blog</h2>
                    <ul className="navbar-nav mr-auto">
                        <li className='nav-item'>
                            <NavLink to="/" className="nav-link">Quotes</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to="/new-quotes" className="nav-link">Submit new quotes</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Appbar;