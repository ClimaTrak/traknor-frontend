import { Button, type ButtonProps } from '@mantine/core';
import clsx from 'clsx';

const GradientButton = ({ className, ...props }: ButtonProps) => (
  <Button
    {...props}
    className={clsx(
      'bg-gradient-to-r from-[#00fff4] to-[#00968f] hover:opacity-90',
      className,
    )}
  />
);

export default GradientButton;
