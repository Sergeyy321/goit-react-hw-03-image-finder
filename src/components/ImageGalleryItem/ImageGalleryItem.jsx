import {
  Image,
  GalleryItem,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export const ImageGalleryItem = ({ tags, previewImg, onSelectedImage }) => {
  return (
    <li>
      <Image src={previewImg} alt={tags} onClick={onSelectedImage} />
    </li>
  );
};