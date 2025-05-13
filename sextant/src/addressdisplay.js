import React, { Component } from 'react';

class AddressDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipAddress: null
    };
  }

  componentDidMount() {
    const { version } = this.props;
    const url =
      version === 'v6'
        ? 'https://api64.ipify.org?format=json'
        : 'https://api.ipify.org?format=json';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch IP address');
        }
        return response.json();
      })
      .then((data) => this.setState({ ipAddress: data.ip }))
      .catch((error) => this.setState({ ipAddress: 'Error: ' + error.message }));
  }

  render() {
    const { version } = this.props;
    const { ipAddress } = this.state;

    return (
      <div className="AddressDisplay">
        <strong>{version === 'v6' ? 'IPv6' : 'IPv4'} Address:</strong>{' '}
        {ipAddress || 'Loading...'}
      </div>
    );
  }
}

export default AddressDisplay;
