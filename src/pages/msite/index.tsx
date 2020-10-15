import React from 'react';
import { connect } from 'umi';

const Msite = ({ miste }) => {
  return (
    <div>
      <h1>Page index{miste.name}</h1>
    </div>
  );
};

const mapStateToProps = ({ miste }) => {
  return {
    miste,
  };
};

export default connect(mapStateToProps)(Msite);
