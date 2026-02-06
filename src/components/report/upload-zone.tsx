"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileAccepted: (file: File) => void;
  isProcessing: boolean;
}

export function UploadZone({ onFileAccepted, isProcessing }: UploadZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0]);
      }
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    disabled: isProcessing,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
        isDragActive
          ? "border-rose-400 bg-rose-50"
          : "border-gray-300 hover:border-rose-300 hover:bg-rose-50/50",
        isProcessing && "opacity-50 cursor-not-allowed"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-100">
          {isDragActive ? (
            <ImageIcon className="h-7 w-7 text-rose-500" />
          ) : (
            <Upload className="h-7 w-7 text-gray-400" />
          )}
        </div>
        {isDragActive ? (
          <p className="text-rose-600 font-medium">松开即可上传文件</p>
        ) : (
          <>
            <div>
              <p className="text-gray-700 font-medium">
                点击或拖拽上传检查报告
              </p>
              <p className="text-sm text-gray-500 mt-1">
                支持 JPG、PNG、PDF 格式
              </p>
            </div>
          </>
        )}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <ImageIcon className="h-3.5 w-3.5" /> 拍照上传
          </span>
          <span className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" /> 文件上传
          </span>
        </div>
      </div>
    </div>
  );
}
