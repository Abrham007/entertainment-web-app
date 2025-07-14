import Image from "next/image";
import Link from "next/link";
import pageNotFoundImage from "../../public/404-image.png";

const NotFound = () => {
  return (
    <div>
      <div
        className={`relative my-7 sm:my-10 mx-auto rounded-full overflow-clip`}
      >
        <Image
          src={pageNotFoundImage.src}
          alt="Page could not be found"
          width={pageNotFoundImage.width}
          height={pageNotFoundImage.height}
          className="w-[250px] sm:w-[500px] "
        />
      </div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
};

export default NotFound;
