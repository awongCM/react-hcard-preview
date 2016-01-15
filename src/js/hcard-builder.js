var HcardBuilder = React.createClass({
  getInitialState: function () {
    return {
      given_name: '',
      surname: '',
      email : '',
      phone : '',
      house_no : '',
      street : '',
      suburb: '',
      state: '',
      postcode: '',
      country: ''
    };
  },

  handleInputField: function(fieldName, e) {
    var change = {},
        fieldValue = e.target.value;

    change[fieldName]  = fieldValue;
    this.setState(change);

    this.updatePreviewFields(fieldName, fieldValue);
  },

  handleImageUpload: function (e) {
    var reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById("image").src = e.target.result;
    };

    reader.readAsDataURL(e.target.files[0]);
  },

  updatePreviewFields: function(fieldName, fieldValue){
    this.props.onChange(fieldName, fieldValue);
  },

  renderTextFieldElement: function (labelHeading, stateFieldName, firstColumnPadding) {
    /**
      TODO: Very bad idea to do the dynamic styling by tightening the coupling on this element.
            It will have to do for now to achieve pixel-perfect designs.
     */
    return(
      <label htmlFor={stateFieldName} className={"hcard-builder-label-container " + firstColumnPadding}>
        <span className="hcard-builder-label-heading">{labelHeading}</span>
        <input className="hcard-builder-input-text " type="text" name={stateFieldName} value={this.state[stateFieldName]} onChange={this.handleInputField.bind(this, stateFieldName)} />
      </label>
    )
  },

  renderPersonalDetailsSection: function () {
    return(
      <section className="hcard-builder-personal-details-section">
        <h3 className="hcard-builder-form-heading">PERSONAL DETAILS</h3>
        <p className="hcard-builder-input-row">
          {this.renderTextFieldElement('GIVEN NAME','given_name', 'hcard-builder-label-container__right-offset')}
          {this.renderTextFieldElement('SURNAME','surname', '')}
        </p>
        <p className="hcard-builder-input-row" >
          {this.renderTextFieldElement('EMAIL','email', 'hcard-builder-label-container__right-offset')}
          {this.renderTextFieldElement('PHONE','phone', '')}
        </p>
      </section>
    )
  },
  renderAddressSection: function () {
    return(
      <section className="hcard-builder-address-section">
        <h3 className="hcard-builder-form-heading">ADDRESS</h3>
        <p className="hcard-builder-input-row">
          {this.renderTextFieldElement('HOUSE NAME OR #','house_no', 'hcard-builder-label-container__right-offset')}
          {this.renderTextFieldElement('STREET','street', '')}
        </p>
        <p className="hcard-builder-input-row">
          {this.renderTextFieldElement('SUBURB','suburb', 'hcard-builder-label-container__right-offset')}
          {this.renderTextFieldElement('STATE','state', '')}
        </p>
        <p className="hcard-builder-input-row">
          {this.renderTextFieldElement('POSTCODE','postcode', 'hcard-builder-label-container__right-offset')}
          {this.renderTextFieldElement('COUNTRY','country', '')}
        </p>
      </section>
    )
  },

  renderButtonsSection: function () {
    return(
      <section>
          <div className="hcard-builder-button hcard-builder-button__right-gutter hcard-builder-button__upload " type="button">Upload Avatar <input id="avatar_upload" type="file" onChange={this.handleImageUpload.bind(this)}/></div>
          <button className="hcard-builder-button hcard-builder-button__create" type="button">Create hCard</button>
      </section>
    )
  },

  render: function() {
    return (
      <div className="hcard-builder">
          <h1 className="hcard-builder-heading">hCard Builder</h1>
          <form className="hcard-builder-form">
            {this.renderPersonalDetailsSection()}
            {this.renderAddressSection()}
            {this.renderButtonsSection()}
          </form>
      </div>
    )

  }
});

module.exports = HcardBuilder;