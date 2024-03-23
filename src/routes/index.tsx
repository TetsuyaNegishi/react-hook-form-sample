import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div>
      <p>
        <Link to="/simple">simple</Link>
      </p>
    </div>
  ),
});
