import Tooltip from '../tooltip';
import Button from '../button';

export default {
  title: 'Components/Tooltip',
  component: Tooltip
};

export const tooltip = () => {
  return (
    <Tooltip content="tooltip图形待完成...">
      <Button>hover me</Button>
    </Tooltip>
  );
};
