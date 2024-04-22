import { Dispatch, SetStateAction } from "react"

type FileUploaderProps = {
    imageUrl: string
    onFieldChange: (value: string) => void
    setFiles: Dispatch<SetStateAction<File[]>>
}

const FileUploader = ({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) => {
  return (
    <div>
      
    </div>
  )
}

export default FileUploader
