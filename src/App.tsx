import "./App.css";
import axios from "axios";
import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import GalleryModal from "./components/GalleryModal/GalleryModal";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Image } from "./types";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const accessKey = "NjpiNKAPNXLDvfuVXswHy-cKv6CpEld4JB8HuFcP0DU";

  const fetchImages = async (
    query: string,
    page: number = 1
  ): Promise<void> => {
    try {
      setError(false);
      setLoading(true);
      if (page === 1) {
        setImages([]);
      }

      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=${accessKey}`
      );

      const newImages: Image[] = response.data.results;

      if (newImages.length === 0) {
        if (page === 1) {
          toast.error(`Nothing was found for "${query}".`);
          setImages([]);
        }
      }
      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setPage(page);
      setQuery(query);
    } catch (error) {
      setError(true);
      toast.error("Error loading image");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  const isOpen = (image: Image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={(userQuery: string) => fetchImages(userQuery, 1)} />
      {loading && <Loader />}
      {error ? (
        <ErrorMessage message="Error fetching images. Please try again." />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={isOpen} />
          {images.length > 0 && !loading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}

      <GalleryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
      <Toaster />
    </div>
  );
};

export default App;
