import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, '../data');
const dbFilePath = path.join(dataDir, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// In-memory cache + persistent JSON storage with atomic writes
class Storage {
  constructor() {
    this.data = {
      users: [],
      portfolios: [],
      transactions: []
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(dbFilePath)) {
        const raw = fs.readFileSync(dbFilePath, 'utf8');
        this.data = JSON.parse(raw);
        if (!this.data.users) this.data.users = [];
        if (!this.data.portfolios) this.data.portfolios = [];
        if (!this.data.transactions) this.data.transactions = [];
      } else {
        this.persist();
      }
    } catch (err) {
      console.error('Error loading database file, initializing clean database:', err.message);
      this.persist();
    }
  }

  persist() {
    const tempPath = `${dbFilePath}.tmp.${Date.now()}`;
    fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf8');
    fs.renameSync(tempPath, dbFilePath);
  }

  // --- Users ---
  findUserByEmail(email) {
    if (!email) return null;
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
  }

  findUserById(id) {
    return this.data.users.find(u => u.id === id) || null;
  }

  createUser(userData) {
    const existing = this.findUserByEmail(userData.email);
    if (existing) {
      throw new Error('User with this email already exists');
    }
    const user = {
      id: crypto.randomUUID(),
      email: userData.email.toLowerCase().trim(),
      passwordHash: userData.passwordHash,
      name: userData.name || userData.email.split('@')[0],
      isPremium: Boolean(userData.isPremium),
      premiumPurchasedAt: userData.isPremium ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.users.push(user);
    this.persist();
    return user;
  }

  updateUser(id, updates) {
    const index = this.data.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    this.data.users[index] = {
      ...this.data.users[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.persist();
    return this.data.users[index];
  }

  deleteUser(id) {
    const index = this.data.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.data.users.splice(index, 1);
    // Also remove portfolios owned by user
    this.data.portfolios = this.data.portfolios.filter(p => p.userId !== id);
    this.persist();
    return true;
  }

  // --- Portfolios ---
  findPortfoliosByUserId(userId) {
    // If guest-creator or development mode, return all available created portfolios so none are hidden
    if (!userId || userId === 'guest-creator') {
      return [...this.data.portfolios].sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));
    }
    return this.data.portfolios
      .filter(p => p.userId === userId || p.userId === 'guest-creator' || p.userId === 'demo-user-1' || !p.userId)
      .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));
  }

  findPortfolioById(id) {
    return this.data.portfolios.find(p => p.id === id) || null;
  }

  findPortfolioBySlug(slug) {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();
    return this.data.portfolios.find(p => p.slug && p.slug.toLowerCase() === cleanSlug) || null;
  }

  generateUniqueSlug(baseTitle, excludeId = null) {
    let base = (baseTitle || 'portfolio')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    if (!base) base = 'my-portfolio';

    let slug = base;
    let counter = 1;

    while (this.data.portfolios.some(p => p.slug === slug && p.id !== excludeId)) {
      slug = `${base}-${counter}`;
      counter++;
    }
    return slug;
  }

  createPortfolio(portfolioData) {
    const id = crypto.randomUUID();
    const slug = this.generateUniqueSlug(portfolioData.slug || portfolioData.title || 'portfolio');

    const portfolio = {
      id,
      userId: portfolioData.userId,
      title: portfolioData.title || 'Untitled Portfolio',
      slug,
      templateId: portfolioData.templateId || 'open-book',
      status: portfolioData.status || 'draft',
      views: 0,
      themeConfig: portfolioData.themeConfig || {
        accentColor: '#3b82f6',
        mode: 'dark',
        fontHeading: 'Inter',
        fontBody: 'Inter',
        bookCoverTheme: 'leather'
      },
      profile: portfolioData.profile || {
        fullName: 'Alex River',
        headline: 'Senior Full Stack & AI Systems Developer',
        bio: 'Passionate about building scalable applications and delightful digital experiences.',
        avatarUrl: '',
        location: 'Bengaluru, India',
        email: 'alex@example.com',
        phone: '+91 98765 43210',
        website: 'https://example.com',
        resumeUrl: '',
        isOpenToWork: true,
        statusBadge: 'Open to Opportunities'
      },
      sections: portfolioData.sections || [
        { id: 'bio', title: 'Biography', enabled: true, order: 0 },
        { id: 'skills', title: 'Skills & Stack', enabled: true, order: 1 },
        { id: 'projects', title: 'Featured Projects', enabled: true, order: 2 },
        { id: 'experience', title: 'Experience', enabled: true, order: 3 },
        { id: 'education', title: 'Education', enabled: true, order: 4 },
        { id: 'contact', title: 'Contact', enabled: true, order: 5 }
      ],
      skills: portfolioData.skills || [
        { id: 's1', name: 'React / Next.js', category: 'Frontend', level: 'Expert' },
        { id: 's2', name: 'Node.js / Express', category: 'Backend', level: 'Expert' },
        { id: 's3', name: 'TypeScript', category: 'Languages', level: 'Advanced' },
        { id: 's4', name: 'PostgreSQL / MongoDB', category: 'Database', level: 'Advanced' },
        { id: 's5', name: 'Tailwind / Modern CSS', category: 'Frontend', level: 'Expert' },
        { id: 's6', name: 'Docker / Cloud', category: 'DevOps', level: 'Intermediate' }
      ],
      projects: portfolioData.projects || [
        {
          id: 'p1',
          title: 'Quantum Analytics Engine',
          description: 'High-speed event processing pipeline and real-time interactive business intelligence dashboard.',
          techStack: ['React', 'Node.js', 'WebSockets', 'Canvas'],
          liveUrl: 'https://example.com/demo',
          githubUrl: 'https://github.com/example/analytics',
          imageUrl: '',
          featured: true
        },
        {
          id: 'p2',
          title: 'HyperUI Design System',
          description: 'Accessible, component-driven design system with dark mode tokens and fluid animations.',
          techStack: ['TypeScript', 'CSS Modules', 'Storybook'],
          liveUrl: 'https://example.com/design-system',
          githubUrl: 'https://github.com/example/hyperui',
          imageUrl: '',
          featured: true
        }
      ],
      experience: portfolioData.experience || [
        {
          id: 'e1',
          role: 'Full Stack Engineer',
          company: 'Nexus Tech Innovations',
          period: '2023 - Present',
          location: 'Bengaluru, India',
          description: 'Building mission-critical web applications, architecting responsive UI workflows, and scaling REST APIs.',
          achievements: ['Increased page performance by 45%', 'Built reusable component library']
        }
      ],
      education: portfolioData.education || [
        {
          id: 'ed1',
          degree: 'B.Tech in Computer Science & Engineering',
          school: 'Indian Institute of Technology / Apex University',
          year: '2020 - 2024',
          grade: '8.9 CGPA',
          coursework: 'Data Structures, Algorithms, Cloud Computing, Database Systems'
        }
      ],
      certifications: portfolioData.certifications || [
        {
          id: 'c1',
          name: 'AWS Certified Cloud Practitioner',
          issuer: 'Amazon Web Services',
          date: '2024',
          credentialUrl: 'https://aws.amazon.com'
        }
      ],
      socialLinks: portfolioData.socialLinks || {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://x.com',
        instagram: '',
        youtube: ''
      },
      seo: portfolioData.seo || {
        metaTitle: `${portfolioData.title || 'My Portfolio'} | Created with FolioVerse`,
        metaDescription: 'Explore my professional portfolio, interactive projects, work experience, and technical skills.',
        canonicalUrl: '',
        ogImage: ''
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: portfolioData.status === 'published' ? new Date().toISOString() : null
    };

    this.data.portfolios.push(portfolio);
    this.persist();
    return portfolio;
  }

  updatePortfolio(id, userId, updates) {
    const index = this.data.portfolios.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    // Authorization check
    if (this.data.portfolios[index].userId !== userId && userId !== 'guest-creator' && this.data.portfolios[index].userId) {
      throw new Error('Unauthorized to modify this portfolio');
    }

    // Check slug collision if slug is being updated
    let newSlug = this.data.portfolios[index].slug;
    if (updates.slug && updates.slug !== this.data.portfolios[index].slug) {
      newSlug = this.generateUniqueSlug(updates.slug, id);
    }

    const currentStatus = this.data.portfolios[index].status;
    let publishedAt = this.data.portfolios[index].publishedAt;
    if (updates.status === 'published' && currentStatus !== 'published') {
      publishedAt = new Date().toISOString();
    } else if (updates.status === 'draft') {
      publishedAt = null;
    }

    this.data.portfolios[index] = {
      ...this.data.portfolios[index],
      ...updates,
      slug: newSlug,
      publishedAt,
      updatedAt: new Date().toISOString()
    };

    this.persist();
    return this.data.portfolios[index];
  }

  deletePortfolio(id, userId) {
    const index = this.data.portfolios.findIndex(p => p.id === id);
    if (index === -1) return false;
    if (this.data.portfolios[index].userId !== userId && userId !== 'guest-creator' && this.data.portfolios[index].userId) {
      throw new Error('Unauthorized to delete this portfolio');
    }
    this.data.portfolios.splice(index, 1);
    this.persist();
    return true;
  }

  duplicatePortfolio(id, userId) {
    const original = this.findPortfolioById(id);
    if (!original) return null;
    if (original.userId !== userId && userId !== 'guest-creator' && original.userId) {
      throw new Error('Unauthorized to duplicate this portfolio');
    }

    const cloneData = {
      ...JSON.parse(JSON.stringify(original)),
      title: `${original.title} (Copy)`,
      slug: this.generateUniqueSlug(`${original.slug}-copy`),
      status: 'draft',
      views: 0
    };
    delete cloneData.id;
    delete cloneData.createdAt;
    delete cloneData.updatedAt;
    delete cloneData.publishedAt;

    return this.createPortfolio(cloneData);
  }

  incrementPortfolioViews(slug) {
    const portfolio = this.findPortfolioBySlug(slug);
    if (portfolio && portfolio.status === 'published') {
      portfolio.views = (portfolio.views || 0) + 1;
      this.persist();
    }
    return portfolio;
  }

  // --- Transactions / Premium Entitlements ---
  createTransaction(txData) {
    const tx = {
      id: crypto.randomUUID(),
      userId: txData.userId,
      orderId: txData.orderId,
      paymentId: txData.paymentId || null,
      amount: txData.amount || 20000, // ₹200.00
      currency: 'INR',
      status: txData.status || 'pending',
      provider: txData.provider || 'razorpay',
      createdAt: new Date().toISOString(),
      verifiedAt: null
    };
    this.data.transactions.push(tx);
    this.persist();
    return tx;
  }

  findTransactionByOrderId(orderId) {
    return this.data.transactions.find(t => t.orderId === orderId) || null;
  }

  updateTransaction(orderId, updates) {
    const index = this.data.transactions.findIndex(t => t.orderId === orderId);
    if (index === -1) return null;
    this.data.transactions[index] = {
      ...this.data.transactions[index],
      ...updates,
      verifiedAt: updates.status === 'success' ? new Date().toISOString() : null
    };
    this.persist();
    return this.data.transactions[index];
  }

  findTransactionsByUserId(userId) {
    return this.data.transactions.filter(t => t.userId === userId);
  }
}

export const storage = new Storage();
