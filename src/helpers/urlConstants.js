export const CONSTANTS = {
  STATUS: {
    COMPLETED: "COMPLETE",
    INCOMPLETED: "INCOMPLETE"
  },

  // Tasks answers flag
  ANSWERS: {
    ANSWER_POPUP: "ANSWER_POPUP",
    ANSWER_SUMMARY: "ANSWER_SUMMARY",
    ANSWER_BOTH: "ANSWER_BOTH"
  },

  // URL constants
  PROGRAMS:                   "/programs",
  PROGRAM:                    "/programs/?",
  MODULES:                    "/programs/?/modules/?",
  ACTIVITIES:                 "/programs/?/modules/?/activities/?",
  TASKS:                      "/programs/?/modules/?/tasks/?",

  // Views
  CALENDAR:                   "/calendar",
  PROFILE:                    "/user/profile",
  FAVOURITE_MODULES:          "/user/favourites/modules",
  FAVOURITE_ACTIVITIES:       "/user/favourites/activities",
  RESOURCES:                  "/resources",
  HOME:                       "/home",
  BASE_URL:                   "/",
  TEAM:                       "/team",
  NOTIFICATIONS:              "/notifications",
  TASK_SUMMARY:               "/programs/?/modules/?/tasks/?/summary",


  // User register
  REGISTER_USER:              "user/register",

  // Toggle Favourite
  TOGGLE_MODULE_FAVOURITE:    "user/favourites/modules/:id/toggle?programId=:id",
  TOGGLE_ACTIVITY_FAVOURITE:  "user/favourites/activities/:id/toggle?programId=:id&moduleId=:id",
  TOGGLE_TASK_FAVOURITE:      "user/favourites/tasks/:id/toggle?programId=:id&moduleId=:id"
}
