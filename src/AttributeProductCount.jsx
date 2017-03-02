import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import SetSeoRule from './SetSeoRule';
import './App.css';

class AttributeProductCount extends Component{

  constructor(props){
    super(props);
    this.state = {
      category_id : this.props.category_id,
       cols : [
                { key: 'sno', label: 'S.No' },
                { key: 'attribute', label: 'Attributes' },
                { key: 'product_count', label: 'Product Count' }
              ],

        data : [],
        tagHints: [],
          tagsLoaded: true
    }
  }

  componentDidMount(){
    this.getAttributeProductCount();
    console.log('componentDidMount',this.state);
  }

  generateTagHints(json){
    var data = json;
    var hints = [];
    //console.log('generateTags', data);
    hints =  data.map(function(value){
              return value.attribute;
            });
    return hints;
  }

  generateHeaders() {
    console.log('generateHeaders',this.state);
    var cols = this.state.cols;
    return cols.map(function(colData) {
        return <th key={colData.key}>{colData.label}</th>;
    });
  }

  generateRows() {
      var cols = this.state.cols,
          data = this.state.data;
      return data.map(function(item) {
          var cells = cols.map(function(colData) {
              return <td> {item[colData.key]}</td>;
          });
          return <tr key={item.sno}>{cells}</tr>;
      });
  }

  getAttributeProductCount(){
    const FETCH_URL = "http://localcadmin.craftsvilla.com/getProductHealth.php?category=" + this.state.category_id;
    console.log(FETCH_URL);
    fetch(FETCH_URL,{
      method: 'GET',
      headers : {
        'Accept': 'application/json'
       }
    })
    .then(response => response.json())
    .then(json => {
      console.log('Attribute Prodct',json);
      this.setState({data : json});
      this.setState({tagHints: this.generateTagHints(json)});
      this.setState({tagsLoaded :true});
    })
    .catch(e => console.log("Booo", e))
  }


  render(){
    return(
      <div className= "AttributeProduct">
        <h4>Product Count per Attribute</h4>
        <Table responsive striped bordered condensed hover>
           <thead>{this.generateHeaders()}</thead>
           <tbody>{this.generateRows()}</tbody>
       </Table>
       {
         this.state.tagsLoaded ? <div>
                                    <SetSeoRule hits = {this.state.tagHints}/>
                                    <SetSeoRule hits = {this.state.tagHints}/>
                                    <SetSeoRule hits = {this.state.tagHints}/>
                                  </div> :
                                  <div></div>

       }
      </div>

    )
  }
}

export default AttributeProductCount;
