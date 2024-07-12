import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="main-logo">
        <img className="logo" alt="Logo" src="https://c.animaapp.com/WYNSEKrf/img/logo.svg" />
        <div className="div" />
      </div>
      <div className="div-2">
        <div className="div-2">
          <div className="menu-title">
            <div className="div-3">
              <Link to="/admin" className="help">Home</Link>
            </div>
          </div>
          <div className="frame">
            <div className="overview">
              <div className="messages">
                <div className="div-3">
                  <div className="div-wrapper">
                    <div className="category">
                      <div className="overlap-group">
                        <img className="fill" alt="Fill" src="https://c.animaapp.com/WYNSEKrf/img/fill-1.svg" />
                        <img
                          className="combined-shape"
                          alt="Combined shape"
                          src="https://c.animaapp.com/WYNSEKrf/img/combined-shape.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <Link to="/gestordashboard" className="menu">Dashboard</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className="line" alt="Line" src="https://c.animaapp.com/WYNSEKrf/img/line-55-2.svg" />
      </div>
      <div className="div-2">
        <div className="div-2">
          <div className="help-wrapper">
            <div className="help-2">
              <Link to="/admin/softwares" className="help">Softwares</Link>
            </div>
          </div>
          <div className="div-2">
            <div className="schedule">
              <div className="messages-5">
                <div className="div-3">
                  <div className="div-wrapper">
                    <div className="wallet">
                      <div className="oval-wrapper">
                        <div className="oval" />
                      </div>
                    </div>
                  </div>
                  <Link to="/gestor/listaprodutos" className="menu">Lista Softwares</Link>
                </div>
                <img className="dropdown" alt="Dropdown" src="https://c.animaapp.com/WYNSEKrf/img/dropdown-3.svg" />
              </div>
            </div>
            <div className="schedule">
              <div className="messages-7">
                <div className="div-3">
                  <div className="div-wrapper">
                    <div className="wallet">
                      <div className="oval-wrapper">
                        <div className="oval" />
                      </div>
                    </div>
                  </div>
                  <Link to="/gestor/produtos" className="menu">Meus produtos</Link>
                </div>
                <img className="dropdown" alt="Dropdown" src="https://c.animaapp.com/WYNSEKrf/img/dropdown-5.svg" />
              </div>
            </div>
          </div>
        </div>
        <img className="line" alt="Line" src="https://c.animaapp.com/WYNSEKrf/img/line-55-2.svg" />
      </div>
    </div>
  );
};

export default Sidebar;
