import React from 'react';
import { connect } from 'react-redux'
import Dashboard from './dashboard';
import { handleSearch } from '../actions/search';

class SearchPage extends React.Component{
    componentDidMount = () => {
        this.props.dispatch(handleSearch(this.props.match.params.query))
    }
    componentDidUpdate = (prevProps) => {
        if(prevProps !== this.props){
            this.props.dispatch(handleSearch(this.props.match.params.query))            
        }
    }
    render(){
        return (
            <div className="searchPage">
                <Dashboard searchPage={true}/>
            </div>
        );
    }
}

export default connect()(SearchPage)
