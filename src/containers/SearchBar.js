import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchImage } from '../api/api';
import { bindActionCreators } from 'redux';
import './SearchBar.css';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = { searchTerm : '' };
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }
  // fetch images on mounting
  componentDidMount() {
    this.props.fetchImage('');
  }
  render() {
    return (
      <div className="search-container">
        <Input value={this.state.searchTerm} placeholder="Enter tags" className="searchBox"
          onChange={this.handleSearchTermChange} onKeyPress={this.onKeyPress.bind(this)} type="text" />
        <Button  onClick={ ()=> this.props.fetchImage(this.state.searchTerm) } variant="contained" color="primary">
        Search
      </Button>
      </div>
    );
  }

  handleSearchTermChange(event){
    console.log("search term changed");
    this.setState( {searchTerm:event.target.value} );
  }

  onKeyPress(e){
    if (e.key === 'Enter') {
      console.log('onEnterKeyPress ..');
      this.props.fetchImage(this.state.searchTerm);
    }
  }

}

function mapDispatchToProps(dispatch){
  return bindActionCreators( { fetchImage }, dispatch );
}

export default connect(null, mapDispatchToProps)(SearchBar);
