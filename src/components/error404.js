import React from 'react';
import './error404.scss'

const error404 = (props) => {
    return (
      <div className="error404">
        <h2 className="error404__title">Erro <span className="error404__title-number">4<span className="error404__title-number--feat">0</span>4</span></h2>
        <p className="error404__desc">{props.postPage ? 'Nenhum post encontrado' : 'Nada encontrado' }</p>
      </div>
    );
}

export default error404;