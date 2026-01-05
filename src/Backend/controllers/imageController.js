const path = require('path');
const fs = require('fs');

// Path to images directory
const imagesDirectory = path.join(__dirname, '../images');

// Helper function to get MIME type based on file extension
const getMimeType = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.bmp': 'image/bmp',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };
  return mimeTypes[ext] || 'application/octet-stream';
};

// Helper function to sanitize filename (prevent path traversal attacks)
const sanitizeFilename = (filename) => {
  // Remove any path separators and keep only the filename
  return path.basename(filename);
};

// @desc    Get all available images
// @route   GET /api/images
// @access  Public
exports.getAllImages = (req, res) => {
  try {
    // Read all files from images directory
    fs.readdir(imagesDirectory, (err, files) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error reading images directory',
          error: err.message
        });
      }

      // Filter only image files
      const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'].includes(ext);
      });

      res.status(200).json({
        success: true,
        count: imageFiles.length,
        images: imageFiles.map(file => ({
          name: file,
          url: `/api/images/${file}`
        }))
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get a specific image
// @route   GET /api/images/:imageName
// @access  Public
exports.getImage = (req, res) => {
  try {
    const { imageName } = req.params;

    // Sanitize the filename to prevent path traversal attacks
    const sanitizedFilename = sanitizeFilename(imageName);

    // Construct the full file path
    const imagePath = path.join(imagesDirectory, sanitizedFilename);

    // Security check: Ensure the resolved path is within the images directory
    const resolvedPath = path.resolve(imagePath);
    const resolvedImagesDir = path.resolve(imagesDirectory);
    
    if (!resolvedPath.startsWith(resolvedImagesDir)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({
          success: false,
          message: 'Image not found',
          requestedImage: sanitizedFilename
        });
      }

      // Get MIME type based on file extension
      const mimeType = getMimeType(sanitizedFilename);

      // Get file stats for size information
      fs.stat(imagePath, (err, stats) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error reading file information'
          });
        }

        // Set appropriate headers
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Length', stats.size);
        res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
        res.setHeader('Content-Disposition', `inline; filename="${sanitizedFilename}"`);

        // Create read stream and pipe to response
        const readStream = fs.createReadStream(imagePath);

        readStream.on('error', (error) => {
          console.error('Error reading file:', error);
          if (!res.headersSent) {
            res.status(500).json({
              success: false,
              message: 'Error streaming image'
            });
          }
        });

        // Pipe the file to the response
        readStream.pipe(res);
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};