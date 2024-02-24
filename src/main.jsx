import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Contact from "./Contact";
import EditContact from "./EditContact";
import Error from "./Error";
import Index from "./Index";
import Root from "./Root";
import {
  contactsActions,
  deleteContactAction,
  editContactAction,
  favouriteAction,
} from "./actions/contactsActions";
import "./index.css";
import { contactLoader, contactsLoader } from "./loaders/contactsLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: contactsLoader,
    action: contactsActions,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: favouriteAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editContactAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: deleteContactAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
