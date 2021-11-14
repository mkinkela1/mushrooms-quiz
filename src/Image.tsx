import React, { useEffect, useState } from "react";
import Spinner from './Spinner';

interface IProps {
  src: string;
}

const Image = ({ src }: IProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => setIsLoaded(false), [src]);
  return (
    <>
      {!isLoaded && (<Spinner />)}
      <img src={src} style={!isLoaded ? { display: "none" } : {}} onLoad={() => setIsLoaded(true)} alt={src} />
    </>
  );
};

export default Image;