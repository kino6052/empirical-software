import { Section, Container, Heading, Text, Card, Badge, Grid } from "../lib/components";

const services = [
  { emoji: "🏗️", title: "Architecture Review", desc: "Strip unnecessary complexity. Keep what's load-bearing." },
  { emoji: "⚡", title: "Velocity Recovery", desc: "Diagnose why your sprints are slowing down — and fix the root cause." },
  { emoji: "🔬", title: "Codebase Audit", desc: "Find the reifications, the ceremony, the ghosts. Replace them with ground truth." },
  { emoji: "🚀", title: "Greenfield Build", desc: "Start lean. Stay lean. Ship continuously from day one." },
  { emoji: "🧩", title: "Team Enablement", desc: "Teach your team to see complexity before it calcifies." },
  { emoji: "🛠️", title: "Legacy Rescue", desc: "Untangle the mire without a rewrite. Incremental, empirical, verifiable." },
];

export function ServicesPage(): HTMLElement {
  return Section([
    Container([
      Heading(1, "Services"),
      Text("We solve one problem: keeping software soft."),
      Grid(
        services.map((s) =>
          Card([
            Badge(s.emoji, s.title),
            Text(s.desc),
          ])
        )
      ),
    ]),
  ]);
}
