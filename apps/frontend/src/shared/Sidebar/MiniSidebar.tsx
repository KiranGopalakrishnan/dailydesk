import React, { FC } from 'react';
import { colors } from '@ui-kit/Theme/colors';
import { theme } from '@ui-kit/Theme';
import { FaTasks } from 'react-icons/fa';
import { RiSettings4Fill } from 'react-icons/ri';
import { Box, Grid } from '@mui/material';

const styles = {
  container: {
    backgroundColor: colors.GREY_BG,
    borderRight: `solid 1px ${colors.GREY_7}`,
  },
  menuItem: {
    borderBottom: `solid 1px ${colors.GREY_5}`,
    '& :last-child': {
      borderBottom: 'none',
    },
  },
}

export const MiniSidebar: FC = () => {
  return (
    <Grid container sx={styles.container} justifyContent={'flex-start'} direction={'column'}>

      <Grid container justifyContent={'center'} sx={styles.menuItem}>
        <Box pt={2} pb={2}>
          <FaTasks size={24} color={theme.palette.primary.main} />
        </Box>
      </Grid>
      <Grid container justifyContent={'center'} sx={styles.menuItem}>
        <Box pt={2} pb={2}>
          <RiSettings4Fill size={24} color={theme.palette.primary.main} />
        </Box>
      </Grid>
    </Grid>
  );
};
