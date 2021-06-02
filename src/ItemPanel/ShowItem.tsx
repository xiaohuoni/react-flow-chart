import React from 'react';

interface ShowItemProps {
  showImg: string;
  label: string;
}
class ShowItem extends React.Component<ShowItemProps> {
  render() {
    const { showImg, label } = this.props;
    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <img src={showImg} width={40} height={40} alt="" />
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'rgba(51,51,51,1)',
            lineHeight: '17px',
            marginTop: '10px',
          }}
        >
          {label}
        </div>
      </div>
    );
  }
}

export default ShowItem;
