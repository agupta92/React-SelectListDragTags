import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
const CategoryHealth = require('./data/category_health');

class AttributeProductCount extends Component{

  constructor(props){
    super(props);

    this.state = {
      category_id : this.props.category_id
    }
    this.getAttributeProductCount();
  }

  getAttributeProductCount(){
    console.log(CategoryHealth.health[0].hits.hits[0]._source);
    let category_id = this.state.category_id;
    //this.setState({attributes: CategoryHealth.health[0].hits.hits[0]._source})
    this.state = {
        attributes: CategoryHealth.health[0].hits.hits[0]._source,
        category_id: category_id
    }
    console.log('AttributeProductCount-Result', this.state.attributes);
    // const FETCH_URL = "http://52.221.56.237:9200/catalog_health_1/_search";
    // const BODY = '{"size": 1, "query": {"bool": {"must": [{"term": {"category_id": 10001 } } ] } } }';
    // fetch(FETCH_URL,{
    //   method: 'POST',
    //   body: BODY
    // })
    // .then(response => response.json())
    // .then(json => {
    //   console.log('Attribute Prodct',json);
    // })
    // .catch(e => console.log("Booo", e))
    // const {attributes} = this.state.attributes;
    // console.log('AttributeProductCount-Result', this.state.attributes);
    // this.state.attributes.map((attributes,index)=>{
    //   console.log('Inside Attribute', attributes);
    // });

    Object.keys(this.state.attributes).map(function (value,  index) {
      console.log('key',value);
    });
  }


  render(){
    return(
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Attribute Name</th>
            <th>Product Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Color</td>
            <td>2000</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export default AttributeProductCount;
