/* eslint-disable max-len */
import React,{ FC } from 'react';

const RepealButton: FC<{ disabled?: boolean; onClick: () => void }> = ({
  disabled = false,
  onClick = () => {},
}) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      p-id="36919"
      width="24"
      height="24"
      onClick={onClick}
    >
      <path
        d="M372.992 454.698667l-54.442667 54.4L128 318.549333 318.549333 128l54.442667 54.442667-97.621333 97.621333h276.053333a307.968 307.968 0 1 1 0 615.936h-346.453333v-77.013333h346.453333a230.997333 230.997333 0 1 0 0-461.952h-276.053333l97.621333 97.664z"
        p-id="36920"
        fill={disabled ? '#ebecef' : '#8a8a8a'}
      ></path>
    </svg>
  );
};

export default RepealButton;
