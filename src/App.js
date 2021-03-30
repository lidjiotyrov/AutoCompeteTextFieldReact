import React, {Component} from 'react';

import AutoCompleteTextField from './components/AutoCompleteTextField/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
      options: ["apple", "apricots", "avocados", "bananas", "boysenberries", "blueberries", "cherries", "cantaloupe"],
      trigger: '@',
      canChange: false,
    };
  }

  handleOptionsChange(e) {
    const value = e.target.value
    const options = value.replace(/\s+/g, '')
    if (options === this.state.options) {
      this.setState({canChange: false})
    }
    if (value.replace(this.state.value, '') === ',' || this.state.canChange) {
      this.setState({options: options.split(','), canChange: true})
    }
    this.setState({options: options.split(',')})
  }

  handleTriggerChange(e) {
    const value = e.target.value
    this.setState({trigger: value})
  }


  render() {
    const {disabled, options, trigger} = this.state
    return (
        <div>
          <div>
            <h2>AutoCompletion input</h2>
            <p><i>Just</i> {`input ${trigger}a to see in action`}</p>
            <AutoCompleteTextField
                disabled={disabled}
                options={options}
                trigger={trigger}
            />
          </div>
          <hr style={{margin: '20px 0'}}/>
          <div>
            <p><i>Also</i> We can change parameters array</p>
            <textarea
                value={options.join(', ')}
                style={{width: '300px', height: '100px', display: 'block', margin: '0 0 0 10px'}}
                onChange={e => this.handleOptionsChange(e)}
            />
            <p><i>or</i> trigger</p>
            <input
                type='text'
                style={{width: '300px', height: '20px', display: 'block', margin: '0 0 0 10px'}}
                value={trigger}
                onChange={(e) => this.handleTriggerChange(e)}
            />
          </div>
        </div>
    );
  }
}

export default App;
