import axios from "axios";

const URL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";

export const fetchProjects = () => dispatch => {
  axios
    .get(`${URL}/api/get-projects`, {})
    .then(projects => {
      dispatch({ type: "PROJECTS_FETCHED", payload: projects.data });
    })
    .catch(e => {
      dispatch({ type: "PROJECTS_FETCHED_FAILED", payload: e });
    });
};

export const fetchProject = localURL => dispatch => {
  axios
    .get(`${URL}/api/get-project`, { params: { localURL } })
    .then(projects => {
      dispatch({ type: "PROJECTS_FETCHED", payload: projects.data });
    })
    .catch(e => {
      dispatch({ type: "PROJECTS_FETCHED_FAILED", payload: e });
    });
};

export const updateProjectOrder = projects => dispatch => {
  axios
    .put(`${URL}/api/update-project-order`, { projects }, { withCredentials: true })
    .then(res => {
      dispatch(fetchProjects());
    });
};
