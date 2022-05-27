import react from 'react';
import {NavLink} from 'react-router-dom';

const Errorpage = () => {
    return(
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>We are sorry, Page not found</h2>
                    <p className="mb-5">
                        The page you are looking to might be removed or
                        it's name is changed or temporarily unavaiable
                    </p>
                    <NavLink to="/">Home Page</NavLink>
                </div>
            </div>
        </>
    )
}

export default Errorpage