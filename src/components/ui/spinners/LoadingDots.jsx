import { ThreeDots } from "react-loader-spinner";

function LoadingDots({ dotColor, size = "80" }) {
  return (
    <ThreeDots
      visible={true}
      height={size}
      width={size}
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
