import React, { FC } from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { getRandomThemeColor } from '@shared/utils/ColorUtils';
import { RiArrowDownSLine } from 'react-icons/ri';
import { RiArrowUpSLine } from 'react-icons/ri';
import { theme } from '@ui-kit/Theme';

const useStyles = makeStyles({
  container: {
    height: '72px',
    background: theme.palette.common.white,
    boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
    borderRadius: '16px',
    padding: theme.spacing(0, 2),
    border: `solid 2px ${theme.palette.common.white}`,
    cursor: 'pointer',
    '&:hover': {
      border: `solid 2px ${theme.palette.primary.main}`,
    },
  },
  projectIcon: ({ name }: { name: string }) => ({
    height: '40px',
    width: '40px',
    backgroundColor: getRandomThemeColor(name),
    borderRadius: '100%',
  }),
  arrows: {
    height: '16px',
  },
});

interface Props {
  onClick: () => void;
}

export const Selected: FC<Props> = ({ onClick }) => {
  const styles = useStyles({ name: 'One' });
  return (
    <Grid container className={styles.container} onClick={onClick}>
      <Grid container item xs={3} justify={'center'} alignItems={'center'}>
        <Grid
          container
          item
          justify={'center'}
          alignItems={'center'}
          className={styles.projectIcon}
        >
          <Typography style={{ color: theme.palette.common.white }}>{'NM'}</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={8} alignItems={'center'} justify={'flex-start'}>
        <Box pl={1}>
          <Typography>{'Project name'}</Typography>
        </Box>
      </Grid>
      <Grid container item xs={1} alignItems={'center'} justify={'center'}>
        <Box height={'32px'}>
          <Box className={styles.arrows}>
            <RiArrowUpSLine />
          </Box>
          <Box className={styles.arrows}>
            <RiArrowDownSLine />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
