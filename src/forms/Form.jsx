import React, { Component } from 'react';
import './Form.css'; // Tệp CSS để tạo hiệu ứng trái tim đập

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beating: true, // Trạng thái đập trái
    };
  }


  render() {
    const { beating } = this.state;

    return (
      <div>
        <div className={`heart ${beating ? 'beat' : ''}`}></div>
      </div>
    );
  }
}

export default Form;
