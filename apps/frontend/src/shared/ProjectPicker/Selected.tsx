import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { theme } from '@ui-kit/Theme';
import { ListItem } from '@shared/ProjectPicker/ListItem';
import { Project } from '@store/project';

const styles = {
  container: {
    height: '72px',
    background: theme.palette.common.white,
    boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
    borderRadius: '16px',
    padding: theme.spacing(0, 1),
    border: `solid 2px ${theme.palette.common.white}`,
    cursor: 'pointer',
    '&:hover': {
      border: `solid 2px ${theme.palette.primary.main}`,
    },
  },
  arrows: {
    height: '16px',
  },
};

interface Props {
  selected: Project;
  onClick: () => void;
}

export const Selected: FC<Props> = ({ onClick, selected }) => {
  return (
    <Grid container sx={styles.container} onClick={onClick}>
      <Grid container item xs={11}>
        <ListItem onClick={onClick} name={selected?.name} />
      </Grid>
      <Grid
        container
        item
        xs={1}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box height={'32px'}>
          <Box sx={styles.arrows}>
            <RiArrowUpSLine />
          </Box>
          <Box sx={styles.arrows}>
            <RiArrowDownSLine />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
