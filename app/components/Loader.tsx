import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Loader = () => {
  return (
    <div className="flex justify-start">
      <video
        autoPlay
        muted
        loop
        playsInline
        src="/gemini logo.mp4"
        className="h-8 md:h-10 w-8 md:w-10 rounded-full"
      />
      <div className="max-w-[70%] p-3 my-2">
        <Skeleton
          count={2}
          height={20}
          width={250}
          baseColor="#2c2c2c"
          highlightColor="#444444"
          borderRadius={5}
          duration={1.5}
        />
      </div>
    </div>
  );
};

export default Loader;
