import * as React from 'react'
import { useDropzone, type Accept } from 'react-dropzone'
import { UploadCloud, File as FileIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FileUploadProps {
  multiple?: boolean
  accept?: Accept
  /** Max size in bytes. */
  maxSize?: number
  disabled?: boolean
  /** Fires with the full current file list whenever it changes. */
  onChange?: (files: File[]) => void
  dragText?: React.ReactNode
  className?: string
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/**
 * FileUpload — drag & drop file picker with a file list.
 *
 * @example
 * import { FileUpload } from 'koi-ui/file'
 * <FileUpload multiple accept={{ 'image/*': [] }} onChange={setFiles} />
 */
export function FileUpload({
  multiple,
  accept,
  maxSize,
  disabled,
  onChange,
  dragText = 'Drag & drop files here, or click to browse',
  className,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<File[]>([])

  const update = (next: File[]) => {
    setFiles(next)
    onChange?.(next)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple,
    accept,
    maxSize,
    disabled,
    onDrop: (accepted) => update(multiple ? [...files, ...accepted] : accepted),
  })

  return (
    <div className={cn('koi-fileupload', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-6 py-10 text-center transition-colors',
          isDragActive ? 'border-primary bg-primary/5' : 'border-input hover:border-primary',
          disabled && 'pointer-events-none opacity-60',
        )}
      >
        <input {...getInputProps()} />
        <UploadCloud className="size-8 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{dragText}</span>
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
              <FileIcon className="size-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 truncate">{file.name}</span>
              <span className="text-xs text-muted-foreground">{formatSize(file.size)}</span>
              <button
                type="button"
                onClick={() => update(files.filter((_, idx) => idx !== i))}
                aria-label="Remove"
                className="text-muted-foreground transition-colors hover:text-danger"
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
