import Loader from "@components/Loader";
import { Suspense } from "react";
import StockList from "./StockList";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Loader withBackdrop />}>
        <StockList />
      </Suspense>
    </main>
  );
}