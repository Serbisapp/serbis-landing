export type ProjectStatus = 'En producción' | 'En desarrollo';

export interface ProjectPalette {
  accent: string;
  ink: string;
  paper: string;
}

export interface Project {
  slug: string;
  name: string;
  shortDescription: string;
  status: ProjectStatus;
  context: string;
  problem: string[];
  solution: string[];
  technology: string;
  results: string[];
  visualsNote: string;
  logoSrc?: string;
  mobileScreenshot: string;
  palette: ProjectPalette;
}

export interface ProjectSlide {
  id: string;
  name: string;
  status: ProjectStatus;
  summary: string;
  detail: string;
  logoSrc?: string;
  mobileScreenshot: string;
  palette: ProjectPalette;
  href?: string;
}
