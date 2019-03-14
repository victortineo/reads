import React, { Component } from 'react';
import {connect} from 'react-redux'
import Post from './Post'
import SelectOrder from './SelectOrder'
import {orderBy} from '../utils'
import './dashboard.scss'

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
            <SelectOrder />
            {this.props.posts.length > 0 ?
            <ul className="dashboard__posts">
                {this.props.posts.map((post) => (
                    <li key={post.id}>
                        <Post type="preview" id={post.id}/>
                    </li>
                ))}
            </ul>
                : 'Nenhum post disponível' 
            }
      </div>
    );
  }
}

function mapStateToProps({posts, order, search}, props){
    const objs = orderBy(Object.values(posts), order.orderBy).filter(obj => obj.deleted === false)
    const result = orderBy(Object.values(search), order.orderBy).filter(obj => obj.deleted === false)
    return {
        posts: props.searchPage ? result : props.category ? objs.filter(post => post.category === props.category) : objs
    }
}

export default connect(mapStateToProps)(Dashboard);
