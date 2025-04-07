export function Footer() {
  return (
    <footer className="bg-neutral-900 py-24 md:py-32 px-8 md:px-16 border-t border-white/10">
      <div className="container-spacious max-w-7xl mx-auto pl-20 md:pl-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-20">
          <div>
            <h3 className="text-white text-lg font-semibold mb-8">Amara & Partners</h3>
            <p className="text-white/60 mb-10 text-spacious">
              A modern legal consultancy redefining excellence in Abu Dhabi's legal landscape.
            </p>
            <div className="flex space-x-6">{/* Social icons would go here */}</div>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-8">Quick Links</h3>
            <ul className="space-y-6">
              <li>
                <a href="/about-us" className="text-white/60 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-white/60 hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/team" className="text-white/60 hover:text-primary transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="/insights" className="text-white/60 hover:text-primary transition-colors">
                  Insights
                </a>
              </li>
              <li>
                <a href="/careers" className="text-white/60 hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-8">Practice Areas</h3>
            <ul className="space-y-6">
              <li>
                <a href="/services/dispute-resolution" className="text-white/60 hover:text-primary transition-colors">
                  Dispute Resolution
                </a>
              </li>
              <li>
                <a href="/services/corporate-commercial" className="text-white/60 hover:text-primary transition-colors">
                  Corporate & Commercial
                </a>
              </li>
              <li>
                <a href="/services/projects-operations" className="text-white/60 hover:text-primary transition-colors">
                  Projects & Operations
                </a>
              </li>
              <li>
                <a
                  href="/services/specialized-regulatory"
                  className="text-white/60 hover:text-primary transition-colors"
                >
                  Specialized Regulatory
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-8">Contact</h3>
            <address className="not-italic text-white/60 space-y-6 text-spacious">
              <p>Amara Tower, Al Reem Island</p>
              <p>Abu Dhabi, United Arab Emirates</p>
              <p>+971 2 123 4567</p>
              <p>info@amarapartners.com</p>
            </address>
          </div>
        </div>

        <div className="elegant-border w-full my-16"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Amara & Partners LLC. All rights reserved.
          </p>

          <div className="flex space-x-10 mt-8 md:mt-0">
            <a href="/privacy-policy" className="text-sm text-white/60 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-use" className="text-sm text-white/60 hover:text-primary transition-colors">
              Terms of Use
            </a>
            <a href="/sitemap" className="text-sm text-white/60 hover:text-primary transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

