import React, {Component} from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import {Label,Button} from 'react-bootstrap';

import './App.css';

class SetSeoRule extends Component{

  constructor(props) {
      super(props);
      this.state = { tags: [ {id: 1, text: "Color"} ],
            suggestions: ["Banana", "Mango", "Pear", "Apricot"]
        }
    }
    handleDelete(i) {
        console.log('handleDelete', i);
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
        console.log('Delete Tag:',this.state.tags);

    }
    handleAddition(tag) {
        let tags = this.state.tags;
        console.log('Add Tag:',tags);
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
    }
    handleDrag(tag, currPos, newPos) {
        console.log('handleTog', currPos);
        let tags = this.state.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: tags });
    }

    saveAttributeRules(){
      console.log('saveAttributeRules',JSON.stringify(this.state.tags));

    }

    render(){
      let tags = this.state.tags;
      let suggestions = this.state.suggestions;
      return (
        <div>
          <div>
            <h6>Add Seo Attributes <Label>Tag in Sequence</Label></h6>
            <div>
                <ReactTags
                  classNames={{
                      tags: 'tagsClass',
                      tagInput: 'tagInputClass',
                      tagInputField: 'tagInputFieldClass',
                      selected: 'selectedClass',
                      tag: 'tagClass',
                      remove: 'removeClass',
                      suggestions: 'suggestionsClass'
                    }}
                    tags={tags}
                    suggestions={this.props.hits}
                    handleDelete={(key) => this.handleDelete(key)}
                    handleAddition={(val) =>this.handleAddition(val)}
                    handleDrag={this.handleDrag} />
            </div>
          </div>

          <Button className="Button" bsStyle="primary" onClick={event => {this.saveAttributeRules()}}>Save Rule</Button>
        </div>
      )
    }
}

export default SetSeoRule;
