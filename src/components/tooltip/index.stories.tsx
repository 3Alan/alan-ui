import Tooltip from '../tooltip';
import Button from '../button';

export default {
  title: 'Components/Tooltip',
  component: Tooltip
};

export const tooltip = () => {
  return (
    <div style={{ paddingTop: 50 }}>
      <Tooltip content="tooltip">
        <Button>hover me</Button>
      </Tooltip>
    </div>
  );
};
