import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import UploadDocument from "./UploadDocument";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#ffffff"
  },
  title: {
    flexGrow: 1,
    color: "#000000"
  },
  container: {
    width: "100%"
  }
}));

const MainLayout = () => {
  const classes = useStyles();

  const handleDocumentDataReceived = (data) => {
    console.log("Document data received:", data);
  };

  return (
    <div className={classes.container}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            DocSphere
          </Typography>
          <UploadDocument onDocumentDataReceived={handleDocumentDataReceived} />
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default MainLayout;
