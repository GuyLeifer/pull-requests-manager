import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import './Navbar.css';

function Navbar() {


    const [selected, setSelected] = useState('/');

    const history = useHistory();

    const handleClick = (target) => {
        history.push(target)
        setSelected(target)
    }

    return (
        <div id="navbar">
            <div id="main-navbar">
                {selected === '/' ?
                    <div id="purchase-bar">
                        <div className="selected" onClick={() => handleClick("/")}>All</div>
                        <div onClick={() => handleClick("/labels")}>Labels</div>
                        <div onClick={() => handleClick("/users")}>Users</div>
                    </div>
                    : selected === '/labels' ?
                        <div id="purchase-bar">
                            <div onClick={() => handleClick("/")}>All</div>
                            <div className="selected" onClick={() => handleClick("/labels")}>Labels</div>
                            <div onClick={() => handleClick("/users")}>Users</div>
                        </div>
                        : selected === '/users' ?
                            <div id="purchase-bar">
                                <div onClick={() => handleClick("/")}>All</div>
                                <div onClick={() => handleClick("/labels")}>Labels</div>
                                <div className="selected" onClick={() => handleClick("/users")}>Users</div>
                            </div>
                            : null
                }
            </div>
        </div>
    )
}

export default Navbar
