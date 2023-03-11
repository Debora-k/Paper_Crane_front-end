import React from 'React'
export type admin = {
  readonly userId: number;
  name: string;
  email: string;
  type: string;
}[];

export type task = {
  readonly id: number;
  task: string;
  status: number;
  assigned: string;
};

export type project = {
  readonly id: number;
  title?: string;
  description?: string;
  status?: string;
  client?: string;
  dueDate?: string;
  repository?: string;
  tasks?: task[];
}[];

export interface DataContextType {
  admins: admin;
  setAdmins: React.Dispatch<React.SetStateAction<admin | null>>;
  projects: project;
  setProjects: React.Dispatch<React.SetStateAction<project | null>>;
}


export enum Status {
  // eslint-disable-next-line no-unused-vars
  TO_DO = -1,
  // eslint-disable-next-line no-unused-vars
  IN_PROGRESS = 0,
  // eslint-disable-next-line no-unused-vars
  DONE = 1,
}