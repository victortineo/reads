import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './header.scss'

const Header = (props) => {
    return (
      <header className="header">
        <nav className="header__navigation">
            <Link to="/" className="header__logo">R<span className="header__logo-lesser">ead</span>s</Link>
            <Link to="/" className="header__link">Home</Link>
            {props.categories && props.categories.map(cat => 
              <Link to={`/category/${cat.path}`} key={cat.path} className="header__link">{cat.name}</Link>
            )}
        </nav>
      </header>
    );
}
function mapStateToProps({categories}){
  return {
      categories: Object.values(categories)
  }
}

export default connect(mapStateToProps)(Header);