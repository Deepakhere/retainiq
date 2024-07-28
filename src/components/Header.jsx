import React from 'react';
import { Button } from 'react-bootstrap';
import ArrowLeftIcon from '../images/icons/ArrowLeftIcon'
const Header = ({ onButtonClick }) => {
    return (
        <div className="header">
            <div className="header-left">
                <ArrowLeftIcon />
                <span className="header-title">My Header Title</span>
            </div>
            <div className="header-right">
                <Button variant="primary" className='btn-success' onClick={onButtonClick}>Publish</Button>
            </div>
        </div>
    );
};

export default Header;
