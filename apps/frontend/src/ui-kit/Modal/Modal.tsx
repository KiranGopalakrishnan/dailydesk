import { ReactNode } from 'react';
import { Box, Grid, Modal as MUIModal } from '@mui/material';

import { theme } from '@ui-kit/Theme';

const styles = {
  container: {
    background: theme.palette.common.white,
    padding: theme.spacing(2),
    width: '480px',
    borderRadius: '24px',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    right: '16px',
    top: '16px',
    cursor: 'pointer',
  },
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {

  return (
    <MUIModal open={isOpen}>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
        <Grid container sx={styles.container}>
          <Box sx={styles.closeIcon} onClick={onClose}>
            X
          </Box>
          {children}
        </Grid>
      </Grid>
    </MUIModal>
  );
};
