export interface PortfolioModule {
  id: string;
  label: string;
  iconName: string;
  available: boolean;
}

export const MODULES: PortfolioModule[] = [
  { id: "about", label: "About", iconName: "User", available: true },
  { id: "projects", label: "Projects", iconName: "FolderOpen", available: true },
  { id: "resume", label: "Resume", iconName: "FileText", available: true },
  { id: "contact", label: "Contact", iconName: "Mail", available: true },
  { id: "photography", label: "Photography", iconName: "Camera", available: false },
];

export type ModuleId =
  | "about"
  | "projects"
  | "resume"
  | "contact"
  | "photography";
