import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import axiosClient from "../../api/axiosClient";

export default function ImageUpload({ value, onChange, className = "", variant = "image", imageFit = "cover" }) {
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState(value || null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setPreview(value || null);
    }, [value]);

    const handleUpload = async (file) => {
        if (!file) return;

        // Verify file type
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        // Show local preview immediately
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const uploadUrl = variant === "banner" ? "/Upload/Image?banner=true" : "/Upload/Image";
            const response = await axiosClient.post(uploadUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const uploadedUrl = response.data.url;
            setPreview(uploadedUrl);
            onChange?.(uploadedUrl);
            toast.success("Image uploaded successfully!");
        } catch (error) {
            console.error("Upload failed", error);
            toast.error("Failed to upload image.");
            setPreview(value || null); // Revert on failure
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
        }
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    };

    const clearImage = (e) => {
        e.stopPropagation(); // Prevent triggering click on the container
        setPreview(null);
        onChange?.(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={`relative ${className}`}>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            
            <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`
                    w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6
                    ${variant === "banner" ? "aspect-[12/5] min-h-0" : imageFit === "contain" ? "min-h-[220px]" : "min-h-[160px]"}
                    cursor-pointer transition-all duration-200 overflow-hidden relative group
                    ${isDragging ? "border-yellow-400 bg-yellow-50" : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-300"}
                    ${preview ? "border-transparent bg-transparent" : ""}
                `}
            >
                {preview ? (
                    <>
                        {imageFit === "contain" && variant !== "banner" && (
                            <>
                                <img
                                    src={preview}
                                    alt=""
                                    aria-hidden="true"
                                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-900/35 to-zinc-950/80" />
                            </>
                        )}
                        <img
                            src={preview}
                            alt="Preview"
                            className={`absolute inset-0 h-full w-full transition-all duration-300 ${(variant === "banner" || imageFit === "contain") ? `object-contain ${variant === "banner" ? "bg-zinc-950" : "p-3 drop-shadow-2xl"}` : "object-cover"} ${isUploading ? "opacity-50 scale-[0.98]" : "opacity-100"}`}
                        />
                        {imageFit === "contain" && variant !== "banner" && (
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
                        )}
                        {/* Overlay on hover */}
                        {!isUploading && (
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white font-medium flex items-center gap-2">
                                    <UploadCloud size={18} /> Change Image
                                </span>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                            <ImageIcon size={24} className="text-zinc-400" />
                        </div>
                        <p className="text-sm font-semibold text-zinc-700">Click to upload or drag & drop</p>
                        <p className="text-xs text-zinc-400 mt-1">
                            {variant === "banner" ? "Recommended ratio 12:5 (e.g. 1920 × 800)" : "SVG, PNG, JPG or GIF (max. 5MB)"}
                        </p>
                    </>
                )}

                {/* Uploading Spinner */}
                {isUploading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                        <Loader2 size={28} className="text-yellow-500 animate-spin mb-2" />
                        <span className="text-sm font-bold text-zinc-700">Uploading...</span>
                    </div>
                )}

                {/* Remove button */}
                {preview && !isUploading && (
                    <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center justify-center text-zinc-500 hover:text-red-500 hover:bg-white transition-colors z-20"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
        </div>
    );
}
