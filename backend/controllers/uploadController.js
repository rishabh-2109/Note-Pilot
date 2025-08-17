export const uploadTranscript = async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // Only allow .txt files
    if (!file.originalname.endsWith(".txt")) {
      return res.status(400).json({ error: "Only .txt files are allowed" });
    }

    const transcript = file.buffer.toString("utf-8");
    res.status(200).json({ transcript });
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({ error: "Failed to upload file" });
  }
};

