import React from 'react';

import './style.css';

const parametersGenerator = (options, str) => {
  return options.filter(item => {
        if (item.toLowerCase().includes(str)) return item //if options includes value we can return new array
        return null
      }
  )
}

class AutoCompleteTextField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helperVisible: false,
      options: props.options,
      trigger: props.trigger,
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.renderAutocompleteList = this.renderAutocompleteList.bind(this);
  }

   handleChange(e) {
    const {
      options,
      trigger
    } = this.props;

    const str = e.target.value;
    const newStr = str.split(' ').pop() // newStr it is a store last word

    if (!str.length) {
      this.setState({helperVisible: false});
    }

    if (!newStr.indexOf(trigger)) {
      const findString = newStr.replace(trigger, '').toLowerCase()
      const parameters = findString.length > 1 ? parametersGenerator(options, findString) : options.slice(0, 4) //if we did not have value. We on only start 4 options item
      this.setState({
        helperVisible: true,
        options: parameters
      });
    } else {
      this.setState({
        helperVisible: false,
        options: []
      });
    }
    this.setState({
      value: str
    })
  }

  handleSelection(idx) {
    //after click set new suggestions to input
    this.setState(prevState => ({
      ...prevState,
      value: `${prevState.value}${prevState.options[idx]}`,
      helperVisible: false,
      options: []
    }))
  }

  renderAutocompleteList() {
    const {
      options,
      selection,
    } = this.state;

    const helperOptions = options.slice(0, options.length).map((val, idx) => {

      return (
          <li
              className={idx === selection ? 'active' : null}
              onMouseOver={()=> this.setState({selection:idx})}
              key={val}
              onClick={() => {
                this.handleSelection(idx);
              }}
          >
            {val}
          </li>
      );
    });

    return (
        <ul className="autocomplete-input">
          {helperOptions}
        </ul>
    );
  }

  render() {
    const {
      disabled,
    } = this.props;

    const {value, helperVisible} = this.state;


    return (
        <>
        <textarea
            className="autocomplete"
            disabled={disabled}
            onChange={this.handleChange}
            value={value}
        />
          {helperVisible && this.renderAutocompleteList()}
     </>
    );
  }
}

export default AutoCompleteTextField;
