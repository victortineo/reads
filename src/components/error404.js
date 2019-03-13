import React, { Component } from 'react';
import './error404.scss'

const error404 = (props) => {
    return (
      <error404 className="error404">
        <h2 className="error404__title">Erro <span className="error404__title-number">4<span className="error404__title-number--feat">0</span>4</span></h2>
        <p className="error404__desc">Nada encontrado</p>
      </error404>
    );
}
function mapStateToProps({categories}){
  return {
      categories: Object.values(categories)
  }
}

export default error404;