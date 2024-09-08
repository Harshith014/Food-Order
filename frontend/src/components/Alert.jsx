import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";

export default function DescriptionAlerts(props) {
  if (props.status === "success") {
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="success">
          <AlertTitle>{props.title}</AlertTitle>
        </Alert>
      </Stack>
    );
  } else if (props.status === "error") {
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">
          <AlertTitle>{props.title}</AlertTitle>
        </Alert>
      </Stack>
    );
  } else {
    return null; // or some default message
  }
}

DescriptionAlerts.propTypes = {
  status: PropTypes.oneOf(["success", "error"]).isRequired,
  title: PropTypes.string.isRequired,
};
