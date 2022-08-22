/* eslint-disable max-len */
import { FC } from 'react';

const RepealButton: FC<{ disabled?: boolean; onClick: () => void }> = ({
  disabled = false,
  onClick = () => {},
}) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      p-id="37279"
      width="24"
      height="24"
      onClick={onClick}
    >
      <path
        d="M614.4 454.698667l54.485333 54.4 190.549334-190.549334L668.885333 128 614.4 182.442667l97.621333 97.621333h-276.096a307.968 307.968 0 1 0 0 615.936h346.453334v-77.013333h-346.453334a230.997333 230.997333 0 1 1 0-461.952h276.096l-97.621333 97.664z"
        p-id="37280"
        fill={disabled ? '#ebecef' : '#8a8a8a'}
      ></path>
    </svg>
  );
};

export default RepealButton;
