import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode
  basedOn: boolean
}

export const RenderConditionally: FC<Props> = ({ basedOn, children }) => (
  <>{basedOn && children}</>
);
