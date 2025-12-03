import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Loader = () => {
  return (  
    <div className="flex justify-start">
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
