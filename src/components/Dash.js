import React from 'react';
import _ from 'lodash';
import {
  LineHeader,
  Payline,
} from './_index';

const Dash = props => (
  <div>
    {
      props.group.map(member => member.id === props.userId ? null :
        <div
          key={_.uniqueId()}
        >
          <LineHeader
            member={member}
            //balance={props.balances[member.id]}
          />
          <Payline
            member={member}
            transactions={props.transactions}
          />
        </div>
      )
    }
  </div>
);

export default Dash;