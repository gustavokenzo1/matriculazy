export interface IUniversity {
  university: string;
  initials: string;
  courses: object[][];
  url: string;
}

export interface UniversitiesRepository {
  create: (data: IUniversity) => Promise<void>;
  read: (initials: string) => Promise<object>;
  readAll: () => Promise<object[]>;
  update: (data: IUniversity) => Promise<void>;
}