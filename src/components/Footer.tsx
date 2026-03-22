export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-os-border text-center font-mono">
      <div className="text-sm text-foreground mb-2">
        <span className="text-cyan">{'</>'}</span> Ansh Babel | Software Engineer
      </div>
      <div className="text-xs text-os-text-muted mb-1">
        Built with using React, TypeScript & Tailwind
      </div>
      <div className="text-xs text-os-text-muted">
        © {new Date().getFullYear()} Ansh Babel. All rights reserved.
      </div>
    </footer>
  );
}
