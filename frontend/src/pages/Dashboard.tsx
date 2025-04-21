import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
} from '@mui/material';
import {
  Cake as CakeIcon,
  Notifications as NotificationsIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  // Mock data - replace with real data later
  const upcomingBirthdays = [
    { id: '1', name: 'John Doe', date: '2024-04-25' },
    { id: '2', name: 'Jane Smith', date: '2024-04-28' },
  ];

  const suggestedCheckIns = [
    { id: '1', name: 'Alice Johnson', lastContact: '2 months ago' },
    { id: '2', name: 'Bob Wilson', lastContact: '3 months ago' },
  ];

  const recentUpdates = [
    { id: '1', name: 'Mike Brown', update: 'Started a new job at Google' },
    { id: '2', name: 'Sarah Davis', update: 'Moved to San Francisco' },
  ];

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={3}>
        {/* Upcoming Birthdays */}
        <Box flex={1} minWidth={300}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CakeIcon sx={{ mr: 1 }} color="primary" />
              <Typography variant="h6">Upcoming Birthdays</Typography>
            </Box>
            <List>
              {upcomingBirthdays.map((birthday) => (
                <ListItem key={birthday.id}>
                  <ListItemAvatar>
                    <Avatar>{birthday.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={birthday.name}
                    secondary={`Birthday: ${birthday.date}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Suggested Check-ins */}
        <Box flex={1} minWidth={300}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <NotificationsIcon sx={{ mr: 1 }} color="primary" />
              <Typography variant="h6">Suggested Check-ins</Typography>
            </Box>
            <List>
              {suggestedCheckIns.map((checkIn) => (
                <ListItem key={checkIn.id}>
                  <ListItemAvatar>
                    <Avatar>{checkIn.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={checkIn.name}
                    secondary={`Last contact: ${checkIn.lastContact}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Recent Updates */}
        <Box flex={1} minWidth={300}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <UpdateIcon sx={{ mr: 1 }} color="primary" />
              <Typography variant="h6">Recent Updates</Typography>
            </Box>
            <List>
              {recentUpdates.map((update) => (
                <ListItem key={update.id}>
                  <ListItemAvatar>
                    <Avatar>{update.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={update.name}
                    secondary={update.update}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard; 