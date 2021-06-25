import React, { FC } from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { getRandomThemeColor } from '@shared/utils/ColorUtils';
import { RiArrowDownSLine } from 'react-icons/ri';
import { RiArrowUpSLine } from 'react-icons/ri';
import { colors, theme } from '@ui-kit/Theme';
import { ListItem } from '@shared/ProjectPicker/ListItem';
import { Project } from '@store/project';

const useStyles = makeStyles({
  container: {
    height: '72px',
    background: theme.palette.common.white,
    //border: `solid 2px ${colors.GREY_3}`,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
    borderRadius: '16px',
    padding: theme.spacing(0, 1),
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
  selected: Project;
  onClick: () => void;
}

export const Selected: FC<Props> = ({ onClick, selected }) => {
  const styles = useStyles({ name: 'One' });
  return (
    <Grid container className={styles.container} onClick={onClick}>
      <Grid container item xs={11}>
        <ListItem onClick={onClick} name={selected?.name} />
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
