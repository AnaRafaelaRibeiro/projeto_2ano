import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/style.css';

const AccountTypeSelector = () => {
  return (
    <div className="account-type-selector container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="row">
        <div className="col-md-6"> {/* Alterado de col-md-4 para col-md-6 para centralizar */}
          <div className="card account-card">
            <div className="card-body">
              <h5 className="card-title">Gestor</h5>
              <ul className="list-unstyled">
                <li><i className="bi bi-check-circle-fill"></i> Biblioteca de Softwares</li>
                <li><i className="bi bi-check-circle-fill"></i> Gestão Empresarial</li>
                <li><i className="bi bi-x-circle-fill"></i> Compra de Softwares</li>
              </ul>
              <button className="btn btn-primary">Selecionar</button>
            </div>
          </div>
        </div>
        <div className="col-md-6"> {/* Alterado de col-md-4 para col-md-6 para centralizar */}
          <div className="card account-card">
            <div className="card-body">
              <h5 className="card-title">Comprador</h5>
              <ul className="list-unstyled">
                <li><i className="bi bi-check-circle-fill"></i> Biblioteca de Softwares</li>
                <li><i className="bi bi-check-circle-fill"></i> Gestão Empresarial</li>
                <li><i className="bi bi-check-circle-fill"></i> Compra de Softwares</li>
              </ul>
              <button className="btn btn-primary">Selecionar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelector;
