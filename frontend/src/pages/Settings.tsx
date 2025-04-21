import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';

const Settings: React.FC = () => {
  // Mock data - replace with real data later
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      inApp: true,
      pushNotifications: false,
    },
    birthdayReminders: {
      enabled: true,
      daysInAdvance: [1, 3, 7],
    },
    checkInReminders: true,
    timezone: 'America/New_York',
  });

  const handleNotificationChange = (type: keyof typeof settings.notifications) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  const handleBirthdayReminderChange = (enabled: boolean) => {
    setSettings((prev) => ({
      ...prev,
      birthdayReminders: {
        ...prev.birthdayReminders,
        enabled,
      },
    }));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {/* Notification Settings */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Notification Preferences
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.notifications.email}
                onChange={() => handleNotificationChange('email')}
              />
            }
            label="Email Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.notifications.inApp}
                onChange={() => handleNotificationChange('inApp')}
              />
            }
            label="In-App Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.notifications.pushNotifications}
                onChange={() => handleNotificationChange('pushNotifications')}
              />
            }
            label="Push Notifications"
          />
        </Box>
      </Paper>

      {/* Birthday Reminder Settings */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Birthday Reminders
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.birthdayReminders.enabled}
                onChange={(e) => handleBirthdayReminderChange(e.target.checked)}
              />
            }
            label="Enable Birthday Reminders"
          />
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Remind me
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {settings.birthdayReminders.daysInAdvance.map((days) => (
                <Chip
                  key={days}
                  label={`${days} ${days === 1 ? 'day' : 'days'} before`}
                  onDelete={() => {
                    // TODO: Implement delete functionality
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Timezone Settings */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Timezone Settings
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="timezone-select-label">Timezone</InputLabel>
          <Select
            labelId="timezone-select-label"
            value={settings.timezone}
            label="Timezone"
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, timezone: e.target.value }))
            }
          >
            <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
            <MenuItem value="America/Chicago">Central Time (CT)</MenuItem>
            <MenuItem value="America/Denver">Mountain Time (MT)</MenuItem>
            <MenuItem value="America/Los_Angeles">Pacific Time (PT)</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {/* Save Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // TODO: Implement save functionality
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default Settings; 