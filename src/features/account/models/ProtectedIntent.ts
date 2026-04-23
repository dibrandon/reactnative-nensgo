export type ProtectedIntent =
  | {
      type: "open_favorites";
      returnTo?: string;
    }
  | {
      type: "open_profile";
      returnTo?: string;
    }
  | {
      type: "toggle_favorite";
      activityId: string;
      returnTo?: string;
    };
