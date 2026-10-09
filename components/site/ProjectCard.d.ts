import * as React from 'react';

export interface ProjectCardProps {
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  /** Cover image URL. */
  image: string;
  /** "01" … "05" */
  number: string;
  title: string;
  /** Course / discipline line under the title. */
  discipline?: string;
  /** CSS aspect-ratio of the cover. Default "4 / 3". */
  aspect?: string;
  /** object-position of the cover crop. */
  imagePosition?: string;
  /** Small pill after the discipline, e.g. "Proiect de echipă". */
  badge?: string;
  style?: React.CSSProperties;
}

export function ProjectCard(props: ProjectCardProps): JSX.Element;
