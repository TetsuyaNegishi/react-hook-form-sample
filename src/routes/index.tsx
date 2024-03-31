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
      <p>
        <Link to="/dynamic-field">dynamic-field</Link>
      </p>
      <p>
        <Link to="/dynamic-field2">dynamic-field2</Link>
      </p>
    </div>
  ),
});
