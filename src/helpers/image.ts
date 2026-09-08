const MAX_EDGE_PX = 512;
const JPEG_QUALITY = 0.85;

export const fitWithin = (width: number, height: number, max: number) => {
  const longest = Math.max(width, height);
  if (longest <= max) return { width, height };
  const ratio = max / longest;
  return { width: Math.round(width * ratio), height: Math.round(height * ratio) };
};

export const downscaleToDataUrl = (file: File, max = MAX_EDGE_PX) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read failed"));
    reader.onload = () => {
      const source = reader.result as string;
      const image = new Image();
      image.onerror = () => reject(new Error("decode failed"));
      image.onload = () => {
        const { width, height } = fitWithin(image.naturalWidth, image.naturalHeight, max);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (!context) {
          resolve(source);
          return;
        }
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
      };
      image.src = source;
    };
    reader.readAsDataURL(file);
  });
