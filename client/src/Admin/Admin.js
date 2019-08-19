import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

import { fetchProjects, updateProjectOrder } from '../redux/actions/projectsActions';

const DraggableList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  /* grid-row-gap: 10px; */
  width: 50vh;
`;

const DraggableProject = styled.div`
  padding: 10px;
  border: 1px black solid;
  border-radius: 2px;
  margin-bottom: 5px;

  :hover {
    cursor: move;
  }
`;

const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

const Admin = () => {
  const isSignedIn = useSelector(state => state.user.signedIn);
  const projects = useSelector(state => state.projects);
  const updatingProjects = useSelector(state => state.projects.updating);
  const [dragList, setDragList] = useState(null);
  const [draggedProject, setDraggedProject] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!projects.fetched) {
      dispatch(fetchProjects());
    }
  }, []);

  useEffect(() => {
    // When the projects are fetched from redux state, store them in local state which we will manipulate
    if (projects.fetched && dragList === null) {
      setDragList(projects.projects);
    }
  });

  const createAccount = event => {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;

    // Make a POST request to the server for creating an account
    axios.post(`${URL}/create-account`, {
      username,
      password
    });
  };

  const authenticate = event => {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;

    axios
      .post(
        `${URL}/sign-in`,
        {
          username,
          password
        },
        { withCredentials: true }
      )
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      });
  };

  const testCookie = () => {
    axios.post(
      `${URL}/valid-token`,
      {},
      {
        // This will allow sending cookies with CORS policy
        withCredentials: true
      }
    );
  };

  const saveChanges = () => {
    // var temp = [...dragList];s

    dispatch(updateProjectOrder(dragList));
  };

  const dragStartHandler = ev => {
    // Store the dragged item in state
    var draggedItemIndex = ev.target.id;
    setDraggedProject(dragList[draggedItemIndex]);

    ev.dataTransfer.setData('required', draggedItemIndex);

    // ev.dataTransfer.effectAllowed = "move";
    console.log('Dragging has started!');
  };

  const dragOverHandler = ev => {
    ev.preventDefault(); // This is needed in order to stop the animation when droping an item
    ev.dataTransfer.dropEffect = 'move';
    // Index of project we are hovering over
    var dragOverIndex = ev.target.id;

    // Copy of array, don't manipulate state variable directly
    var newList = [...dragList];

    // Delete dragged project from the list, so it only appear once
    newList = newList.filter(project => project.title !== draggedProject.title);

    // Insert dragged project at the position we are hovering over
    newList.splice(dragOverIndex, 0, draggedProject);

    setDragList(newList);
  };

  const onDragEndHandler = ev => {
    ev.dataTransfer.dropEffect = 'none';
    setDraggedProject(null);
  };

  if (isSignedIn === null) return <div style={{ margin: '10px' }}>Loading...</div>;

  // If you are signed in and projects haven't been fetched yet
  if (!dragList) return <div style={{ margin: '10px' }}>Loading projects data...</div>;

  const notSignedInView = (
    <>
      <label>Create admin account</label>
      <form onSubmit={createAccount}>
        <input name="username" type="text" placeholder="username" />
        <br />
        <input name="password" type="password" placeholder="password" />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <label>Sign in</label>
      <form onSubmit={authenticate}>
        <input name="username" type="text" placeholder="username" />
        <br />
        <input name="password" type="password" placeholder="password" />
        <br />
        <input type="submit" value="Login" />
      </form>
      <button onClick={testCookie}>Test Cookie</button>
    </>
  );

  const signedInView = (
    <DraggableList>
      {dragList.map((project, i) => {
        return (
          <DraggableProject
            id={i} // use this as index
            key={project._id}
            draggable
            onDragStart={dragStartHandler}
            onDragOver={dragOverHandler}
            onDragEnd={onDragEndHandler}
          >
            {project.title}
          </DraggableProject>
        );
      })}
      <button onClick={() => saveChanges()} disabled={updatingProjects}>
        Save
      </button>
    </DraggableList>
  );

  return (
    <div style={{ margin: '10px' }}>
      {!isSignedIn && notSignedInView}
      {isSignedIn && signedInView}
    </div>
  );
};

export default Admin;