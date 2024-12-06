import { RotatingLines } from "react-loader-spinner";

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <RotatingLines
        visible={true}
        height="25"
        width="25"
        strokeColor="fb05adb3"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}

export default LoadingSpinner;
