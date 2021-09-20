import React, { Component } from "react";
import _ from "lodash";

export default class CustomInputTagsDropdown extends Component {
  constructor(props) {
    super(props);
    this.searchinput = React.createRef();
    this.state = {
      displayInput: false,
      techTags: [], //Tags, which can choose a Author
      selectedOptions: this.props.selected //Tags, which has choosed Author and that must be displayed on Channel Page
    };
  }
  showInput = () => {
    if (this.state.displayInput) {
      this.setState({ displayInput: false });
    } else {
      this.setState({
        displayInput: true
      });
    }
  };
  onOptionChange = e => {
    let list = this.state.selectedOptions;
    if (list.length === 0) {
      list.push(e);
    } else {
      let allreadyExist = false;
      for(let i=0; i< list.length ; i++) {
        if (list[i].id === e.id){
          allreadyExist = true;
        }
      }
      if (!allreadyExist) {
        list.push(e);
      }
    }
    this.props.onChange(this.props.value, list);
    this.setState({
      selectedOptions: list
    });
  };
  removeTag = e => {
    let list = this.state.selectedOptions;
    list.map((item, i) => {
      if (item.id === e.currentTarget.value) return list.splice(i, 1);
    });
    this.props.onChange(this.props.value, list);
    this.setState({
      selectedOptions: list
    });
  };
  render() {
    //Variable 'items' is to display Tags, that has choosed a Author
    let items = this.state.selectedOptions.map((item, index) => {
      if (item != null) {
        return (
          <span key={"tag-" + _.kebabCase(index) + "-" + index} className="tag">
            {_.kebabCase(item.tag)}
            <button
              className="close"
              type="button"
              value={item.id}
              onClick={this.removeTag}
            >
              x
            </button>
          </span>
        );
      }
    });

    return (
      <div className="custom-input-tags-dropdown">
        {this.props.title ? <p className="title">{this.props.title}</p> : null}
        <div className="tags-container">
          <div className="item-container">{items}</div>
          <div className="add-tag">
            <span onClick={this.showInput}>{`add ${this.props.value}`}</span>
            {this.state.displayInput && (
              <DataList
                options={this.props.items}
                onOptionChange={e => {
                  this.onOptionChange(e);
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

class DataList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredOptions: [],
      inputTextValue: ""
    };
  }

  componentDidMount() {
    this.filterDropdownOptions();
  }

  filterDropdownOptions = e => {
    let txt = e ? e.target.value.toLowerCase() : "";
    let filteredOptions = [];

    for (let i = 0; i < this.props.options.length; i++) {
      const option = this.props.options[i];

      if (option.tag.toLowerCase().indexOf(txt) !== -1) {
        filteredOptions.push({
          id: option.id,
          tag: option.tag
        });
      }
    }

    this.setState({
      filteredOptions: filteredOptions,
      inputTextValue: txt
    });
  };

  handleOptionClick = option => {
    this.props.onOptionChange(option);
    this.setState({ inputTextValue: option.tag });
    this.hideDropDown();
  };

  showDropDown = () => {
    this.setState({
      show: true
    });
  };

  hideDropDown = () => {
    this.setState({
      show: false
    });
  };
  render() {
    let dropdownList = this.state.filteredOptions.map((option, index) => {
      return (
        <div key={index} onClick={() => this.handleOptionClick(option)}>
          {option.tag}
        </div>
      );
    });
    return (
      <div className="dropdown">
        <input
          type="text"
          value={this.state.inputTextValue}
          onChange={this.filterDropdownOptions}
          onFocus={this.showDropDown}
          onClick={e => {
            e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);
          }}
        />
        {this.state.show && (
          <div className="dropdown-content">{dropdownList}</div>
        )}
      </div>
    );
  }
}
