export interface IUniversity {
  name: string;
  initials: string;
}

export interface UniversitiesRepository {
  create: (data: IUniversity) => Promise<void>;
}