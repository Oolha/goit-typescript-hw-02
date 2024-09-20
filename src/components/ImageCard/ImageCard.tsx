import css from "./ImageCard.module.css";
import { Image } from "../../types";

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <img
      src={image.urls.small}
      alt={image.alt_description}
      className={css.img}
    />
  );
};
export default ImageCard;
