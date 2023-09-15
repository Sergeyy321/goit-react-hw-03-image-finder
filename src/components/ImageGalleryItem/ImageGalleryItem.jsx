import {Image} from 'components/ImageGalleryItem/ImageGalleryItem.styled'

export const ImageGalleryItem = ({ tags, previewImg, onModalClick }) => {
  return (
    <li>
      <Image src={previewImg} alt={tags} onClick={onModalClick} />
    </li>
  );
};