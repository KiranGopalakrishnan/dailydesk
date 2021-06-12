import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import { ProjectItem } from '@views/home/projects/ProjectItem';
import { theme } from '@ui-kit/Theme';
import { colors } from '@ui-kit/Theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store';
import { fetchProjects } from '@store/project/projects-thunk';
import { RenderConditionally } from '@shared/utils/RenderConditionally';
import { CreateProjectModal } from '@views/home/projects/CreateProjectModal';
import { Project } from '@store/project';
import { routes } from '@config/routes';
import { WithSidebar } from '@shared/Sidebar/WithSidebar';

const useStyles = makeStyles({
  container: {
    padding: theme.spacing(0, 8),
  },
  title: {
    padding: theme.spacing(4, 0),
    height: '100px',
    borderBottom: `solid 1px ${colors.GREY_5}`,
  },
  projectsContainer: {
    padding: theme.spacing(2, 0),
  },
});

const getProjectLink = (id: Project['id']) => {
  return routes.PROJECT_OVERVIEW.as({ id });
};

export const Projects: FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const projects = useSelector((root: RootState) => root.project.list);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <WithSidebar>
      <Grid container className={styles.container} alignItems={'flex-start'}>
        <Grid container>
          <Grid container justify="space-between" className={styles.title}>
            <Box>
              <Typography variant={'h4'}>{'Projects'}</Typography>
            </Box>
            <Grid container item xs={3} justify="flex-end" alignItems="center">
              <Button variant={'contained'} color="primary" onClick={() => setIsOpen(true)}>
                {'Create +'}
              </Button>
            </Grid>
          </Grid>
          <Box>
            <Grid container className={styles.projectsContainer}>
              {projects.map((project) => (
                <Box mr={4} key={project.id}>
                  <Link href={getProjectLink(project.id)}>
                    <ProjectItem key={project.id} project={project} />
                  </Link>
                </Box>
              ))}
            </Grid>
          </Box>

          <RenderConditionally basedOn={isOpen}>
            <CreateProjectModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </RenderConditionally>
        </Grid>
      </Grid>
    </WithSidebar>
  );
};
