import { Button } from '@mantine/core';
import {
  CldUploadWidget,
  CldUploadWidgetPropsOptions,
  CldUploadWidgetResults,
} from 'next-cloudinary';
import React from 'react';

interface Props {
  onUpload: (
    result: CldUploadWidgetResults,
    widget: any
  ) => Promise<void> | undefined;
  options?: CldUploadWidgetPropsOptions;
}
export const Uploader = ({ onUpload, options }: Props) => {
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
  const defaultOptions: CldUploadWidgetPropsOptions = {
    sources: ['local'],
    maxFiles: 1,
    multiple: false,
    singleUploadAutoClose: true,
    showPoweredBy: false,
    ...options,
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset={uploadPreset}
        signatureEndpoint="/api/sign"
        onUpload={(result, widget) => {
          onUpload(result, widget);
        }}
        options={defaultOptions}
      >
        {({ open }) => {
          function handleOnClick(e: any) {
            e.preventDefault();
            open();
          }
          return (
            <Button variant="outline" onClick={handleOnClick}>
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};
