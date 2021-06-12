import React, { FC, useState } from 'react';
import { Box, Collapse, Grid, makeStyles, Slide, Typography } from '@material-ui/core';
import { getRandomThemeColor } from '@shared/utils/ColorUtils';
import { RiArrowDownSLine } from 'react-icons/ri';
import { RiArrowUpSLine } from 'react-icons/ri';
import { theme } from '@ui-kit/Theme';
import { Selected } from '@shared/ProjectPicker/Selected';
import { RenderConditionally } from '@shared/utils/RenderConditionally';

const useStyles = makeStyles({
  container: {
    overflow: 'visible',
  },
  list: {
    position: 'absolute',
    top: '-8px',
    left: 0,
    background: theme.palette.common.white,
    height: '300px',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
    borderRadius: '16px',
  },
});

export const ProjectPicker: FC = () => {
  const [open, setOpen] = useState(false);
  const styles = useStyles({ name: 'One' });
  return (
    <Grid container className={styles.container}>
      <Grid container>
        <Selected onClick={() => setOpen(!open)} />
      </Grid>
      <Grid container style={{ position: 'relative' }}>
        <Slide in={open}>
          <Grid container className={styles.list}>
            <Grid container>
              <Typography>{'Item 1'}</Typography>
            </Grid>
          </Grid>
        </Slide>
      </Grid>
    </Grid>
  );
};
