import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div>
      <p>
        <Link to="/simple">simple</Link>
      </p>
      <p>
        <Link to="/simple2">simple2</Link>
      </p>
      <p>
        <Link to="/nested-field">nested-field</Link>
      </p>
      <p>
        <Link to="/nested-field-controller">nested-field-controller</Link>
      </p>
    </div>
  ),
});
