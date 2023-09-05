import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const MyImageGallery = ({ images }) => {

    const arrImages = [{ original: images?.mainImage, thumbnail: images?.mainImage }]

    const arrAdditionalImages = images?.arrResult?.map((el) => (arrImages.push({ original: el.name, thumbnail: el.name })))

    const galleryStyles = {
        width: '100%', // Adjust the width to fit your layout
        maxHeight: '10%', // Set a fixed maximum height for all images
        objectFit: 'contain', // This will ensure the images cover the entire container
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
    };

    return (
        <div>
            <ImageGallery
                items={arrImages}
                showThumbnails={true}
                infinite={true}
                showFullscreenButton={false}
                showPlayButton={false}
                disableThumbnailScroll={true}
                autoPlay={true}
                slideInterval={5000}
                thumbnailPosition='left'
                renderItem={(item) => (
                    <div style={{ maxHeight: '10%' }}>
                        <img src={item.original} alt={item.description} style={galleryStyles} />
                    </div>
                )}
            />
        </div>
    );
};


export default MyImageGallery;
