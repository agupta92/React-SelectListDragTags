import React, {Component} from 'react';
//import {FormGroup} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const STATES = require('./data/states');
const Categories = require('./data/categoryList');

class CategorySelect extends Component{

  constructor(props){
    super(props);
    this.populateCategory();

    this.state = {
      country: 'AU',
			disabled: false,
			searchable: this.props.searchable,
			selectedCategoryValue: 'new-south-wales',
      selectedSubCategoryValue: 'new-south-wales',
			clearable: true,
      optionsCategory : STATES['AU'],
      optionsSubCategory : STATES['AU'],
      categoryArray : [],
      categoryPopulate: false,
    }
  }

  populateCategory(){
    const FETCH_URL = "http://localcadmin.craftsvilla.com/getCategoryList.php?category_id=0";
    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log("Category Json", json);
      let optionsCatArray = [];

      this.setState({categoryArray: json});
      json.map((category, index) => {
        console.log(category);
          optionsCatArray.push({
            value: category.category_id,
            label: category.name
          });

          this.setState({
              optionsCategory: optionsCatArray,
              categoryPopulate: true
          });
      })
    })
  }

  updateCategoryValue (newValue) {
		console.log('State changed to ' + newValue);
    this.state.categoryArray.map((category,key) => {
        console.log('updatevalue', category);
        if(newValue === category.category_id){
          this.updateSubCategoryOptions(category.sub_category);
        }
    })
		this.setState({
			selectedCategoryValue: newValue
		});
	}

  updateSubCategoryValue (newValue) {
		console.log('State changed to ' + newValue);
		this.setState({
			selectedSubCategoryValue: newValue
		});
	}

  updateSubCategoryOptions(subCategoryArray){
      let optionsSubCatArray = [];
      subCategoryArray.map((subCategory,index) => {
          console.log('Sub Category', subCategory);
          optionsSubCatArray.push({
            value: subCategory.category_id,
            label: subCategory.name
          });
      })
      this.setState({
  			optionsSubCategory: optionsSubCatArray
  		});
  }

  render(){

    return(
      <div>
        <Select ref="CategorySelect" autofocus options={this.state.optionsCategory} simpleValue clearable={this.state.clearable}
          name="selected-category" disabled={this.state.disabled} placeHolder = "Select Category"
          value={this.state.selectedCategoryValue} onChange={(val)=>this.updateCategoryValue(val)} searchable={this.state.searchable}
        />
        <Select ref="SubCategorySelect" autofocus options={this.state.optionsSubCategory} simpleValue clearable={this.state.clearable}
          name="selected-subcategory" disabled={this.state.disabled} placeHolder = "Select Sub Category"
          value={this.state.selectedSubCategoryValue} onChange={(val1)=>this.updateSubCategoryValue(val1)} searchable={this.state.searchable}
        />

      </div>
    )
  }
}

export default CategorySelect;
