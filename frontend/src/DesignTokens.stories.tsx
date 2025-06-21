import type { Meta } from '@storybook/react';
import useTokens from './hooks/useTokens';

const meta: Meta = {
  title: 'Design Tokens',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Colors = () => {
  const { colors } = useTokens();
  return (
    <div>
      {Object.entries(colors).map(([key, value]) =>
        typeof value === 'string' ? (
          <div key={key} style={{ background: value, padding: 10 }}>
            {key}: {value}
          </div>
        ) : (
          Object.entries(value).map(([shade, hex]) => (
            <div key={shade} style={{ background: hex, padding: 10 }}>
              {key}-{shade}: {hex}
            </div>
          ))
        ),
      )}
    </div>
  );
};
