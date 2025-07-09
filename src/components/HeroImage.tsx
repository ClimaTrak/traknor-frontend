import { Box } from '@mantine/core';

interface Props {
  image: string;
}

const HeroImage = ({ image }: Props) => (
  <Box
    className="relative h-full w-full bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${image})` }}
  >
    <div className="absolute inset-0 bg-black/20" />
  </Box>
);

export default HeroImage;
