import { Vortex } from "react-loader-spinner";

function LoadingVortex() {
  return (
    <Vortex
      visible={true}
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={[
        "rgba(251, 5, 173, 0.7)",
        "rgba(202, 247, 170, 0.5)",
        "rgb(255, 187, 0)",
        "rgb(17, 16, 16)",
      ]}
    />
  );
}

export default LoadingVortex;
