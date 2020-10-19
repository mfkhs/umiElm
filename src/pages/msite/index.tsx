import React, { FC } from 'react';
import { connect, MisteModelState } from 'umi';

interface MsiteProps {
  miste: MisteModelState;
}
const Msite: FC<MsiteProps> = ({ miste }) => {
  return (
    <div>
      <h1>Page index{miste.name}</h1>
    </div>
  );
};

const mapStateToProps = ({ miste }: { miste: MisteModelState }) => {
  console.log(miste)
  return {
    miste,
  };
};


export default connect(mapStateToProps)(Msite);
