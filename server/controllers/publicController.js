import { Portfolio } from '../models/Portfolio.js';

export const getPublicPortfolio = (req, res) => {
  const { slug } = req.params;
  const portfolio = Portfolio.findBySlug(slug);

  if (!portfolio) {
    return res.status(404).json({
      error: 'Portfolio not found',
      message: 'The requested portfolio does not exist or may have been removed.'
    });
  }

  // Ensure unpublished drafts are strictly protected from public access
  if (portfolio.status !== 'published') {
    return res.status(403).json({
      error: 'Portfolio is unpublished',
      message: 'This portfolio is currently in draft mode and is not visible to the public.'
    });
  }

  // Atomically increment views
  Portfolio.incrementViews(slug);

  res.json({
    portfolio: {
      id: portfolio.id,
      title: portfolio.title,
      slug: portfolio.slug,
      templateId: portfolio.templateId,
      views: (portfolio.views || 0) + 1,
      themeConfig: portfolio.themeConfig,
      profile: portfolio.profile,
      sections: portfolio.sections,
      skills: portfolio.skills,
      projects: portfolio.projects,
      experience: portfolio.experience,
      education: portfolio.education,
      certifications: portfolio.certifications,
      socialLinks: portfolio.socialLinks,
      seo: portfolio.seo,
      publishedAt: portfolio.publishedAt
    }
  });
};
