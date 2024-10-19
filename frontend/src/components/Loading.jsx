import { CircularProgress } from '@mui/material';

const LoadingComponent = () => {
  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
    </div>
  );
};

export default LoadingComponent;