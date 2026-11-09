export const handleUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please select an image file to upload.' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    message: 'Image uploaded successfully!',
    url: fileUrl,
    filename: req.file.filename,
    size: req.file.size
  });
};
