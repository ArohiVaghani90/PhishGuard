import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import {
  Shield, Mail, BookOpen, TrendingUp, Award, Users, CheckCircle,
  ChevronRight, Star, AlertTriangle, Eye, Zap, Lock, Globe, BarChart
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const heroImage = 'https://images.unsplash.com/photo-1751448555253-f39c06e29d82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwcGhpc2hpbmclMjBwcm90ZWN0aW9uJTIwbmV0d29ya3xlbnwxfHx8fDE3NzU2ODk4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080';
const teamImage = 'https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Fwww.reddit.com%2Fr%2FMemeRestoration%2Fcomments%2F1mrow4a%2Fishowspeed_trying_not_to_laugh_meme_template%2F&ved=0CBYQjRxqFwoTCJiPjsmu4ZMDFQAAAAAdAAAAABAL&opi=89978449';
const analyticsImage = 'https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwY29tcHV0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzc1Njg5ODY0fDA&ixlib=rb-4.1.0&q=80&w=1080';

const features = [
  {
    icon: <BookOpen size={28} />,
    title: 'Interactive Training Modules',
    description: 'Engaging, scenario-based learning modules designed to teach employees how to identify and respond to phishing attacks.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: <Mail size={28} />,
    title: 'Realistic Phishing Simulations',
    description: 'Deploy real-world phishing scenarios to test your team\'s vigilance and measure organizational risk.',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Progress Tracking',
    description: 'Monitor learning progress in real-time with detailed dashboards showing completion rates, scores, and risk levels.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: <Award size={28} />,
    title: 'Achievements & Gamification',
    description: 'Motivate employees with medals, badges, points, and leaderboards to keep security training engaging.',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: <BarChart size={28} />,
    title: 'Advanced Analytics & Reports',
    description: 'Generate detailed reports on team performance, identify at-risk users, and export data for compliance.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: <Users size={28} />,
    title: 'Bulk User Management',
    description: 'Easily onboard entire departments via CSV upload and assign training modules to groups or individuals.',
    color: 'from-yellow-500 to-orange-600',
  },
];

const steps = [
  {
    number: '01',
    title: 'Enroll Your Team',
    description: 'Create accounts individually or bulk-upload your entire organization via CSV. Assign roles, departments, and training tracks in minutes.',
    icon: <Users size={24} />,
  },
  {
    number: '02',
    title: 'Train & Simulate',
    description: 'Employees complete interactive training modules and face real-world phishing simulations to test their knowledge.',
    icon: <Shield size={24} />,
  },
  {
    number: '03',
    title: 'Monitor & Improve',
    description: 'Track progress in real-time, identify at-risk individuals, and generate compliance reports to continuously strengthen your security posture.',
    icon: <TrendingUp size={24} />,
  },
];

const testimonials = [
  {
    quote: 'PhishGuard cut our phishing click rate by 78% in just 3 months. The simulations are incredibly realistic.',
    author: 'Jennifer Kowalski',
    title: 'CISO, TechCorp Industries',
    rating: 5,
  },
  {
    quote: 'The gamification features made our employees actually look forward to security training. Completion rates went from 40% to 96%.',
    author: 'Marcus Reyes',
    title: 'IT Director, Global Finance Group',
    rating: 5,
  },
  {
    quote: 'The admin reporting tools are exceptional. We can now demonstrate security compliance to our board with clear data.',
    author: 'Marc Caurso',
    title: 'CEO, TechFox.LLC',
    rating: 5,
  },
];

const stats = [
  { value: '10,000+', label: 'Organizations Protected' },
  { value: '2.4M+', label: 'Employees Trained' },
  { value: '78%', label: 'Avg. Risk Reduction' },
  { value: '96%', label: 'Training Completion Rate' },
];

export function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070e1a] text-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070e1a]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                <Shield size={18} className="text-slate-900" />
              </div>
              <span className="text-white font-bold text-xl tracking-wide">PHISHGUARD</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-400 hover:text-white transition-colors text-sm">Features</a>
              <a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors text-sm">How It Works</a>
              <a href="#testimonials" className="text-slate-400 hover:text-white transition-colors text-sm">Testimonials</a>
              <a href="#pricing" className="text-slate-400 hover:text-white transition-colors text-sm">Pricing</a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="text-slate-300 hover:text-white text-sm px-4 py-2 transition-colors">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-sm px-4 py-2 rounded-lg transition-colors font-semibold"
              >
                Get Started Free
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-slate-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800">
              <nav className="flex flex-col gap-3">
                <a href="#features" className="text-slate-400 hover:text-white text-sm py-2">Features</a>
                <a href="#how-it-works" className="text-slate-400 hover:text-white text-sm py-2">How It Works</a>
                <a href="#testimonials" className="text-slate-400 hover:text-white text-sm py-2">Testimonials</a>
                <Link to="/login" className="text-slate-300 hover:text-white text-sm py-2">Sign In</Link>
                <Link to="/signup" className="bg-cyan-500 text-slate-900 text-sm px-4 py-2 rounded-lg font-semibold text-center">
                  Get Started Free
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Cybersecurity protection"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070e1a]/70 via-[#070e1a]/60 to-[#070e1a]" />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <AlertTriangle size={14} className="text-cyan-400" />
              <span className="text-cyan-400 text-sm">91% of cyberattacks start with phishing</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Turn Your Team Into a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Human Firewall
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
              PhishGuard delivers interactive phishing awareness training, realistic simulations, and powerful analytics to reduce your organization's attack surface — measurably and continuously.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/signup')}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 justify-center transition-all duration-200 shadow-lg shadow-cyan-500/30"
              >
                Start Free Trial
                <ChevronRight size={20} />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="border border-slate-600 hover:border-slate-400 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 justify-center transition-all duration-200 hover:bg-slate-800"
              >
                <Eye size={20} />
                View Demo
              </button>
            </div>

            <div className="flex items-center gap-6 mt-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-400" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-400" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-400" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-800/50 border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#070e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-4 py-2 mb-4">
              <Zap size={14} className="text-cyan-400" />
              <span className="text-slate-400 text-sm">Platform Features</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Combat Phishing
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A comprehensive security awareness platform built for modern organizations, from SMBs to enterprise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 hover:border-slate-500 transition-all duration-300 hover:bg-slate-800 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How PhishGuard Works</h2>
            <p className="text-slate-400 text-lg">Three simple steps to a more security-aware organization</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-slate-600 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-lg flex-shrink-0">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Feature image */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Real Training. Real Results.</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Our platform combines scenario-based learning with behavioral science to create lasting security habits. Employees don't just pass tests — they develop genuine awareness.
              </p>
              <ul className="space-y-3">
                {[
                  'Adaptive learning based on individual risk scores',
                  'Multi-language support for global teams',
                  'SCORM-compliant modules for LMS integration',
                  'Compliance reporting for HIPAA, SOC2, ISO 27001',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-700">
              <ImageWithFallback
                src={teamImage}
                alt="Security training team"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-24 bg-[#070e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden border border-slate-700">
              <ImageWithFallback
                src={analyticsImage}
                alt="Analytics dashboard"
                className="w-full h-72 object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-4 py-2 mb-4">
                <BarChart size={14} className="text-cyan-400" />
                <span className="text-slate-400 text-sm">Powerful Analytics</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Data-Driven Security Insights
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Get complete visibility into your organization's security posture. Track who's most vulnerable, monitor training effectiveness, and export reports for stakeholders and compliance audits.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Globe size={20} />, label: 'Organization-wide dashboards' },
                  { icon: <Lock size={20} />, label: 'Risk scoring per user' },
                  { icon: <BarChart size={20} />, label: 'CSV & PDF export' },
                  { icon: <Zap size={20} />, label: 'Real-time monitoring' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-800/60 border border-slate-700 rounded-xl p-3">
                    <span className="text-cyan-400">{item.icon}</span>
                    <span className="text-slate-300 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Security Leaders</h2>
            <p className="text-slate-400 text-lg">See why thousands of organizations choose PhishGuard</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed italic">"{t.quote}"</p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.author}</p>
                  <p className="text-slate-400 text-xs">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-y border-cyan-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-6">
            <Shield size={32} className="text-cyan-400" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Defend Your Organization?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Start your free 14-day trial today. No credit card required. Setup takes less than 10 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg shadow-cyan-500/30"
            >
              Create Free Account
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border border-slate-600 hover:border-slate-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              Sign In
            </button>
          </div>
          <p className="text-slate-500 text-sm mt-4">
            Demo credentials: user@phishguard.com / Password1! &nbsp;|&nbsp; admin@phishguard.com / Admin1!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#070e1a] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                  <Shield size={16} className="text-slate-900" />
                </div>
                <span className="text-white font-bold">PHISHGUARD</span>
              </div>
              <p className="text-slate-500 text-sm">
                Protecting organizations from phishing attacks through intelligent security awareness training.
              </p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Roadmap'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Resources', links: ['Documentation', 'API', 'Support', 'Status'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white text-sm font-semibold mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-sm">© 2026 PhishGuard. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
