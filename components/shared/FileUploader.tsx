import { Dispatch, SetStateAction, useCallback } from 'react';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { useDropzone, FileWithPath } from '@uploadthing/react'; // Ensure correct import

import { Button } from '../ui/button';
import { convertFileToUrl } from '@/lib/utils';

type FileUploaderProps = {
    onFieldChange: (file: string) => void; // Adjust the type if necessary
    imageUrl: string;
    setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles);
        // Convert the file to URL only if it's present
        if (acceptedFiles.length > 0) {
            onFieldChange(convertFileToUrl(acceptedFiles[0]));
        }
    }, [onFieldChange, setFiles]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: generateClientDropzoneAccept(['image/*']) // Simplified accept statement
    });

    return (
        <div
            {...getRootProps()}
            className='flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50'
        >
            <input {...getInputProps()} className='cursor-pointer' />

            {imageUrl ? (
                <div className='flex h-full w-full flex-1 justify-center'>
                    <img
                        src={imageUrl}
                        alt='Image'
                        width={250}
                        height={250}
                        className='object-cover w-full object-center'
                    />
                </div>
            ) : (
                <div className='flex-center flex-col py-5 text-gray-500'>
                    <img src="/assets/icons/upload.svg" width={77} height={77} alt="file Upload" />
                    <h3 className='mb-2 mt-2'>Drag photo here</h3>
                    <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
                    <Button type='button' className='rounded-full'>
                        Select from Device
                    </Button>
                </div>
            )}
        </div>
    );
}