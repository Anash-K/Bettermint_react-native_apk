export const getMimeTypeFromUri = (uri: any) => {
    const extension = uri.split('.').pop(); // Get the file extension from the URI
  
    switch (extension.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'bmp':
        return 'image/bmp';
      case 'webp':
        return 'image/webp';
      default:
        return 'application/octet-stream'; // Default MIME type for unknown file types
    }
  };
  
  export const getFileNameFromUri = (uri: any) => {
      const fileName = uri.split('/').pop();  // Extract file name by splitting the URI by '/' and taking the last element
      return fileName;
    };
    
  