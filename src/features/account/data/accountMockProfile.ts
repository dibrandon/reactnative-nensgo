import type { AccountMockProfile } from "@/features/account/models/AccountMockProfile";

export const accountMockProfile: AccountMockProfile = {
  displayName: "USUARIO",
  city: "Sitges",
  favorites: [
    {
      id: "1",
      title: "Hockey base entre semana",
      city: "Sitges",
    },
    {
      id: "3",
      title: "Iniciacion a la natacion",
      city: "Sitges",
    },
    {
      id: "2",
      title: "Taller de pintura creativa",
      city: "Sant Pere de Ribes",
    },
  ],
};
