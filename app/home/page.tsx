import Loader from "@components/Loader";
import { Suspense, ViewTransition } from "react";
import StockList from "./StockList";

export default function Home() {
  return (
    <main>
      <ViewTransition>
        <Suspense fallback={<Loader withBackdrop />}>
          <StockList />
        </Suspense>
      </ViewTransition>
    </main>
  );
}