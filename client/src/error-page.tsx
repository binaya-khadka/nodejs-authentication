import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div id="error-page">
        <h1 className="">Oops!</h1>
        <p className="mt-10">Sorry, an unexpected error has occurred.</p>
      </div>
    </>
  );
}