import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-vibe-charcoal/10 bg-vibe-cream py-12">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-display text-3xl text-vibe-charcoal">
            Freela<span className="text-vibe-terracotta">.</span>Vibe
          </h3>
          <p className="mt-2 max-w-sm text-sm text-vibe-charcoal/70">
            Civil talent ecosystem for Gen Z freelancers who choose Jogja as their home.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-vibe-charcoal/80">
          <Link to="/arrive">Arrive</Link>
          <Link to="/connect">Connect</Link>
          <Link to="/work">Work</Link>
          <Link to="/feel">Feel</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-[1400px] px-6 text-xs text-vibe-charcoal/50">
        © {new Date().getFullYear()} Freela.Vibe — Made with care in Yogyakarta.
      </p>
    </footer>
  );
}
