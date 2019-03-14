import React from 'react';
import Dashboard from './dashboard';

const Category = (props) => {
    return (
      <div className="Category">
        <Dashboard category={props.match.params.category}/>
      </div>
    );
}

export default Category
