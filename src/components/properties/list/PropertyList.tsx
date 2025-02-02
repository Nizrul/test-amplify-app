import { Typography, Box } from '@mui/material';
import { Office } from '../../../types/properties';
import RoomCard from './RoomCard';

export interface PropertyListSectionProps {
  office: Office
}

function PropertyListSection(props: PropertyListSectionProps) {
  const { office } = props;

  return <>
    <Typography variant="h4">
      {office.name}
    </Typography>
    <Typography variant="body1" gutterBottom>
      {office.address}
    </Typography>
    <Box sx={{ display: 'flex', m: 2, p:2, mb: 5, justifyContent: 'flex-start' }}>
      {
        office.rooms.map(room => (<RoomCard officeName={office.name} room={room} />))
      }
    </Box>
  </>;
}

export default PropertyListSection;