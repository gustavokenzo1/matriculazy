export interface IUniversity {
  university: string;
  initials: string;
  courses: object[][];
  url: string;
}

export interface UniversitiesRepository {
  create: (data: IUniversity) => Promise<void>;
}