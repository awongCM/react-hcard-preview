var HcardPreview = React.createClass({
  getInitialState: function () {
    return {
         data: this.props.data
    };
  },

  renderAvatarSection: function () {
    return(
      <div className="hcard-preview-avatar-content">
          <h2 className="hcard-preview-avatar-heading">{this.props.data.given_name} {this.props.data.surname}</h2>
          <img className="hcard-preview-avatar-image" id='image' src={'assets/placeholder.jpg'} alt='' />
      </div>
    )
  },

  renderDataFieldSection: function () {
    return(
      <div className="hcard-preview-detail-content">
        <p className="hcard-preview-detail-row">
          <span className="hcard-preview-detail-label">EMAIL</span><span className="hcard-preview-detail-text">{this.props.data.email}</span>
        </p>
        <p className="hcard-preview-detail-row">
          <span className="hcard-preview-detail-label">PHONE</span><span className="hcard-preview-detail-text">{this.props.data.phone}</span>
        </p>
        <p className="hcard-preview-detail-row">
          <span className="hcard-preview-detail-label">ADDRESS</span><span className="hcard-preview-detail-text">{this.props.data.house_no} {this.props.data.street}</span>
        </p>
        <p className="hcard-preview-detail-row">
          <span className="hcard-preview-detail-label">&nbsp;</span><span className="hcard-preview-detail-text">{this.props.data.suburb}{(this.props.data.suburb!='' && this.props.data.state!= '' && this.props.data.suburb!=null && this.props.data.state!=null) ? ', ' : ''}{this.props.data.state}</span>
        </p>
        <p className="hcard-preview-detail-row">
          <span className="hcard-preview-detail-label">POSTCODE</span><span className="hcard-preview-detail-text hcard-preview-detail-text__modifier">{this.props.data.postcode}</span>
          <span className="hcard-preview-detail-label">COUNTRY</span><span className="hcard-preview-detail-text hcard-preview-detail-text__modifier">{this.props.data.country}</span>
        </p>
      </div>
    )
  },

  render: function(){
    return (
      <div className="hcard-preview">
        <div className="hcard-preview-container">
          <h2 className="hcard-preview-heading">HCARD PREVIEW</h2>
            {this.renderAvatarSection()}
            {this.renderDataFieldSection()}
        </div>
      </div>
    )
  }
});

module.exports = HcardPreview;