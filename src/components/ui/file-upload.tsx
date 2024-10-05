"use client";
// Packages
import { AnimatePresence, motion } from "framer-motion";
import { CloudUpload, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

// Components
import { useEdgeStore } from "@/lib/edgestore";

interface ImageUploadProps {
  onChange: (urls: string[]) => void;
  value?: string[];
  disabled?: boolean;
  multiUpload?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value = [],
  disabled = false,
  multiUpload = false,
}) => {
  const [loading, setLoading] = useState(false); // Track loading state
  const [uploadedImages, setUploadedImages] = useState(value); // Store images (can be single or multiple)
  if (uploadedImages[0] == "") {
    setUploadedImages([]);
  }
  const { edgestore } = useEdgeStore();

  // Handle file drop and image upload
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setLoading(true); // Start loading

      // Ensure that we are either replacing the current image or appending new ones for multi-upload
      let newUploadedImages = [];

      if (acceptedFiles && acceptedFiles.length > 0) {
        // Use Promise.all to upload all files concurrently
        const uploadedFiles = await Promise.all(
          acceptedFiles.map(async (file) => {
            const res = await edgestore.publicFiles.upload({ file });
            return res?.url;
          })
        );

        if (multiUpload) {
          // Add new images to the existing ones in multi-upload mode
          newUploadedImages = [...uploadedImages, ...uploadedFiles];
        } else {
          // Replace the current image for single upload mode
          newUploadedImages = [uploadedFiles[0]];
        }

        setUploadedImages(newUploadedImages); // Update state with new images
        onChange(newUploadedImages); // Return array of URLs to the parent
      }

      setLoading(false); // Stop loading after upload completes
    },
    [edgestore, onChange, uploadedImages, multiUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Remove image at a given index (for multi-upload scenarios)
  const removeImage = (index: number) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
    onChange(updatedImages);
  };
  console.log(uploadedImages);
  return (
    <div>
      <AnimatePresence>
        {uploadedImages.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }} // Initial opacity for fade-in
            animate={{
              opacity: 1,
              transition: { duration: 0.5 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5 },
            }}
            className="w-full bg-muted/50 border-dashed border-[1px] rounded-12px min-h-[100px] p-4 flex justify-center items-center"
          >
            <div className="relative flex gap-x-2">
              {uploadedImages.map((image, index) => (
                <motion.div
                  key={image}
                  initial={{ filter: "blur(1px)" }} // Initial blur for subtle image effect
                  animate={{
                    filter: "blur(0px)",
                    transition: { delay: 1, duration: 0.5 },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.5 },
                  }}
                  className="h-[150px] w-[150px] relative mb-2"
                >
                  {!(uploadedImages[0] === "") && (
                    <Image
                      src={image}
                      fill
                      alt={`uploaded-image-${index}`}
                      className="rounded-8px"
                      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                    />
                  )}

                  {/* Remove Image Button */}
                  <div
                    className="bg-rose-500 w-fit text-white absolute top-0 right-0 rounded-tr-8px cursor-pointer"
                    onClick={() => removeImage(index)}
                  >
                    <X />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div {...getRootProps()}>
            <motion.div
              initial={{ opacity: 0 }} // Initial opacity for fade-in
              animate={{
                opacity: 1,
                transition: { duration: 0.5 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.5 },
              }}
              className="w-full bg-muted/50 border-dashed border-[1px] rounded-12px min-h-[100px] p-4 flex justify-center items-center"
            >
              <>
                <input {...getInputProps()} disabled={loading || disabled} />
                {isDragActive ? (
                  <div className="text-tourHub-gray flex flex-col justify-center items-center py-8 space-x-2">
                    <CloudUpload className="w-7 h-7" />
                    <h1 className="text-center text-19px font-medium font-inter text-tourHub-green-dark">
                      {loading ? "Uploading..." : "Drop the files here..."}
                    </h1>
                    <p className="text-center text-[12px]">
                      Accepted file types: .png, .jpg, jpeg
                    </p>
                    <p className="text-center text-[12px]">
                      Maximum file size: 4MB
                    </p>
                  </div>
                ) : (
                  <div className="text-tourHub-gray flex flex-col justify-center items-center py-8 space-x-2">
                    <CloudUpload className="w-7 h-7" />
                    <h1 className="text-center text-19px font-medium font-inter text-tourHub-green-dark">
                      {loading ? "Uploading..." : "Drop file to upload"}
                    </h1>
                    <p className="text-center text-[12px]">
                      Accepted file types: .png, .jpg, jpeg
                    </p>
                    <p className="text-center text-[12px]">
                      Maximum file size: 4MB
                    </p>
                  </div>
                )}
              </>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
