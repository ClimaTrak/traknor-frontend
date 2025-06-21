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

export const Typography = () => {
  const { typography } = useTokens();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Object.entries(typography).map(([token, size]) => (
        <div key={token} style={{ fontSize: size }}>
          {token}: {size}
        </div>
      ))}
    </div>
  );
};

export const Spacing = () => {
  const { spacing } = useTokens();
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {Object.entries(spacing).map(([token, space]) => (
        <div
          key={token}
          style={{
            width: space,
            height: space,
            background: '#eee',
            position: 'relative',
          }}
        >
          <span style={{ position: 'absolute', top: '100%' }}>{token}</span>
        </div>
      ))}
    </div>
  );
};
