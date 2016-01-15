'use strict';

var HcardBuilder = require('./hcard-builder');
var HcardPreview = require('./hcard-preview');

var Main = React.createClass({
  getInitialState: function () {
    return {
           data: {
              given_name: "",
              surname: "",
              email: "",
              phone: "",
              house_no: "",
              street: "",
              suburb: "",
              state: "",
              postcode: "",
              country: ""
           }
    }
  },
  //Update the Hcard Preview fields
  handleUpdates: function (fieldName, fieldValue){
    var previewFieldData = this.state.data
    previewFieldData[fieldName] = fieldValue;
    this.setState(previewFieldData);
  },
  render: function(){
    return (
      <div className="main-content">
        <HcardBuilder onChange={this.handleUpdates} data={this.state.data}/>
        <HcardPreview data={this.state.data}/>
      </div>
    )
  }
});

module.exports = Main;