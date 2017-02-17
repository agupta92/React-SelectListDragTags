import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
const CategoryHealth = require('./data/category_health');

class AttributeProductCount extends Component{

  constructor(props){
    super(props);
    this.getAttributeProductCount();
    this.state = {
      category_id : this.props.category_id,
       cols : [
                    { key: 'sno', label: 'S.No' },
                    { key: 'attribute', label: 'Attributes' },
                    { key: 'product_count', label: 'Product Count' }
                ],

        data : [
                { id: 1, firstName: 'John', lastName: 'Doe' },
                { id: 2, firstName: 'Clark', lastName: 'Kent' },
                { id: 2, firstName: 'Clark', lastName: 'ddd' }
            ]
    }
  }

componentDidMount(){
  this.getAttributeProductCount();
}

  generateHeaders() {
    console.log(this.state);
        var cols = this.state.cols;
        return cols.map(function(colData) {
            return <th key={colData.key}> {colData.label} </th>;
        });
  }

  generateRows() {
      var cols = this.state.cols,
          data = this.state.data;
      return data.map(function(item) {
          var cells = cols.map(function(colData) {
              return <td> {item[colData.key]} </td>;
          });
          return <tr key={item.sno}> {cells} </tr>;
      });
  }

  getAttributeProductCount(){

    const FETCH_URL = "http://localcadmin.craftsvilla.com/getProductHealth.php?category=10001";
    fetch(FETCH_URL,{
      method: 'GET',
      headers : {
        'Accept': 'application/json'
       }
    })
    .then(response => response.json())
    .then(json => {
      console.log('Attribute Prodct',json);
      this.state = {
          category_id : this.props.category_id,
          cols : [
                    { key: 'sno', label: 'S.No' },
                    { key: 'attribute', label: 'Attributes' },
                    { key: 'product_count', label: 'Product Count' }
                  ],
          data : json
      }
    })
    .catch(e => console.log("Booo", e))
  }


  render(){
    return(
      <Table responsive>
         <thead> {this.generateHeaders()} </thead>
         <tbody> {this.generateRows()} </tbody>
     </Table>
    )
  }
}

export default AttributeProductCount;
