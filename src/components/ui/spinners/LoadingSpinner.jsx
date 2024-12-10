import { RotatingLines } from "react-loader-spinner";

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <RotatingLines
        visible={true}
        height="50"
        width="50"
        color="pink"
        strokeWidth="5"
        animationDuration="0.55"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
      />
    </div>
  );
}

export default LoadingSpinner;
