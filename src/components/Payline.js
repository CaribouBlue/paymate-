import React from 'react';

const Payline = props => (
  <div>
    <pre>
      {(() => {
        let arr = [];
        for (let key in props.transactions) {
          if (props.transactions[key].payeeId === props.member.id || props.transactions[key].payerId === props.member.id)
            arr.push(props.transactions[key]);
        }
        return JSON.stringify(arr);
      })()}
    </pre>
  </div>
);

export default Payline;