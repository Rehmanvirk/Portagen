const Portfolio = require('../models/Portfolio');
const Template = require('../models/Template');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');

// @desc    Create a new portfolio
// @route   POST /api/portfolios
// @access  Private
const createPortfolio = async (req, res) => {
  try {
    const {
      title,
      templateId,
      personalInfo,
      education,
      experience,
      projects,
      skills,
      isPublic,
    } = req.body;

    const portfolio = await Portfolio.create({
      userId: req.user._id,
      title,
      templateId,
      personalInfo,
      education,
      experience,
      projects,
      skills,
      isPublic,
    });

    res.status(201).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all portfolios for a user
// @route   GET /api/portfolios
// @access  Private
const getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.user._id })
      .populate('templateId', 'name previewUrl')
      .sort({ createdAt: -1 });
    
    res.json(portfolios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single portfolio by ID
// @route   GET /api/portfolios/:id
// @access  Private
const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id)
      .populate('templateId')
      .populate('userId', 'name email');
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Check if the portfolio belongs to the user or is public
    if (portfolio.userId._id.toString() !== req.user._id.toString() && !portfolio.isPublic) {
      return res.status(401).json({ message: 'Not authorized to access this portfolio' });
    }

    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a portfolio
// @route   PUT /api/portfolios/:id
// @access  Private
const updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Check if the portfolio belongs to the user
    if (portfolio.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this portfolio' });
    }

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedPortfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a portfolio
// @route   DELETE /api/portfolios/:id
// @access  Private
const deletePortfolio = async (req, res) => {
  try {
    console.log('Attempting to delete portfolio with ID:', req.params.id);
    
    const portfolio = await Portfolio.findById(req.params.id);
    console.log('Found portfolio:', portfolio);
    
    if (!portfolio) {
      console.log('Portfolio not found');
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    console.log('Portfolio userId:', portfolio.userId);
    console.log('Current user ID:', req.user._id);
    
    // Check if the portfolio belongs to the user
    if (portfolio.userId.toString() !== req.user._id.toString()) {
      console.log('Authorization failed: Portfolio does not belong to user');
      return res.status(401).json({ message: 'Not authorized to delete this portfolio' });
    }

    console.log('Deleting portfolio...');
    await Portfolio.findByIdAndDelete(req.params.id);
    console.log('Portfolio deleted successfully');
    
    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Download portfolio as ZIP
// @route   GET /api/portfolios/:id/download/zip
// @access  Private
const downloadPortfolioAsZip = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id).populate('templateId');
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Check if the portfolio belongs to the user
    if (portfolio.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to download this portfolio' });
    }

    // Check if template exists
    if (!portfolio.templateId) {
      return res.status(400).json({ message: 'Template not found for this portfolio' });
    }

    // Create a temporary directory if it doesn't exist
    const baseTempDir = path.join(__dirname, '../../temp');
    if (!fs.existsSync(baseTempDir)) {
      fs.mkdirSync(baseTempDir, { recursive: true });
    }

    const tempDir = path.join(baseTempDir, portfolio._id.toString());
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Process HTML template with user data
    const template = handlebars.compile(portfolio.templateId.files.html);
    const htmlContent = template({
      personalInfo: portfolio.personalInfo,
      education: portfolio.education,
      experience: portfolio.experience,
      projects: portfolio.projects,
      skills: portfolio.skills,
    });

    // Write files to temporary directory
    fs.writeFileSync(path.join(tempDir, 'index.html'), htmlContent);
    fs.writeFileSync(path.join(tempDir, 'style.css'), portfolio.templateId.files.css);
    fs.writeFileSync(path.join(tempDir, 'script.js'), portfolio.templateId.files.js);

    // Create a zip file
    const archive = archiver('zip', { zlib: { level: 9 } });
    const zipPath = path.join(baseTempDir, `${portfolio._id}.zip`);
    const output = fs.createWriteStream(zipPath);

    archive.pipe(output);
    archive.directory(tempDir, false);
    archive.finalize();

    output.on('close', () => {
      res.download(zipPath, `${portfolio.title || 'portfolio'}.zip`, (err) => {
        if (err) {
          console.error(err);
        }
        // Clean up temporary files
        fs.rmSync(tempDir, { recursive: true, force: true });
        fs.unlinkSync(zipPath);
      });
    });
  } catch (error) {
    console.error('Download ZIP error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const downloadPortfolioAsPdf = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id).populate('templateId');
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Check if the portfolio belongs to the
    if (portfolio.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to download this portfolio' });
    }

    // Check if template exists
    if (!portfolio.templateId) {
      return res.status(400).json({ message: 'Template not found for this portfolio' });
    }

    // Process HTML template with user data
    const template = handlebars.compile(portfolio.templateId.files.html);
    const htmlContent = template({
      personalInfo: portfolio.personalInfo,
      education: portfolio.education,
      experience: portfolio.experience,
      projects: portfolio.projects,
      skills: portfolio.skills,
    });

    // Add CSS to HTML
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${portfolio.title || 'Portfolio'}</title>
        <style>
          ${portfolio.templateId.files.css}
        </style>
      </head>
      <body>
        ${htmlContent}
        <script>
          ${portfolio.templateId.files.js}
        </script>
      </body>
      </html>
    `;

    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    
    // Generate PDF buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    });
    
    await browser.close();
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${portfolio.title || 'portfolio'}.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Download PDF error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createPortfolio,
  getPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
  downloadPortfolioAsZip,
  downloadPortfolioAsPdf,
};