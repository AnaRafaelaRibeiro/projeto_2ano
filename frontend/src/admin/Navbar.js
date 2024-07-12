import React from "react";
import { Link } from "react-router-dom";
import "../Css/style.css";

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
                  <Link to="/admindashboard" className="menu">Dashboard</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="div-2">
            <div className="schedule">
              <div className="messages-3">
                <div className="div-3">
                  <img
                    className="div-wrapper"
                    alt="Iconly bulk shield"
                    src="https://c.animaapp.com/WYNSEKrf/img/iconly-bulk-shield-done.svg"
                  />
                  <Link to="/admin/orcamentos" className="menu">Orçamentos</Link>
                </div>
                <img className="dropdown" alt="Dropdown" src="https://c.animaapp.com/WYNSEKrf/img/dropdown-1.svg" />
              </div>
            </div>
          
          </div>
          <img className="line" alt="Line" src="https://c.animaapp.com/WYNSEKrf/img/line-55-2.svg" />
        </div>
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
                  <Link to="/admin/add-software" className="menu">Adicionar Software</Link>
                </div>
                <img className="dropdown" alt="Dropdown" src="https://c.animaapp.com/WYNSEKrf/img/dropdown-3.svg" />
              </div>
            </div>
            <div className="schedule">
              <div className="messages-6">
                <div className="div-3">
                  <div className="div-wrapper">
                    <div className="document">
                      <img
                        className="img"
                        alt="Combined shape"
                        src="https://c.animaapp.com/WYNSEKrf/img/combined-shape-2.svg"
                      />
                    </div>
                  </div>
                  <Link to="/admin/softwareList" className="menu">Software lista</Link>
                </div>
                <img className="dropdown" alt="Dropdown" src="https://c.animaapp.com/WYNSEKrf/img/dropdown-4.svg" />
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
              <Link to="/admin/clients" className="help">Comprador</Link>
            </div>
          </div>
          <div className="div-2">          
            <div className="schedule">
              <div className="messages-8">
                <div className="div-3">
                  <div className="div-wrapper">
                    <div className="document">
                      <img
                        className="img"
                        alt="Combined shape"
                        src="https://c.animaapp.com/WYNSEKrf/img/combined-shape-2.svg"
                      />
                    </div>
                  </div>
                  <Link to="/admin/historico" className="menu">Histórico Compra</Link>
                </div>
                <img className="dropdown" alt="Dropdown" src="https://c.animaapp.com/WYNSEKrf/img/dropdown-6.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
