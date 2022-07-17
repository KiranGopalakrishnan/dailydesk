import React, { FC } from 'react';
import { getRandomThemeColor } from '@shared/utils/ColorUtils';
import { theme } from '@ui-kit/Theme';
import { Box, Grid, Typography } from '@mui/material';

interface StyleProps {
  main: boolean;
  name: string;
}
const styles = {
  container: ({ main }: StyleProps) => ({
    height: '64px',
    background: theme.palette.common.white,
    cursor: 'pointer',
    '&:hover': {
      border: main ? `solid 2px ${theme.palette.primary.main}` : 'none',
    },
  }),
  projectIcon: ({ name }: StyleProps) => ({
    height: '40px',
    width: '40px',
    backgroundColor: getRandomThemeColor(name),
    borderRadius: '100%',
  }),
  name: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  arrows: {
    height: '16px',
  },
}

interface Props {
  name: string;
  onClick: () => void;
  main?: boolean;
}

export const ListItem: FC<Props> = ({ name, onClick, main = false }) => {
  return (
    <Grid container sx={styles.container({ main, name })} onClick={onClick}>
      <Grid container item xs={3} justifyContent={'center'} alignItems={'center'}>
        <Grid
          container
          item
          justifyContent={'center'}
          alignItems={'center'}
          sx={styles.projectIcon({ main, name })}
        >
          <Typography sx={{ color: theme.palette.common.white }}>{'NM'}</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={8} alignItems={'center'} justifyContent={'flex-start'}>
        <Box pl={1}>
          <Typography sx={styles.name}>{name}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
