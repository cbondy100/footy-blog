import React from "react";
import '../styles/Footer.css'

const Footer = () => {

    return (
        <footer className="footer-container">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Unfiltered United. All rights reserved.</p>
            </div>
        </footer>
    )

};

export default Footer;