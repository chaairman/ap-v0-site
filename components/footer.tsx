// components/footer.tsx

export function Footer() {
  return (
    // Apply responsive padding to the outer footer spacing if needed, or keep as is.
    <footer className="bg-neutral-900 py-16 md:py-24 lg:py-32 px-4 sm:px-8 lg:px-0 border-t border-white/10"> {/* Adjusted outer padding */}
      {/* ***** PADDING CHANGE HERE ***** */}
      <div className="container-spacious max-w-7xl mx-auto px-4 sm:px-8 lg:pl-32 lg:pr-8"> {/* Mobile: px-4/8. Desktop: lg:pl-32 lg:pr-8 */}
        {/* Grid layout: default to 1 or 2 cols, expand on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-20"> {/* Adjusted mobile gap & columns */}
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1"> {/* Allow brand to take more space on small screens */}
            <h3 className="text-white text-lg font-semibold mb-6">Amara & Partners</h3>
            <p className="text-white/60 mb-8 text-spacious">
              A modern legal consultancy redefining excellence in Abu Dhabi's legal landscape.
            </p>
            {/* Social icons would go here */}
            <div className="flex space-x-6"></div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-5"> {/* Slightly reduced spacing */}
              <li><a href="/about-us" className="text-white/60 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/services" className="text-white/60 hover:text-primary transition-colors">Services</a></li>
              <li><a href="/team" className="text-white/60 hover:text-primary transition-colors">Our Team</a></li>
              <li><a href="/insights" className="text-white/60 hover:text-primary transition-colors">Insights</a></li>
              <li><a href="/careers" className="text-white/60 hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Column 3: Practice Areas */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Practice Areas</h3>
            <ul className="space-y-5"> {/* Slightly reduced spacing */}
              <li><a href="/services/dispute-resolution" className="text-white/60 hover:text-primary transition-colors">Dispute Resolution</a></li>
              <li><a href="/services/corporate-commercial" className="text-white/60 hover:text-primary transition-colors">Corporate & Commercial</a></li>
              <li><a href="/services/projects-operations" className="text-white/60 hover:text-primary transition-colors">Projects & Operations</a></li>
              <li><a href="/services/specialized-regulatory" className="text-white/60 hover:text-primary transition-colors">Specialized Regulatory</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Contact</h3>
            <address className="not-italic text-white/60 space-y-5 text-spacious"> {/* Slightly reduced spacing */}
              <p>Amara Tower, Al Reem Island</p>
              <p>Abu Dhabi, United Arab Emirates</p>
              <p>+971 2 123 4567</p>
              <p>info@amarapartners.com</p>
            </address>
          </div>
        </div>

        {/* Separator */}
        <div className="elegant-border w-full my-12 md:my-16"></div> {/* Adjusted margin */}

        {/* Bottom Bar: default to column, row on md+ */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm text-white/60 mb-6 md:mb-0"> {/* Add bottom margin for mobile stacking */}
            © {new Date().getFullYear()} Amara & Partners LLC. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center space-x-6 md:space-x-10"> {/* Allow wrapping on small screens, adjust spacing */}
            <a href="/privacy-policy" className="text-sm text-white/60 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/terms-of-use" className="text-sm text-white/60 hover:text-primary transition-colors">Terms of Use</a>
            <a href="/sitemap" className="text-sm text-white/60 hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}