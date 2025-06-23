import type { Meta, StoryObj } from '@storybook/react';
import ReportDownloader from './ReportDownloader';

const meta: Meta<typeof ReportDownloader> = {
  title: 'Pages/ReportDownloader',
  component: ReportDownloader,
};

export default meta;

export const Basic: StoryObj<typeof ReportDownloader> = {};
