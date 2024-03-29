import React, { FC, useEffect, useState } from 'react';
import { Box, Grid, Link, Typography } from '@mui/material';
import { ProjectItem } from '@views/home/projects/ProjectItem';
import { theme } from '@ui-kit/Theme';
import { colors } from '@ui-kit/Theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store';
import { Project } from '@store/project';
import { routes } from '@config/routes';
import { WithSidebar } from '@shared/Sidebar/WithSidebar';

const styles = {
  container: {
    padding: theme.spacing(0, 8),
    backgroundColor: colors.GREY_6,
  },
  title: {
    padding: theme.spacing(4, 0),
    height: '100px',
    borderBottom: `solid 1px ${colors.GREY_4}`,
  },
  projectsContainer: {
    padding: theme.spacing(2, 0),
  },
};

const getProjectLink = (_id: Project['id']) => {
  return routes.HOME.url;
};

export const Projects: FC = () => {
  const dispatch = useDispatch();
  const projects = useSelector((root: RootState) => root.project.list);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // dispatch(fetchProjects());
  }, []);

  return (
    <WithSidebar>
      <Grid container sx={styles.container} alignItems={'flex-start'}>
        <Grid container>
          <Grid container justifyContent="space-between" sx={styles.title}>
            <Box>
              <Typography variant={'h4'}>{'Projects'}</Typography>
            </Box>
          </Grid>
          <Box>
            <Grid container sx={styles.projectsContainer}>
              {projects.map((project) => (
                <Box mr={4} key={project.id}>
                  <Link href={getProjectLink(project.id)}>
                    <ProjectItem key={project.id} project={project} />
                  </Link>
                </Box>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </WithSidebar>
  );
};
