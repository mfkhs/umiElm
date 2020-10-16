import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
const Header = () => {
  return (
    <div>
    <NavBar
      mode="dark"
      leftContent="Back"
      rightContent={[
        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        <Icon key="1" type="ellipsis" />,
      ]}
    >NavBar</NavBar>
  </div>
  );
};

export default Header