export const fileToBase64Fn = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
    } catch {
      console.error('ERROR in file convertion to BASE64');
      resolve('');
    }
  });
};
