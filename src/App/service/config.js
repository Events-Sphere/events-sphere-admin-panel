export default class Config {
  static baseUrl = "http://localhost:3000/api/v1";
  static OnlineUrl = "https://event-backend-9.onrender.com/api/v1";
  static login = "/admin/login";

  static createInternalTeam = "/admin/internal-teams/create";
  static deleteInternalTeam = "/admin/internal-teams/delete";
  static updateInternalTeam = "/admin/internal-teams/update";
  static singleInternalTeam = "/admin/internal-teams/single";
  static getAllInternalTeam = "/admin/internal-teams";

  static createEvent = "/event/events/create";
  static mainEventActive = "/admin/events/active";
  static mainEventPending = "/admin/events/pending";
  static mainEventCompleted = "/admin/events/completed";
  static mainEventRejected = "/admin/events/rejected";
  static subEvents = "/admin/subevents/";

  static approveUser = "/admin/users/approve";
  static rejectUser = "/admin/users/reject";
  static getAllUsers = "/admin/users";
  static getSingleUser = "/admin/users/single";

  static approveOrganizer = "/admin/organizers/approve";
  static rejectOrganizer = "/admin/organizers/reject";
  static createOrganizer = "/admin/organizers/create";

  static getAllEventCategory = "/admin/category";
  static createEventCategory = "/admin/category/create";
  static updateEventCategory = "/admin/category";

  static getDashboard = "/admin/dashboard";

  static eventMainImage = "http://localhost:3000/ev_main_img/";
  static eventCoverImage = "";
  static subEventImage = "";

  static userIdCard = "";
  static organizerIdCard = "";
  static organizerNoc = "";
  static InternalTeamProfile = "";
  static EventCategoryImage = "";
}
