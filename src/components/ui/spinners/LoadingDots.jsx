import { ThreeDots } from "react-loader-spinner";

function LoadingDots({ dotColor }) {
  return (
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color={dotColor}
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        justifyAlignment: "center",
      }}
    />
  );
}

export default LoadingDots;
