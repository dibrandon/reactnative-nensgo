export type AppUser = {
  id: string;
  authUserId: string;
  name: string;
  lastName: string;
  fullName: string;
  email: string;
  cityId: string | null;
  cityName: string;
  roleId: string | null;
};
