import Loader from "@components/Loader";
import { Suspense, ViewTransition } from "react";
import StockDetails from "./StockDetails";
import styles from "./stock.module.scss";

interface StockPageParams {
  symbol: string;
}

export default async function Stock({ params }: { params: StockPageParams }) {
  const symbol = (await params)?.symbol;
  return (
    <main className={styles['stock-page']}>
      <ViewTransition>
        <Suspense fallback={<Loader withBackdrop />}>
          <StockDetails symbol={symbol} />
        </Suspense>
      </ViewTransition>
    </main>
  );
}