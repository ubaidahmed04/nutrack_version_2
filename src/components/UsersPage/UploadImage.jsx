import React, { useState, useRef } from "react";
import uploadImg from '../../assets/upload.png';

const ImageUpload = ({ setData, images, setImages }) => {
  const refFile = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;

    if (file && file.size > maxSize) {
      alert("The file is too large. Please upload a file smaller than 5 MB.");
      return;
    }

    if (file) {
      const newImage = {
        name: file.name,
        url: URL.createObjectURL(file),
      };

      setImages([newImage]); // Update local state with a single image
      setData([file]); // Pass the single file to the parent
    }
  };
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index)); // Remove from local state
    setData((prev) => prev.filter((_, i) => i !== index)); // Remove from parent state
  };
  return (
    <div
      className="relative h-44 w-44 rounded-xl border-2 border-blue-gray-400 bg-gray-200 flex justify-start items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out "
    >
      {images.length === 0 ? (
        <div className="absolute flex flex-col items-center w-full">
          <img
            height={70}
            width={70}
            alt="File Icon"
            className="mb-3"
            src={uploadImg}
          />
          <span className="block text-gray-500 font-semibold">Drag & drop</span>
          <span className="block text-gray-400 font-normal mt-1">
            or click to upload
          </span>
          <input
            name="image"
            ref={refFile}
            accept="image/*"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            type="file"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="flex  max-w-full items-center">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-28 h-28 rounded-full overflow-hidden shadow-md"
            >
              <img
                src={image.url}
                alt={`Uploaded Preview`}
                className="w-full h-full object-fit "
              />
              {/* <span
                onClick={removeImage}
                className="absolute top-3 right-3 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center"
              >
                ×
              </span> */}
            </div>
          ))}
          <div className="flex flex-col items-center ml-3">
            <span
              onClick={() => refFile.current.click()}
              className="text-blue-500 bg-blue-100 hover:bg-blue-200 p-2 rounded-full shadow-md"
            >
              +
            </span>
            {/* <span className="text-gray-400 text-xs mt-1">Add new</span> */}
            <input
              name="image"
              ref={refFile}
              accept="image/*"
              className="absolute top-0 left-0 w-fit h-fit opacity-0 cursor-pointer"
              type="file"
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
