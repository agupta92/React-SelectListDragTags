import React, {Component} from 'react';
import {FormGroup,Button} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import AttributeProductCount from './AttributeProductCount';
const STATES = require('./data/states');
const Categories = require('./data/categoryList');


class CategorySelect extends Component{

  constructor(props){
    super(props);
    this.populateCategory();

    this.state = {
			disabled: false,
			searchable: this.props.searchable,
			selectedCategoryValue: 'selectCategory',
      selectedSubCategoryValue: 'selectSubCategory',
			clearable: true,
      optionsCategory : STATES['CAT'],
      optionsSubCategory : STATES['CAT'],
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
            value: subCategory.sub_cat_id,
            label: subCategory.name
          });
      })
      console.log('optionsSubCatArray',optionsSubCatArray );
      this.setState({
  			optionsSubCategory: optionsSubCatArray
  		});
  }

  render(){

    return(
      <FormGroup>
        <div>
          <Select ref="CategorySelect" autofocus options={this.state.optionsCategory} simpleValue clearable={this.state.clearable}
            name="selected-category" disabled={this.state.disabled} placeHolder = "Select Category"
            value={this.state.selectedCategoryValue} onChange={(val)=>this.updateCategoryValue(val)} searchable={this.state.searchable}
          />
          <Select ref="SubCategorySelect" autofocus options={this.state.optionsSubCategory} simpleValue clearable={this.state.clearable}
            name="selected-subcategory" disabled={this.state.disabled} placeHolder = "Select Sub Category"
            value={this.state.selectedSubCategoryValue} onChange={(val)=>this.updateSubCategoryValue(val)} searchable={this.state.searchable}
          />
          <Button bsStyle="primary" bsSize="large">Search</Button>
          <AttributeProductCount category_id = '10018'/>
      </div>
    </FormGroup>
    )
  }
}

export default CategorySelect;
