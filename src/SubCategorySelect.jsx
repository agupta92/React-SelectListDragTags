import React, {Component} from 'react';
//import {FormGroup} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const STATES = require('./data/states');


class CategorySelect extends Component{

  constructor(props){
    super(props);
    this.state = {
      country: 'AU',
			disabled: false,
			searchable: this.props.searchable,
			selectValue: 'new-south-wales',
			clearable: true,
      options : STATES['AU']
    }
  }

  updateValue (newValue) {
		console.log('State changed to ' + newValue);
		this.setState({
			selectValue: newValue
		});
	}

  render(){

    return(
      <div>
        <Select ref="stateSelect" autofocus options={this.state.options} simpleValue clearable={this.state.clearable}
          name="selected-state" disabled={this.state.disabled} placeHolder = "Select Category"
          value={this.state.selectValue} onChange={(val)=>this.updateValue(val)} searchable={this.state.searchable}
        />
      </div>
    )
  }
}

export default CategorySelect;
